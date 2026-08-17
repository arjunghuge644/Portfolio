'use client';

import { useEffect } from 'react';
import { recordPublicVisit } from '../lib/api';

export default function VisitorTracker() {
  useEffect(() => {
    // Record visit once per session to avoid counting re-renders
    const hasVisited = sessionStorage.getItem('portfolio_visited_session');
    if (!hasVisited) {
      recordPublicVisit().then(() => {
        sessionStorage.setItem('portfolio_visited_session', 'true');
      });
    }
  }, []);

  return null;
}
