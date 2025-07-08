const styles = [
  // Title
  "text-title1-semi36",
  "text-title2-medi28",
  "text-title3-bold24",
  // Heading
  "text-heading1-semi20",
  "text-heading2-semi18",
  "text-heading2-medi18",
  // Body
  "text-body1-semi16",
  "text-body1-medi16",
  "text-body1-regular16",
  "text-body2-medi14",
  "text-body2-regular14",
  // Caption
  "text-caption1-semi12",
  "text-caption1-medi12",
  "text-caption2-medi11",
  "text-caption2-regular11",
];

export default {
  title: "Foundations/Typography",
  parameters: {
    layout: "centered",
  },
};

export const Typography = () => (
  <div className="flex w-[50rem] flex-col gap-6 p-8">
    {styles.map((style) => (
      <div
        key={style}
        className="flex h-16 flex-row items-center justify-between"
      >
        <span className="text-2xl text-gray-500">{style}</span>
        <p className={style}>여행 비교표를 만들어요</p>
      </div>
    ))}
  </div>
);
