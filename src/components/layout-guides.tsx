import { memo } from 'react';
import type { LayoutGuide } from '@/lib/layout-assistant';

interface LayoutGuidesProps {
  guides: LayoutGuide[];
  zoom: number;
  className?: string;
}

export const LayoutGuides = memo(({ guides = [], zoom, className = "" }: LayoutGuidesProps) => {
  if (!guides?.length) return null;

  return (
    <div 
      className={`absolute inset-0 pointer-events-none z-10 ${className}`}
      style={{ transform: `scale(${zoom})`, transformOrigin: 'top left' }}
    >
      <svg 
        width="100%" 
        height="100%" 
        className="absolute inset-0"
        style={{ overflow: 'visible' }}
      >
        {guides.map((guide, index) => (
          <line
            key={index}
            x1={guide.x1}
            y1={guide.y1}
            x2={guide.x2}
            y2={guide.y2}
            stroke={guide.color}
            strokeWidth={guide.width / zoom}
            strokeDasharray={guide.type === 'grid' ? `${4 / zoom},${4 / zoom}` : undefined}
            opacity={guide.type === 'grid' ? 0.3 : 0.8}
          />
        ))}
      </svg>
    </div>
  );
});

LayoutGuides.displayName = 'LayoutGuides'; 