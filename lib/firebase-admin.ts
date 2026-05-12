/**
 * Firebase Admin SDK — server-only
 * ─────────────────────────────────
 * Used in API routes to verify ID tokens issued by Firebase Auth.
 * Never import this in client components.
 */

import { initializeApp, getApps, cert, App } from 'firebase-admin/app';
import { getAuth }                            from 'firebase-admin/auth';

let adminApp: App;

function getAdminApp(): App {
  if (getApps().length > 0) return getApps()[0];

  const privateKey = process.env.FIREBASE_ADMIN_PRIVATE_KEY?.replace(/\\n/g, '\n');

  adminApp = initializeApp({
    credential: cert({
      projectId:   process.env.FIREBASE_ADMIN_PROJECT_ID!,
      clientEmail: process.env.FIREBASE_ADMIN_CLIENT_EMAIL!,
      privateKey,
    }),
  });
  return adminApp;
}

/**
 * Verify a Firebase ID token from the Authorization header.
 * Returns the decoded token (uid, email, name, picture, etc.)
 * or throws if the token is invalid / missing.
 */
export async function verifyFirebaseToken(authHeader?: string | null) {
  if (!authHeader?.startsWith('Bearer ')) {
    throw new Error('Missing or malformed Authorization header');
  }
  const idToken = authHeader.slice(7);
  const app = getAdminApp();
  return getAuth(app).verifyIdToken(idToken);
}
