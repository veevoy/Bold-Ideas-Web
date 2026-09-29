import { ParallaxVideo } from './ParallaxVideo';

export function HeroVideo() {
  return <ParallaxVideo
    className="hero-film"
    src="/video/coral-collaboration.mp4"
    mobileSrc="/video/coral-collaboration-mobile.mp4"
    poster="/images/coral-collaboration-poster.jpg"
    priority
  />;
}
