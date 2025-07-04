'use client';

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Home, Search, ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-2xl mx-auto text-center">
          {/* 404 Illustration */}
          <div className="mb-8">
            <div className="text-8xl font-bold text-gray-200 dark:text-gray-700 mb-4">
              404
            </div>
            <div className="text-4xl mb-4">🎨</div>
          </div>

          {/* Error Message */}
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            Page Not Found
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400 mb-8">
            Sorry, we couldn&apos;t find the page you&apos;re looking for. It might have been moved, deleted, or you entered the wrong URL.
          </p>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Link href="/">
              <Button size="lg" className="w-full sm:w-auto">
                <Home className="w-4 h-4 mr-2" />
                Back to Home
              </Button>
            </Link>
            <Link href="/create">
              <Button variant="outline" size="lg" className="w-full sm:w-auto">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Start Creating
              </Button>
            </Link>
          </div>

          {/* Helpful Links */}
          <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm">
            <CardContent className="p-6">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                Popular Pages
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-left">
                <Link href="/card-editor" className="block p-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
                  <div className="font-medium text-gray-900 dark:text-white">Card Editor</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Create custom cards</div>
                </Link>
                <Link href="/online-card-maker" className="block p-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
                  <div className="font-medium text-gray-900 dark:text-white">Card Maker</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Professional templates</div>
                </Link>
                <Link href="/text-to-card-generator" className="block p-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
                  <div className="font-medium text-gray-900 dark:text-white">Text to Card</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">AI-powered generator</div>
                </Link>
                <Link href="/ai-card-design" className="block p-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
                  <div className="font-medium text-gray-900 dark:text-white">AI Design</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Smart design assistant</div>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
} 