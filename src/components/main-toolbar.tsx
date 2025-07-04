import { Button } from '@/components/ui/button';
import { User, Globe, ChevronDown } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useI18n } from '@/lib/i18n';

interface MainToolbarProps {
  className?: string;
}

export function MainToolbar({ className = "" }: MainToolbarProps) {
  const { language, setLanguage, t } = useI18n();

  return (
    <div className={`flex items-center justify-between p-4 border-b bg-white dark:bg-gray-900 ${className}`}>
      {/* Left side - Logo and title */}
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
          <span className="text-white font-bold text-sm">CC</span>
        </div>
        <h1 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
          CardCraft
        </h1>
      </div>

      {/* Right side - Menu items */}
      <div className="flex items-center gap-2">
        {/* Language selector */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="sm" className="flex items-center gap-2">
              <Globe className="w-4 h-4" />
              <span className="uppercase">{language}</span>
              <ChevronDown className="w-3 h-3" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => setLanguage('en')}>
              <span className="w-5">🇺🇸</span>
              English
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setLanguage('zh')}>
              <span className="w-5">🇨🇳</span>
              中文
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        {/* User menu */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="sm" className="flex items-center gap-2">
              <User className="w-4 h-4" />
              <ChevronDown className="w-3 h-3" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem>
              <User className="w-4 h-4 mr-2" />
              个人资料
            </DropdownMenuItem>
            <DropdownMenuItem>
              设置
            </DropdownMenuItem>
            <DropdownMenuItem>
              登出
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
} 