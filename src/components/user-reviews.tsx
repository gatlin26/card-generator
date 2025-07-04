import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Star, Quote } from 'lucide-react';
import { useI18n } from '@/lib/i18n';

// User reviews data
const userReviews = [
  {
    id: 1,
    name: "Sarah Chen",
    role: "Content Creator",
    avatar: "/api/placeholder/40/40",
    rating: 5,
    review: "CardCraft has completely transformed how I create visual content for my social media. The templates are gorgeous and the editing is so intuitive!",
    date: "2 days ago"
  },
  {
    id: 2,
    name: "Marcus Johnson",
    role: "Marketing Manager",
    avatar: "/api/placeholder/40/40",
    rating: 5,
    review: "Our team saves hours every week using CardCraft. The professional quality outputs and easy sharing features are exactly what we needed.",
    date: "5 days ago"
  },
  {
    id: 3,
    name: "Elena Rodriguez",
    role: "Startup Founder",
    avatar: "/api/placeholder/40/40",
    rating: 5,
    review: "As a non-designer, I was amazed at how quickly I could create professional-looking cards. The drag-and-drop interface is a game changer!",
    date: "1 week ago"
  },
  {
    id: 4,
    name: "David Kim",
    role: "Educator",
    avatar: "/api/placeholder/40/40",
    rating: 5,
    review: "I use CardCraft to create educational content for my students. The knowledge card templates are perfect for breaking down complex concepts.",
    date: "1 week ago"
  },
  {
    id: 5,
    name: "Lisa Thompson",
    role: "Freelance Designer",
    avatar: "/api/placeholder/40/40",
    rating: 5,
    review: "Even as a professional designer, I love using CardCraft for quick social media posts. It's fast, efficient, and the results are always stunning.",
    date: "2 weeks ago"
  },
  {
    id: 6,
    name: "Ahmed Hassan",
    role: "Tech Blogger",
    avatar: "/api/placeholder/40/40",
    rating: 5,
    review: "The tutorial card templates have helped me explain complex programming concepts visually. My engagement rates have increased by 40%!",
    date: "2 weeks ago"
  }
];

interface UserReviewsProps {
  className?: string;
}

export function UserReviews({ className = "" }: UserReviewsProps) {
  const { t } = useI18n();

  return (
    <section className={`py-16 bg-white dark:bg-gray-800 ${className}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            What Our Users Say
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Join thousands of creators, marketers, and professionals who trust CardCraft for their visual content needs.
          </p>
        </div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {userReviews.map((review) => (
            <Card key={review.id} className="h-full">
              <CardContent className="p-6 h-full flex flex-col">
                {/* Quote Icon */}
                <div className="mb-4">
                  <Quote className="w-8 h-8 text-blue-500 dark:text-blue-400" />
                </div>

                {/* Review Text */}
                <p className="text-gray-700 dark:text-gray-300 mb-6 flex-grow">
                  &ldquo;{review.review}&rdquo;
                </p>

                {/* Rating */}
                <div className="flex items-center mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${
                        i < review.rating
                          ? 'text-yellow-400 fill-current'
                          : 'text-gray-300 dark:text-gray-600'
                      }`}
                    />
                  ))}
                </div>

                {/* User Info */}
                <div className="flex items-center">
                  <Avatar className="h-10 w-10 mr-3">
                    <AvatarImage src={review.avatar} alt={review.name} />
                    <AvatarFallback>
                      {review.name.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-semibold text-gray-900 dark:text-white text-sm">
                      {review.name}
                    </p>
                    <p className="text-gray-500 dark:text-gray-400 text-xs">
                      {review.role}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Stats */}
        <div className="bg-gray-50 dark:bg-gray-900/50 rounded-2xl p-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-3xl font-bold text-blue-600 dark:text-blue-400 mb-2">
                10,000+
              </div>
              <p className="text-gray-600 dark:text-gray-400">
                Cards Created
              </p>
            </div>
            <div>
              <div className="text-3xl font-bold text-green-600 dark:text-green-400 mb-2">
                5,000+
              </div>
              <p className="text-gray-600 dark:text-gray-400">
                Happy Users
              </p>
            </div>
            <div>
              <div className="text-3xl font-bold text-purple-600 dark:text-purple-400 mb-2">
                4.9/5
              </div>
              <p className="text-gray-600 dark:text-gray-400">
                Average Rating
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
} 