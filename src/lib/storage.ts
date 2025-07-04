import { nanoid } from 'nanoid';

// 简化的类型定义，移除数据库依赖
export interface User {
  id: number;
  username: string;
}

export interface Card {
  id: number;
  title: string;
  content: any;
  templateId: string;
  userId?: number;
  shareId?: string;
  isPublic?: boolean;
  createdAt: Date;
}

export interface Feedback {
  id: number;
  type: string;
  subject: string;
  description: string;
  email?: string;
  userAgent?: string;
  url?: string;
  status: string;
  createdAt: Date;
}

export interface InsertCard {
  title: string;
  content: any;
  templateId: string;
  userId?: number;
  isPublic?: boolean;
}

export interface InsertFeedback {
  type: string;
  subject: string;
  description: string;
  email?: string;
  userAgent?: string;
  url?: string;
}

// 内存存储实现
export interface IStorage {
  createCard(card: InsertCard): Promise<Card>;
  getUserCards(userId: number): Promise<Card[]>;
  getCard(id: number): Promise<Card | undefined>;
  updateCard(id: number, updates: Partial<Card>): Promise<Card | undefined>;
  deleteCard(id: number): Promise<boolean>;
  getCardByShareId(shareId: string): Promise<Card | undefined>;
  getShowcaseCards(): Promise<Card[]>;
  createFeedback(feedback: InsertFeedback): Promise<Feedback>;
  getAllFeedback(): Promise<Feedback[]>;
  getFeedbackById(id: number): Promise<Feedback | undefined>;
}

export class MemoryStorage implements IStorage {
  private cards: Card[] = [];
  private feedback: Feedback[] = [];
  private nextCardId = 1;
  private nextFeedbackId = 1;

  constructor() {
    // 初始化一些示例数据
    this.initializeSampleData();
  }

  private initializeSampleData() {
    // 添加一些示例卡片
    const sampleCards: Card[] = [
      {
        id: 1,
        title: "欢迎卡片",
        content: {
          elements: [
            {
              id: "text1",
              type: "text",
              content: "欢迎使用卡片生成器！",
              style: {
                fontSize: 24,
                fontWeight: "bold",
                color: "#333",
                position: { x: 50, y: 50 },
                size: { width: 300, height: 50 }
              }
            }
          ],
          background: {
            type: "solid",
            value: "#ffffff",
            color: "#ffffff"
          },
          dimensions: { width: 400, height: 300 }
        },
        templateId: "default",
        userId: 1,
        shareId: nanoid(),
        isPublic: true,
        createdAt: new Date()
      },
      {
        id: 2,
        title: "示例商务卡片",
        content: {
          elements: [
            {
              id: "text1",
              type: "text",
              content: "John Doe",
              style: {
                fontSize: 20,
                fontWeight: "bold",
                color: "#2c3e50",
                position: { x: 30, y: 30 },
                size: { width: 200, height: 30 }
              }
            },
            {
              id: "text2",
              type: "text",
              content: "CEO & Founder",
              style: {
                fontSize: 14,
                color: "#7f8c8d",
                position: { x: 30, y: 70 },
                size: { width: 200, height: 20 }
              }
            }
          ],
          background: {
            type: "solid",
            value: "#f8f9fa",
            color: "#f8f9fa"
          },
          dimensions: { width: 350, height: 200 }
        },
        templateId: "business",
        userId: 1,
        shareId: nanoid(),
        isPublic: true,
        createdAt: new Date()
      }
    ];

    this.cards = sampleCards;
    this.nextCardId = 3;
  }

  async createCard(cardData: InsertCard): Promise<Card> {
    const card: Card = {
      id: this.nextCardId++,
      title: cardData.title,
      content: cardData.content,
      templateId: cardData.templateId,
      userId: cardData.userId || 1,
      shareId: nanoid(),
      isPublic: cardData.isPublic || false,
      createdAt: new Date()
    };

    this.cards.push(card);
    return card;
  }

  async getUserCards(userId: number): Promise<Card[]> {
    return this.cards.filter(card => card.userId === userId);
  }

  async getCard(id: number): Promise<Card | undefined> {
    return this.cards.find(card => card.id === id);
  }

  async updateCard(id: number, updates: Partial<Card>): Promise<Card | undefined> {
    const cardIndex = this.cards.findIndex(card => card.id === id);
    if (cardIndex === -1) return undefined;

    this.cards[cardIndex] = { ...this.cards[cardIndex], ...updates };
    return this.cards[cardIndex];
  }

  async deleteCard(id: number): Promise<boolean> {
    const cardIndex = this.cards.findIndex(card => card.id === id);
    if (cardIndex === -1) return false;

    this.cards.splice(cardIndex, 1);
    return true;
  }

  async getCardByShareId(shareId: string): Promise<Card | undefined> {
    return this.cards.find(card => card.shareId === shareId);
  }

  async getShowcaseCards(): Promise<Card[]> {
    return this.cards.filter(card => card.isPublic).slice(0, 6);
  }

  async createFeedback(feedbackData: InsertFeedback): Promise<Feedback> {
    const feedback: Feedback = {
      id: this.nextFeedbackId++,
      type: feedbackData.type,
      subject: feedbackData.subject,
      description: feedbackData.description,
      email: feedbackData.email,
      userAgent: feedbackData.userAgent,
      url: feedbackData.url,
      status: 'open',
      createdAt: new Date()
    };

    this.feedback.push(feedback);
    return feedback;
  }

  async getAllFeedback(): Promise<Feedback[]> {
    return this.feedback;
  }

  async getFeedbackById(id: number): Promise<Feedback | undefined> {
    return this.feedback.find(f => f.id === id);
  }
}

export const storage = new MemoryStorage(); 