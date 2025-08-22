import React from 'react';
import { VideoBlock } from '@/components/atoms/VideoBlock';
import { cn } from '@/utils/cn';

interface VideoSectionProps {
  title?: string;
  subtitle?: string;
  videos: Array<{
    id: string;
    src: string;
    poster?: string;
    title?: string;
    description?: string;
    type?: 'video' | 'image';
  }>;
  className?: string;
  layout?: 'grid' | 'stack' | 'carousel';
  variant?: 'hero' | 'service' | 'portfolio' | 'about';
}

export const VideoSection: React.FC<VideoSectionProps> = ({
  title,
  subtitle,
  videos,
  className,
  layout = 'grid',
  variant = 'service',
}) => {
  const getLayoutClasses = () => {
    switch (layout) {
      case 'grid':
        return 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8';
      case 'stack':
        return 'space-y-8';
      case 'carousel':
        return 'flex overflow-x-auto space-x-6 pb-4';
      default:
        return 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8';
    }
  };

  return (
    <section className={cn("py-16 px-4", className)}>
      <div className="max-w-7xl mx-auto">
        {(title || subtitle) && (
          <div className="text-center mb-12">
            {title && (
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
                {title}
              </h2>
            )}
            {subtitle && (
              <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                {subtitle}
              </p>
            )}
          </div>
        )}
        
        <div className={getLayoutClasses()}>
          {videos.map((video) => (
            <VideoBlock
              key={video.id}
              src={video.src}
              poster={video.poster}
              title={video.title}
              description={video.description}
              className={layout === 'carousel' ? 'min-w-[400px]' : ''}
              variant={variant}
              type={video.type || 'video'}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default VideoSection;
