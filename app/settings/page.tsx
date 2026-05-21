'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useFirebaseAuth } from '@/lib/firebase-auth-context';
import { Navbar } from '@/components/common/Navbar';
import {
  User, Lock, Bell, LogOut, Trash2,
  Check, Loader2, UserPlus, Users, Globe, Download
} from 'lucide-react';

// ─── Reusable section card ──────────────────────────────────────
function Section({ title, desc, children }: { title: string; desc?: string; children: React.ReactNode }) {
  return (
    <div style={{ background: '#0d0d0d', border: '1px solid rgba(255,255,255,0.07)', borderRadius: 16, overflow: 'hidden', marginBottom: 16 }}>
      <div style={{ padding: '20px 24px', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
        <h2 style={{ fontWeight: 600, fontSize: 15, color: '#fff', marginBottom: desc ? 4 : 0 }}>{title}</h2>
        {desc && <p style={{ fontSize: 13, color: '#555' }}>{desc}</p>}
      </div>
      <div style={{ padding: '20px 24px' }}>{children}</div>
    </div>
  );
}

// ─── Toggle switch ──────────────────────────────────────────────
function Toggle({ on, onChange, id }: { on: boolean; onChange: (v: boolean) => void; id: string }) {
  return (
    <button
      id={id}
      onClick={() => onChange(!on)}
      role="switch"
      aria-checked={on}
      style={{
        width: 44, height: 24, borderRadius: 12, border: 'none',
        background: on ? '#3DAA7A' : 'rgba(255,255,255,0.1)',
        cursor: 'pointer', position: 'relative', transition: 'background 0.2s', flexShrink: 0,
      }}
    >
      <span style={{
        position: 'absolute', top: 3, left: on ? 23 : 3,
        width: 18, height: 18, borderRadius: '50%',
        background: on ? '#000' : '#555',
        transition: 'left 0.2s',
      }} />
    </button>
  );
}

// ─── Row ────────────────────────────────────────────────────────
function Row({ label, desc, right }: { label: string; desc?: string; right: React.ReactNode }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 16, padding: '12px 0', borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
      <div>
        <div style={{ fontSize: 14, color: '#ddd', fontWeight: 500 }}>{label}</div>
        {desc && <div style={{ fontSize: 12, color: '#555', marginTop: 2 }}>{desc}</div>}
      </div>
      <div style={{ flexShrink: 0 }}>{right}</div>
    </div>
  );
}

// ─── Saved accounts (localStorage) ─────────────────────────────
function getSavedAccounts(): { email: string; name: string; photoURL?: string }[] {
  if (typeof window === 'undefined') return [];
  try { return JSON.parse(localStorage.getItem('sitrez_accounts') || '[]'); } catch { return []; }
}
function saveAccount(account: { email: string; name: string; photoURL?: string }) {
  const existing = getSavedAccounts();
  const updated = [account, ...existing.filter(a => a.email !== account.email)].slice(0, 5);
  localStorage.setItem('sitrez_accounts', JSON.stringify(updated));
}
function removeAccount(email: string) {
  const updated = getSavedAccounts().filter(a => a.email !== email);
  localStorage.setItem('sitrez_accounts', JSON.stringify(updated));
}

export default function SettingsPage() {
  const { user, signOut, signInGoogle, resetPassword, getIdToken } = useFirebaseAuth();
  const router = useRouter();

  // ── State ──
  const [displayName, setDisplayName] = useState('');
  const [savingProfile, setSavingProfile] = useState(false);
  const [profileMsg, setProfileMsg] = useState('');

  const [passMsg, setPassMsg] = useState('');

  const [notifications, setNotifications] = useState({ updates: true, tips: false, security: true });
  const [privacy, setPrivacy] = useState({ publicByDefault: true, showEmail: false });

  const [savedAccounts, setSavedAccounts] = useState<{ email: string; name: string }[]>([]);
  const [tab, setTab] = useState<'profile' | 'security' | 'accounts' | 'notifications' | 'privacy' | 'data'>('profile');

  useEffect(() => {
    if (!user) { router.push('/login'); return; }
    setDisplayName(user.displayName || '');
    setSavedAccounts(getSavedAccounts());
    // Persist current account
    if (user.email) saveAccount({ email: user.email, name: user.displayName || user.email, photoURL: user.photoURL || undefined });
  }, [user, router]);

  if (!user) return null;

  const handleSaveProfile = async () => {
    setSavingProfile(true);
    setProfileMsg('');
    try {
      const { updateProfile } = await import('firebase/auth');
      const { auth } = await import('@/lib/firebase');
      await updateProfile(auth.currentUser!, { displayName });
      setProfileMsg('Profile updated successfully.');
    } catch { setProfileMsg('Failed to update profile.'); }
    finally { setSavingProfile(false); setTimeout(() => setProfileMsg(''), 3000); }
  };

  const handlePasswordReset = async () => {
    if (!user.email) return;
    try {
      await resetPassword(user.email);
      setPassMsg('Password reset email sent. Check your inbox.');
    } catch { setPassMsg('Failed to send reset email.'); }
    setTimeout(() => setPassMsg(''), 4000);
  };

  const handleAddAccount = async () => {
    try {
      await signInGoogle();
      setSavedAccounts(getSavedAccounts());
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'Failed to add account.';
      alert(msg);
    }
  };

  const handleRemoveAccount = (email: string) => {
    removeAccount(email);
    setSavedAccounts(getSavedAccounts());
  };

  const handleSignOut = async () => {
    await signOut();
    router.push('/');
  };

  const handleDeleteAccount = async () => {
    if (!confirm('This will permanently delete your account and all portfolios. Are you absolutely sure?')) return;
    // Placeholder — would call DELETE /api/account
    alert('Account deletion is not yet enabled. Please contact support.');
  };

  // ── Sidebar tabs ──
  const TABS = [
    { id: 'profile',       label: 'Profile',        icon: User },
    { id: 'security',      label: 'Security',       icon: Lock },
    { id: 'accounts',      label: 'Accounts',       icon: Users },
    { id: 'notifications', label: 'Notifications',  icon: Bell },
    { id: 'privacy',       label: 'Privacy',        icon: Globe },
    { id: 'data',          label: 'Data & Storage',  icon: Download },
  ] as const;

  return (
    <div style={{ minHeight: '100vh', background: '#000', color: '#f0f0f0' }}>
      <Navbar />

      <main style={{ maxWidth: 1100, margin: '0 auto', padding: '96px 24px 80px', display: 'grid', gridTemplateColumns: '220px 1fr', gap: 24, alignItems: 'start' }}>

        {/* ── Sidebar ── */}
        <aside style={{ background: '#0d0d0d', border: '1px solid rgba(255,255,255,0.07)', borderRadius: 16, padding: '12px 8px', position: 'sticky', top: 88 }}>
          <div style={{ padding: '12px 16px 16px', borderBottom: '1px solid rgba(255,255,255,0.05)', marginBottom: 8 }}>
            <div style={{ width: 44, height: 44, borderRadius: '50%', background: 'linear-gradient(135deg,#3DAA7A,#006fff)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18, fontWeight: 700, color: '#000', marginBottom: 10 }}>
              {(user.displayName || user.email || 'U')[0].toUpperCase()}
            </div>
            <div style={{ fontWeight: 600, fontSize: 13, color: '#fff', lineHeight: 1.3 }}>{user.displayName || 'User'}</div>
            <div style={{ fontSize: 12, color: '#555', marginTop: 2, wordBreak: 'break-all' }}>{user.email}</div>
          </div>

          {TABS.map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              id={`settings-tab-${id}`}
              onClick={() => setTab(id)}
              style={{
                display: 'flex', alignItems: 'center', gap: 10, width: '100%',
                padding: '9px 12px', borderRadius: 9, border: 'none',
                background: tab === id ? 'rgba(61,170,122,0.08)' : 'transparent',
                color: tab === id ? '#3DAA7A' : '#888',
                fontSize: 13, fontWeight: tab === id ? 600 : 400,
                cursor: 'pointer', textAlign: 'left', transition: 'all 0.15s',
              }}
              onMouseEnter={e => { if (tab !== id) { e.currentTarget.style.background  = 'rgba(255,255,255,0.03)'; e.currentTarget.style.color = '#ddd'; } }}
              onMouseLeave={e => { if (tab !== id) { e.currentTarget.style.background  = 'transparent'; e.currentTarget.style.color  = '#888'; } }}
            >
              <Icon size={15} /> {label}
            </button>
          ))}

          <div style={{ marginTop: 12, paddingTop: 12, borderTop: '1px solid rgba(255,255,255,0.05)' }}>
            <button
              onClick={handleSignOut}
              style={{ display: 'flex', alignItems: 'center', gap: 10, width: '100%', padding: '9px 12px', borderRadius: 9, border: 'none', background: 'transparent', color: '#ff6b6b', fontSize: 13, cursor: 'pointer', textAlign: 'left', transition: 'background 0.15s' }}
              onMouseEnter={e => { e.currentTarget.style.background  = 'rgba(255,75,75,0.07)'; }}
              onMouseLeave={e => { e.currentTarget.style.background  = 'transparent'; }}
            >
              <LogOut size={15} /> Sign Out
            </button>
          </div>
        </aside>

        {/* ── Content ── */}
        <div>

          {/* ── PROFILE ── */}
          {tab === 'profile' && (
            <Section title="Profile" desc="Manage your public display name and avatar.">
              <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
                <div>
                  <label style={{ display: 'block', fontSize: 13, color: '#aaa', marginBottom: 8, fontWeight: 500 }}>Display Name</label>
                  <div style={{ display: 'flex', gap: 10 }}>
                    <input
                      id="profile-name"
                      type="text"
                      value={displayName}
                      onChange={e => setDisplayName(e.target.value)}
                      className="field"
                      style={{ flex: 1 }}
                      placeholder="Your name"
                    />
                    <button
                      id="save-profile-btn"
                      onClick={handleSaveProfile}
                      disabled={savingProfile}
                      className="btn-primary"
                      style={{ flexShrink: 0, padding: '10px 20px', fontSize: 13 }}
                    >
                      {savingProfile ? <Loader2 size={14} className="spin" /> : <><Check size={14} /> Save</>}
                    </button>
                  </div>
                  {profileMsg && <p style={{ fontSize: 13, color: profileMsg.includes('success') ? '#3DAA7A' : '#ff6b6b', marginTop: 8 }}>{profileMsg}</p>}
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: 13, color: '#aaa', marginBottom: 8, fontWeight: 500 }}>Email Address</label>
                  <input type="email" value={user.email || ''} disabled className="field" style={{ opacity: 0.5, cursor: 'not-allowed' }} />
                  <p style={{ fontSize: 12, color: '#555', marginTop: 6 }}>Email changes are not supported. Use a different account instead.</p>
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: 13, color: '#aaa', marginBottom: 8, fontWeight: 500 }}>Account Created</label>
                  <div style={{ fontSize: 14, color: '#666', padding: '10px 14px', background: 'rgba(255,255,255,0.02)', borderRadius: 8, border: '1px solid rgba(255,255,255,0.05)' }}>
                    {user.metadata?.creationTime ? new Date(user.metadata.creationTime).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }) : '—'}
                  </div>
                </div>
              </div>
            </Section>
          )}

          {/* ── SECURITY ── */}
          {tab === 'security' && (
            <Section title="Security" desc="Manage your password and account safety.">
              <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
                <Row label="Password Reset" desc="We'll email you a reset link" right={
                  <button id="reset-password-btn" onClick={handlePasswordReset} className="btn-ghost" style={{ fontSize: 13, padding: '8px 16px' }}>Send Reset Email</button>
                } />
                {passMsg && <p style={{ fontSize: 13, color: passMsg.includes('sent') ? '#3DAA7A' : '#ff6b6b', margin: '8px 0 12px' }}>{passMsg}</p>}
                <Row label="Two-Factor Authentication" desc="Extra security layer via Google Authenticator" right={
                  <span style={{ fontSize: 12, color: '#555', padding: '4px 10px', borderRadius: 6, background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.06)' }}>Coming soon</span>
                } />
                <Row label="Active Sessions" desc="View and revoke active login sessions" right={
                  <button className="btn-ghost" style={{ fontSize: 13, padding: '8px 16px', color: '#ff6b6b', borderColor: 'rgba(255,75,75,0.2)' }} onClick={handleSignOut}>Sign Out All</button>
                } />
                <Row label="Login History" desc="Last sign-in from your account" right={
                  <span style={{ fontSize: 12, color: '#666' }}>{user.metadata?.lastSignInTime ? new Date(user.metadata.lastSignInTime).toLocaleDateString() : '—'}</span>
                } />
              </div>
            </Section>
          )}

          {/* ── ACCOUNTS ── */}
          {tab === 'accounts' && (
            <>
              <Section title="Logged-in Accounts" desc="Switch between multiple accounts on this device. Each account's data stays separate.">
                <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                  {/* Current account */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '12px 14px', borderRadius: 10, background: 'rgba(61,170,122,0.05)', border: '1px solid rgba(61,170,122,0.15)' }}>
                    <div style={{ width: 36, height: 36, borderRadius: '50%', background: 'linear-gradient(135deg,#3DAA7A,#006fff)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 14, fontWeight: 700, color: '#000', flexShrink: 0 }}>
                      {(user.displayName || user.email || 'U')[0].toUpperCase()}
                    </div>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: 14, color: '#fff', fontWeight: 500 }}>{user.displayName || 'User'}</div>
                      <div style={{ fontSize: 12, color: '#666' }}>{user.email}</div>
                    </div>
                    <span style={{ fontSize: 11, color: '#3DAA7A', padding: '3px 8px', borderRadius: 6, background: 'rgba(61,170,122,0.1)', border: '1px solid rgba(61,170,122,0.2)' }}>Active</span>
                  </div>

                  {/* Saved accounts */}
                  {savedAccounts.filter(a => a.email !== user.email).map(acc => (
                    <div key={acc.email} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '12px 14px', borderRadius: 10, background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)' }}>
                      <div style={{ width: 36, height: 36, borderRadius: '50%', background: '#222', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 14, fontWeight: 700, color: '#888', flexShrink: 0 }}>
                        {(acc.name || acc.email)[0].toUpperCase()}
                      </div>
                      <div style={{ flex: 1 }}>
                        <div style={{ fontSize: 14, color: '#bbb', fontWeight: 500 }}>{acc.name}</div>
                        <div style={{ fontSize: 12, color: '#555' }}>{acc.email}</div>
                      </div>
                      <div style={{ display: 'flex', gap: 8 }}>
                        <button
                          onClick={() => router.push('/login')}
                          style={{ fontSize: 12, padding: '6px 12px', borderRadius: 7, border: '1px solid rgba(255,255,255,0.1)', background: 'transparent', color: '#aaa', cursor: 'pointer', transition: 'all 0.15s' }}
                          onMouseEnter={e => { e.currentTarget.style.borderColor  = 'rgba(61,170,122,0.3)'; e.currentTarget.style.color  = '#3DAA7A'; }}
                          onMouseLeave={e => { e.currentTarget.style.borderColor  = 'rgba(255,255,255,0.1)'; e.currentTarget.style.color  = '#aaa'; }}
                        >Switch</button>
                        <button
                          onClick={() => handleRemoveAccount(acc.email)}
                          style={{ width: 32, height: 32, borderRadius: 7, border: '1px solid rgba(255,75,75,0.12)', background: 'transparent', color: '#ff6b6b', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'background 0.15s' }}
                          onMouseEnter={e => { e.currentTarget.style.background  = 'rgba(255,75,75,0.08)'; }}
                          onMouseLeave={e => { e.currentTarget.style.background  = 'transparent'; }}
                          aria-label="Remove account"
                        ><Trash2 size={13} /></button>
                      </div>
                    </div>
                  ))}

                  {/* Add account button */}
                  <button
                    id="add-account-btn"
                    onClick={handleAddAccount}
                    style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '12px 14px', borderRadius: 10, border: '1px dashed rgba(255,255,255,0.12)', background: 'transparent', color: '#666', fontSize: 14, cursor: 'pointer', transition: 'all 0.2s', textAlign: 'left', width: '100%' }}
                    onMouseEnter={e => { e.currentTarget.style.borderColor  = 'rgba(61,170,122,0.3)'; e.currentTarget.style.color  = '#3DAA7A'; }}
                    onMouseLeave={e => { e.currentTarget.style.borderColor  = 'rgba(255,255,255,0.12)'; e.currentTarget.style.color  = '#666'; }}
                  >
                    <UserPlus size={16} /> Add another account via Google
                  </button>
                </div>
              </Section>

              <Section title="Sign Out Options" desc="Manage your current session.">
                <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
                  <button className="btn-ghost" style={{ fontSize: 13 }} onClick={handleSignOut}><LogOut size={14} /> Sign out of this account</button>
                </div>
              </Section>
            </>
          )}

          {/* ── NOTIFICATIONS ── */}
          {tab === 'notifications' && (
            <Section title="Notifications" desc="Choose what updates you receive.">
              <div>
                <Row label="Product Updates" desc="New templates, features and announcements" right={
                  <Toggle id="toggle-updates" on={notifications.updates} onChange={v => setNotifications(n => ({ ...n, updates: v }))} />
                } />
                <Row label="Tips & Tutorials" desc="Portfolio building tips and design inspiration" right={
                  <Toggle id="toggle-tips" on={notifications.tips} onChange={v => setNotifications(n => ({ ...n, tips: v }))} />
                } />
                <Row label="Security Alerts" desc="Notifications about your account security" right={
                  <Toggle id="toggle-security" on={notifications.security} onChange={v => setNotifications(n => ({ ...n, security: v }))} />
                } />
              </div>
            </Section>
          )}

          {/* ── PRIVACY ── */}
          {tab === 'privacy' && (
            <Section title="Privacy" desc="Control how your portfolio data is visible to others.">
              <div>
                <Row label="Portfolios public by default" desc="New portfolios will be publicly accessible via URL" right={
                  <Toggle id="toggle-public" on={privacy.publicByDefault} onChange={v => setPrivacy(p => ({ ...p, publicByDefault: v }))} />
                } />
                <Row label="Show email on portfolio" desc="Display your email address on public portfolio pages" right={
                  <Toggle id="toggle-email" on={privacy.showEmail} onChange={v => setPrivacy(p => ({ ...p, showEmail: v }))} />
                } />
                <Row label="Community submissions" desc="Allow your templates to appear in the community gallery" right={
                  <Toggle id="toggle-community" on={true} onChange={() => {}} />
                } />
              </div>
            </Section>
          )}

          {/* ── DATA ── */}
          {tab === 'data' && (
            <>
              <Section title="Export Data" desc="Download a copy of all your portfolio data.">
                <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
                  <button className="btn-ghost" style={{ fontSize: 13 }}
                    onClick={async () => {
                      try {
                        const token = await getIdToken();
                        const res = await fetch('/api/portfolio', { headers: { Authorization: `Bearer ${token}` } });
                        const data = await res.json();
                        const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
                        const url = URL.createObjectURL(blob);
                        const a = document.createElement('a');
                        a.href = url; a.download = 'my-portfolios.json'; a.click();
                        URL.revokeObjectURL(url);
                      } catch { alert('Export failed.'); }
                    }}
                  >
                    <Download size={14} /> Export All Portfolios (JSON)
                  </button>
                </div>
              </Section>

              <Section title="Danger Zone" desc="Permanent and irreversible actions.">
                <div style={{ padding: '16px', background: 'rgba(255,75,75,0.04)', border: '1px solid rgba(255,75,75,0.12)', borderRadius: 10 }}>
                  <div style={{ fontSize: 14, color: '#ddd', fontWeight: 500, marginBottom: 6 }}>Delete Account</div>
                  <p style={{ fontSize: 13, color: '#666', marginBottom: 16, lineHeight: 1.6 }}>
                    Permanently delete your account and all portfolios. This action cannot be reversed.
                  </p>
                  <button
                    id="delete-account-btn"
                    onClick={handleDeleteAccount}
                    style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '9px 18px', borderRadius: 8, border: '1px solid rgba(255,75,75,0.3)', background: 'transparent', color: '#ff6b6b', fontSize: 13, fontWeight: 500, cursor: 'pointer', transition: 'all 0.2s' }}
                    onMouseEnter={e => { e.currentTarget.style.background  = 'rgba(255,75,75,0.08)'; }}
                    onMouseLeave={e => { e.currentTarget.style.background  = 'transparent'; }}
                  >
                    <Trash2 size={14} /> Delete My Account
                  </button>
                </div>
              </Section>
            </>
          )}
        </div>
      </main>
    </div>
  );
}
