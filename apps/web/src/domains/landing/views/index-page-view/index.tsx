import CTASection from "@/domains/landing/components/cta-section";
import GallerySection from "@/domains/landing/components/gallery-section";
import HeroSection from "@/domains/landing/components/hero-section";
import ProblemBannerSection from "@/domains/landing/components/problem-banner-section";
import ProblemSections from "@/domains/landing/components/problem-sections";
import SolutionSections from "@/domains/landing/components/solution-sections";
import Footer from "@/shared/components/footer";
import HeaderLayout from "@/shared/components/header-layout";

const IndexPageView = () => {
  return (
    <>
      <HeaderLayout>
        <div className="flex min-h-screen flex-col items-center">
          <HeroSection />
          <ProblemBannerSection />
          <ProblemSections />
          <GallerySection />
          <SolutionSections />
          <CTASection />
        </div>
      </HeaderLayout>
      <Footer />
    </>
  );
};

export default IndexPageView;
