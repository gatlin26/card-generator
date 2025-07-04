'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { apiRequest } from '@/lib/queryClient';
import { MessageSquare, Bug, Lightbulb, Star, Send } from 'lucide-react';
import { useI18n } from '@/lib/i18n';

interface FeedbackDialogProps {
  children?: React.ReactNode;
  className?: string;
}

export function FeedbackDialog({ children, className = "" }: FeedbackDialogProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [type, setType] = useState<string>('');
  const [subject, setSubject] = useState('');
  const [description, setDescription] = useState('');
  const [email, setEmail] = useState('');
  const { toast } = useToast();
  const { language } = useI18n();
  const queryClient = useQueryClient();

  const submitFeedbackMutation = useMutation({
    mutationFn: async (data: {
      type: string;
      subject: string;
      description: string;
      email?: string;
      userAgent: string;
      url: string;
    }) => {
      const response = await fetch('/api/feedback', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      
      if (!response.ok) {
        throw new Error('Failed to submit feedback');
      }
      
      return response.json();
    },
    onSuccess: () => {
      toast({
        title: language === 'en' ? 'Feedback Submitted' : '反馈已提交',
        description: language === 'en' 
          ? 'Thank you for your feedback! We\'ll review it soon.' 
          : '感谢您的反馈！我们会尽快查看。'
      });
      setIsOpen(false);
      resetForm();
      queryClient.invalidateQueries({ queryKey: ['/api/feedback'] });
    },
    onError: () => {
      toast({
        title: language === 'en' ? 'Error' : '错误',
        description: language === 'en' 
          ? 'Failed to submit feedback. Please try again.' 
          : '提交反馈失败，请重试。',
        variant: 'destructive'
      });
    }
  });

  const resetForm = () => {
    setType('');
    setSubject('');
    setDescription('');
    setEmail('');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!type || !subject || !description) {
      toast({
        title: language === 'en' ? 'Missing Information' : '信息不完整',
        description: language === 'en' 
          ? 'Please fill in all required fields.' 
          : '请填写所有必填字段。',
        variant: 'destructive'
      });
      return;
    }

    submitFeedbackMutation.mutate({
      type,
      subject,
      description,
      email,
      userAgent: typeof navigator !== 'undefined' ? navigator.userAgent : '',
                url: typeof window !== 'undefined' ? window.location.href : ''
    });
  };

  const feedbackTypes = [
    {
      value: 'bug',
      label: language === 'en' ? 'Bug Report' : '错误报告',
      icon: <Bug className="w-4 h-4" />
    },
    {
      value: 'feature',
      label: language === 'en' ? 'Feature Request' : '功能建议',
      icon: <Lightbulb className="w-4 h-4" />
    },
    {
      value: 'improvement',
      label: language === 'en' ? 'Improvement' : '改进建议',
      icon: <Star className="w-4 h-4" />
    },
    {
      value: 'general',
      label: language === 'en' ? 'General Feedback' : '一般反馈',
      icon: <MessageSquare className="w-4 h-4" />
    }
  ];

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        {children || (
          <Button variant="outline" size="sm" className={className}>
            <MessageSquare className="w-4 h-4 mr-2" />
            {language === 'en' ? 'Feedback' : '反馈'}
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <MessageSquare className="w-5 h-5" />
            {language === 'en' ? 'Submit Feedback' : '提交反馈'}
          </DialogTitle>
          <DialogDescription>
            {language === 'en' 
              ? 'Help us improve CardCraft by sharing your thoughts, reporting bugs, or suggesting new features.'
              : '通过分享您的想法、报告错误或建议新功能来帮助我们改进 CardCraft。'}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="feedback-type">
              {language === 'en' ? 'Feedback Type' : '反馈类型'} *
            </Label>
            <Select value={type} onValueChange={setType}>
              <SelectTrigger>
                <SelectValue placeholder={language === 'en' ? 'Select feedback type' : '选择反馈类型'} />
              </SelectTrigger>
              <SelectContent>
                {feedbackTypes.map((feedbackType) => (
                  <SelectItem key={feedbackType.value} value={feedbackType.value}>
                    <div className="flex items-center gap-2">
                      {feedbackType.icon}
                      {feedbackType.label}
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="subject">
              {language === 'en' ? 'Subject' : '主题'} *
            </Label>
            <Input
              id="subject"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              placeholder={language === 'en' ? 'Brief description of your feedback' : '简要描述您的反馈'}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">
              {language === 'en' ? 'Description' : '详细描述'} *
            </Label>
            <Textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder={language === 'en' 
                ? 'Please provide detailed information about your feedback...' 
                : '请详细描述您的反馈内容...'}
              rows={4}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">
              {language === 'en' ? 'Email (Optional)' : '邮箱（可选）'}
            </Label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder={language === 'en' ? 'your@email.com' : 'your@email.com'}
            />
            <p className="text-xs text-gray-500">
              {language === 'en' 
                ? 'We\'ll only use this to follow up on your feedback if needed.'
                : '我们仅在需要时使用此邮箱跟进您的反馈。'}
            </p>
          </div>

          <div className="flex justify-end gap-3 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => setIsOpen(false)}
            >
              {language === 'en' ? 'Cancel' : '取消'}
            </Button>
            <Button
              type="submit"
              disabled={submitFeedbackMutation.isPending}
            >
              {submitFeedbackMutation.isPending ? (
                language === 'en' ? 'Submitting...' : '提交中...'
              ) : (
                <>
                  <Send className="w-4 h-4 mr-2" />
                  {language === 'en' ? 'Submit Feedback' : '提交反馈'}
                </>
              )}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
} 