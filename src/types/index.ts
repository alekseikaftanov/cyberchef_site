export interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string;
  ogImage?: string;
  ogUrl?: string;
  canonical?: string;
}

export interface LayoutProps {
  children: React.ReactNode;
  seo?: SEOProps;
}

export interface ButtonProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  onClick?: () => void;
  type?: 'button' | 'submit';
  disabled?: boolean;
}

export interface SectionProps {
  children: React.ReactNode;
  className?: string;
  id?: string;
}

export interface WidgetTextBlock {
  title: string;
  text: string[];
}

export interface Direction {
  key: string;
  label: string;
  color: string;
  content: WidgetTextBlock[];
  icon?: string; // путь к иконке, если потребуется
} 