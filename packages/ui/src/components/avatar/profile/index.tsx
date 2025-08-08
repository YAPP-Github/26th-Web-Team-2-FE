import IcPerson from "@/assets/icons/ic_person.svg?react";
import { ImageCard } from "@/components/image-card";
import { cn } from "@/utils";

type ProfileProps = {
  size: 32 | 40 | 48;
  imgUrl?: string;
};

const Profile = ({ size, imgUrl }: ProfileProps) => {
  return (
    <button
      type="button"
      className={cn(
        "h-fit w-fit rounded-[1000rem] border border-neutral-80 bg-neutral-90",
        "hover:border-[2px] hover:border-[rgba(164,173,166,0.8)]",
        "focus:border-[2px] focus:border-[rgba(164,173,166,0.8)]",
        "active:border-[2px] active:border-[rgba(148,178,160,0.8)]",
      )}
    >
      {imgUrl && (
        <ImageCard
          src={imgUrl}
          alt="Profile"
          width={size}
          height={size}
          className="rounded-[1000rem]"
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
    </button>
  );
};

export default Profile;
