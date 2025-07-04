import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Palette, Image, Upload } from 'lucide-react';
import { CardContent } from '@/shared/schema';

interface BackgroundPanelProps {
  content: CardContent;
  onUpdateBackground: (background: CardContent['background']) => void;
  onUploadImage: (file: File) => Promise<{ url: string }>;
  className?: string;
}

const solidColors = [
  '#ffffff', '#f8f9fa', '#e9ecef', '#dee2e6',
  '#000000', '#212529', '#343a40', '#495057',
  '#007bff', '#0056b3', '#004085', '#002752',
  '#28a745', '#1e7e34', '#155724', '#0d4b1a',
  '#dc3545', '#c82333', '#bd2130', '#a71e2a',
  '#ffc107', '#e0a800', '#d39e00', '#b8860b',
  '#6f42c1', '#5a2d91', '#4c1864', '#3a0e4e',
  '#fd7e14', '#e8600e', '#d14e00', '#b8430d'
];

const gradients = [
  'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
  'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
  'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
  'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
  'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
  'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)',
  'linear-gradient(135deg, #ff9a9e 0%, #fecfef 100%)',
  'linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)'
];

export function BackgroundPanel({ content, onUpdateBackground, onUploadImage, className = "" }: BackgroundPanelProps) {
  const [customColor, setCustomColor] = useState('#ffffff');

  const handleSolidColor = (color: string) => {
    onUpdateBackground({
      type: 'solid',
      value: color,
      color: color
    });
  };

  const handleGradient = (gradient: string) => {
    onUpdateBackground({
      type: 'gradient',
      value: gradient,
      gradient: gradient
    });
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      try {
        const result = await onUploadImage(file);
        onUpdateBackground({
          type: 'image',
          value: result.url,
          url: result.url
        });
      } catch (error) {
        console.error('Error uploading background image:', error);
      }
    }
  };

  return (
    <div className={`p-4 space-y-4 ${className}`}>
      <div className="flex items-center gap-2 mb-4">
        <Palette className="w-4 h-4" />
        <h3 className="font-medium">背景设置</h3>
      </div>

      <Tabs defaultValue="solid" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="solid">纯色</TabsTrigger>
          <TabsTrigger value="gradient">渐变</TabsTrigger>
          <TabsTrigger value="image">图片</TabsTrigger>
        </TabsList>

        <TabsContent value="solid" className="space-y-4">
          {/* Custom color picker */}
          <div className="space-y-2">
            <Label htmlFor="custom-color">自定义颜色</Label>
            <div className="flex gap-2">
              <Input
                id="custom-color"
                type="color"
                value={customColor}
                onChange={(e) => setCustomColor(e.target.value)}
                className="w-16 h-10 p-1 rounded"
              />
              <Button 
                variant="outline" 
                onClick={() => handleSolidColor(customColor)}
                className="flex-1"
              >
                应用
              </Button>
            </div>
          </div>

          {/* Preset solid colors */}
          <div className="space-y-2">
            <Label>预设颜色</Label>
            <div className="grid grid-cols-8 gap-2">
              {solidColors.map((color) => (
                <button
                  key={color}
                  className="w-8 h-8 rounded border-2 border-gray-200 hover:border-gray-400 transition-colors"
                  style={{ backgroundColor: color }}
                  onClick={() => handleSolidColor(color)}
                  title={color}
                />
              ))}
            </div>
          </div>
        </TabsContent>

        <TabsContent value="gradient" className="space-y-4">
          <div className="space-y-2">
            <Label>渐变背景</Label>
            <div className="grid grid-cols-2 gap-3">
              {gradients.map((gradient, index) => (
                <button
                  key={index}
                  className="h-16 rounded-lg border-2 border-gray-200 hover:border-gray-400 transition-colors"
                  style={{ background: gradient }}
                  onClick={() => handleGradient(gradient)}
                />
              ))}
            </div>
          </div>
        </TabsContent>

        <TabsContent value="image" className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="background-image">上传背景图片</Label>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
              <input
                id="background-image"
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
              />
              <Button 
                variant="outline" 
                onClick={() => document.getElementById('background-image')?.click()}
                className="flex items-center gap-2"
              >
                <Upload className="w-4 h-4" />
                选择图片
              </Button>
              <p className="text-sm text-gray-500 mt-2">
                支持 JPG、PNG、GIF 格式
              </p>
            </div>
          </div>

          {/* Current background preview */}
          {content.background?.type === 'image' && content.background.url && (
            <div className="space-y-2">
              <Label>当前背景</Label>
              <div className="relative">
                <img 
                  src={content.background.url} 
                  alt="Current background"
                  className="w-full h-24 object-cover rounded border"
                />
                <Button
                  variant="destructive"
                  size="sm"
                  className="absolute top-1 right-1"
                  onClick={() => handleSolidColor('#ffffff')}
                >
                  移除
                </Button>
              </div>
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
} 