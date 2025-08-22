import { ClientLayout } from '@/components/organisms/ClientLayout';
import { VideoHeroWidget } from '@/components/organisms/VideoHeroWidget';
import { AboutWidget } from '@/components/organisms/AboutWidget';
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

      {/* About секция */}
      <div id="about">
        <FadeIn durationMs={1000} delayMs={500} triggerOnScroll id="about-fade">
          <AboutWidget />
        </FadeIn>
      </div>
    </ClientLayout>
  );
}




