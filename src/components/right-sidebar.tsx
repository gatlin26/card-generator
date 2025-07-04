 import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { 
  Type, 
  Image, 
  Square, 
  Circle, 
  Palette, 
  AlignLeft, 
  AlignCenter, 
  AlignRight,
  Bold,
  Italic,
  Underline,
  Grid,
  Move,
  RotateCw,
  Copy,
  Trash2
} from 'lucide-react';
import { useI18n } from '@/lib/i18n';
import { useIsMobile } from '@/hooks/use-mobile';

interface RightSidebarProps {
  onAddText: () => void;
  onAddImage: () => void;
  className?: string;
}

export function RightSidebar({ onAddText, onAddImage, className = "" }: RightSidebarProps) {
  const { t } = useI18n();
  const isMobile = useIsMobile();

  const tools = [
    { icon: Type, label: '文字', action: onAddText },
    { icon: Image, label: '图片', action: onAddImage },
    { icon: Square, label: '矩形', action: () => {} },
    { icon: Circle, label: '圆形', action: () => {} },
    { icon: Palette, label: '颜色', action: () => {} },
    { icon: AlignLeft, label: '左对齐', action: () => {} },
    { icon: AlignCenter, label: '居中', action: () => {} },
    { icon: AlignRight, label: '右对齐', action: () => {} },
    { icon: Bold, label: '粗体', action: () => {} },
    { icon: Italic, label: '斜体', action: () => {} },
    { icon: Grid, label: '网格', action: () => {} },
    { icon: Move, label: '移动', action: () => {} },
    { icon: Copy, label: '复制', action: () => {} },
    { icon: Trash2, label: '删除', action: () => {} },
  ];

  if (isMobile) {
    // 移动端简化版本
    const mobileTools = tools.slice(0, 6); // 只显示前6个工具
    return (
      <div className={`bg-white dark:bg-gray-900 border-l p-2 ${className}`}>
        <div className="grid grid-cols-2 gap-2">
          {mobileTools.map((tool, index) => (
            <Button
              key={index}
              variant="ghost"
              size="sm"
              onClick={tool.action}
              className="flex flex-col items-center gap-1 h-16 text-xs"
            >
              <tool.icon className="w-4 h-4" />
              <span>{tool.label}</span>
            </Button>
          ))}
        </div>
      </div>
    );
  }

  // 桌面端完整版本
  return (
    <div className={`w-16 bg-white dark:bg-gray-900 border-l flex flex-col ${className}`}>
      <div className="flex flex-col gap-1 p-2">
        {tools.map((tool, index) => (
          <div key={index}>
            <Button
              variant="ghost"
              size="sm"
              onClick={tool.action}
              className="w-full h-12 flex flex-col items-center gap-1 text-xs hover:bg-gray-100 dark:hover:bg-gray-800"
              title={tool.label}
            >
              <tool.icon className="w-5 h-5" />
            </Button>
            {(index === 1 || index === 4 || index === 7 || index === 10) && (
              <Separator className="my-1" />
            )}
          </div>
        ))}
      </div>
    </div>
  );
} 