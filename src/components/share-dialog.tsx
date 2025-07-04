import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import {
  Share2,
  Twitter,
  Facebook,
  Linkedin,
  MessageCircle,
  Copy,
  Download,
  Smartphone
} from 'lucide-react';
import {
  generateCardImage,
  downloadImage,
  shareToTwitter,
  shareToFacebook,
  shareToLinkedIn,
  shareToWeibo,
  shareToWechat,
  shareViaWebShare,
  getDeviceInfo,
  copyToClipboard,
  type ShareOptions
} from '@/lib/card-generator';
import { useI18n } from '@/lib/i18n';

// 工具函数：将 data URL 转换为 File 对象
function dataURLtoFile(dataurl: string, filename: string): File {
  const arr = dataurl.split(',');
  const mime = arr[0].match(/:(.*?);/)?.[1] || 'image/png';
  const bstr = atob(arr[1]);
  let n = bstr.length;
  const u8arr = new Uint8Array(n);
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }
  return new File([u8arr], filename, { type: mime });
}

interface ShareDialogProps {
  cardRef: React.RefObject<HTMLElement>;
  children?: React.ReactNode;
}

export function ShareDialog({ cardRef, children }: ShareDialogProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [shareTitle, setShareTitle] = useState('使用 CardCraft 制作的精美卡片');
  const [shareDescription, setShareDescription] = useState('快速制作专业的视觉卡片，用于社交媒体和内容创作');
  const [hashtags, setHashtags] = useState('#CardCraft #设计 #创意');
  const { toast } = useToast();
  const { language, t } = useI18n();
  const deviceInfo = getDeviceInfo();

  const handleGenerateAndShare = async (platform: string) => {
    if (!cardRef.current) {
      toast({
        title: t('shareError'),
        description: language === 'en' ? 'Card not found' : '找不到卡片内容',
        variant: 'destructive'
      });
      return;
    }

    setIsGenerating(true);

    try {
      // 1. 生成图片
      console.log('Starting image generation for element:', cardRef.current);
      const imageDataUrl = await generateCardImage(cardRef.current);
      console.log('Image generated successfully, data URL length:', imageDataUrl.length);
      
      // 2. 如果是移动设备，尝试使用系统分享
      const deviceInfo = getDeviceInfo();
      if (deviceInfo.isMobile && navigator.share && platform !== 'wechat') {
        try {
          const file = await dataURLtoFile(imageDataUrl, 'card.png');
          await navigator.share({
            files: [file],
            title: shareTitle,
            text: shareDescription
          });
          return;
        } catch (error) {
          console.log('Native share failed, falling back to normal share:', error);
        }
      }
      
      // 3. 常规分享选项
      const shareOptions: ShareOptions = {
        title: shareTitle,
        description: shareDescription,
        hashtags: hashtags.split(' ').filter(h => h.trim()),
        imageUrl: imageDataUrl
      };

      switch (platform) {
        case 'twitter':
          shareToTwitter(shareOptions);
          break;
        case 'facebook':
          shareToFacebook(shareOptions);
          break;
        case 'linkedin':
          shareToLinkedIn(shareOptions);
          break;
        case 'weibo':
          shareToWeibo(shareOptions);
          break;
        case 'wechat':
          await shareToWechat(imageDataUrl, shareOptions);
          toast({
            title: t('copiedToClipboard'),
            description: t('shareContentCopied')
          });
          break;
        case 'native':
          await shareViaWebShare(imageDataUrl, shareOptions);
          break;
        case 'download':
          downloadImage(imageDataUrl, `cardcraft-${Date.now()}.png`);
          break;
        case 'copy-link':
          await copyToClipboard(typeof window !== 'undefined' ? window.location.href : '');
          toast({
            title: t('linkCopied'),
            description: t('pageLinkCopied')
          });
          break;
      }

      toast({
        title: t('shareSuccess'),
        description: t('readyToShare')
      });
    } catch (error) {
      console.error('Share error:', error);
      toast({
        title: t('shareError'),
        description: t('failedToGenerate'),
        variant: 'destructive'
      });
    } finally {
      setIsGenerating(false);
    }
  };

  const shareButtons = [
    {
      platform: 'twitter',
      icon: <Twitter className="w-5 h-5" />,
      label: 'Twitter',
      color: 'bg-blue-500 hover:bg-blue-600',
      show: true
    },
    {
      platform: 'facebook',
      icon: <Facebook className="w-5 h-5" />,
      label: 'Facebook',
      color: 'bg-blue-600 hover:bg-blue-700',
      show: true
    },
    {
      platform: 'linkedin',
      icon: <Linkedin className="w-5 h-5" />,
      label: 'LinkedIn',
      color: 'bg-blue-700 hover:bg-blue-800',
      show: true
    },
    {
      platform: 'weibo',
      icon: <MessageCircle className="w-5 h-5" />,
      label: language === 'en' ? 'Weibo' : '微博',
      color: 'bg-red-500 hover:bg-red-600',
      show: language === 'zh'
    },
    {
      platform: 'wechat',
      icon: <MessageCircle className="w-5 h-5" />,
      label: language === 'en' ? 'WeChat' : '微信',
      color: 'bg-green-500 hover:bg-green-600',
      show: language === 'zh'
    }
  ];

  const utilityButtons = [
    {
      platform: 'download',
      icon: <Download className="w-5 h-5" />,
      label: t('downloadImage'),
      color: 'bg-gray-600 hover:bg-gray-700'
    },
    {
      platform: 'copy-link',
      icon: <Copy className="w-5 h-5" />,
      label: t('copyLink'),
      color: 'bg-gray-500 hover:bg-gray-600'
    }
  ];

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        {children || (
          <Button variant="outline" size="sm">
            <Share2 className="w-4 h-4 mr-2" />
            {language === 'en' ? 'Share' : '分享'}
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>
            {t('shareYourCard')}
          </DialogTitle>
          <DialogDescription>
            {t('shareContent')}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          {/* Share Content Customization */}
          <div className="space-y-3">
            <div>
              <Label htmlFor="share-title">
                {t('shareTitle')}
              </Label>
              <Input
                id="share-title"
                value={shareTitle}
                onChange={(e) => setShareTitle(e.target.value)}
                placeholder={language === 'en' ? 'Share title...' : '分享标题...'}
              />
            </div>
            <div>
              <Label htmlFor="share-description">
                {t('shareDescription')}
              </Label>
              <Textarea
                id="share-description"
                value={shareDescription}
                onChange={(e) => setShareDescription(e.target.value)}
                placeholder={language === 'en' ? 'Share description...' : '分享描述...'}
                rows={2}
              />
            </div>
            <div>
              <Label htmlFor="hashtags">
                {t('hashtags')}
              </Label>
              <Input
                id="hashtags"
                value={hashtags}
                onChange={(e) => setHashtags(e.target.value)}
                placeholder="#CardCraft #design #creative"
              />
            </div>
          </div>

          {/* Social Media Share Buttons */}
          <div className="space-y-3">
            <h4 className="text-sm font-medium">
              {t('shareToSocialMedia')}
            </h4>
            <div className="grid grid-cols-2 gap-2">
              {shareButtons.filter(btn => btn.show).map((button) => (
                <Button
                  key={button.platform}
                  onClick={() => handleGenerateAndShare(button.platform)}
                  disabled={isGenerating}
                  className={`${button.color} text-white`}
                  size="sm"
                >
                  {button.icon}
                  <span className="ml-2">{button.label}</span>
                </Button>
              ))}
            </div>
          </div>

          {/* Utility Buttons */}
          <div className="space-y-3">
            <h4 className="text-sm font-medium">
              {t('otherOptions')}
            </h4>
            <div className="grid grid-cols-2 gap-2">
              {utilityButtons.map((button) => (
                <Button
                  key={button.platform}
                  onClick={() => handleGenerateAndShare(button.platform)}
                  disabled={isGenerating}
                  className={`${button.color} text-white`}
                  size="sm"
                >
                  {button.icon}
                  <span className="ml-2">{button.label}</span>
                </Button>
              ))}
            </div>
          </div>

          {isGenerating && (
            <div className="text-center text-sm text-gray-500">
              {t('generatingImage')}
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
} 