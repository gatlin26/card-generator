import { CardContent } from "@/shared/schema";

export interface Template {
  id: string;
  name: string;
  category: string;
  preview: {
    gradient: string;
    icon: string;
  };
  content: CardContent;
}

export const templates: Template[] = [
  {
    id: "clean-quote",
    name: "Clean Quote",
    category: "Quote Cards",
    preview: {
      gradient: "from-blue-100 to-blue-200",
      icon: "fas fa-quote-left"
    },
    content: {
      elements: [
        {
          id: "quote-text",
          type: "text",
          content: "The best way to predict the future is to create it yourself.",
          style: {
            fontSize: 20,
            fontWeight: "500",
            fontFamily: "Inter",
            color: "#FFFFFF",
            textAlign: "left",
            position: { x: 32, y: 100 },
            size: { width: 336, height: 120 }
          }
        },
        {
          id: "author-text",
          type: "text",
          content: "— Peter Drucker",
          style: {
            fontSize: 14,
            fontWeight: "500",
            fontFamily: "Inter",
            color: "#DBEAFE",
            textAlign: "left",
            position: { x: 32, y: 240 },
            size: { width: 200, height: 24 }
          }
        }
      ],
      background: {
        type: "gradient",
        value: "linear-gradient(135deg, #3B82F6, #2563EB)",
        gradientStart: "#3B82F6",
        gradientEnd: "#2563EB"
      },
      dimensions: {
        width: 400,
        height: 500
      }
    }
  },
  {
    id: "modern-quote",
    name: "Modern Quote",
    category: "Quote Cards",
    preview: {
      gradient: "from-indigo-100 to-indigo-200",
      icon: "fas fa-quote-left"
    },
    content: {
      elements: [
        {
          id: "quote-text",
          type: "text",
          content: "Innovation distinguishes between a leader and a follower.",
          style: {
            fontSize: 22,
            fontWeight: "600",
            fontFamily: "Inter",
            color: "#FFFFFF",
            textAlign: "center",
            position: { x: 32, y: 150 },
            size: { width: 336, height: 100 }
          }
        },
        {
          id: "author-text",
          type: "text",
          content: "— Steve Jobs",
          style: {
            fontSize: 16,
            fontWeight: "400",
            fontFamily: "Inter",
            color: "#C7D2FE",
            textAlign: "center",
            position: { x: 32, y: 280 },
            size: { width: 336, height: 24 }
          }
        }
      ],
      background: {
        type: "gradient",
        value: "linear-gradient(135deg, #6366F1, #4F46E5)",
        gradientStart: "#6366F1",
        gradientEnd: "#4F46E5"
      },
      dimensions: {
        width: 400,
        height: 500
      }
    }
  },
  {
    id: "bullet-list",
    name: "Bullet List",
    category: "List Cards",
    preview: {
      gradient: "from-emerald-100 to-emerald-200",
      icon: "fas fa-list"
    },
    content: {
      elements: [
        {
          id: "title-text",
          type: "text",
          content: "Key Benefits",
          style: {
            fontSize: 24,
            fontWeight: "700",
            fontFamily: "Inter",
            color: "#FFFFFF",
            textAlign: "left",
            position: { x: 32, y: 40 },
            size: { width: 336, height: 32 }
          }
        },
        {
          id: "list-text",
          type: "text",
          content: "• Increase productivity\n• Better collaboration\n• Faster decision making\n• Improved outcomes",
          style: {
            fontSize: 16,
            fontWeight: "400",
            fontFamily: "Inter",
            color: "#D1FAE5",
            textAlign: "left",
            position: { x: 32, y: 100 },
            size: { width: 336, height: 160 }
          }
        }
      ],
      background: {
        type: "gradient",
        value: "linear-gradient(135deg, #10B981, #059669)",
        gradientStart: "#10B981",
        gradientEnd: "#059669"
      },
      dimensions: {
        width: 400,
        height: 500
      }
    }
  },
  {
    id: "profile-card",
    name: "Profile Card",
    category: "Profile Cards",
    preview: {
      gradient: "from-purple-100 to-purple-200",
      icon: "fas fa-user"
    },
    content: {
      elements: [
        {
          id: "name-text",
          type: "text",
          content: "Sarah Johnson",
          style: {
            fontSize: 28,
            fontWeight: "700",
            fontFamily: "Inter",
            color: "#FFFFFF",
            textAlign: "center",
            position: { x: 32, y: 220 },
            size: { width: 336, height: 36 }
          }
        },
        {
          id: "title-text",
          type: "text",
          content: "UX Designer",
          style: {
            fontSize: 16,
            fontWeight: "400",
            fontFamily: "Inter",
            color: "#DDD6FE",
            textAlign: "center",
            position: { x: 32, y: 270 },
            size: { width: 336, height: 24 }
          }
        },
        {
          id: "description-text",
          type: "text",
          content: "Passionate about creating user-centered design solutions",
          style: {
            fontSize: 14,
            fontWeight: "400",
            fontFamily: "Inter",
            color: "#C4B5FD",
            textAlign: "center",
            position: { x: 32, y: 310 },
            size: { width: 336, height: 60 }
          }
        }
      ],
      background: {
        type: "gradient",
        value: "linear-gradient(135deg, #8B5CF6, #7C3AED)",
        gradientStart: "#8B5CF6",
        gradientEnd: "#7C3AED"
      },
      dimensions: {
        width: 400,
        height: 500
      }
    }
  },
  {
    id: "tech-tutorial",
    name: "Tech Tutorial",
    category: "Tutorial Cards",
    preview: {
      gradient: "from-orange-100 to-orange-200",
      icon: "fas fa-code"
    },
    content: {
      elements: [
        {
          id: "title-text",
          type: "text",
          content: "React Best Practices",
          style: {
            fontSize: 24,
            fontWeight: "700",
            fontFamily: "Inter",
            color: "#FFFFFF",
            textAlign: "left",
            position: { x: 32, y: 40 },
            size: { width: 336, height: 32 }
          }
        },
        {
          id: "step-text",
          type: "text",
          content: "1. Use functional components\n2. Implement proper hooks\n3. Optimize performance\n4. Write clean code",
          style: {
            fontSize: 16,
            fontWeight: "400",
            fontFamily: "Inter",
            color: "#FED7AA",
            textAlign: "left",
            position: { x: 32, y: 100 },
            size: { width: 336, height: 160 }
          }
        }
      ],
      background: {
        type: "gradient",
        value: "linear-gradient(135deg, #F97316, #EA580C)",
        gradientStart: "#F97316",
        gradientEnd: "#EA580C"
      },
      dimensions: {
        width: 400,
        height: 500
      }
    }
  }
];

export const templateCategories = [
  { id: "all", name: "全部模板", icon: "fas fa-th" },
  { id: "Quote Cards", name: "名言引用", icon: "fas fa-quote-left" },
  { id: "Knowledge Cards", name: "知识卡片", icon: "fas fa-lightbulb" },
  { id: "Tutorial Cards", name: "教程步骤", icon: "fas fa-list-ol" },
  { id: "Stats Cards", name: "数据统计", icon: "fas fa-chart-bar" },
  { id: "List Cards", name: "列表清单", icon: "fas fa-list" },
  { id: "Profile Cards", name: "个人简介", icon: "fas fa-user" },
  { id: "Comparison Cards", name: "对比分析", icon: "fas fa-exchange-alt" },
  { id: "Question Cards", name: "问答互动", icon: "fas fa-question" },
  { id: "Social Media Cards", name: "社交媒体", icon: "fas fa-share-alt" }
];

// Social Media Platform Dimensions
export const socialMediaDimensions = {
  instagram: {
    post: { width: 400, height: 400 },
    story: { width: 360, height: 640 },
    reel: { width: 360, height: 640 }
  },
  twitter: {
    post: { width: 400, height: 300 },
    header: { width: 600, height: 200 }
  },
  linkedin: {
    post: { width: 400, height: 300 },
    article: { width: 500, height: 300 }
  },
  facebook: {
    post: { width: 400, height: 300 },
    cover: { width: 600, height: 300 }
  }
};

// Add Social Media Templates to the main templates array
export const socialMediaTemplates: Template[] = [
  {
    id: "instagram-quote",
    name: "Instagram Quote",
    category: "Social Media Cards",
    preview: {
      gradient: "from-pink-100 to-purple-200",
      icon: "fas fa-quote-left"
    },
    content: {
      elements: [
        {
          id: "quote-text",
          type: "text",
          content: "Every moment is a fresh beginning.",
          style: {
            fontSize: 24,
            fontWeight: "700",
            fontFamily: "Inter",
            color: "#FFFFFF",
            textAlign: "center",
            position: { x: 40, y: 150 },
            size: { width: 320, height: 100 }
          }
        },
        {
          id: "hashtags",
          type: "text",
          content: "#motivation #inspire #quotes",
          style: {
            fontSize: 14,
            fontWeight: "400",
            fontFamily: "Inter",
            color: "#FBBF24",
            textAlign: "center",
            position: { x: 40, y: 280 },
            size: { width: 320, height: 24 }
          }
        }
      ],
      background: {
        type: "gradient",
        value: "linear-gradient(135deg, #EC4899, #8B5CF6)",
        gradientStart: "#EC4899",
        gradientEnd: "#8B5CF6"
      },
      dimensions: {
        width: 400,
        height: 400
      }
    }
  },
  {
    id: "twitter-tip",
    name: "Twitter Tip",
    category: "Social Media Cards",
    preview: {
      gradient: "from-blue-100 to-cyan-200",
      icon: "fas fa-lightbulb"
    },
    content: {
      elements: [
        {
          id: "tip-label",
          type: "text",
          content: "💡 Pro Tip",
          style: {
            fontSize: 14,
            fontWeight: "600",
            fontFamily: "Inter",
            color: "#FFFFFF",
            textAlign: "left",
            position: { x: 30, y: 30 },
            size: { width: 120, height: 20 }
          }
        },
        {
          id: "tip-content",
          type: "text",
          content: "Consistency beats perfection every time. Small daily actions compound into remarkable results.",
          style: {
            fontSize: 18,
            fontWeight: "500",
            fontFamily: "Inter",
            color: "#FFFFFF",
            textAlign: "left",
            position: { x: 30, y: 80 },
            size: { width: 340, height: 120 }
          }
        },
        {
          id: "cta",
          type: "text",
          content: "What's your next small step? 👇",
          style: {
            fontSize: 14,
            fontWeight: "400",
            fontFamily: "Inter",
            color: "#BFDBFE",
            textAlign: "left",
            position: { x: 30, y: 220 },
            size: { width: 340, height: 24 }
          }
        }
      ],
      background: {
        type: "gradient",
        value: "linear-gradient(135deg, #1DA1F2, #0EA5E9)",
        gradientStart: "#1DA1F2",
        gradientEnd: "#0EA5E9"
      },
      dimensions: {
        width: 400,
        height: 300
      }
    }
  },
  {
    id: "linkedin-achievement",
    name: "LinkedIn Achievement",
    category: "Social Media Cards",
    preview: {
      gradient: "from-blue-100 to-indigo-200",
      icon: "fas fa-trophy"
    },
    content: {
      elements: [
        {
          id: "achievement-emoji",
          type: "text",
          content: "🎉",
          style: {
            fontSize: 32,
            fontWeight: "400",
            fontFamily: "Inter",
            color: "#FFFFFF",
            textAlign: "center",
            position: { x: 40, y: 40 },
            size: { width: 320, height: 40 }
          }
        },
        {
          id: "achievement-title",
          type: "text",
          content: "Milestone Achieved",
          style: {
            fontSize: 24,
            fontWeight: "700",
            fontFamily: "Inter",
            color: "#FFFFFF",
            textAlign: "center",
            position: { x: 40, y: 100 },
            size: { width: 320, height: 32 }
          }
        },
        {
          id: "achievement-description",
          type: "text",
          content: "Just completed my 100th project! Grateful for every challenge that led to this moment.",
          style: {
            fontSize: 16,
            fontWeight: "400",
            fontFamily: "Inter",
            color: "#DBEAFE",
            textAlign: "center",
            position: { x: 40, y: 160 },
            size: { width: 320, height: 80 }
          }
        }
      ],
      background: {
        type: "gradient",
        value: "linear-gradient(135deg, #0077B5, #004182)",
        gradientStart: "#0077B5",
        gradientEnd: "#004182"
      },
      dimensions: {
        width: 400,
        height: 300
      }
    }
  },
  {
    id: "instagram-story",
    name: "Instagram Story",
    category: "Social Media Cards",
    preview: {
      gradient: "from-orange-100 to-red-200",
      icon: "fas fa-mobile-alt"
    },
    content: {
      elements: [
        {
          id: "story-title",
          type: "text",
          content: "Daily Inspiration",
          style: {
            fontSize: 28,
            fontWeight: "700",
            fontFamily: "Inter",
            color: "#FFFFFF",
            textAlign: "center",
            position: { x: 30, y: 200 },
            size: { width: 300, height: 40 }
          }
        },
        {
          id: "story-content",
          type: "text",
          content: "Dream big, start small, but most importantly, START.",
          style: {
            fontSize: 20,
            fontWeight: "500",
            fontFamily: "Inter",
            color: "#FEF3C7",
            textAlign: "center",
            position: { x: 30, y: 280 },
            size: { width: 300, height: 120 }
          }
        },
        {
          id: "story-cta",
          type: "text",
          content: "Swipe up for more 👆",
          style: {
            fontSize: 14,
            fontWeight: "400",
            fontFamily: "Inter",
            color: "#FFFFFF",
            textAlign: "center",
            position: { x: 30, y: 500 },
            size: { width: 300, height: 24 }
          }
        }
      ],
      background: {
        type: "gradient",
        value: "linear-gradient(135deg, #F59E0B, #EF4444)",
        gradientStart: "#F59E0B",
        gradientEnd: "#EF4444"
      },
      dimensions: {
        width: 360,
        height: 640
      }
    }
  },
  {
    id: "facebook-event",
    name: "Facebook Event",
    category: "Social Media Cards",
    preview: {
      gradient: "from-indigo-100 to-purple-200",
      icon: "fas fa-calendar"
    },
    content: {
      elements: [
        {
          id: "event-date",
          type: "text",
          content: "DEC 15",
          style: {
            fontSize: 20,
            fontWeight: "700",
            fontFamily: "Inter",
            color: "#FFFFFF",
            textAlign: "center",
            position: { x: 30, y: 40 },
            size: { width: 100, height: 28 }
          }
        },
        {
          id: "event-title",
          type: "text",
          content: "Workshop: Design Thinking Fundamentals",
          style: {
            fontSize: 22,
            fontWeight: "700",
            fontFamily: "Inter",
            color: "#FFFFFF",
            textAlign: "left",
            position: { x: 30, y: 100 },
            size: { width: 340, height: 60 }
          }
        },
        {
          id: "event-details",
          type: "text",
          content: "Join us for an interactive session on design thinking principles and practical applications.",
          style: {
            fontSize: 16,
            fontWeight: "400",
            fontFamily: "Inter",
            color: "#C7D2FE",
            textAlign: "left",
            position: { x: 30, y: 180 },
            size: { width: 340, height: 60 }
          }
        }
      ],
      background: {
        type: "gradient",
        value: "linear-gradient(135deg, #4F46E5, #7C3AED)",
        gradientStart: "#4F46E5",
        gradientEnd: "#7C3AED"
      },
      dimensions: {
        width: 400,
        height: 300
      }
    }
  },
  {
    id: "social-stats",
    name: "Social Stats",
    category: "Social Media Cards",
    preview: {
      gradient: "from-green-100 to-emerald-200",
      icon: "fas fa-chart-line"
    },
    content: {
      elements: [
        {
          id: "stats-title",
          type: "text",
          content: "This Month's Growth",
          style: {
            fontSize: 20,
            fontWeight: "600",
            fontFamily: "Inter",
            color: "#FFFFFF",
            textAlign: "center",
            position: { x: 40, y: 40 },
            size: { width: 320, height: 28 }
          }
        },
        {
          id: "main-stat",
          type: "text",
          content: "+2.5K",
          style: {
            fontSize: 48,
            fontWeight: "700",
            fontFamily: "Inter",
            color: "#FFFFFF",
            textAlign: "center",
            position: { x: 40, y: 100 },
            size: { width: 320, height: 60 }
          }
        },
        {
          id: "stat-label",
          type: "text",
          content: "New Followers",
          style: {
            fontSize: 16,
            fontWeight: "400",
            fontFamily: "Inter",
            color: "#A7F3D0",
            textAlign: "center",
            position: { x: 40, y: 180 },
            size: { width: 320, height: 24 }
          }
        },
        {
          id: "sub-stats",
          type: "text",
          content: "📈 150% increase\n💬 500+ new comments\n❤️ 1.2K more likes",
          style: {
            fontSize: 14,
            fontWeight: "400",
            fontFamily: "Inter",
            color: "#D1FAE5",
            textAlign: "center",
            position: { x: 40, y: 220 },
            size: { width: 320, height: 80 }
          }
        }
      ],
      background: {
        type: "gradient",
        value: "linear-gradient(135deg, #10B981, #059669)",
        gradientStart: "#10B981",
        gradientEnd: "#059669"
      },
      dimensions: {
        width: 400,
        height: 400
      }
    }
  }
];

// Merge social media templates with existing templates
templates.push(...socialMediaTemplates);
