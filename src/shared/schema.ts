import { z } from "zod";

// 简化的类型定义，移除数据库依赖
export type User = {
  id: number;
  username: string;
};

export type Card = {
  id: number;
  title: string;
  content: any;
  templateId: string;
  userId?: number;
  shareId?: string;
  isPublic?: boolean;
  createdAt: Date;
};

export type Feedback = {
  id: number;
  type: string;
  subject: string;
  description: string;
  email?: string;
  userAgent?: string;
  url?: string;
  status: string;
  createdAt: Date;
};

// 输入验证 schema
export const insertCardSchema = z.object({
  title: z.string().min(1, "标题不能为空"),
  content: z.any(),
  templateId: z.string().min(1, "模板ID不能为空"),
  userId: z.number().optional(),
  isPublic: z.boolean().optional(),
});

export const insertFeedbackSchema = z.object({
  type: z.enum(['bug', 'feature', 'improvement', 'general']),
  subject: z.string().min(1, "主题不能为空"),
  description: z.string().min(1, "描述不能为空"),
  email: z.string().email().optional().or(z.literal("")),
  userAgent: z.string().optional(),
  url: z.string().optional(),
});

export type InsertCard = z.infer<typeof insertCardSchema>;
export type InsertFeedback = z.infer<typeof insertFeedbackSchema>;

// Card content schema
export const cardContentSchema = z.object({
  elements: z.array(z.object({
    id: z.string(),
    type: z.enum(['text', 'image']),
    content: z.string(),
    style: z.object({
      fontSize: z.number().optional(),
      fontWeight: z.string().optional(),
      fontFamily: z.string().optional(),
      color: z.string().optional(),
      textAlign: z.string().optional(),
      position: z.object({
        x: z.number(),
        y: z.number(),
      }).optional(),
      size: z.object({
        width: z.number(),
        height: z.number(),
      }).optional(),
    }),
  })),
  background: z.object({
    type: z.enum(['solid', 'gradient', 'image']),
    value: z.string(),
    color: z.string().optional(),
    gradient: z.string().optional(),
    url: z.string().optional(),
    gradientStart: z.string().optional(),
    gradientEnd: z.string().optional(),
  }),
  dimensions: z.object({
    width: z.number(),
    height: z.number(),
  }),
});

export type CardContent = z.infer<typeof cardContentSchema>; 