import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Star, Heart, Eye, Calendar, User } from 'lucide-react';
import { useI18n } from '@/lib/i18n';
import { usePathname, useRouter } from 'next/navigation';

// Sample excellent cards data for showcase
const showcaseCards = [
  {
    id: 1,
    title: "Knowledge is Power",
    category: "Quote Cards",
    template: "quote-modern",
    likes: 245,
    views: 1200,
    shareId: "knowledge-power-123",
    preview: {
      background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
      text: "Knowledge is the most powerful tool you can possess. It opens doors, breaks barriers, and transforms dreams into reality.",
      author: "— Albert Einstein"
    }
  },
  {
    id: 2,
    title: "React Best Practices",
    category: "Tutorial Cards",
    template: "tutorial-step",
    likes: 189,
    views: 950,
    shareId: "react-practices-456",
    preview: {
      background: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
      text: "5 Essential React Best Practices",
      steps: ["Use functional components", "Implement proper state management", "Optimize with React.memo"]
    }
  },
  {
    id: 3,
    title: "Market Growth Stats",
    category: "Stats Cards",
    template: "stats-modern",
    likes: 156,
    views: 780,
    shareId: "market-stats-789",
    preview: {
      background: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)",
      text: "Digital Marketing Growth",
      stats: "127% increase in Q3"
    }
  },
  {
    id: 4,
    title: "Success Mindset",
    category: "Question Cards",
    template: "question-clean",
    likes: 312,
    views: 1450,
    shareId: "success-mindset-101",
    preview: {
      background: "linear-gradient(135deg, #fa709a 0%, #fee140 100%)",
      text: "What's the difference between successful and unsuccessful people?",
      answer: "The willingness to take action despite fear."
    }
  },
  {
    id: 5,
    title: "Design Principles",
    category: "Knowledge Cards",
    template: "knowledge-clean",
    likes: 203,
    views: 890,
    shareId: "design-principles-202",
    preview: {
      background: "linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)",
      text: "The 4 Fundamental Design Principles",
      points: ["Contrast", "Repetition", "Alignment", "Proximity"]
    }
  },
  {
    id: 6,
    title: "Productivity Hacks",
    category: "List Cards",
    template: "list-modern",
    likes: 278,
    views: 1100,
    shareId: "productivity-hacks-303",
    preview: {
      background: "linear-gradient(135deg, #ff9a9e 0%, #fecfef 100%)",
      text: "5 Productivity Hacks That Actually Work",
      items: ["Time blocking", "Pomodoro technique", "Single-tasking"]
    }
  }
];

// More showcase cards to reach ~20
const moreShowcaseCards = [
  {
    id: 7,
    title: "AI Revolution",
    category: "Quote Cards",
    template: "quote-elegant",
    likes: 421,
    views: 2100,
    shareId: "ai-revolution-404",
    preview: {
      background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
      text: "The future belongs to those who understand technology, not those who fear it.",
      author: "— Tech Visionary"
    }
  },
  {
    id: 8,
    title: "JavaScript Tips",
    category: "Tutorial Cards",
    template: "tutorial-modern",
    likes: 334,
    views: 1650,
    shareId: "js-tips-505",
    preview: {
      background: "linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)",
      text: "Advanced JavaScript Techniques",
      tip: "Use destructuring for cleaner code"
    }
  },
  {
    id: 9,
    title: "Revenue Growth",
    category: "Stats Cards",
    template: "stats-clean",
    likes: 156,
    views: 720,
    shareId: "revenue-growth-606",
    preview: {
      background: "linear-gradient(135deg, #a8e6cf 0%, #dcedc1 100%)",
      text: "Q4 Revenue Growth",
      stats: "185% YoY increase"
    }
  },
  {
    id: 10,
    title: "Learning Path",
    category: "Question Cards",
    template: "question-modern",
    likes: 245,
    views: 1320,
    shareId: "learning-path-707",
    preview: {
      background: "linear-gradient(135deg, #ff9a9e 0%, #fad0c4 100%)",
      text: "What's the best way to learn programming?",
      answer: "Build projects, not just tutorials."
    }
  },
  {
    id: 11,
    title: "UX Principles",
    category: "Knowledge Cards",
    template: "knowledge-modern",
    likes: 198,
    views: 950,
    shareId: "ux-principles-808",
    preview: {
      background: "linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)",
      text: "Core UX Design Principles",
      principles: ["User-centered", "Consistent", "Accessible"]
    }
  },
  {
    id: 12,
    title: "Startup Checklist",
    category: "List Cards",
    template: "list-clean",
    likes: 367,
    views: 1800,
    shareId: "startup-checklist-909",
    preview: {
      background: "linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)",
      text: "Pre-Launch Startup Checklist",
      items: ["Market research", "MVP development", "User testing"]
    }
  }
];

const allShowcaseCards = [...showcaseCards, ...moreShowcaseCards];

interface ShowcaseSectionProps {
  className?: string;
}

export function ShowcaseSection({ className = "" }: ShowcaseSectionProps) {
  const { t } = useI18n();
  const pathname = usePathname();
  const router = useRouter();

  return (
    <section className={`py-16 bg-gray-50 dark:bg-gray-900 ${className}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            Excellent Cards Showcase
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Discover amazing cards created by our community. Get inspired and create your own stunning visual content.
          </p>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-12">
          {allShowcaseCards.slice(0, 12).map((card) => (
            <Card 
              key={card.id} 
              className="group hover:shadow-lg transition-all duration-300 cursor-pointer"
              onClick={() => router.push('/card-editor')}
            >
              <CardContent className="p-0">
                {/* Card Preview */}
                <div 
                  className="h-48 rounded-t-lg flex items-center justify-center text-white relative overflow-hidden"
                  style={{ background: card.preview.background }}
                >
                  <div className="text-center p-4 relative z-10">
                    <div className="text-sm font-medium opacity-90 mb-2">
                      {card.preview.text}
                    </div>
                    {card.preview.author && (
                      <div className="text-xs opacity-75">
                        {card.preview.author}
                      </div>
                    )}
                    {card.preview.stats && (
                      <div className="text-lg font-bold">
                        {card.preview.stats}
                      </div>
                    )}
                  </div>
                  <div className="absolute inset-0 bg-black/10 group-hover:bg-black/20 transition-colors duration-300" />
                </div>

                {/* Card Info */}
                <div className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-semibold text-gray-900 dark:text-white text-sm">
                      {card.title}
                    </h3>
                    <Badge variant="secondary" className="text-xs">
                      {card.category}
                    </Badge>
                  </div>
                  
                  <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
                    <div className="flex items-center gap-3">
                      <div className="flex items-center gap-1">
                        <Heart className="w-3 h-3" />
                        {card.likes}
                      </div>
                      <div className="flex items-center gap-1">
                        <Eye className="w-3 h-3" />
                        {card.views}
                      </div>
                    </div>
                    <Button size="sm" variant="ghost" className="h-6 px-2 text-xs">
                      View
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center">
          <Button 
            size="lg" 
            onClick={() => router.push('/create')}
            className="bg-blue-600 hover:bg-blue-700 text-white"
          >
            Create Your Own Card
          </Button>
        </div>
      </div>
    </section>
  );
} 