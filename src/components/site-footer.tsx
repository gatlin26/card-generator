import Link from 'next/link';
import { useI18n } from '@/lib/i18n';

export function SiteFooter() {
  const { language, t } = useI18n();

  const footerSections = [
    {
      title: language === 'en' ? 'Product' : '产品',
      links: [
        { name: language === 'en' ? 'Card Maker' : '卡片制作器', href: '/online-card-maker' },
        { name: language === 'en' ? 'AI Generator' : 'AI生成器', href: '/text-to-card-generator' },
        { name: language === 'en' ? 'Templates' : '模板', href: '/card-editor' },
        { name: language === 'en' ? 'Visualization' : '可视化', href: '/social-media-visualization' }
      ]
    },
    {
      title: language === 'en' ? 'Features' : '功能',
      links: [
        { name: language === 'en' ? 'AI Design' : 'AI设计', href: '/ai-card-design' },
        { name: language === 'en' ? 'Smart Templates' : '智能模板', href: '/card-editor' },
        { name: language === 'en' ? 'Background Editor' : '背景编辑', href: '/card-editor' },
        { name: language === 'en' ? 'Social Sharing' : '社交分享', href: '/card-editor' }
      ]
    },
    {
      title: language === 'en' ? 'Company' : '公司',
      links: [
        { name: language === 'en' ? 'About' : '关于我们', href: '/' },
        { name: language === 'en' ? 'Contact' : '联系我们', href: '/' },
        { name: language === 'en' ? 'Support' : '支持', href: '/' },
        { name: language === 'en' ? 'Feedback' : '反馈', href: '/' }
      ]
    },
    {
      title: language === 'en' ? 'Resources' : '资源',
      links: [
        { name: language === 'en' ? 'Help Center' : '帮助中心', href: '/' },
        { name: language === 'en' ? 'API Documentation' : 'API文档', href: '/' },
        { name: language === 'en' ? 'Privacy Policy' : '隐私政策', href: '/' },
        { name: language === 'en' ? 'Terms of Service' : '服务条款', href: '/' }
      ]
    }
  ];

  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Logo and Description */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">CC</span>
              </div>
              <span className="text-xl font-semibold">CardCraft</span>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed">
              {language === 'en' 
                ? 'Create stunning visual cards with our AI-powered design tools. Transform your ideas into beautiful cards for social media, business, and personal use.'
                : '使用我们的AI驱动设计工具创建令人惊艳的视觉卡片。将您的想法转化为适用于社交媒体、商务和个人用途的美丽卡片。'
              }
            </p>
          </div>

          {/* Footer Links */}
          {footerSections.map((section, index) => (
            <div key={index}>
              <h3 className="font-semibold text-lg mb-4">{section.title}</h3>
              <ul className="space-y-3">
                {section.links.map((link, linkIndex) => (
                  <li key={linkIndex}>
                    <Link href={link.href}>
                      <span className="text-gray-400 hover:text-white transition-colors cursor-pointer text-sm">
                        {link.name}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-800 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-gray-400 text-sm">
              © 2025 CardCraft. {language === 'en' ? 'All rights reserved.' : '保留所有权利。'}
            </div>
            <div className="flex items-center gap-6">
              <Link href="/">
                <span className="text-gray-400 hover:text-white transition-colors cursor-pointer text-sm">
                  {language === 'en' ? 'Privacy Policy' : '隐私政策'}
                </span>
              </Link>
              <Link href="/">
                <span className="text-gray-400 hover:text-white transition-colors cursor-pointer text-sm">
                  {language === 'en' ? 'Terms of Service' : '服务条款'}
                </span>
              </Link>
              <Link href="/">
                <span className="text-gray-400 hover:text-white transition-colors cursor-pointer text-sm">
                  {language === 'en' ? 'Cookie Policy' : 'Cookie政策'}
                </span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
} 