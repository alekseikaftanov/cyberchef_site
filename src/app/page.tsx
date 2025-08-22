import { ClientLayout } from '@/components/organisms/ClientLayout';
import { VideoHeroWidget } from '@/components/organisms/VideoHeroWidget';
import { AboutWidget } from '@/components/organisms/AboutWidget';
import { ServicesWidget } from '@/components/organisms/ServicesWidget';
import { FutureWidget } from '@/components/organisms/FutureWidget';
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

      {/* Services секция */}
      <div id="services">
        <FadeIn durationMs={1000} delayMs={700} triggerOnScroll id="services-fade">
          <ServicesWidget />
        </FadeIn>
      </div>

      {/* Future секция */}
      <div id="future">
        <FadeIn durationMs={1000} delayMs={900} triggerOnScroll id="future-fade">
          <FutureWidget />
        </FadeIn>
      </div>
    </ClientLayout>
  );
}




