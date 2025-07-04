import { Button } from '@/components/ui/button';
import { Plus, Type, Image } from 'lucide-react';
import { useI18n } from '@/lib/i18n';

interface EditorToolbarProps {
  onAddText: () => void;
  onAddImage: () => void;
  className?: string;
}

export function EditorToolbar({ onAddText, onAddImage, className = "" }: EditorToolbarProps) {
  const { t } = useI18n();

  return (
    <div className={`flex items-center gap-2 p-4 border-b bg-white dark:bg-gray-900 ${className}`}>
      <div className="flex items-center gap-2">
        <Button 
          onClick={onAddText}
          variant="outline" 
          size="sm"
          className="flex items-center gap-2"
        >
          <Type className="w-4 h-4" />
          添加文字
        </Button>
        
        <Button 
          onClick={onAddImage}
          variant="outline" 
          size="sm"
          className="flex items-center gap-2"
        >
          <Image className="w-4 h-4" />
          添加图片
        </Button>
      </div>
    </div>
  );
} 