const EmptyListContainer = () => {
  return (
    <section className="flex h-full w-full items-center justify-center py-[5rem]">
      <div className="flex min-w-[60rem] flex-col gap-[0.8rem]">
        <p className="text-center text-heading2-semi18 text-neutral-60">
          아직 저장된 숙소가 없어요.
        </p>
        <p className="text-center text-body1-regular16 text-neutral-60">
          링크만 쏙 넣으면, 자동으로 정리해드려요!
        </p>
      </div>
    </section>
  );
};

export default EmptyListContainer;
