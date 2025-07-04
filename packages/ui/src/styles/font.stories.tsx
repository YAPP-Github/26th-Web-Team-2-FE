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
  <div
    style={{
      width: "50rem",
      display: "flex",
      flexDirection: "column",
      gap: "1.5rem",
      padding: "2rem",
    }}
  >
    {styles.map((style) => (
      <div
        key={style}
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          height: "4rem",
        }}
      >
        <span style={{ fontSize: "1.5rem", color: "#666" }}>{style}</span>
        <p className={style}>여행 비교표를 만들어요</p>
      </div>
    ))}
  </div>
);
