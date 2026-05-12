/**
 * __tests__/api/portfolio.test.ts
 *
 * Integration tests for /api/portfolio routes.
 * Uses mongodb-memory-server for a real DB, no mocks on the persistence layer.
 * Firebase token verification IS mocked since we don't want real Auth in tests.
 */
import { NextRequest } from 'next/server';
import { GET, POST, DELETE } from '@/app/api/portfolio/route';
import Portfolio from '@/lib/models/Portfolio';

// ─── Mock Firebase admin token verification ───────────────────────────────────
jest.mock('@/lib/firebase-admin', () => ({
  verifyFirebaseToken: jest.fn(),
}));

import { verifyFirebaseToken } from '@/lib/firebase-admin';
const mockVerify = verifyFirebaseToken as jest.MockedFunction<typeof verifyFirebaseToken>;

function makeReq(method: string, body?: any, auth = 'Bearer valid-token'): NextRequest {
  const url = 'http://localhost:3000/api/portfolio';
  return new NextRequest(url, {
    method,
    headers: { 'Content-Type': 'application/json', Authorization: auth },
    body: body ? JSON.stringify(body) : undefined,
  });
}

const TEST_UID = 'uid_test_user_1';

beforeEach(() => {
  mockVerify.mockResolvedValue({ uid: TEST_UID } as any);
});

// ─── GET /api/portfolio ───────────────────────────────────────────────────────
describe('GET /api/portfolio', () => {
  it('returns {} when no portfolio exists for user', async () => {
    const res = await GET(makeReq('GET'));
    expect(res.status).toBe(200);
    const json = await res.json();
    expect(json).toEqual({});
  });

  it('returns existing portfolio for the user', async () => {
    await Portfolio.create({
      userId: TEST_UID,
      username: 'testuser',
      name: 'Alex Rivera',
      bio: 'Developer',
      template: 'minimal',
      skills: ['React'],
      projects: [],
      education: [],
      contact: {},
      isPublic: true,
    });

    const res = await GET(makeReq('GET'));
    expect(res.status).toBe(200);
    const json = await res.json();
    expect(json.name).toBe('Alex Rivera');
    expect(json.username).toBe('testuser');
  });

  it('returns 401 when no valid auth token', async () => {
    mockVerify.mockRejectedValueOnce(new Error('Authorization header missing'));
    const res = await GET(makeReq('GET', undefined, ''));
    expect(res.status).toBe(401);
    const json = await res.json();
    expect(json.error).toMatch(/Authorization/);
  });
});

// ─── POST /api/portfolio ──────────────────────────────────────────────────────
describe('POST /api/portfolio', () => {
  it('creates a new portfolio', async () => {
    const body = {
      username: 'newuser',
      name: 'Jane Doe',
      bio: 'Designer',
      template: 'custom',
      isPublic: true,
      skills: ['Figma', 'CSS'],
      projects: [],
      education: [],
      contact: { email: 'jane@example.com' },
      customElements: [],
    };

    const res = await POST(makeReq('POST', body));
    expect(res.status).toBe(200);
    const json = await res.json();
    expect(json.name).toBe('Jane Doe');
    expect(json.template).toBe('custom');

    // Verify persisted in DB
    const inDB = await Portfolio.findOne({ userId: TEST_UID });
    expect(inDB).not.toBeNull();
    expect(inDB!.name).toBe('Jane Doe');
  });

  it('updates an existing portfolio (upsert)', async () => {
    // Create initial
    await Portfolio.create({
      userId: TEST_UID,
      username: 'existing',
      name: 'Old Name',
      bio: '',
      template: 'minimal',
      skills: [],
      projects: [],
      education: [],
      contact: {},
      isPublic: true,
    });

    const res = await POST(makeReq('POST', {
      username: 'existing',
      name: 'Updated Name',
      bio: 'New bio',
      template: 'dark',
      isPublic: false,
      skills: ['Next.js'],
      projects: [],
      education: [],
      contact: {},
    }));

    expect(res.status).toBe(200);
    const json = await res.json();
    expect(json.name).toBe('Updated Name');
    expect(json.template).toBe('dark');
    expect(json.isPublic).toBe(false);
  });

  it('sanitizes custom slug to lowercase alphanumeric', async () => {
    const res = await POST(makeReq('POST', {
      username: 'slugtest',
      name: 'Slug Test',
      slug: 'My Awesome Slug!!!',
      bio: '',
      template: 'minimal',
      isPublic: true,
      skills: [],
      projects: [],
      education: [],
      contact: {},
    }));
    expect(res.status).toBe(200);
    const json = await res.json();
    expect(json.slug).toBe('my-awesome-slug---');
  });

  it('returns 400 when slug is taken by another user', async () => {
    // Another user already has this slug
    await Portfolio.create({
      userId: 'other_uid_999',
      username: 'otheruser',
      slug: 'taken-slug',
      name: 'Other',
      bio: '',
      template: 'minimal',
      skills: [],
      projects: [],
      education: [],
      contact: {},
      isPublic: true,
    });

    const res = await POST(makeReq('POST', {
      username: 'testuser2',
      name: 'Me',
      slug: 'taken-slug',
      bio: '',
      template: 'minimal',
      isPublic: true,
      skills: [],
      projects: [],
      education: [],
      contact: {},
    }));

    expect(res.status).toBe(400);
    const json = await res.json();
    expect(json.error).toMatch(/taken/i);
  });

  it('saves customElements to DB', async () => {
    const elements = [
      { id: 'el_1', type: 'text', x: 100, y: 200, content: 'Canvas text', zIndex: 1 },
      { id: 'el_2', type: 'shape', shapeType: 'circle', x: 300, y: 300, zIndex: 2 },
    ];

    await POST(makeReq('POST', {
      username: 'canvasuser',
      name: 'Canvas User',
      bio: '',
      template: 'custom',
      isPublic: true,
      skills: [],
      projects: [],
      education: [],
      contact: {},
      customElements: elements,
    }));

    const inDB = await Portfolio.findOne({ userId: TEST_UID });
    expect(inDB!.customElements).toHaveLength(2);
    expect(inDB!.customElements[0].content).toBe('Canvas text');
  });

  it('returns 401 when unauthenticated', async () => {
    mockVerify.mockRejectedValueOnce(new Error('Authorization header missing'));
    const res = await POST(makeReq('POST', { name: 'X' }, ''));
    expect(res.status).toBe(401);
  });
});

// ─── DELETE /api/portfolio ────────────────────────────────────────────────────
describe('DELETE /api/portfolio', () => {
  it('deletes portfolio for authenticated user', async () => {
    await Portfolio.create({
      userId: TEST_UID,
      username: 'deleteuser',
      name: 'Delete Me',
      bio: '',
      template: 'minimal',
      skills: [],
      projects: [],
      education: [],
      contact: {},
      isPublic: true,
    });

    const res = await DELETE(makeReq('DELETE'));
    expect(res.status).toBe(200);
    const json = await res.json();
    expect(json.success).toBe(true);

    const inDB = await Portfolio.findOne({ userId: TEST_UID });
    expect(inDB).toBeNull();
  });

  it('succeeds even if no portfolio exists (idempotent)', async () => {
    const res = await DELETE(makeReq('DELETE'));
    expect(res.status).toBe(200);
    const json = await res.json();
    expect(json.success).toBe(true);
  });

  it('returns 401 when unauthenticated', async () => {
    mockVerify.mockRejectedValueOnce(new Error('Authorization header missing'));
    const res = await DELETE(makeReq('DELETE', undefined, ''));
    expect(res.status).toBe(401);
  });
});

// ─── Community templates API ──────────────────────────────────────────────────
describe('GET /api/templates/community', () => {
  it('returns only approved templates by default', async () => {
    const { GET: communityGET } = await import('@/app/api/templates/community/route');
    const CommunityTemplate = (await import('@/lib/models/CommunityTemplate')).default;

    await CommunityTemplate.create({
      authorName: 'Alice', authorEmail: 'alice@test.com',
      templateName: 'Neon', description: 'Cool', status: 'approved', votes: 5,
      baseTemplate: 'dark', templateStyles: {}, previewData: {},
    });
    await CommunityTemplate.create({
      authorName: 'Bob', authorEmail: 'bob@test.com',
      templateName: 'Pending', description: 'Waiting', status: 'pending', votes: 0,
      baseTemplate: 'minimal', templateStyles: {}, previewData: {},
    });

    const req = new NextRequest('http://localhost:3000/api/templates/community');
    const res = await communityGET(req);
    expect(res.status).toBe(200);
    const json = await res.json();
    expect(json).toHaveLength(1);
    expect(json[0].templateName).toBe('Neon');
  });
});
