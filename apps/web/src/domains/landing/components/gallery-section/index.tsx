import { cn } from "@ssok/ui";
import Image from "next/image";
import landingGalleryImage01 from "@/domains/landing/assets/landing-gallery-01.avif";
import landingGalleryImage02 from "@/domains/landing/assets/landing-gallery-02.avif";
import landingGalleryImage03 from "@/domains/landing/assets/landing-gallery-03.avif";
import landingGalleryImage04 from "@/domains/landing/assets/landing-gallery-04.avif";
import landingGalleryImage05 from "@/domains/landing/assets/landing-gallery-05.avif";
import landingGalleryImage06 from "@/domains/landing/assets/landing-gallery-06.avif";
import landingGalleryImage07 from "@/domains/landing/assets/landing-gallery-07.avif";
import landingGalleryImage08 from "@/domains/landing/assets/landing-gallery-08.avif";
import LandingSectionContainer from "@/domains/landing/components/landing-section-container";
import SsokLogoWithIcon from "@/shared/assets/ssok-logo-with-icon.svg";

const GallerySection = () => {
  const galleryImages = [
    { src: landingGalleryImage01, alt: "갤러리 이미지 1" },
    { src: landingGalleryImage02, alt: "갤러리 이미지 2" },
    { src: landingGalleryImage03, alt: "갤러리 이미지 3" },
    { src: landingGalleryImage04, alt: "갤러리 이미지 4" },
    { src: landingGalleryImage05, alt: "갤러리 이미지 5" },
    { src: landingGalleryImage06, alt: "갤러리 이미지 6" },
    { src: landingGalleryImage07, alt: "갤러리 이미지 7" },
    { src: landingGalleryImage08, alt: "갤러리 이미지 8" },
  ];

  return (
    <LandingSectionContainer
      className={cn(
        "flex flex-col gap-[8rem] py-[10.4rem]",
        "bg-gradient-to-b from-0% from-[rgba(217,244,255,1)] to-37% to-white",
      )}
    >
      <div className="flex flex-col items-center gap-[1.6rem]">
        <div className="flex flex-wrap items-center justify-center gap-[1.2rem]">
          <div className="text-display1-bold56 text-secondary-15">귀찮음은</div>
          <SsokLogoWithIconAndGradient />
          <div className="text-display1-bold56 text-secondary-15">
            이 대신할게요
          </div>
        </div>
        <div className="text-display2-bold36 text-secondary-15">
          여러분은 결정만 하세요.
        </div>
      </div>

      <div className="-mx-[10.4rem] max-md:-mx-[4rem] flex w-screen flex-col items-center gap-[1.6rem] overflow-hidden">
        <div className="flex justify-center gap-[1.6rem]">
          {galleryImages.slice(0, 4).map((image, index) => (
            <Image
              key={index}
              src={image.src}
              alt={image.alt}
              width={364}
              height={240}
              className="shrink-0 rounded-[1.2rem] object-cover"
            />
          ))}
        </div>
        <div className="flex justify-center gap-[1.6rem]">
          {galleryImages.slice(4, 8).map((image, index) => (
            <Image
              key={index}
              src={image.src}
              alt={image.alt}
              width={364}
              height={240}
              className="shrink-0 rounded-[1.2rem] object-cover"
            />
          ))}
        </div>
      </div>
    </LandingSectionContainer>
  );
};

const SsokLogoWithIconAndGradient = () => {
  return (
    <div
      className={cn(
        "rounded-[1.6rem] pt-[1.3rem] pr-[1.538rem] pb-[1.505rem] pl-[1.215rem]",
        "bg-gradient-to-b from-0% from-[rgba(255,255,255,1)] to-100% to-[rgba(237,249,254,1)]",
      )}
    >
      <SsokLogoWithIcon className="h-[4.995rem] w-[18.746rem] shrink-0" />
    </div>
  );
};

export default GallerySection;
