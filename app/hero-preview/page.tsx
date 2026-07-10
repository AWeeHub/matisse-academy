import LayeredHero from "@/components/LayeredHero";
import Slider3D from "@/components/Slider3D";

// Standalone preview of the layered hero + 3D program slider — kept off the
// live homepage so it can be judged in isolation before we decide where it lands.
export default function HeroPreviewPage() {
  return (
    <>
      <LayeredHero />
      <Slider3D />
    </>
  );
}
