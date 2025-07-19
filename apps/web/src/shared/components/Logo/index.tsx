import { cn } from "@ssok/ui";

interface LogoProps {
  className?: string;
}

const Logo = ({ className }: LogoProps) => {
  return (
    <div
      className={cn(
        "flex h-[4.8rem] w-[4.8rem] items-center justify-center rounded-full bg-neutral-90",
        className,
      )}
    >
      <span className="text-body1-medi16 text-neutral-60">로고</span>
    </div>
  );
};

export default Logo;
