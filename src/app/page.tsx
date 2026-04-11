import HeroSection from "@/components/HeroSection";
import WorksTicker from "@/components/WorksTicker";
import CatalogPreview from "@/components/CatalogPreview";
import ForWhoSection from "@/components/ForWhoSection";
import HowItWorks from "@/components/HowItWorks";
import ColorConfigurator from "@/components/ColorConfigurator";
import BeforeAfterSlider from "@/components/BeforeAfterSlider";
import OrderConfigurator from "@/components/OrderConfigurator";
import PriceCalculator from "@/components/PriceCalculator";
import STLUploader from "@/components/STLUploader";
import GallerySection from "@/components/GallerySection";
import MaterialsPreview from "@/components/MaterialsPreview";
import MaterialsComparator from "@/components/MaterialsComparator";
import GuaranteeSection from "@/components/GuaranteeSection";
import ShippingMap from "@/components/ShippingMap";
import Testimonials from "@/components/Testimonials";
import B2BSection from "@/components/B2BSection";
import FAQ from "@/components/FAQ";
import CTABanner from "@/components/CTABanner";

export default function Home() {
  return (
    <>
      <HeroSection />
      <WorksTicker />
      <CatalogPreview />
      <ForWhoSection />
      <HowItWorks />
      <ColorConfigurator />
      <BeforeAfterSlider />
      <OrderConfigurator />
      <PriceCalculator />
      <STLUploader />
      <GallerySection />
      <MaterialsPreview />
      <MaterialsComparator />
      <GuaranteeSection />
      <ShippingMap />
      <Testimonials />
      <B2BSection />
      <FAQ />
      <CTABanner />
    </>
  );
}
