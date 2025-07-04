'use client';

import { useState, useRef, useEffect, Suspense } from 'react';
import { useParams } from 'next/navigation';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import { Button } from '@/components/ui/button';
import { TemplateSidebar } from '@/components/template-sidebar';
import { MainCanvas } from '@/components/main-canvas';
import { PropertiesPanel } from '@/components/properties-panel';
import { BackgroundPanel } from '@/components/background-panel';
import { RightSidebar } from '@/components/right-sidebar';
import { useCardEditor } from '@/hooks/use-card-editor';
import { generateCardImage, downloadImage, generateShareUrl, copyToClipboard } from '@/lib/card-generator';
import { useToast } from '@/hooks/use-toast';
import { templates } from '@/lib/templates';
import { ArrowLeft, Download, Share2, Globe } from 'lucide-react';
import { useI18n } from '@/lib/i18n';

function CardEditorContent() {
  const params = useParams();
  const shareId = params?.shareId;
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();
  const { toast } = useToast();
  const { language, setLanguage, t } = useI18n();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [cardTitle, setCardTitle] = useState('Untitled Card');
  const [currentCardId, setCurrentCardId] = useState<number | undefined>();
  const cardRef = useRef<HTMLDivElement>(null);

  // Parse URL parameters for template/platform/category selection
  const templateParam = searchParams?.get('template');
  const platformParam = searchParams?.get('platform');
  const categoryParam = searchParams?.get('category');

  // Load card if shareId is provided
  const { data: sharedCard } = useQuery({
    queryKey: [`/api/cards/share/${shareId}`],
    queryFn: async () => {
      const response = await fetch(`/api/cards/share/${shareId}`);
      if (!response.ok) {
        throw new Error('Failed to fetch card');
      }
      return response.json();
    },
    enabled: !!shareId,
  });

  // Determine initial template based on URL parameters or shared card
  const getInitialTemplate = () => {
    if (sharedCard) return (sharedCard as any).content;
    
    if (templateParam) {
      const template = templates.find(t => t.id === templateParam);
      if (template) return template.content;
    }
    
    if (categoryParam) {
      const template = templates.find(t => t.category === categoryParam);
      if (template) return template.content;
    }
    
    if (platformParam) {
      const template = templates.find(t => 
        t.name.toLowerCase().includes(platformParam.toLowerCase()) ||
        t.category === "Social Media Cards"
      );
      if (template) return template.content;
    }
    
    return templates[0].content;
  };

  const initialContent = getInitialTemplate();
  const editor = useCardEditor(initialContent);

  useEffect(() => {
    if (sharedCard && (sharedCard as any).content) {
      editor.setCardContent(() => (sharedCard as any).content);
      setCardTitle((sharedCard as any).title || 'Untitled Card');
      setCurrentCardId((sharedCard as any).id);
    }
  }, [sharedCard]);

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.ctrlKey || e.metaKey) {
        switch (e.key) {
          case 'z':
            e.preventDefault();
            if (e.shiftKey) {
              editor.redo();
            } else {
              editor.undo();
            }
            break;
          case 'y':
            e.preventDefault();
            editor.redo();
            break;
        }
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [editor]);

  const handleDownloadCard = async () => {
    if (!cardRef.current) return;

    try {
      const dataUrl = await generateCardImage(cardRef.current);
      downloadImage(dataUrl, `${cardTitle.replace(/\s+/g, '-').toLowerCase()}.png`);
      
      toast({
        title: "Card downloaded",
        description: "Your card has been saved as a PNG image.",
      });
    } catch (error) {
      toast({
        title: "Download failed",
        description: "Failed to generate card image. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleShareCard = async () => {
    try {
      // First save the card
      const savedCard = await new Promise<any>((resolve) => {
        editor.saveCard(
          {
            id: currentCardId,
            title: cardTitle,
            templateId: 'custom',
          },
          {
            onSuccess: (data) => resolve(data),
          }
        );
      });

      const shareUrl = generateShareUrl(savedCard.shareId);
      await copyToClipboard(shareUrl);
      
      toast({
        title: "Share link copied",
        description: "The link to your card has been copied to clipboard.",
      });
    } catch (error) {
      toast({
        title: "Share failed",
        description: "Failed to generate share link. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handlePreview = () => {
    // Toggle mobile preview or open in new window
    toast({
      title: "Preview mode",
      description: "Preview functionality coming soon.",
    });
  };

  return (
    <div className="h-screen flex flex-col bg-slate-50">
      {/* Editor Toolbar */}
      <div className="flex items-center justify-between p-4 border-b bg-white dark:bg-gray-900">
        {/* Left side - Back button and logo */}
        <div className="flex items-center gap-3">
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={() => router.push('/')}
            className="flex items-center gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
{language === 'en' ? 'Back to Home' : '返回首页'}
          </Button>
          <div className="h-6 w-px bg-gray-200 dark:bg-gray-700"></div>
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-blue-600 rounded-md flex items-center justify-center">
              <span className="text-white font-bold text-xs">CC</span>
            </div>
            <span className="text-lg font-semibold text-gray-900 dark:text-white">
              CardCraft
            </span>
          </div>
        </div>

        {/* Right side - Actions and menu */}
        <div className="flex items-center gap-2">
          {/* Actions area - keeping empty for now */}
        </div>
      </div>

      {/* Main Layout */}
      <div className="flex h-full overflow-hidden">
        {/* Templates Sidebar */}
        <TemplateSidebar
          onSelectTemplate={(content) => {
            editor.setCardContent(() => content);
            setIsSidebarOpen(false);
          }}
          className={`${isSidebarOpen ? 'block' : 'hidden'} lg:block`}
        />

        {/* Main Canvas */}
        <MainCanvas
          editor={editor}
          onToggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
        />

        {/* Properties Panel */}
        <PropertiesPanel
          editor={editor}
          className="hidden xl:block"
        />

        {/* Right Sidebar with Tools */}
        <RightSidebar
          onAddText={() => editor.addElement({
            type: 'text',
            content: 'Click to edit text',
            style: {
              position: { x: 50, y: 50 },
              size: { width: 200, height: 40 },
              fontSize: 16,
              fontFamily: 'Inter',
              color: '#000000',
              fontWeight: 'normal',
              textAlign: 'left'
            }
          })}
          onAddImage={() => {
            const input = document.createElement('input');
            input.type = 'file';
            input.accept = 'image/*';
            input.onchange = (e) => {
              const file = (e.target as HTMLInputElement).files?.[0];
              if (file) {
                const reader = new FileReader();
                reader.onload = (e) => {
                  editor.addElement({
                    type: 'image',
                    content: e.target?.result as string,
                    style: {
                      position: { x: 50, y: 50 },
                      size: { width: 150, height: 150 }
                    }
                  });
                };
                reader.readAsDataURL(file);
              }
            };
            input.click();
          }}
          className="hidden lg:flex"
        />
      </div>

      {/* Mobile Bottom Toolbar */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-900 border-t p-2 z-50">
        <RightSidebar
          onAddText={() => editor.addElement({
            type: 'text',
            content: 'Click to edit text',
            style: {
              position: { x: 50, y: 50 },
              size: { width: 200, height: 40 },
              fontSize: 16,
              fontFamily: 'Inter',
              color: '#000000',
              fontWeight: 'normal',
              textAlign: 'left'
            }
          })}
          onAddImage={() => {
            const input = document.createElement('input');
            input.type = 'file';
            input.accept = 'image/*';
            input.onchange = (e) => {
              const file = (e.target as HTMLInputElement).files?.[0];
              if (file) {
                const reader = new FileReader();
                reader.onload = (e) => {
                  editor.addElement({
                    type: 'image',
                    content: e.target?.result as string,
                    style: {
                      position: { x: 50, y: 50 },
                      size: { width: 150, height: 150 }
                    }
                  });
                };
                reader.readAsDataURL(file);
              }
            };
            input.click();
          }}
        />
      </div>

      {/* Hidden card reference for image generation */}
      <div className="fixed -top-[9999px] -left-[9999px]">
        <div ref={cardRef}>
          <div
            className="bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden"
            style={{
              width: editor.cardContent.dimensions.width,
              height: editor.cardContent.dimensions.height,
            }}
          >
            <div
              className="h-full w-full relative"
              style={{
                background: editor.cardContent.background?.type === 'gradient'
                  ? editor.cardContent.background.value
                  : editor.cardContent.background?.type === 'solid'
                  ? editor.cardContent.background.value
                  : editor.cardContent.background?.value
                  ? `url(${editor.cardContent.background.value})`
                  : '#ffffff'
              }}
            >
              {editor.cardContent.elements.map((element) => (
                <div
                  key={element.id}
                  style={{
                    position: 'absolute',
                    left: element.style.position?.x || 0,
                    top: element.style.position?.y || 0,
                    width: element.style.size?.width || 'auto',
                    height: element.style.size?.height || 'auto',
                    fontSize: element.style.fontSize || 16,
                    fontWeight: element.style.fontWeight || '400',
                    fontFamily: element.style.fontFamily || 'Inter',
                    color: element.style.color || '#000000',
                    textAlign: element.style.textAlign as any || 'left',
                    lineHeight: 1.5,
                    wordBreak: 'break-word',
                    whiteSpace: 'pre-wrap',
                  }}
                >
                  {element.type === 'text' ? (
                    element.content
                  ) : (
                    <img
                      src={element.content}
                      alt="Card element"
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        borderRadius: '0.5rem',
                      }}
                    />
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function CardEditor() {
  return (
    <Suspense fallback={<div className="h-screen flex items-center justify-center">Loading...</div>}>
      <CardEditorContent />
    </Suspense>
  );
} 