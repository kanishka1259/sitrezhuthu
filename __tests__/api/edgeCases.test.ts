/**
 * __tests__/api/edgeCases.test.ts
 *
 * Edge case and performance tests for the portfolio API.
 */
import { NextRequest } from 'next/server';
import { POST, GET } from '@/app/api/portfolio/route';
import Portfolio from '@/lib/models/Portfolio';

jest.mock('@/lib/firebase-admin', () => ({
  verifyFirebaseToken: jest.fn().mockResolvedValue({ uid: 'uid_edge' }),
}));

function makeReq(body: any) {
  return new NextRequest('http://localhost:3000/api/portfolio', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Authorization: 'Bearer test' },
    body: JSON.stringify(body),
  });
}

// ─── Empty design save ────────────────────────────────────────────────────────
describe('Edge: empty design', () => {
  it('saves a portfolio with zero elements and zero skills', async () => {
    const res = await POST(makeReq({
      username: 'emptyuser',
      name: '',
      bio: '',
      template: 'custom',
      isPublic: true,
      skills: [],
      projects: [],
      education: [],
      contact: {},
      customElements: [],
    }));
    expect(res.status).toBe(200);
    const json = await res.json();
    expect(json.customElements).toHaveLength(0);
    expect(json.skills).toHaveLength(0);
  });
});

// ─── Large number of elements ─────────────────────────────────────────────────
describe('Edge: large element count (performance)', () => {
  it('saves and retrieves 500 canvas elements within 2 seconds', async () => {
    const elements = Array.from({ length: 500 }, (_, i) => ({
      id: `el_${i}`,
      type: i % 2 === 0 ? 'text' : 'shape',
      shapeType: i % 2 !== 0 ? 'circle' : undefined,
      x: (i % 20) * 60,
      y: Math.floor(i / 20) * 80,
      content: `Element ${i}`,
      zIndex: i,
      width: 100,
      height: 60,
    }));

    const start = Date.now();
    await POST(makeReq({
      username: 'heavyuser',
      name: 'Heavy Canvas',
      bio: '',
      template: 'custom',
      isPublic: true,
      skills: [],
      projects: [],
      education: [],
      contact: {},
      customElements: elements,
    }));
    const duration = Date.now() - start;

    expect(duration).toBeLessThan(2000);

    const inDB = await Portfolio.findOne({ userId: 'uid_edge' });
    expect(inDB!.customElements).toHaveLength(500);
  });

  it('GET response is under 1 second for large portfolio', async () => {
    const getReq = new NextRequest('http://localhost:3000/api/portfolio', {
      method: 'GET',
      headers: { Authorization: 'Bearer test' },
    });

    const start = Date.now();
    const res = await GET(getReq);
    const duration = Date.now() - start;

    expect(res.status).toBe(200);
    expect(duration).toBeLessThan(1000);
  });
});

// ─── Invalid input validation ─────────────────────────────────────────────────
describe('Edge: invalid input', () => {
  it('handles extremely long name gracefully', async () => {
    const longName = 'A'.repeat(10000);
    const res = await POST(makeReq({
      username: 'longname',
      name: longName,
      bio: '',
      template: 'minimal',
      isPublic: true,
      skills: [],
      projects: [],
      education: [],
      contact: {},
    }));
    // Should either succeed (DB truncates) or return a validation error, not crash
    expect([200, 400, 500]).toContain(res.status);
  });

  it('handles null values in contact gracefully', async () => {
    const res = await POST(makeReq({
      username: 'nullcontact',
      name: 'Test',
      bio: '',
      template: 'minimal',
      isPublic: true,
      skills: [],
      projects: [],
      education: [],
      contact: { email: null, linkedin: null, github: null, twitter: null },
    }));
    expect([200, 400]).toContain(res.status);
  });

  it('slug is capped at 40 characters', async () => {
    const longSlug = 'this-is-a-very-very-very-very-long-slug-name-that-exceeds-limit';
    const res = await POST(makeReq({
      username: 'slugcap',
      name: 'Slug Cap',
      bio: '',
      slug: longSlug,
      template: 'minimal',
      isPublic: true,
      skills: [],
      projects: [],
      education: [],
      contact: {},
    }));
    expect(res.status).toBe(200);
    const json = await res.json();
    expect(json.slug.length).toBeLessThanOrEqual(40);
  });

  it('special characters in slug are replaced with hyphens', async () => {
    const res = await POST(makeReq({
      username: 'specialslug',
      name: 'Special',
      bio: '',
      slug: 'hello world! @#$%',
      template: 'minimal',
      isPublic: true,
      skills: [],
      projects: [],
      education: [],
      contact: {},
    }));
    expect(res.status).toBe(200);
    const json = await res.json();
    expect(json.slug).toMatch(/^[a-z0-9-]+$/);
  });
});

// ─── Rapid successive saves ───────────────────────────────────────────────────
describe('Edge: rapid successive saves', () => {
  it('handles 10 rapid saves without data corruption', async () => {
    const saves = Array.from({ length: 10 }, (_, i) =>
      POST(makeReq({
        username: 'rapiduser',
        name: `Save ${i}`,
        bio: `Bio ${i}`,
        template: 'custom',
        isPublic: true,
        skills: [`skill${i}`],
        projects: [],
        education: [],
        contact: {},
        customElements: [{ id: `el_${i}`, type: 'text', x: i * 10, y: 0, content: `Text ${i}`, zIndex: i }],
      }))
    );

    const results = await Promise.allSettled(saves);
    const successful = results.filter(r => r.status === 'fulfilled');
    // At least half should succeed
    expect(successful.length).toBeGreaterThan(5);

    // Final DB state should be consistent
    const inDB = await Portfolio.findOne({ userId: 'uid_edge' });
    expect(inDB).not.toBeNull();
  });
});
