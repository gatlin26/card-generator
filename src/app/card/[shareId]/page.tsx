'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { 
  Download, 
  Share2, 
  Eye,
  Heart,
  MessageCircle,
  Copy,
  ExternalLink,
  ArrowLeft
} from 'lucide-react';
import Link from 'next/link';
import { useToast } from '@/hooks/use-toast';

interface SharedCardData {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  createdAt: string;
  author: string;
  likes: number;
  comments: number;
  card: any;
}

export default function SharedCardPage() {
  const params = useParams();
  const shareId = params?.shareId as string;
  const [cardData, setCardData] = useState<SharedCardData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    const fetchCardData = async () => {
      try {
        const response = await fetch(`/api/cards/share/${shareId}`);
        if (!response.ok) {
          throw new Error('Card not found');
        }
        const data = await response.json();
        setCardData(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load card');
      } finally {
        setLoading(false);
      }
    };

    if (shareId) {
      fetchCardData();
    }
  }, [shareId]);

  const handleShare = async () => {
    const url = typeof window !== 'undefined' ? window.location.href : '';
    if (navigator.share) {
      try {
        await navigator.share({
          title: cardData?.title || 'Check out this card',
          text: cardData?.description || 'Created with CardCraft',
          url: url,
        });
      } catch (err) {
        // User cancelled sharing
      }
    } else {
      // Fallback to copying URL
      await navigator.clipboard.writeText(url);
      toast({
        title: 'Link copied',
        description: 'The share link has been copied to your clipboard',
      });
    }
  };

  const handleDownload = () => {
    if (cardData?.imageUrl) {
      const link = document.createElement('a');
      link.href = cardData.imageUrl;
      link.download = `${cardData.title || 'card'}.png`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  const handleLike = async () => {
    try {
      const response = await fetch(`/api/cards/${shareId}/like`, {
        method: 'POST',
      });
      if (response.ok) {
        setCardData(prev => prev ? { ...prev, likes: prev.likes + 1 } : null);
      }
    } catch (err) {
      console.error('Failed to like card:', err);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-white dark:bg-gray-900">
        <div className="container mx-auto px-4 py-16">
          <div className="flex items-center justify-center min-h-[400px]">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !cardData) {
    return (
      <div className="min-h-screen bg-white dark:bg-gray-900">
        <div className="container mx-auto px-4 py-16">
          <div className="text-center max-w-2xl mx-auto">
            <div className="text-6xl mb-4">😔</div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Card Not Found
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mb-8">
              The card you&apos;re looking for doesn&apos;t exist or has been removed.
            </p>
            <Link href="/">
              <Button>
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Home
              </Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <Link href="/">
            <Button variant="ghost" size="sm">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Home
            </Button>
          </Link>
        </div>

        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            Shared Card: {shareId}
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mb-8">
            This page will display the shared card content.
          </p>
          
          <div className="flex items-center space-x-2 justify-center">
            <Button variant="outline" size="sm">
              <Share2 className="w-4 h-4 mr-1" />
              Share
            </Button>
            <Button size="sm">
              <Download className="w-4 h-4 mr-1" />
              Download
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
} 