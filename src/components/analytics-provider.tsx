'use client'

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { initializeGA, trackPageView } from '@/lib/analytics';

interface AnalyticsProviderProps {
  children: React.ReactNode;
}

export function AnalyticsProvider({ children }: AnalyticsProviderProps) {
  const pathname = usePathname();

  useEffect(() => {
    // 初始化 Google Analytics
    initializeGA();
  }, []);

  useEffect(() => {
    // 路由变化时追踪页面访问
    if (pathname) {
      trackPageView(pathname);
    }
  }, [pathname]);

  return <>{children}</>;
} 