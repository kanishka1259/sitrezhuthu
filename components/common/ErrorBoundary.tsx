'use client';

import React, { Component, ErrorInfo, ReactNode } from 'react';
import { AlertTriangle, RefreshCcw, Home } from 'lucide-react';
import Link from 'next/link';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error:', error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      if (this.props.fallback) return this.props.fallback;

      return (
        <div style={{
          minHeight: '400px',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '2rem',
          textAlign: 'center',
          background: 'rgba(251, 113, 113, 0.03)',
          border: '1px solid rgba(251, 113, 113, 0.1)',
          borderRadius: '24px',
          margin: '2rem 0'
        }}>
          <div style={{
            width: '64px',
            height: '64px',
            borderRadius: '50%',
            background: 'rgba(251, 113, 113, 0.1)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: '1.5rem'
          }}>
            <AlertTriangle size={32} style={{ color: '#f87171' }} />
          </div>
          <h2 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '0.5rem', color: '#fff' }}>
            Something went wrong
          </h2>
          <p style={{ color: '#A0BCAE', maxWidth: '400px', marginBottom: '2rem', fontSize: '0.9rem', lineHeight: 1.6 }}>
            {this.state.error?.message || 'An unexpected error occurred while rendering this component.'}
          </p>
          <div style={{ display: 'flex', gap: '1rem' }}>
            <button
              onClick={() => this.setState({ hasError: false, error: null })}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                padding: '0.75rem 1.5rem',
                background: '#3DAA7A',
                color: '#050A07',
                border: 'none',
                borderRadius: '12px',
                fontWeight: 600,
                cursor: 'pointer'
              }}
            >
              <RefreshCcw size={16} /> Try Again
            </button>
            <Link href="/" style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                padding: '0.75rem 1.5rem',
                background: 'rgba(255,255,255,0.05)',
                color: '#fff',
                border: '1px solid rgba(255,255,255,0.1)',
                borderRadius: '12px',
                fontWeight: 600,
                textDecoration: 'none'
            }}>
              <Home size={16} /> Go Home
            </Link>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
