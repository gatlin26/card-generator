'use client';

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Brain, Wand2, Sparkles, Zap, Palette } from "lucide-react";
import Link from "next/link";
import { useI18n } from "@/lib/i18n";

export default function AICardDesign() {
  const { t } = useI18n();

  const aiFeatures = [
    {
      icon: <Brain className="h-8 w-8 text-primary" />,
      title: "Smart Design Suggestions",
      description: "Our AI analyzes your content and suggests the most effective layouts, colors, and typography combinations for maximum impact."
    },
    {
      icon: <Wand2 className="h-8 w-8 text-primary" />,
      title: "Auto-Generated Layouts",
      description: "Input your text and let AI create multiple professional layout options. Choose from generated designs or use them as starting points."
    },
    {
      icon: <Palette className="h-8 w-8 text-primary" />,
      title: "Intelligent Color Matching",
      description: "AI-powered color palette suggestions based on your brand, content mood, and design best practices for optimal visual appeal."
    },
    {
      icon: <Sparkles className="h-8 w-8 text-primary" />,
      title: "Content Optimization",
      description: "Automatically optimize text placement, sizing, and formatting to ensure maximum readability and visual hierarchy."
    }
  ];

  return (
    <div className="bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50 dark:from-gray-900 dark:via-purple-900/20 dark:to-blue-900/20">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 px-4 py-2 rounded-full text-sm font-medium mb-6">
            <Brain className="w-4 h-4" />
            AI-Powered Design Assistant
          </div>
          
          <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent mb-4">
            AI Card Design Studio
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mb-8">
            Harness the power of artificial intelligence to create stunning card designs. Our AI understands your content and suggests the perfect visual treatment for maximum impact.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/card-editor">
              <Button size="lg" className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700">
                <Wand2 className="mr-2 h-5 w-5" />
                Start AI Design <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Link href="/text-to-card-generator">
              <Button size="lg" variant="outline">
                Try Text to Card AI
              </Button>
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8 mb-16">
          {aiFeatures.map((feature, index) => (
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
      </div>
    </div>
  );
} 