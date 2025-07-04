'use client';

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, BarChart3, Share2, TrendingUp, Users, Eye, Heart } from "lucide-react";
import Link from "next/link";
import { useI18n } from "@/lib/i18n";

export default function SocialMediaVisualization() {
  const { t } = useI18n();

  const visualizationFeatures = [
    {
      icon: <BarChart3 className="h-8 w-8 text-primary" />,
      title: "Data Visualization",
      description: "Transform your social media metrics into engaging visual cards. Create charts, graphs, and infographics that make your data story compelling."
    },
    {
      icon: <TrendingUp className="h-8 w-8 text-primary" />,
      title: "Performance Metrics",
      description: "Showcase your growth, engagement rates, and key performance indicators with professional-looking visualization cards."
    },
    {
      icon: <Share2 className="h-8 w-8 text-primary" />,
      title: "Platform Optimized",
      description: "Create visualizations perfectly sized for Instagram Stories, LinkedIn posts, Twitter cards, and other social media platforms."
    },
    {
      icon: <Users className="h-8 w-8 text-primary" />,
      title: "Audience Insights",
      description: "Visualize your audience demographics, engagement patterns, and community growth in eye-catching card formats."
    },
    {
      icon: <Eye className="h-8 w-8 text-primary" />,
      title: "Brand Consistency",
      description: "Maintain your brand colors, fonts, and style across all your social media visualization cards."
    },
    {
      icon: <Heart className="h-8 w-8 text-primary" />,
      title: "Engagement Boost",
      description: "Visual content gets 94% more views than text-only posts. Make your metrics more engaging and shareable."
    }
  ];

  const visualizationTypes = [
    {
      type: "Growth Charts",
      icon: "📈",
      description: "Show follower growth, engagement trends, and performance over time",
      platforms: ["Instagram", "LinkedIn", "Twitter"]
    },
    {
      type: "Comparison Cards",
      icon: "⚖️",
      description: "Compare different metrics, time periods, or platform performance",
      platforms: ["Facebook", "Instagram", "LinkedIn"]
    },
    {
      type: "Achievement Cards",
      icon: "🏆",
      description: "Celebrate milestones, goals reached, and success metrics",
      platforms: ["All Platforms"]
    },
    {
      type: "Statistics Overview",
      icon: "📊",
      description: "Present key metrics and KPIs in digestible visual formats",
      platforms: ["LinkedIn", "Twitter", "Instagram"]
    }
  ];

  return (
    <div className="bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 dark:from-gray-900 dark:via-blue-900/20 dark:to-purple-900/20">
      <div className="container mx-auto px-4 py-8">
        {/* Hero section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
            Social Media Visualization
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mb-8">
            Transform your social media data into stunning visual cards. Create engaging charts, metrics displays, and performance summaries that tell your brand&apos;s story.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            <Link href="/card-editor">
              <Button size="lg" className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                Create Visualization <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Link href="/">
              <Button size="lg" variant="outline">
                View Templates
              </Button>
            </Link>
          </div>

          <div className="flex flex-wrap justify-center gap-2">
            <Badge variant="secondary">Instagram Stories</Badge>
            <Badge variant="secondary">LinkedIn Posts</Badge>
            <Badge variant="secondary">Twitter Cards</Badge>
            <Badge variant="secondary">Facebook Graphics</Badge>
          </div>
        </div>

        {/* Visualization Types */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-8 text-gray-800 dark:text-white">
            Visualization Types
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {visualizationTypes.map((type, index) => (
              <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer">
                <CardContent className="p-6 text-center">
                  <div className="text-4xl mb-4">{type.icon}</div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                    {type.type}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300 mb-3">
                    {type.description}
                  </p>
                  <div className="space-y-1">
                    {type.platforms.map((platform, idx) => (
                      <Badge key={idx} variant="outline" className="text-xs mr-1 mb-1">
                        {platform}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Features */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {visualizationFeatures.map((feature, index) => (
            <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm">
              <CardHeader>
                <div className="flex items-center space-x-3 mb-2">
                  {feature.icon}
                  <CardTitle className="text-lg">{feature.title}</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 dark:text-gray-300">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center">
          <Card className="max-w-2xl mx-auto border-0 shadow-xl bg-gradient-to-r from-blue-600 to-purple-600 text-white">
            <CardContent className="p-8">
              <BarChart3 className="h-12 w-12 mx-auto mb-4" />
              <h2 className="text-2xl font-bold mb-4">Start Visualizing Your Data</h2>
              <p className="text-blue-100 mb-6">
                Turn your social media metrics into compelling visual stories that engage your audience and showcase your success.
              </p>
              <Link href="/card-editor">
                <Button size="lg" variant="secondary" className="bg-white text-blue-600 hover:bg-gray-100">
                  Get Started Now <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
} 