'use client';

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Palette, Upload, Download, Sparkles, Type, Share2 } from "lucide-react";
import Link from "next/link";
import { useI18n } from "@/lib/i18n";

export default function OnlineCardMaker() {
  const { t } = useI18n();

  const features = [
    {
      icon: <Palette className="h-8 w-8 text-primary" />,
      title: "Professional Card Templates",
      description: "Access 8 categories of professional card templates including Quote Cards, Knowledge Cards, Tutorial Cards, and Stats Cards for every occasion."
    },
    {
      icon: <Upload className="h-8 w-8 text-primary" />,
      title: "Custom Image Upload",
      description: "Upload your own photos and images to create personalized cards. Our card maker supports JPG, PNG, and SVG formats."
    },
    {
      icon: <Download className="h-8 w-8 text-primary" />,
      title: "High-Resolution Download",
      description: "Download your finished cards in high resolution. Perfect for sharing on social media platforms or using in presentations."
    },
    {
      icon: <Sparkles className="h-8 w-8 text-primary" />,
      title: "Customizable Design Editor",
      description: "Full customization control with drag-and-drop editing. Change fonts, colors, layouts, and backgrounds in our intuitive card maker."
    },
    {
      icon: <Type className="h-8 w-8 text-primary" />,
      title: "Professional Typography",
      description: "Create beautiful text cards with multiple font families, weights, and sizes. Perfect for quotes, educational content, and social media posts."
    },
    {
      icon: <Share2 className="h-8 w-8 text-primary" />,
      title: "Social Media Ready",
      description: "All card templates are optimized for social media sharing with perfect dimensions for Instagram, Twitter, LinkedIn, and Facebook."
    }
  ];

  const cardCategories = [
    {
      name: "Quote Cards",
      icon: "💬",
      description: "Inspirational quotes and motivational content",
      examples: ["Motivational quotes", "Business wisdom", "Life advice"]
    },
    {
      name: "Knowledge Cards",
      icon: "📚",
      description: "Educational content and learning materials",
      examples: ["Did you know facts", "Learning tips", "Industry insights"]
    },
    {
      name: "Tutorial Cards",
      icon: "📋",
      description: "Step-by-step guides and how-to content",
      examples: ["How-to guides", "Process steps", "Instructions"]
    },
    {
      name: "Stats Cards",
      icon: "📊",
      description: "Data visualization and metrics display",
      examples: ["Performance metrics", "Survey results", "Growth numbers"]
    }
  ];

  return (
    <div className="bg-gradient-to-br from-orange-50 via-red-50 to-pink-50 dark:from-gray-900 dark:via-orange-900/20 dark:to-red-900/20">
      <div className="container mx-auto px-4 py-8">
        {/* Hero section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent mb-4">
            Online Card Maker
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mb-8">
            Create stunning visual cards with our professional templates and easy-to-use design tools. Perfect for social media, business, and personal use.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/card-editor">
              <Button size="lg" className="bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700">
                Start Creating <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Link href="/">
              <Button size="lg" variant="outline">
                Browse Templates
              </Button>
            </Link>
          </div>
        </div>

        {/* Quick Card Generator */}
        <div className="mb-16">
          <Card className="max-w-4xl mx-auto border-0 shadow-2xl bg-white/95 dark:bg-gray-800/95 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-2xl text-center flex items-center justify-center gap-2">
                <Sparkles className="h-6 w-6" />
                Quick Card Generator
              </CardTitle>
              <p className="text-gray-600 dark:text-gray-300 text-center">
                Start creating your card by choosing a template category or go directly to the full editor
              </p>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Link href="/card-editor">
                  <Button className="bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700">
                    <Palette className="mr-2 h-4 w-4" />
                    Generate Card
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Features */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {features.map((feature, index) => (
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

        {/* Card Categories */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-8 text-gray-800 dark:text-white">
            Card Template Categories
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {cardCategories.map((category, index) => (
              <Card key={index} className="border-0 shadow-md hover:shadow-lg transition-all duration-300 cursor-pointer">
                <CardContent className="p-6 text-center">
                  <div className="text-4xl mb-4">{category.icon}</div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                    {category.name}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300 mb-3">
                    {category.description}
                  </p>
                  <div className="space-y-1">
                    {category.examples.map((example, idx) => (
                      <Badge key={idx} variant="secondary" className="text-xs mr-1 mb-1">
                        {example}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
} 