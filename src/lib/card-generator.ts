import { toPng } from 'html-to-image';

export async function dataURLtoFile(dataUrl: string, filename: string): Promise<File> {
  const res = await fetch(dataUrl);
  const blob = await res.blob();
  return new File([blob], filename, { type: 'image/png' });
}

export async function generateCardImage(element: HTMLElement): Promise<string> {
  try {
    // 等待所有图片和资源加载完成
    await waitForImages(element);
    
    // 直接查找卡片内容区域，这是最内层的容器
    let cardContainer = element.querySelector('[data-card-content]') as HTMLElement;
    
    // 如果找不到内容容器，尝试找到卡片根元素
    if (!cardContainer) {
      // 查找具有固定尺寸的卡片容器
      const potentialCards = element.querySelectorAll('div');
      for (let i = 0; i < potentialCards.length; i++) {
        const div = potentialCards[i];
        const computedStyle = window.getComputedStyle(div);
        const width = parseInt(computedStyle.width);
        const height = parseInt(computedStyle.height);
        
        // 如果是标准卡片尺寸（400x500左右），则认为是卡片容器
        if (width >= 350 && width <= 450 && height >= 450 && height <= 550) {
          cardContainer = div as HTMLElement;
          break;
        }
      }
    }
    
    // 如果还是没找到，使用传入的元素
    if (!cardContainer) {
      cardContainer = element;
    }
    
    console.log('Capturing card element:', cardContainer, 'Size:', cardContainer.offsetWidth, 'x', cardContainer.offsetHeight);
    
    const dataUrl = await toPng(cardContainer, {
      quality: 1,
      pixelRatio: 2,
      backgroundColor: '#ffffff',
      width: cardContainer.offsetWidth,
      height: cardContainer.offsetHeight,
      style: {
        transform: 'scale(1)',
        transformOrigin: 'top left',
        margin: '0',
        padding: '0'
      },
      filter: (node) => {
        // 过滤掉编辑器相关的元素
        if (node instanceof HTMLElement) {
          const classNames = node.className || '';
          const tagName = node.tagName.toLowerCase();
          
          // 过滤掉编辑器界面元素
          if (classNames.includes('edit-indicator') || 
              classNames.includes('selected') ||
              classNames.includes('resize-handle') ||
              classNames.includes('selection-box') ||
              classNames.includes('card-canvas') ||
              classNames.includes('toolbar') ||
              classNames.includes('sidebar') ||
              tagName === 'button' ||
              node.getAttribute('role') === 'button') {
            return false;
          }
        }
        return true;
      }
    });
    return dataUrl;
  } catch (error) {
    console.error('Error generating card image:', error);
    
    // 如果第一次尝试失败，使用更简单的配置再试一次
    try {
      let cardContainer = element.querySelector('[data-card-content]') as HTMLElement || element;
      
      const dataUrl = await toPng(cardContainer, {
        quality: 0.8,
        pixelRatio: 1,
        backgroundColor: '#ffffff',
        skipFonts: true,
        cacheBust: true
      });
      return dataUrl;
    } catch (retryError) {
      console.error('Retry error:', retryError);
      throw new Error('Failed to generate card image after retry');
    }
  }
}

// 等待所有图片加载完成的辅助函数
function waitForImages(element: HTMLElement): Promise<void> {
  return new Promise((resolve) => {
    const images = element.querySelectorAll('img');
    if (images.length === 0) {
      resolve();
      return;
    }

    let loadedCount = 0;
    const totalImages = images.length;

    const checkAllLoaded = () => {
      loadedCount++;
      if (loadedCount === totalImages) {
        resolve();
      }
    };

    images.forEach((img) => {
      if (img.complete) {
        checkAllLoaded();
      } else {
        img.onload = checkAllLoaded;
        img.onerror = checkAllLoaded; // 即使出错也继续
      }
    });

    // 设置超时，防止无限等待
    setTimeout(() => {
      resolve();
    }, 3000);
  });
}

export function downloadImage(dataUrl: string, filename: string = 'card.png') {
  const link = document.createElement('a');
  link.download = filename;
  link.href = dataUrl;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

export function generateShareUrl(shareId: string): string {
  // 在服务端渲染时，window 不存在，使用默认值
  const baseUrl = typeof window !== 'undefined' ? window.location.origin : '';
  return `${baseUrl}/card/${shareId}`;
}

export async function copyToClipboard(text: string): Promise<void> {
  // 在服务端渲染时，navigator 不存在
  if (typeof navigator === 'undefined') {
    throw new Error('Clipboard API not available on server side');
  }

  try {
    await navigator.clipboard.writeText(text);
  } catch (error) {
    // Fallback for older browsers
    const textArea = document.createElement('textarea');
    textArea.value = text;
    document.body.appendChild(textArea);
    textArea.select();
    document.execCommand('copy');
    document.body.removeChild(textArea);
  }
}

// 社交媒体分享功能
export interface ShareOptions {
  title?: string;
  description?: string;
  hashtags?: string[];
  imageUrl?: string;
}

export function shareToTwitter(options: ShareOptions): void {
  if (typeof window === 'undefined') {
    throw new Error('Social sharing not available on server side');
  }

  const { title, hashtags = [], imageUrl } = options;
  const text = encodeURIComponent(title || '使用 CardCraft 制作的精美卡片');
  const hashtagsStr = hashtags.length > 0 ? encodeURIComponent(hashtags.join(' ')) : '';
  const url = encodeURIComponent(window.location.href);
  
  const twitterUrl = `https://twitter.com/intent/tweet?text=${text}&hashtags=${hashtagsStr}&url=${url}`;
  window.open(twitterUrl, '_blank', 'width=550,height=420');
}

export function shareToFacebook(options: ShareOptions): void {
  if (typeof window === 'undefined') {
    throw new Error('Social sharing not available on server side');
  }

  const { title, description } = options;
  const url = encodeURIComponent(window.location.href);
  const quote = encodeURIComponent(title || '使用 CardCraft 制作的精美卡片');
  
  const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${url}&quote=${quote}`;
  window.open(facebookUrl, '_blank', 'width=626,height=436');
}

export function shareToLinkedIn(options: ShareOptions): void {
  if (typeof window === 'undefined') {
    throw new Error('Social sharing not available on server side');
  }

  const { title, description } = options;
  const url = encodeURIComponent(window.location.href);
  const text = encodeURIComponent(title || '使用 CardCraft 制作的精美卡片');
  const summary = encodeURIComponent(description || '快速制作专业的视觉卡片，用于社交媒体和内容创作');
  
  const linkedinUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${url}&title=${text}&summary=${summary}`;
  window.open(linkedinUrl, '_blank', 'width=520,height=570');
}

export function shareToWeibo(options: ShareOptions): void {
  if (typeof window === 'undefined') {
    throw new Error('Social sharing not available on server side');
  }

  const { title, description } = options;
  const url = encodeURIComponent(window.location.href);
  const text = encodeURIComponent(title || '使用 CardCraft 制作的精美卡片');
  const content = encodeURIComponent(`${title || '使用 CardCraft 制作的精美卡片'} ${url}`);
  
  const weiboUrl = `https://service.weibo.com/share/share.php?url=${url}&title=${content}`;
  window.open(weiboUrl, '_blank', 'width=615,height=505');
}

export async function shareToWechat(imageDataUrl: string, options: ShareOptions): Promise<void> {
  if (typeof window === 'undefined') {
    throw new Error('Social sharing not available on server side');
  }

  // 微信分享需要特殊处理，通常通过二维码或复制链接的方式
  const shareData = {
    title: options.title || '使用 CardCraft 制作的精美卡片',
    text: options.description || '快速制作专业的视觉卡片，用于社交媒体和内容创作',
    url: window.location.href
  };
  
  // 复制分享内容到剪贴板
  const shareText = `${shareData.title}\n${shareData.text}\n${shareData.url}`;
  await copyToClipboard(shareText);
}

export function shareViaWebShare(imageDataUrl: string, options: ShareOptions): Promise<void> {
  return new Promise((resolve, reject) => {
    // 在服务端渲染时，navigator 不存在
    if (typeof navigator === 'undefined') {
      reject(new Error('Web Share API not available on server side'));
      return;
    }

    // 检查是否支持 Web Share API
    if (!navigator.share) {
      reject(new Error('Web Share API not supported'));
      return;
    }

    // 将 base64 转换为 File 对象
    fetch(imageDataUrl)
      .then(res => res.blob())
      .then(blob => {
        const file = new File([blob], 'card.png', { type: 'image/png' });
        
        return navigator.share({
          title: options.title || '使用 CardCraft 制作的精美卡片',
          text: options.description || '快速制作专业的视觉卡片',
          files: [file]
        });
      })
      .then(() => resolve())
      .catch(error => reject(error));
  });
}

// 检测用户设备和平台
export function getDeviceInfo() {
  // 在服务端渲染时，navigator 不存在，返回默认值
  if (typeof navigator === 'undefined') {
    return {
      isWeChat: false,
      isWeibo: false,
      isMobile: false,
      isIOS: false,
      isAndroid: false,
      supportsWebShare: false
    };
  }

  const userAgent = navigator.userAgent.toLowerCase();
  const isWeChat = /micromessenger/.test(userAgent);
  const isWeibo = /weibo/.test(userAgent);
  const isMobile = /android|iphone|ipad|ipod|blackberry|iemobile|opera mini/.test(userAgent);
  const isIOS = /iphone|ipad|ipod/.test(userAgent);
  const isAndroid = /android/.test(userAgent);
  
  return {
    isWeChat,
    isWeibo,
    isMobile,
    isIOS,
    isAndroid,
    supportsWebShare: !!navigator.share
  };
}
