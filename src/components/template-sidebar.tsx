import React, { useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { templates, templateCategories } from '@/lib/templates';
import { useState } from 'react';
import { CardContent } from '@/shared/schema';
import { useI18n } from '@/lib/i18n';
import { ScrollArea } from '@/components/ui/scroll-area';
import { 
  Globe, 
  Search, 
  Quote,
  BookOpen,
  UserCircle,
  GraduationCap,
  PieChart,
  Share2,
  ListChecks
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';

// 工具函数移到组件外部
const getCategoryName = (categoryId: string, language: 'zh' | 'en') => {
  if (language === 'zh') {
    return {
      'all': '全部模板',
      'Quote Cards': '名言引用',
      'List Cards': '列表卡片',
      'Profile Cards': '个人简介',
      'Tutorial Cards': '教程指南',
      'Stats Cards': '数据图表',
      'Knowledge Cards': '知识卡片',
      'Comparison Cards': '对比分析',
      'Question Cards': '问答卡片',
      'Social Media Cards': '社交媒体'
    }[categoryId] || categoryId;
  }
  return {
    'all': 'All Templates',
    'Quote Cards': 'Quote Cards',
    'List Cards': 'List Cards',
    'Profile Cards': 'Profile Cards',
    'Tutorial Cards': 'Tutorial Cards',
    'Stats Cards': 'Stats Cards',
    'Knowledge Cards': 'Knowledge Cards',
    'Comparison Cards': 'Comparison Cards',
    'Question Cards': 'Question Cards',
    'Social Media Cards': 'Social Media Cards'
  }[categoryId] || categoryId;
};

const getTemplateName = (templateId: string, language: 'zh' | 'en') => {
  if (language === 'zh') {
    return {
      'clean-quote': '简约引用',
      'modern-quote': '现代引用',
      'bullet-list': '要点列表',
      'profile-card': '个人名片',
      'daily-tip': '每日提示',
      'step-by-step': '步骤指南',
      'statistics': '数据统计',
      'knowledge-bookmark': '知识书签',
      'before-vs-after': '前后对比',
      'thought-provoker': '思维导图'
    }[templateId] || templateId;
  }
  return {
    'clean-quote': 'Clean Quote',
    'modern-quote': 'Modern Quote',
    'bullet-list': 'Bullet List',
    'profile-card': 'Profile Card',
    'daily-tip': 'Daily Tip',
    'step-by-step': 'Step by Step',
    'statistics': 'Statistics',
    'knowledge-bookmark': 'Knowledge Bookmark',
    'before-vs-after': 'Before vs After',
    'thought-provoker': 'Thought Provoker'
  }[templateId] || templateId;
};

// 定义分类
const CATEGORIES = {
  'Quote Cards': {
    icon: Quote,
    title: { zh: '名言引用', en: 'Quote Cards' }
  },
  'Knowledge Cards': {
    icon: BookOpen,
    title: { zh: '知识卡片', en: 'Knowledge Cards' }
  },
  'List Cards': {
    icon: ListChecks,
    title: { zh: '列表卡片', en: 'List Cards' }
  },
  'Profile Cards': {
    icon: UserCircle,
    title: { zh: '个人简介', en: 'Profile Cards' }
  },
  'Tutorial Cards': {
    icon: GraduationCap,
    title: { zh: '教程指南', en: 'Tutorial Cards' }
  },
  'Stats Cards': {
    icon: PieChart,
    title: { zh: '数据图表', en: 'Stats Cards' }
  },
  'Social Media Cards': {
    icon: Share2,
    title: { zh: '社交媒体', en: 'Social Media Cards' }
  }
};

interface TemplateSidebarProps {
  onSelectTemplate: (content: CardContent) => void;
  initialCategory?: string;
  className?: string;
}

// 添加预览渲染函数
const TemplatePreview = ({ template }: { template: typeof templates[0] }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    try {
      // 设置预览尺寸和缩放
      const PREVIEW_WIDTH = 160;
      const PREVIEW_HEIGHT = 200;
      const scaleX = PREVIEW_WIDTH / template.content.dimensions.width;
      const scaleY = PREVIEW_HEIGHT / template.content.dimensions.height;
      const scale = Math.min(scaleX, scaleY) * 0.9; // 留出一些边距
      
      canvas.width = PREVIEW_WIDTH;
      canvas.height = PREVIEW_HEIGHT;

      // 清空画布并设置白色背景
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // 计算居中位置
      const centerX = (canvas.width - template.content.dimensions.width * scale) / 2;
      const centerY = (canvas.height - template.content.dimensions.height * scale) / 2;

      // 绘制卡片背景
      ctx.save();
      ctx.translate(centerX, centerY);
      ctx.scale(scale, scale);

      // 绘制背景
      if (template.content.background.type === 'gradient') {
        const gradient = ctx.createLinearGradient(0, 0, template.content.dimensions.width, template.content.dimensions.height);
        gradient.addColorStop(0, template.content.background.gradientStart || '#ffffff');
        gradient.addColorStop(1, template.content.background.gradientEnd || '#ffffff');
        ctx.fillStyle = gradient;
      } else {
        ctx.fillStyle = template.content.background.value || '#ffffff';
      }
      
      // 绘制圆角矩形背景
      const radius = 8;
      ctx.beginPath();
      ctx.moveTo(radius, 0);
      ctx.lineTo(template.content.dimensions.width - radius, 0);
      ctx.quadraticCurveTo(template.content.dimensions.width, 0, template.content.dimensions.width, radius);
      ctx.lineTo(template.content.dimensions.width, template.content.dimensions.height - radius);
      ctx.quadraticCurveTo(template.content.dimensions.width, template.content.dimensions.height, template.content.dimensions.width - radius, template.content.dimensions.height);
      ctx.lineTo(radius, template.content.dimensions.height);
      ctx.quadraticCurveTo(0, template.content.dimensions.height, 0, template.content.dimensions.height - radius);
      ctx.lineTo(0, radius);
      ctx.quadraticCurveTo(0, 0, radius, 0);
      ctx.closePath();
      ctx.fill();

      // 添加阴影效果
      ctx.shadowColor = 'rgba(0, 0, 0, 0.1)';
      ctx.shadowBlur = 10;
      ctx.shadowOffsetX = 0;
      ctx.shadowOffsetY = 2;

      // 绘制元素
      template.content.elements.forEach((element: any) => {
        if (!element || !element.position) return;

        if (element.type === 'text' && element.position.x != null && element.position.y != null) {
          const fontSize = element.style?.fontSize || 16;
          const fontFamily = element.style?.fontFamily || 'Arial';
          const color = element.style?.color || '#000000';
          const content = element.content || '';

          ctx.font = `${fontSize}px ${fontFamily}`;
          ctx.fillStyle = color;
          ctx.textBaseline = 'top';
          ctx.fillText(content, element.position.x, element.position.y);
        }
      });

      ctx.restore();

    } catch (error) {
      console.error('Error rendering template preview:', error);
      // 渲染出错时显示基本背景
      ctx.fillStyle = '#f3f4f6';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      // 添加错误提示
      ctx.fillStyle = '#6b7280';
      ctx.font = '12px Arial';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText('Preview', canvas.width / 2, canvas.height / 2);
    }
  }, [template]);

  return (
    <div className="relative w-full aspect-[4/5] rounded-lg overflow-hidden bg-white shadow-sm">
      <canvas
        ref={canvasRef}
        className="w-full h-full object-contain"
      />
    </div>
  );
};

export function TemplateSidebar({ onSelectTemplate, initialCategory = "all", className = "" }: TemplateSidebarProps) {
  const { t, language, setLanguage } = useI18n();
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  // 根据搜索筛选分类和模板
  const getFilteredCategoriesAndTemplates = () => {
    if (searchQuery === '') {
      // 没有搜索时，返回所有分类和模板
      return Object.entries(CATEGORIES).map(([categoryKey, categoryData]) => ({
        categoryKey,
        categoryData,
        templates: templates.filter(template => template.category === categoryKey)
      })).filter(category => category.templates.length > 0);
    } else {
      // 有搜索时，只返回匹配的分类和模板
      return Object.entries(CATEGORIES).map(([categoryKey, categoryData]) => {
        const categoryMatches = getCategoryName(categoryKey, language).toLowerCase().includes(searchQuery.toLowerCase());
        const matchingTemplates = templates.filter(template => {
          const templateMatches = getTemplateName(template.id, language).toLowerCase().includes(searchQuery.toLowerCase());
          return template.category === categoryKey && (categoryMatches || templateMatches);
        });
        
        return {
          categoryKey,
          categoryData,
          templates: matchingTemplates
        };
      }).filter(category => category.templates.length > 0);
    }
  };

  const filteredCategoriesAndTemplates = getFilteredCategoriesAndTemplates();

  const handleTemplateSelect = (template: typeof templates[0]) => {
    setSelectedTemplate(template.id);
    onSelectTemplate(template.content);
  };

  return (
    <aside className={`w-[300px] bg-white border-r border-slate-200 flex flex-col ${className}`}>
      {/* 顶部标题栏 */}
      <div className="flex items-center justify-between px-4 h-14 border-b border-slate-200">
        <h2 className="text-base font-semibold text-slate-800">
          {language === 'zh' ? '模板库' : 'Template Library'}
        </h2>
        
        <div className="flex items-center gap-2">
          {/* 语言切换 */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                <Globe className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => setLanguage('zh')}>
                <span className={`${language === 'zh' ? 'font-medium text-blue-600' : ''}`}>
                  中文
                </span>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setLanguage('en')}>
                <span className={`${language === 'en' ? 'font-medium text-blue-600' : ''}`}>
                  English
                </span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {/* 搜索和快捷操作区 */}
      <div className="p-4 space-y-3">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
          <Input
            type="text"
            placeholder={language === 'zh' ? '搜索模板...' : 'Search templates...'}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9 bg-slate-50 border-slate-200"
          />
        </div>

        {/* Quick actions removed */}
      </div>

      <Separator className="my-2" />

      {/* 分类和模板列表 */}
      <ScrollArea className="flex-1">
        <div className="p-4">
          {/* 分类列表 - 全部展开 */}
          <div className="space-y-4">
            {filteredCategoriesAndTemplates.map(({ categoryKey, categoryData, templates: categoryTemplates }) => {
              const { icon: Icon, title } = categoryData;

              return (
                <div key={categoryKey}>
                  {/* 分类标题 */}
                  <div className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-slate-700">
                    <Icon className="w-4 h-4" />
                    <span>{title[language === 'zh' ? 'zh' : 'en']}</span>
                  </div>

                  {/* 模板列表 */}
                  <div className="pl-9 pr-3 grid grid-cols-2 gap-3">
                    {categoryTemplates.map(template => (
                      <Card
                        key={template.id}
                        className={`cursor-pointer transition-all hover:border-blue-300 ${
                          selectedTemplate === template.id ? 'ring-2 ring-blue-500' : ''
                        }`}
                        onClick={() => handleTemplateSelect(template)}
                      >
                        <div className="p-2 space-y-2">
                          <TemplatePreview template={template} />
                          <div className="text-center">
                            <p className="text-xs font-medium text-slate-700 truncate">
                              {getTemplateName(template.id, language)}
                            </p>
                          </div>
                        </div>
                      </Card>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>

          {/* 搜索无结果提示 */}
          {searchQuery && filteredCategoriesAndTemplates.length === 0 && (
            <div className="text-center py-8 text-slate-500">
              <p className="text-sm">
                {language === 'zh' ? '未找到匹配的模板' : 'No templates found'}
              </p>
              <p className="text-xs mt-1">
                {language === 'zh' ? '尝试使用不同的关键词搜索' : 'Try searching with different keywords'}
              </p>
            </div>
          )}
        </div>
      </ScrollArea>
    </aside>
  );
} 