const styles = [
  // Title
  "title1-semi36",
  "title2-medi28",
  "title3-bold24",
  // Heading
  "heading1-semi20",
  "heading2-semi18",
  "heading2-medi18",
  // Body
  "body1-semi16",
  "body1-medi16",
  "body1-regular16",
  "body2-medi14",
  "body2-regular14",
  // Caption
  "caption1-semi12",
  "caption1-medi12",
  "caption2-medi11",
  "caption2-regular11",
];

export default {
  title: "Foundataions/Typography",
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
        }}
      >
        <span style={{ fontSize: "1rem", color: "#666" }}>{style}</span>
        <p className={style}>여행 비교표를 만들어요</p>
      </div>
    ))}
  </div>
);
