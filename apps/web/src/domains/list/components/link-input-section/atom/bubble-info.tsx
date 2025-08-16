interface BubbleInfoProps {
  children: React.ReactNode;
}

export const BubbleInfo = ({ children }: BubbleInfoProps) => {
  return (
    <div className="relative w-max max-w-[90%] rounded-[0.8rem] bg-neutral-variant-20 px-2 py-1.5 text-caption1-semi12 text-secondary-99">
      {/* 꼬리 삼각형 */}
      <div className="absolute top-[0.7rem] left-[-5px] h-0 w-0 border-y-[0.6rem] border-y-transparent border-r-[0.9rem] border-r-neutral-variant-20 border-l-0 border-solid" />
      {/* 내용 */}
      {children}
    </div>
  );
};
