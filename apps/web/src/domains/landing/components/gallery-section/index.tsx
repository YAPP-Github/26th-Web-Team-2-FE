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
    <div
      className={cn(
        "flex w-full flex-col bg-gradient-to-b from-0% from-[rgba(217,244,255,1)] to-37% to-white",
        "gap-[8rem] py-[10.4rem]",
        "max-xl:gap-[4.8rem] max-xl:pt-[7.2rem] max-xl:pb-[4.8rem]",
      )}
    >
      <LandingSectionContainer
        className={cn(
          "[&>div]:flex [&>div]:flex-col [&>div]:items-center [&>div]:gap-[1.6rem]",
          "max-xl:[&>div]:gap-[0.8rem]",
        )}
      >
        <div
          className={cn(
            "flex flex-wrap items-center justify-center",
            "max-xl:gap-x-[0.8rem] max-xl:gap-y-[0.15rem] xl:gap-[1.2rem]",
          )}
        >
          <div
            className={cn(
              "text-display1-bold56 text-secondary-15",
              "max-xl:text-[3.2rem] max-xl:leading-[1.4] max-xl:tracking-[-0.06rem]",
            )}
          >
            귀찮음은
          </div>
          <SsokLogoWithIconAndGradient />
          <div
            className={cn(
              "text-display1-bold56 text-secondary-15",
              "max-xl:text-[3.2rem] max-xl:leading-[1.4] max-xl:tracking-[-0.06rem]",
            )}
          >
            이 대신할게요
          </div>
        </div>
        <div
          className={cn(
            "text-display2-bold36 text-secondary-15",
            "max-xl:text-body1-bold16",
          )}
        >
          여러분은 결정만 하세요.
        </div>
      </LandingSectionContainer>

      <section className={cn("w-full", "max-xl:px-[1.6rem]")}>
        <div
          className={cn(
            "flex w-full flex-col items-center overflow-hidden",
            "max-xl:gap-[0.8rem]",
            "xl:gap-[1.6rem]",
          )}
        >
          <div
            className={cn(
              "flex justify-center",
              "max-xl:gap-[0.8rem]",
              "xl:gap-[1.6rem]",
            )}
          >
            {galleryImages.slice(0, 4).map((image, index) => (
              <Image
                key={index}
                src={image.src}
                alt={image.alt}
                width={364}
                height={240}
                className={cn(
                  "shrink-0 rounded-[1.2rem] object-cover",
                  "max-xl:h-[6.9rem] max-xl:w-[9.5rem]",
                )}
              />
            ))}
          </div>
          <div
            className={cn(
              "flex justify-center",
              "max-xl:gap-[0.8rem]",
              "xl:gap-[1.6rem]",
            )}
          >
            {galleryImages.slice(4, 8).map((image, index) => (
              <Image
                key={index}
                src={image.src}
                alt={image.alt}
                width={364}
                height={240}
                className={cn(
                  "shrink-0 rounded-[1.2rem] object-cover",
                  "max-xl:h-[6.9rem] max-xl:w-[9.5rem]",
                )}
              />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

const SsokLogoWithIconAndGradient = () => {
  return (
    <div
      className={cn(
        "bg-gradient-to-b from-0% from-[rgba(255,255,255,1)] to-100% to-[rgba(237,249,254,1)]",
        "max-xl:rounded-[0.9rem] max-xl:px-[0.75rem] max-xl:pt-[0.8rem] max-xl:pb-[0.93rem] max-xl:pl-[0.75rem]",
        "xl:rounded-[1.6rem] xl:pt-[1.3rem] xl:pr-[1.538rem] xl:pb-[1.505rem] xl:pl-[1.215rem]",
      )}
    >
      <div className={cn("max-xl:w-[11.5rem]", "xl:w-[18.746rem]")}>
        <SsokLogoWithIcon className="h-auto w-full" />
      </div>
    </div>
  );
};

export default GallerySection;
