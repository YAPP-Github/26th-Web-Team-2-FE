import IcPerson from "@/assets/icons/ic_person.svg?react";
import ImageCard from "@/components/image-card";
import { cn } from "@/utils";

export interface ProfileProps {
  size: 32 | 40 | 48;
  imgUrl?: string;
}

const Profile = ({ size, imgUrl }: ProfileProps) => {
  return (
    <div
      className={cn(
        "h-fit w-fit rounded-[1000rem] bg-neutral-90 outline outline-neutral-80",
        "hover:outline-[2px] hover:outline-[rgba(164,173,166,0.8)]",
        "focus:outline-[2px] focus:outline-[rgba(164,173,166,0.8)]",
        "active:outline-[2px] active:outline-[rgba(148,178,160,0.8)]",
      )}
    >
      {imgUrl && (
        <ImageCard
          src={imgUrl}
          alt="Profile"
          width={size}
          height={size}
          loading="lazy"
          decoding="async"
          className="aspect-square rounded-[1000rem]"
        />
      )}
      {!imgUrl && (
        <IcPerson
          width={size}
          height={size}
          className="text-primary-100"
          aria-label="프로필 아이콘"
        />
      )}
    </div>
  );
};

export default Profile;
