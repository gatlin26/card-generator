'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Palette, 
  Wand2, 
  Share2, 
  Download,
  Zap,
  Users,
  Sparkles,
  ArrowRight,
  PlayCircle,
  Star,
  CheckCircle
} from 'lucide-react';
import Link from 'next/link';
import { useI18n } from '@/lib/i18n';
import { ShowcaseSection } from '@/components/showcase-section';
import { UserReviews } from '@/components/user-reviews';

export default function HomePage() {
  const { language, t } = useI18n();

  const features = [
    {
      icon: <Wand2 className="w-8 h-8" />,
      title: language === 'en' ? 'AI-Powered Design' : 'AI驱动设计',
      description: language === 'en' 
        ? 'Create stunning cards with our intelligent design suggestions and automated layouts.'
        : '使用我们的智能设计建议和自动布局创建令人惊艳的卡片。',
      color: 'bg-purple-100 text-purple-600 dark:bg-purple-900/30 dark:text-purple-400'
    },
    {
      icon: <Palette className="w-8 h-8" />,
      title: language === 'en' ? 'Rich Templates' : '丰富模板',
      description: language === 'en'
        ? 'Choose from hundreds of professionally designed templates for every occasion.'
        : '从数百个专业设计的模板中选择适合各种场合的模板。',
      color: 'bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400'
    },
    {
      icon: <Share2 className="w-8 h-8" />,
      title: language === 'en' ? 'Easy Sharing' : '轻松分享',
      description: language === 'en'
        ? 'Share your creations instantly across social media or download high-quality images.'
        : '即时在社交媒体上分享您的创作或下载高质量图片。',
      color: 'bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400'
    },
    {
      icon: <Zap className="w-8 h-8" />,
      title: language === 'en' ? 'Lightning Fast' : '闪电般快速',
      description: language === 'en'
        ? 'Intuitive drag-and-drop interface for rapid card creation and editing.'
        : '直观的拖放界面，快速创建和编辑卡片。',
      color: 'bg-yellow-100 text-yellow-600 dark:bg-yellow-900/30 dark:text-yellow-400'
    }
  ];

  const useCases = [
    {
      title: language === 'en' ? 'Social Media Posts' : '社交媒体帖子',
      description: language === 'en' ? 'Create eye-catching posts for Instagram, Twitter, and Facebook' : '为Instagram、Twitter和Facebook创建引人注目的帖子',
      image: '🎨'
    },
    {
      title: language === 'en' ? 'Business Cards' : '商务卡片',
      description: language === 'en' ? 'Design professional business cards and promotional materials' : '设计专业的名片和促销材料',
      image: '💼'
    },
    {
      title: language === 'en' ? 'Educational Content' : '教育内容',
      description: language === 'en' ? 'Make learning materials and infographics more engaging' : '让学习材料和信息图表更加引人入胜',
      image: '📚'
    },
    {
      title: language === 'en' ? 'Marketing Materials' : '营销材料',
      description: language === 'en' ? 'Build compelling marketing campaigns and advertisements' : '构建引人注目的营销活动和广告',
      image: '📈'
    }
  ];

  const stats = [
    {
      number: '10,000+',
      label: language === 'en' ? 'Cards Created' : '卡片创建',
      description: language === 'en' ? 'Beautiful cards made by our users' : '用户制作的精美卡片'
    },
    {
      number: '5,000+',
      label: language === 'en' ? 'Happy Users' : '满意用户',
      description: language === 'en' ? 'Creators trust CardCraft' : '创作者信任CardCraft'
    },
    {
      number: '100+',
      label: language === 'en' ? 'Templates' : '模板',
      description: language === 'en' ? 'Professional design templates' : '专业设计模板'
    },
    {
      number: '4.9/5',
      label: language === 'en' ? 'User Rating' : '用户评分',
      description: language === 'en' ? 'Average satisfaction score' : '平均满意度评分'
    }
  ];

  return (
    <div className="bg-white dark:bg-gray-900">
      {/* Hero Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="text-center max-w-4xl mx-auto mb-20">
          <Badge variant="secondary" className="mb-6 px-4 py-2">
            <Sparkles className="w-4 h-4 mr-2" />
            {language === 'en' ? 'AI-Powered Card Designer' : 'AI驱动的卡片设计器'}
          </Badge>
          
          <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-6 leading-tight">
            {language === 'en' ? (
              <>Create Stunning <span className="text-blue-600">Visual Cards</span> in Minutes</>
            ) : (
              <>在几分钟内创建令人惊艳的<span className="text-blue-600">视觉卡片</span></>
            )}
          </h1>
          
          <p className="text-xl text-gray-600 dark:text-gray-400 mb-10 max-w-2xl mx-auto leading-relaxed">
            {language === 'en' 
              ? 'Transform your ideas into beautiful, professional cards for social media, business, and personal use with our intuitive design tools.'
              : '使用我们直观的设计工具，将您的想法转化为适用于社交媒体、商务和个人用途的美丽、专业的卡片。'
            }
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Link href="/card-editor">
              <Button size="lg" className="text-lg px-8 py-4 h-auto">
                <Wand2 className="w-5 h-5 mr-2" />
                {language === 'en' ? 'Start Creating' : '开始创建'}
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>
            
            <Button variant="outline" size="lg" className="text-lg px-8 py-4 h-auto opacity-70 cursor-not-allowed">
              <PlayCircle className="w-5 h-5 mr-2" />
              {language === 'en' ? 'Coming Soon' : '稍后上线'}
            </Button>
          </div>

          {/* Quick Demo */}
          <div className="relative">
            <div className="bg-gray-100 dark:bg-gray-800 rounded-2xl p-8 max-w-2xl mx-auto">
              <div className="flex items-center justify-center mb-4">
                <div className="flex space-x-2">
                  <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                  <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                </div>
              </div>
              <div className="bg-white dark:bg-gray-700 rounded-lg p-6 shadow-sm">
                <div className="h-32 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center mb-4">
                  <span className="text-white font-semibold text-lg">
                    {language === 'en' ? 'Your Amazing Card' : '您的精彩卡片'}
                  </span>
                </div>
                <div className="space-y-2">
                  <div className="h-3 bg-gray-200 dark:bg-gray-600 rounded w-3/4"></div>
                  <div className="h-3 bg-gray-200 dark:bg-gray-600 rounded w-1/2"></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Features Section */}
        <section className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              {language === 'en' ? 'Why Choose CardCraft?' : '为什么选择CardCraft？'}
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              {language === 'en' 
                ? 'Everything you need to create professional visual content, powered by cutting-edge AI technology.'
                : '创建专业视觉内容所需的一切，由尖端AI技术驱动。'
              }
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="h-full hover:shadow-lg transition-shadow duration-300">
                <CardContent className="p-6 text-center h-full flex flex-col">
                  <div className={`w-16 h-16 rounded-2xl ${feature.color} flex items-center justify-center mx-auto mb-4`}>
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 flex-grow">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Use Cases Section */}
        <section className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              {language === 'en' ? 'Perfect for Every Need' : '满足各种需求'}
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              {language === 'en' 
                ? 'From social media to business presentations, CardCraft adapts to your creative requirements.'
                : '从社交媒体到商务演示，CardCraft适应您的创意需求。'
              }
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {useCases.map((useCase, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-shadow duration-300">
                <CardContent className="p-6">
                  <div className="text-4xl mb-4">{useCase.image}</div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                    {useCase.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">
                    {useCase.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Stats Section */}
        <section className="mb-20 bg-gray-50 dark:bg-gray-800 rounded-2xl p-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {stats.map((stat, index) => (
              <div key={index}>
                <div className="text-3xl font-bold text-blue-600 dark:text-blue-400 mb-2">
                  {stat.number}
                </div>
                <div className="text-lg font-semibold text-gray-900 dark:text-white mb-1">
                  {stat.label}
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {stat.description}
                </p>
              </div>
            ))}
          </div>
        </section>
      </div>

      {/* Showcase Section */}
      <ShowcaseSection />

      {/* User Reviews */}
      <UserReviews />

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">
            {language === 'en' ? 'Ready to Create Amazing Cards?' : '准备创建精彩的卡片吗？'}
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto opacity-90">
            {language === 'en' 
              ? 'Join thousands of creators and start making beautiful visual content today.'
              : '加入数千名创作者，今天就开始制作美丽的视觉内容。'
            }
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/card-editor">
              <Button size="lg" variant="secondary" className="text-lg px-8 py-4 h-auto">
                <Wand2 className="w-5 h-5 mr-2" />
                {language === 'en' ? 'Get Started Free' : '免费开始'}
              </Button>
            </Link>
            <Link href="/online-card-maker">
              <Button size="lg" variant="outline" className="text-lg px-8 py-4 h-auto bg-transparent border-white/20 text-white hover:bg-white/10">
                <Users className="w-5 h-5 mr-2" />
                {language === 'en' ? 'Explore Templates' : '探索模板'}
              </Button>
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
} 