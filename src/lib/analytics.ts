import ReactGA from 'react-ga4';

// Google Analytics 配置
const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;

// 初始化 GA4
export const initializeGA = () => {
  if (GA_MEASUREMENT_ID && typeof window !== 'undefined') {
    ReactGA.initialize(GA_MEASUREMENT_ID);
  }
};

// 页面访问追踪
export const trackPageView = (path: string) => {
  if (GA_MEASUREMENT_ID && typeof window !== 'undefined') {
    ReactGA.send({ hitType: 'pageview', page: path });
  }
}; 