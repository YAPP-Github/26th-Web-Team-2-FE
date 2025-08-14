import Header from "@/shared/components/header";
import CTASection from "../components/cta-section";
import FooterSection from "../components/footer-section";
import HeroSection from "../components/hero-section";
import ProblemBannerSection from "../components/problem-banner-section";
import ProblemSections from "../components/problem-sections";
import SolutionSections from "../components/solution-sections";

const IndexPageView = () => {
  return (
    <>
      <Header />
      <div className="flex min-h-screen flex-col items-center">
        <HeroSection />
        <ProblemBannerSection />
        <ProblemSections />
        <SolutionSections />
        <CTASection />
        <FooterSection />
      </div>
    </>
  );
};

export default IndexPageView;
