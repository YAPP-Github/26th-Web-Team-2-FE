const HeaderSection = () => {
  return (
    <header className="flex w-max gap-[1.6rem] p-2 pr-8 pl-2">
      <span className="text-body1-medi16 text-neutral-25">
        여름맞이 휴가가자
      </span>
      <div className="flex items-center gap-[1.2rem] text-body2-regular14 text-neutral-60">
        <p>방콕, 태국</p>
        <div className="h-[1.2rem] w-[0.1rem] bg-neutral-80" />
        <p>8월 02일 - 05일</p>
      </div>
    </header>
  );
};

export default HeaderSection;
