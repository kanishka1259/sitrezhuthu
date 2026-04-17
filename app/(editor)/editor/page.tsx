'use client';

import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { FormPanel } from '@/components/editor/FormPanel';
import { LivePreview } from '@/components/preview/LivePreview';
import { usePortfolioStore } from '@/store/usePortfolioStore';
import axios from 'axios';

export default function EditorPage() {
  const { data: session, status } = useSession();
  const [isSaving, setIsSaving] = useState(false);
  const [saveMessage, setSaveMessage] = useState('');
  const router = useRouter();
  const portfolio = usePortfolioStore();

  // Redirect if not authenticated
  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/login');
    }
  }, [status, router]);

  // Load user's portfolio on mount
  useEffect(() => {
    if (session?.user) {
      loadPortfolio();
    }
  }, [session]);

  const loadPortfolio = async () => {
    try {
      const response = await axios.get('/api/portfolio');
      if (response.data && Object.keys(response.data).length > 0) {
        portfolio.loadFromDB(response.data);
      }
    } catch (error) {
      console.error('Error loading portfolio:', error);
    }
  };

  const handleSave = async () => {
    setIsSaving(true);
    setSaveMessage('');

    try {
      const username = session?.user?.email?.split('@')[0] || 'portfolio';
      
      await axios.post('/api/portfolio', {
        ...portfolio,
        username: username.toLowerCase(),
      });

      setSaveMessage('Portfolio saved successfully!');
      setTimeout(() => setSaveMessage(''), 3000);
    } catch (error: any) {
      setSaveMessage(error.response?.data?.error || 'Failed to save portfolio');
    } finally {
      setIsSaving(false);
    }
  };

  if (status === 'loading') {
    return <div className="flex items-center justify-center min-h-screen bg-gradient-to-b from-slate-950 via-purple-950 to-slate-950 text-white">Loading...</div>;
  }

  if (!session) {
    return null;
  }

  return (
    <div className="relative min-h-screen bg-gradient-to-b from-slate-950 via-purple-950 to-slate-950 text-white flex flex-col overflow-hidden">
      {/* Gradient background layers */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl" />
        <div className="absolute top-20 right-1/3 w-80 h-80 bg-pink-500/15 rounded-full blur-3xl" />
        <div className="absolute bottom-1/2 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl" />
      </div>

      {/* Top Bar */}
      <div className="relative border-b border-white/10 bg-slate-950/40 backdrop-blur-md">
        <div className="max-w-7xl mx-auto flex items-center justify-between px-5 py-4 sm:px-8">
          <Link href="/" className="text-2xl font-bold tracking-wider font-gotu hover:text-purple-400 transition">
            SITREZHUTHU
          </Link>
          <div className="flex items-center gap-4">
            {saveMessage && (
              <p className={`text-sm font-medium ${saveMessage.includes('successfully') ? 'text-green-400' : 'text-red-400'}`}>
                {saveMessage}
              </p>
            )}
            <span className="text-sm text-white/70">Welcome, {session.user?.name}</span>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="relative flex-1 flex overflow-hidden">
        {/* Form Panel - Left */}
        <div className="w-full md:w-1/2 bg-white/5 backdrop-blur-sm border-r border-white/10 overflow-y-auto">
          <FormPanel onSave={handleSave} isSaving={isSaving} />
        </div>

        {/* Live Preview - Right */}
        <div className="hidden md:block w-1/2 bg-white/5 backdrop-blur-sm overflow-y-auto">
          <LivePreview />
        </div>
      </div>

      {/* Mobile Preview Button */}
      <div className="md:hidden fixed bottom-4 right-4">
        <button
          onClick={() => router.push('/preview')}
          className="px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg hover:shadow-lg hover:shadow-purple-500/50 transition"
        >
          View Preview
        </button>
      </div>
    </div>
  );
}
