import { VideoHeroWidget } from '@/components/organisms/VideoHeroWidget';
import { ClientLayout } from '@/components/organisms/ClientLayout';
import FadeIn from '@/components/atoms/FadeIn';

export default function Home() {
  return (
    <ClientLayout>
      {/* Hero секция */}
      <div id="hero">
        <FadeIn durationMs={1000} delayMs={300} triggerOnScroll id="hero-fade">
          <VideoHeroWidget />
        </FadeIn>
      </div>
    </ClientLayout>
  );
}




