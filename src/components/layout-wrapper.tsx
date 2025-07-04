'use client';

import { usePathname } from 'next/navigation';
import { SiteHeader } from './site-header';
import { SiteFooter } from './site-footer';

interface LayoutWrapperProps {
  children: React.ReactNode;
}

export function LayoutWrapper({ children }: LayoutWrapperProps) {
  const pathname = usePathname();
  
  // 不需要header/footer的页面路径
  const fullscreenPages = [
    '/card-editor',
    '/card/', // 分享页面
  ];
  
  // 检查是否是全屏页面
  const isFullscreenPage = fullscreenPages.some(page => 
    pathname === page || pathname.startsWith(page)
  );
  
  if (isFullscreenPage) {
    return <>{children}</>;
  }
  
  return (
    <div className="min-h-screen flex flex-col">
      <SiteHeader />
      <main className="flex-1">
        {children}
      </main>
      <SiteFooter />
    </div>
  );
} 