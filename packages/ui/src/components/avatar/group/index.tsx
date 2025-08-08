import { cn } from "@/utils";
import Profile from "../profile";

export type ProfileGroupProps = {
  size: 32 | 40 | 48;
  profiles: Array<{
    id: string | number;
    imgUrl?: string;
  }>;
};

const ProfileGroup = ({ size, profiles }: ProfileGroupProps) => {
  return (
    <ul className="relative flex w-fit items-center">
      {profiles.map((profile, index) => (
        <li
          key={profile.id}
          className={index === 0 ? "" : "-ml-[10px]"}
          style={{ zIndex: profiles.length - index }}
        >
          <Profile size={size} imgUrl={profile.imgUrl} />
        </li>
      ))}
      <span
        className={cn(
          "absolute top-[-10%] right-[-1.8rem] z-11",
          "rounded-[10rem] bg-primary-70 px-[0.8rem] py-[0.2rem] text-caption1-semi12 text-primary-100",
        )}
      >
        {profiles.length}명
      </span>
    </ul>
  );
};

export default ProfileGroup;
