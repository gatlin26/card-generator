"use client"

import { useState, useEffect } from 'react';

export type Language = 'en' | 'zh';

export interface Translations {
  // Template categories
  templateLibrary: string;
  allTemplates: string;
  quoteCards: string;
  knowledgeCards: string;
  tutorialCards: string;
  statsCards: string;
  listCards: string;
  profileCards: string;
  comparisonCards: string;

  questionCards: string;
  blankCanvas: string;
  
  // Editor interface
  zoom: string;
  download: string;
  share: string;
  undo: string;
  redo: string;
  properties: string;
  background: string;
  fontSize: string;
  fontWeight: string;
  fontFamily: string;
  color: string;
  textAlign: string;
  position: string;
  size: string;
  
  // Common
  save: string;
  cancel: string;
  delete: string;
  edit: string;
  title: string;
  content: string;
  
  // Landing page
  startCreating: string;
  viewTemplates: string;
  whyChoose: string;
  readyToStart: string;
  startFree: string;
  heroTitle: string;
  heroSubtitle: string;
  heroDescription: string;
  
  // Features
  smartTemplates: string;
  smartTemplatesDesc: string;
  realTimeEditing: string;
  realTimeEditingDesc: string;
  customBackgrounds: string;
  customBackgroundsDesc: string;
  dragAndDrop: string;
  dragAndDropDesc: string;
  socialReady: string;
  socialReadyDesc: string;
  professionalDesign: string;
  professionalDesignDesc: string;
  
  // Stats
  templateTypes: string;
  freeToUseStats: string;
  endlessPossibilities: string;
  
  // CTA
  ctaDescription: string;
  getStarted: string;
  
  // Navigation
  editor: string;
  home: string;
  
  // Share functionality
  shareYourCard: string;
  shareContent: string;
  shareTitle: string;
  shareDescription: string;
  hashtags: string;
  shareToSocialMedia: string;
  otherOptions: string;
  downloadImage: string;
  copyLink: string;
  generatingImage: string;
  shareSuccess: string;
  readyToShare: string;
  shareError: string;
  failedToGenerate: string;
  copiedToClipboard: string;
  shareContentCopied: string;
  linkCopied: string;
  pageLinkCopied: string;
  
  // How it works section
  howItWorks: string;
  step1Title: string;
  step1Desc: string;
  step2Title: string;
  step2Desc: string;
  step3Title: string;
  step3Desc: string;
  step4Title: string;
  step4Desc: string;
  
  // Feedback system
  feedback: string;
  bugReport: string;
  featureRequest: string;
  improvement: string;
  generalFeedback: string;
  submitFeedback: string;
  feedbackType: string;
  subject: string;
  description: string;
  email: string;
  emailOptional: string;
  feedbackSubmitted: string;
  feedbackThankYou: string;
  feedbackError: string;
  feedbackFailed: string;
  missingInformation: string;
  fillRequiredFields: string;
  submitting: string;
  
  // Showcase section
  showcaseTitle: string;
  showcaseDescription: string;
  createYourOwn: string;
  
  // User reviews
  userReviewsTitle: string;
  userReviewsDescription: string;
  cardsCreated: string;
  happyUsers: string;
  averageRating: string;
  
  // Footer
  product: string;
  features: string;
  templates: string;
  pricing: string;
  company: string;
  about: string;
  contact: string;
  support: string;
  privacy: string;
  terms: string;
  
  // Online Card Maker page
  onlineCardMakerTitle: string;
  onlineCardMakerSubtitle: string;
  professionalCardTemplates: string;
  professionalCardTemplatesDesc: string;
  customImageUpload: string;
  customImageUploadDesc: string;
  highResolutionDownload: string;
  highResolutionDownloadDesc: string;
  customizableDesignEditor: string;
  customizableDesignEditorDesc: string;
  professionalTypography: string;
  professionalTypographyDesc: string;
  socialMediaReady: string;
  socialMediaReadyDesc: string;
  quickCardGenerator: string;
  quickCardGeneratorDesc: string;
  generateCard: string;
  chooseTemplate: string;
  cardTemplateCategories: string;
  powerfulDesignTools: string;
  perfectForEveryUseCase: string;
  howToCreateCardsOnline: string;
  whyChooseOurOnlineCardMaker: string;
  freeToUse: string;
  freeToUseDesc: string;
  easyToUse: string;
  easyToUseDesc: string;
  socialReadyDesc2: string;
  readyToCreateFirstCard: string;
  readyToCreateFirstCardDesc: string;
  browseTemplates: string;
  socialMediaMarketing: string;
  socialMediaMarketingDesc: string;
  educationalContent: string;
  educationalContentDesc: string;
  businessCommunication: string;
  businessCommunicationDesc: string;
  personalProjects: string;
  personalProjectsDesc: string;
  increaseEngagement: string;
  buildBrandAwareness: string;
  driveTraffic: string;
  simplifyComplexTopics: string;
  visualLearning: string;
  knowledgeRetention: string;
  clearMessaging: string;
  professionalAppearance: string;
  brandConsistency: string;
  expressCreativity: string;
  shareInsights: string;
  inspireOthers: string;
  chooseTemplateCategoryStep: string;
  chooseTemplateCategoryStepDesc: string;
  addYourContentStep: string;
  addYourContentStepDesc: string;
  customizeDesignStep: string;
  customizeDesignStepDesc: string;
  downloadShareStep: string;
  downloadShareStepDesc: string;
  dragDropEditor: string;
  dragDropEditorDesc: string;
  textFormatting: string;
  textFormattingDesc: string;
  backgroundOptions: string;
  backgroundOptionsDesc: string;
  elementResizing: string;
  elementResizingDesc: string;
  customColors: string;
  customColorsDesc: string;
  templateLibraryTool: string;
  templateLibraryToolDesc: string;
}

const translations: Record<Language, Translations> = {
  en: {
    // Template categories
    templateLibrary: 'Template Library',
    allTemplates: 'All Templates',
    quoteCards: 'Quote Cards',
    knowledgeCards: 'Knowledge Cards',
    tutorialCards: 'Tutorial Cards',
    statsCards: 'Stats Cards',
    listCards: 'List Cards',
    profileCards: 'Profile Cards',
    comparisonCards: 'Comparison Cards',

    questionCards: 'Question Cards',
    blankCanvas: 'Blank Canvas',
    
    // Editor interface
    zoom: 'Zoom',
    download: 'Download',
    share: 'Share',
    undo: 'Undo',
    redo: 'Redo',
    properties: 'Properties',
    background: 'Background',
    fontSize: 'Font Size',
    fontWeight: 'Font Weight',
    fontFamily: 'Font Family',
    color: 'Color',
    textAlign: 'Text Align',
    position: 'Position',
    size: 'Size',
    
    // Common
    save: 'Save',
    cancel: 'Cancel',
    delete: 'Delete',
    edit: 'Edit',
    title: 'Title',
    content: 'Content',
    
    // Landing page
    startCreating: 'Start Creating',
    viewTemplates: 'View Templates',
    whyChoose: 'Why Choose CardCraft?',
    readyToStart: 'Ready to start creating?',
    startFree: 'Start Free',
    heroTitle: 'Transform Ideas into',
    heroSubtitle: 'Visual Social Cards',
    heroDescription: 'Create stunning social media cards, quote graphics, and visual content in minutes. Perfect for content creators, marketers, and anyone who wants to make an impact online.',
    
    // Features
    smartTemplates: 'Smart Templates',
    smartTemplatesDesc: 'Choose from 8 professionally designed template categories including quotes, tutorials, stats, and more.',
    realTimeEditing: 'Real-time Editing',
    realTimeEditingDesc: 'Drag, drop, and edit elements with instant visual feedback. What you see is what you get.',
    customBackgrounds: 'Custom Backgrounds',
    customBackgroundsDesc: 'Solid colors, gradients, or upload your own images to create the perfect backdrop.',
    dragAndDrop: 'Drag & Drop Interface',
    dragAndDropDesc: 'Intuitive design tools that anyone can master. No design experience required.',
    socialReady: 'Social Media Ready',
    socialReadyDesc: 'Perfect dimensions and formats for Twitter, Instagram, LinkedIn, and all major platforms.',
    professionalDesign: 'Professional Quality',
    professionalDesignDesc: 'Export high-resolution images that look great everywhere you share them.',
    
    // Stats
    templateTypes: '8+ Template Types',
    freeToUseStats: '100% Free',
    endlessPossibilities: 'Unlimited Creations',
    
    // CTA
    ctaDescription: 'Join thousands of creators who are already making stunning visual content with CardCraft.',
    getStarted: 'Get Started Now',
    
    // Navigation
    editor: 'Editor',
    home: 'Home',
    
    // Share functionality
    shareYourCard: 'Share Your Card',
    shareContent: 'Customize your share content and choose a platform to share your card.',
    shareTitle: 'Title',
    shareDescription: 'Description',
    hashtags: 'Hashtags (space separated)',
    shareToSocialMedia: 'Share to Social Media',
    otherOptions: 'Other Options',
    downloadImage: 'Download Image',
    copyLink: 'Copy Link',
    generatingImage: 'Generating image...',
    shareSuccess: 'Success',
    readyToShare: 'Ready to share!',
    shareError: 'Share Error',
    failedToGenerate: 'Failed to generate image for sharing',
    copiedToClipboard: 'Copied to Clipboard',
    shareContentCopied: 'Share content copied. You can now paste it in WeChat.',
    linkCopied: 'Link Copied',
    pageLinkCopied: 'Page link copied to clipboard',
    
    // How it works section
    howItWorks: 'How It Works',
    step1Title: 'Choose a Template',
    step1Desc: 'Select from our curated collection of professional templates designed for different content types and social platforms.',
    step2Title: 'Customize Your Design',
    step2Desc: 'Edit text, adjust colors, upload images, and personalize every element with our intuitive drag-and-drop editor.',
    step3Title: 'Perfect Your Layout',
    step3Desc: 'Fine-tune positioning, typography, and backgrounds to match your brand and message perfectly.',
    step4Title: 'Export & Share',
    step4Desc: 'Download high-resolution images ready for any platform or share directly with a custom link.',
    
    // Footer
    product: 'Product',
    features: 'Features',
    templates: 'Templates',
    pricing: 'Pricing',
    company: 'Company',
    about: 'About',
    contact: 'Contact',
    support: 'Support',
    privacy: 'Privacy Policy',
    terms: 'Terms of Service',
    
    // Feedback system
    feedback: 'Feedback',
    bugReport: 'Bug Report',
    featureRequest: 'Feature Request',
    improvement: 'Improvement',
    generalFeedback: 'General Feedback',
    submitFeedback: 'Submit Feedback',
    feedbackType: 'Feedback Type',
    subject: 'Subject',
    description: 'Description',
    email: 'Email',
    emailOptional: 'Email (Optional)',
    feedbackSubmitted: 'Feedback Submitted',
    feedbackThankYou: 'Thank you for your feedback! We\'ll review it soon.',
    feedbackError: 'Error',
    feedbackFailed: 'Failed to submit feedback. Please try again.',
    missingInformation: 'Missing Information',
    fillRequiredFields: 'Please fill in all required fields.',
    submitting: 'Submitting...',
    
    // Showcase section
    showcaseTitle: 'Excellent Cards Showcase',
    showcaseDescription: 'Discover amazing cards created by our community. Get inspired and create your own stunning visual content.',
    createYourOwn: 'Create Your Own Card',
    
    // User reviews
    userReviewsTitle: 'What Our Users Say',
    userReviewsDescription: 'Join thousands of creators, marketers, and professionals who trust CardCraft for their visual content needs.',
    cardsCreated: 'Cards Created',
    happyUsers: 'Happy Users',
    averageRating: 'Average Rating',
    
    // Online Card Maker page
    onlineCardMakerTitle: 'Online Card Maker - Create Visual Cards Free',
    onlineCardMakerSubtitle: 'Create stunning visual cards online with our free card maker. Professional templates for Quote Cards, Knowledge Cards, Tutorial Cards, and more. Perfect for social media, presentations, and educational content.',
    professionalCardTemplates: 'Professional Card Templates',
    professionalCardTemplatesDesc: 'Access 8 categories of professional card templates including Quote Cards, Knowledge Cards, Tutorial Cards, and Stats Cards for every occasion.',
    customImageUpload: 'Custom Image Upload',
    customImageUploadDesc: 'Upload your own photos and images to create personalized cards. Our card maker supports JPG, PNG, and SVG formats.',
    highResolutionDownload: 'High-Resolution Download',
    highResolutionDownloadDesc: 'Download your finished cards in high resolution. Perfect for sharing on social media platforms or using in presentations.',
    customizableDesignEditor: 'Customizable Design Editor',
    customizableDesignEditorDesc: 'Full customization control with drag-and-drop editing. Change fonts, colors, layouts, and backgrounds in our intuitive card maker.',
    professionalTypography: 'Professional Typography',
    professionalTypographyDesc: 'Create beautiful text cards with multiple font families, weights, and sizes. Perfect for quotes, educational content, and social media posts.',
    socialMediaReady: 'Social Media Ready',
    socialMediaReadyDesc: 'All card templates are optimized for social media sharing with perfect dimensions for Instagram, Twitter, LinkedIn, and Facebook.',
    quickCardGenerator: 'Quick Card Generator',
    quickCardGeneratorDesc: 'Start creating your card by choosing a template category or go directly to the full editor',
    generateCard: 'Generate Card',
    chooseTemplate: 'Choose Template',
    cardTemplateCategories: 'Card Template Categories',
    powerfulDesignTools: 'Powerful Design Tools',
    perfectForEveryUseCase: 'Perfect for Every Use Case',
    howToCreateCardsOnline: 'How to Create Cards Online',
    whyChooseOurOnlineCardMaker: 'Why Choose Our Online Card Maker?',
    freeToUse: '100% Free',
    freeToUseDesc: 'Create unlimited cards without any cost or watermarks',
    easyToUse: 'Easy to Use',
    easyToUseDesc: 'Drag-and-drop interface that anyone can master in minutes',
    socialReadyDesc2: 'Perfect dimensions for all social media platforms',
    readyToCreateFirstCard: 'Ready to Create Your First Card?',
    readyToCreateFirstCardDesc: 'Join thousands of creators using our free online card maker to create stunning visual content.',
    browseTemplates: 'Browse Templates',
    socialMediaMarketing: 'Social Media Marketing',
    socialMediaMarketingDesc: 'Create engaging visual content for all social platforms',
    educationalContent: 'Educational Content',
    educationalContentDesc: 'Design learning materials and educational posts',
    businessCommunication: 'Business Communication',
    businessCommunicationDesc: 'Professional cards for business presentations',
    personalProjects: 'Personal Projects',
    personalProjectsDesc: 'Create cards for personal use and sharing',
    increaseEngagement: 'Increase engagement',
    buildBrandAwareness: 'Build brand awareness',
    driveTraffic: 'Drive traffic',
    simplifyComplexTopics: 'Simplify complex topics',
    visualLearning: 'Visual learning',
    knowledgeRetention: 'Knowledge retention',
    clearMessaging: 'Clear messaging',
    professionalAppearance: 'Professional appearance',
    brandConsistency: 'Brand consistency',
    expressCreativity: 'Express creativity',
    shareInsights: 'Share insights',
    inspireOthers: 'Inspire others',
    chooseTemplateCategoryStep: 'Choose Template Category',
    chooseTemplateCategoryStepDesc: 'Select from 8 professional template categories that match your content type',
    addYourContentStep: 'Add Your Content',
    addYourContentStepDesc: 'Input your text, upload images, and customize the design elements',
    customizeDesignStep: 'Customize Design',
    customizeDesignStepDesc: 'Adjust colors, fonts, backgrounds, and layout to match your style',
    downloadShareStep: 'Download & Share',
    downloadShareStepDesc: 'Export high-resolution images or share directly to social media',
    dragDropEditor: 'Drag & Drop Editor',
    dragDropEditorDesc: 'Intuitive interface for moving and positioning elements',
    textFormatting: 'Text Formatting',
    textFormattingDesc: 'Multiple fonts, sizes, weights, and colors',
    backgroundOptions: 'Background Options',
    backgroundOptionsDesc: 'Solid colors, gradients, and image uploads',
    elementResizing: 'Element Resizing',
    elementResizingDesc: 'Resize text and image elements with handles',
    customColors: 'Custom Colors',
    customColorsDesc: 'Full color palette for branding consistency',
    templateLibraryTool: 'Template Library',
    templateLibraryToolDesc: '8 categories with multiple designs each',
  },
  zh: {
    // Template categories
    templateLibrary: '模板库',
    allTemplates: '全部模板',
    quoteCards: '名言引用',
    knowledgeCards: '知识卡片',
    tutorialCards: '教程步骤',
    statsCards: '数据统计',
    listCards: '列表清单',
    profileCards: '个人简介',
    comparisonCards: '对比分析',

    questionCards: '问答互动',
    blankCanvas: '空白画布',
    
    // Editor interface
    zoom: '缩放',
    download: '下载',
    share: '分享',
    undo: '撤销',
    redo: '重做',
    properties: '属性',
    background: '背景',
    fontSize: '字体大小',
    fontWeight: '字体粗细',
    fontFamily: '字体系列',
    color: '颜色',
    textAlign: '文本对齐',
    position: '位置',
    size: '尺寸',
    
    // Common
    save: '保存',
    cancel: '取消',
    delete: '删除',
    edit: '编辑',
    title: '标题',
    content: '内容',
    
    // Landing page
    startCreating: '开始创作',
    viewTemplates: '查看模板',
    whyChoose: '为什么选择 CardCraft？',
    readyToStart: '准备好开始创作了吗？',
    startFree: '免费开始使用',
    heroTitle: '将创意转化为',
    heroSubtitle: '精美社交卡片',
    heroDescription: '几分钟内创建令人惊艳的社交媒体卡片、名言图片和视觉内容。完美适合内容创作者、营销人员和任何想要在线产生影响力的人。',
    
    // Features
    smartTemplates: '智能模板',
    smartTemplatesDesc: '从8个专业设计的模板类别中选择，包括名言、教程、数据统计等。',
    realTimeEditing: '实时编辑',
    realTimeEditingDesc: '拖拽编辑元素，即时视觉反馈。所见即所得的设计体验。',
    customBackgrounds: '自定义背景',
    customBackgroundsDesc: '纯色、渐变或上传您自己的图片，创造完美的视觉背景。',
    dragAndDrop: '拖拽界面',
    dragAndDropDesc: '直观的设计工具，任何人都能轻松掌握。无需设计经验。',
    socialReady: '社交媒体就绪',
    socialReadyDesc: '完美适配Twitter、Instagram、LinkedIn等主流平台的尺寸和格式。',
    professionalDesign: '专业品质',
    professionalDesignDesc: '导出高分辨率图片，在任何地方分享都能保持优质效果。',
    
    // Stats
    templateTypes: '8种模板类型',
    freeToUseStats: '100% 免费',
    endlessPossibilities: '无限创作',
    
    // CTA
    ctaDescription: '加入数千名创作者，他们已经在使用 CardCraft 制作令人惊艳的视觉内容。',
    getStarted: '立即开始',
    
    // Navigation
    editor: '编辑器',
    home: '首页',
    
    // Share functionality
    shareYourCard: '分享您的卡片',
    shareContent: '自定义分享内容，选择平台分享您的卡片。',
    shareTitle: '标题',
    shareDescription: '描述',
    hashtags: '标签 (空格分隔)',
    shareToSocialMedia: '分享到社交媒体',
    otherOptions: '其他选项',
    downloadImage: '下载图片',
    copyLink: '复制链接',
    generatingImage: '正在生成图片...',
    shareSuccess: '成功',
    readyToShare: '准备分享！',
    shareError: '分享失败',
    failedToGenerate: '生成分享图片失败',
    copiedToClipboard: '已复制到剪贴板',
    shareContentCopied: '分享内容已复制，现在可以在微信中粘贴。',
    linkCopied: '链接已复制',
    pageLinkCopied: '页面链接已复制到剪贴板',
    
    // How it works section
    howItWorks: '使用流程',
    step1Title: '选择模板',
    step1Desc: '从我们精心策划的专业模板库中选择，涵盖不同内容类型和社交平台的设计需求。',
    step2Title: '自定义设计',
    step2Desc: '编辑文字、调整颜色、上传图片，通过直观的拖拽编辑器个性化每个元素。',
    step3Title: '完善布局',
    step3Desc: '精细调整位置、字体样式和背景，让设计完美匹配您的品牌和信息。',
    step4Title: '导出分享',
    step4Desc: '下载适用于任何平台的高分辨率图片，或通过自定义链接直接分享。',
    
    // Footer
    product: '产品',
    features: '功能特性',
    templates: '模板库',
    pricing: '价格',
    company: '公司',
    about: '关于我们',
    contact: '联系我们',
    support: '技术支持',
    privacy: '隐私政策',
    terms: '服务条款',
    
    // Feedback system
    feedback: '反馈',
    bugReport: '错误报告',
    featureRequest: '功能建议',
    improvement: '改进建议',
    generalFeedback: '一般反馈',
    submitFeedback: '提交反馈',
    feedbackType: '反馈类型',
    subject: '主题',
    description: '详细描述',
    email: '邮箱',
    emailOptional: '邮箱（可选）',
    feedbackSubmitted: '反馈已提交',
    feedbackThankYou: '感谢您的反馈！我们会尽快查看。',
    feedbackError: '错误',
    feedbackFailed: '提交反馈失败，请重试。',
    missingInformation: '信息不完整',
    fillRequiredFields: '请填写所有必填字段。',
    submitting: '提交中...',
    
    // Showcase section
    showcaseTitle: '优秀卡片展示',
    showcaseDescription: '发现社区创建的精彩卡片。获得灵感，创建您自己的令人惊艳的视觉内容。',
    createYourOwn: '创建您自己的卡片',
    
    // User reviews
    userReviewsTitle: '用户评价',
    userReviewsDescription: '加入数千名信任CardCraft满足视觉内容需求的创作者、营销人员和专业人士。',
    cardsCreated: '已创建卡片',
    happyUsers: '满意用户',
    averageRating: '平均评分',
    
    // Online Card Maker page
    onlineCardMakerTitle: '在线卡片制作工具 - 免费创建视觉卡片',
    onlineCardMakerSubtitle: '使用我们的免费在线卡片制作工具创建精美的视觉卡片。专业的名言卡片、知识卡片、教程卡片模板等。完美适用于社交媒体、演示文稿和教育内容。',
    professionalCardTemplates: '专业卡片模板',
    professionalCardTemplatesDesc: '访问8个类别的专业卡片模板，包括名言卡片、知识卡片、教程卡片和数据统计卡片，适用于各种场合。',
    customImageUpload: '自定义图片上传',
    customImageUploadDesc: '上传您自己的照片和图片来创建个性化卡片。我们的卡片制作工具支持JPG、PNG和SVG格式。',
    highResolutionDownload: '高清下载',
    highResolutionDownloadDesc: '以高分辨率下载您完成的卡片。完美适用于社交媒体平台分享或演示文稿使用。',
    customizableDesignEditor: '可定制设计编辑器',
    customizableDesignEditorDesc: '通过拖拽编辑实现完全自定义控制。在我们直观的卡片制作工具中更改字体、颜色、布局和背景。',
    professionalTypography: '专业排版',
    professionalTypographyDesc: '使用多种字体系列、粗细和大小创建美丽的文字卡片。完美适用于名言、教育内容和社交媒体帖子。',
    socialMediaReady: '社交媒体就绪',
    socialMediaReadyDesc: '所有卡片模板都针对社交媒体分享进行了优化，具有Instagram、Twitter、LinkedIn和Facebook的完美尺寸。',
    quickCardGenerator: '快速卡片生成器',
    quickCardGeneratorDesc: '通过选择模板类别开始创建您的卡片，或直接进入完整编辑器',
    generateCard: '生成卡片',
    chooseTemplate: '选择模板',
    cardTemplateCategories: '卡片模板类别',
    powerfulDesignTools: '强大的设计工具',
    perfectForEveryUseCase: '适用于每种使用场景',
    howToCreateCardsOnline: '如何在线创建卡片',
    whyChooseOurOnlineCardMaker: '为什么选择我们的在线卡片制作工具？',
    freeToUse: '100% 免费',
    freeToUseDesc: '无限制创建卡片，无任何费用或水印',
    easyToUse: '易于使用',
    easyToUseDesc: '任何人都能在几分钟内掌握的拖拽界面',
    socialReadyDesc2: '所有社交媒体平台的完美尺寸',
    readyToCreateFirstCard: '准备创建您的第一张卡片？',
    readyToCreateFirstCardDesc: '加入数千名使用我们免费在线卡片制作工具创建精美视觉内容的创作者。',
    browseTemplates: '浏览模板',
    socialMediaMarketing: '社交媒体营销',
    socialMediaMarketingDesc: '为所有社交平台创建引人入胜的视觉内容',
    educationalContent: '教育内容',
    educationalContentDesc: '设计学习材料和教育帖子',
    businessCommunication: '商务沟通',
    businessCommunicationDesc: '用于商务演示的专业卡片',
    personalProjects: '个人项目',
    personalProjectsDesc: '创建用于个人使用和分享的卡片',
    increaseEngagement: '提高参与度',
    buildBrandAwareness: '建立品牌认知度',
    driveTraffic: '推动流量',
    simplifyComplexTopics: '简化复杂主题',
    visualLearning: '视觉学习',
    knowledgeRetention: '知识保留',
    clearMessaging: '清晰信息传达',
    professionalAppearance: '专业外观',
    brandConsistency: '品牌一致性',
    expressCreativity: '表达创意',
    shareInsights: '分享见解',
    inspireOthers: '启发他人',
    chooseTemplateCategoryStep: '选择模板类别',
    chooseTemplateCategoryStepDesc: '从8个专业模板类别中选择与您的内容类型匹配的模板',
    addYourContentStep: '添加您的内容',
    addYourContentStepDesc: '输入您的文字，上传图片，自定义设计元素',
    customizeDesignStep: '自定义设计',
    customizeDesignStepDesc: '调整颜色、字体、背景和布局以匹配您的风格',
    downloadShareStep: '下载和分享',
    downloadShareStepDesc: '导出高分辨率图片或直接分享到社交媒体',
    dragDropEditor: '拖拽编辑器',
    dragDropEditorDesc: '移动和定位元素的直观界面',
    textFormatting: '文字格式化',
    textFormattingDesc: '多种字体、大小、粗细和颜色',
    backgroundOptions: '背景选项',
    backgroundOptionsDesc: '纯色、渐变和图片上传',
    elementResizing: '元素调整大小',
    elementResizingDesc: '使用句柄调整文本和图片元素大小',
    customColors: '自定义颜色',
    customColorsDesc: '用于品牌一致性的完整调色板',
    templateLibraryTool: '模板库',
    templateLibraryToolDesc: '8个类别，每个都有多种设计',
  }
};

class I18nManager {
  private language: Language = 'en';
  private listeners: Array<(lang: Language) => void> = [];

  constructor() {
    // Load language from localStorage or default to English
    // Check if we're in browser environment
    if (typeof window !== 'undefined' && window.localStorage) {
      const savedLang = localStorage.getItem('cardcraft-language') as Language;
      if (savedLang && ['en', 'zh'].includes(savedLang)) {
        this.language = savedLang;
      }
    }
  }

  getLanguage(): Language {
    return this.language;
  }

  setLanguage(lang: Language) {
    this.language = lang;
    // Only access localStorage in browser environment
    if (typeof window !== 'undefined' && window.localStorage) {
      localStorage.setItem('cardcraft-language', lang);
    }
    this.listeners.forEach(listener => listener(lang));
  }

  subscribe(listener: (lang: Language) => void) {
    this.listeners.push(listener);
    return () => {
      this.listeners = this.listeners.filter(l => l !== listener);
    };
  }

  t(key: keyof Translations): string {
    return translations[this.language][key];
  }
}

export const i18n = new I18nManager();

export function useI18n() {
  const [language, setLanguage] = useState<Language>(i18n.getLanguage());

  useEffect(() => {
    const unsubscribe = i18n.subscribe(setLanguage);
    return unsubscribe;
  }, []);

  // 创建一个混合对象，既支持函数调用又支持属性访问
  const t = ((key: keyof Translations) => translations[language][key]) as ((key: keyof Translations) => string) & Translations;
  
  // 将所有翻译键作为属性添加到函数上
  Object.keys(translations[language]).forEach(key => {
    (t as any)[key] = translations[language][key as keyof Translations];
  });

  return {
    language,
    setLanguage: i18n.setLanguage.bind(i18n),
    t
  };
}