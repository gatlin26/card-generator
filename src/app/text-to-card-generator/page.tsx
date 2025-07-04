'use client';

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { ArrowRight, Wand2, Type, Layout, Sparkles, Download } from "lucide-react";
import Link from "next/link";
import { useI18n } from "@/lib/i18n";

export default function TextToCardGenerator() {
  const { t } = useI18n();
  const [inputText, setInputText] = useState("");

  const textFeatures = [
    {
      icon: <Type className="h-8 w-8 text-primary" />,
      title: "Text to Card Converter",
      description: "Transform your text content into beautiful visual cards using our smart template system. Choose from Quote Cards, Knowledge Cards, and Tutorial Cards."
    },
    {
      icon: <Wand2 className="h-8 w-8 text-primary" />,
      title: "Smart Text Formatting",
      description: "Automatically format your text with professional typography. Adjust font sizes, weights, colors, and alignment to create visually appealing content."
    },
    {
      icon: <Layout className="h-8 w-8 text-primary" />,
      title: "Multiple Template Options",
      description: "Choose from 8 different card template categories designed specifically for different types of text content - quotes, knowledge, tutorials, and more."
    },
    {
      icon: <Sparkles className="h-8 w-8 text-primary" />,
      title: "Custom Backgrounds",
      description: "Enhance your text cards with solid colors, beautiful gradients, or upload your own background images to match your brand style."
    },
    {
      icon: <Download className="h-8 w-8 text-primary" />,
      title: "High Quality Export",
      description: "Download your text cards in high resolution. Perfect for social sharing, presentations, or any digital platform that needs crisp, clear text images."
    }
  ];

  const templates = [
    "Quote Cards", "Knowledge Cards", "Tutorial Cards", "Stats Cards", 
    "List Cards", "Profile Cards", "Comparison Cards", "Question Cards"
  ];

  const textExamples = [
    {
      category: "Motivational Quote",
      text: "The best way to predict the future is to create it yourself. - Peter Drucker",
      template: "Quote Cards"
    },
    {
      category: "Knowledge Insight",
      text: "Did you know? 93% of communication is non-verbal. Body language and tone of voice carry more weight than words alone.",
      template: "Knowledge Cards"
    },
    {
      category: "Tutorial Step",
      text: "Step 1: Choose Your Template\nBrowse our collection of professional templates designed for different content types and select the one that best fits your message.",
      template: "Tutorial Cards"
    },
    {
      category: "Stats Display",
      text: "Website Traffic Growth\n• Organic visits: +45%\n• Social referrals: +32%\n• Direct traffic: +18%\nTotal increase: 95% year-over-year",
      template: "Stats Cards"
    }
  ];

  return (
    <div className="bg-gradient-to-br from-green-50 via-blue-50 to-purple-50 dark:from-gray-900 dark:via-green-900/20 dark:to-blue-900/20">
      <div className="container mx-auto px-4 py-8">
        {/* Hero section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent mb-4">
            Text to Card Generator
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mb-8">
            Transform your text content into stunning visual cards. Perfect for quotes, educational content, social media posts, and professional presentations with smart templates and custom styling.
          </p>
          <div className="flex flex-wrap justify-center gap-2 mb-8">
            {templates.map((template, index) => (
              <Badge key={index} variant="secondary" className="text-sm">
                {template}
              </Badge>
            ))}
          </div>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/card-editor">
              <Button size="lg" className="bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700">
                Start Creating Cards <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Link href="/">
              <Button size="lg" variant="outline">
                Browse Templates
              </Button>
            </Link>
          </div>
        </div>

        {/* Interactive Text to Card Tool */}
        <div className="mb-16">
          <Card className="max-w-4xl mx-auto border-0 shadow-2xl bg-white/95 dark:bg-gray-800/95 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-2xl text-center flex items-center justify-center gap-2">
                <Type className="h-6 w-6" />
                Text to Card Converter
              </CardTitle>
              <p className="text-gray-600 dark:text-gray-300 text-center">
                Paste your text below and see it transformed into a professional card design
              </p>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <Textarea
                  placeholder="Enter your text here... (quotes, tips, educational content, statistics, etc.)"
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  className="min-h-[120px]"
                />
                <div className="flex flex-col sm:flex-row gap-3">
                  <Button className="flex-1 bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700">
                    <Wand2 className="mr-2 h-4 w-4" />
                    Generate Card
                  </Button>
                  <Button variant="outline" className="flex-1">
                    <Layout className="mr-2 h-4 w-4" />
                    Choose Template
                  </Button>
                </div>
              </div>
              
              <div className="mt-8">
                <h4 className="font-semibold mb-4 text-center">Example Texts & Templates</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {textExamples.map((example, index) => (
                    <div
                      key={index}
                      className="p-4 border rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer transition-colors"
                      onClick={() => setInputText(example.text)}
                    >
                      <div className="flex justify-between items-start mb-2">
                        <h5 className="font-medium text-sm">{example.category}</h5>
                        <Badge variant="outline" className="text-xs">{example.template}</Badge>
                      </div>
                      <p className="text-sm text-gray-600 dark:text-gray-300 line-clamp-3">
                        {example.text}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Text to Card Features */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {textFeatures.map((feature, index) => (
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