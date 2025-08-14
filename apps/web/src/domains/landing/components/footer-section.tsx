const FooterSection = () => {
  return (
    <footer className="flex w-full flex-col">
      <div className="h-[0.1rem] w-full bg-[#E3E3E3]" />
      <div className="flex items-center gap-[5.6rem] bg-white px-[10.4rem] py-[4.8rem]">
        {/* Logo */}
        <div className="h-[3.3rem] w-[9.7rem]">
          <div className="font-bold text-[#1E1E1E] text-[2rem]">쏙</div>
        </div>

        {/* Footer Links */}
        <div className="flex gap-[5.6rem]">
          <a
            href="/privacy"
            className="font-semibold text-[#272727] text-[1.5rem] leading-[1.5] tracking-[-0.027em] transition-colors hover:text-neutral-40"
          >
            개인정보 처리방침
          </a>
          <a
            href="/terms"
            className="font-semibold text-[#272727] text-[1.5rem] leading-[1.5] tracking-[-0.027em] transition-colors hover:text-neutral-40"
          >
            서비스 이용약관
          </a>
          <div className="flex items-center gap-[0.8rem]">
            <span className="font-semibold text-[#272727] text-[1.5rem] leading-[1.5] tracking-[-0.027em]">
              문의하기
            </span>
            <span className="font-medium text-[#787878] text-[1.6rem] leading-[1.5]">
              ssok.contact@gmail.com
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default FooterSection;
