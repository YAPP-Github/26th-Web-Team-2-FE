const config = {
  content: [
    "./apps/web/src/**/*.{js,ts,jsx,tsx,html}",
    "./apps/web/src/*.{js,ts,jsx,tsx,html}",
    "./apps/web/src/app/**/*.{js,ts,jsx,tsx,html}",
    "./packages/ui/src/**/*.{js,ts,jsx,tsx,html}",
  ],

  theme: {
    extend: {
      fontSize: {
        "title1-semi36": [
          "3.6rem",
          {
            lineHeight: "1.5",
            letterSpacing: "-0.06em",
            fontWeight: "600",
          },
        ],
        "title2-medi28": [
          "2.8rem",
          {
            lineHeight: "1.5",
            letterSpacing: "-0.06em",
            fontWeight: "500",
          },
        ],
        "title3-bold24": [
          "2.4rem",
          {
            lineHeight: "1.5",
            letterSpacing: "0rem",
            fontWeight: "700",
          },
        ],
        "heading1-semi20": [
          "2rem",
          {
            lineHeight: "1.5",
            letterSpacing: "0rem",
            fontWeight: "600",
          },
        ],
        "heading2-semi18": [
          "1.8rem",
          {
            lineHeight: "1.5",
            letterSpacing: "0rem",
            fontWeight: "600",
          },
        ],
        "heading2-medi18": [
          "1.8rem",
          {
            lineHeight: "1.5",
            letterSpacing: "0rem",
            fontWeight: "500",
          },
        ],
        "body1-semi16": [
          "1.6rem",
          {
            lineHeight: "1.5",
            letterSpacing: "0rem",
            fontWeight: "600",
          },
        ],
        "body1-medi16": [
          "1.6rem",
          {
            lineHeight: "1.5",
            letterSpacing: "0rem",
            fontWeight: "500",
          },
        ],
        "body1-regular16": [
          "1.6rem",
          {
            lineHeight: "1.5",
            letterSpacing: "-0.04em",
            fontWeight: "400",
          },
        ],
        "body2-medi14": [
          "1.4rem",
          {
            lineHeight: "1.5",
            letterSpacing: "-0.04em",
            fontWeight: "500",
          },
        ],
        "body2-regular14": [
          "1.4rem",
          {
            lineHeight: "1.8",
            letterSpacing: "-0.04em",
            fontWeight: "400",
          },
        ],
        "caption1-semi12": [
          "1.2rem",
          {
            lineHeight: "1.5",
            letterSpacing: "-0.04em",
            fontWeight: "600",
          },
        ],
        "caption1-medi12": [
          "1.2rem",
          {
            lineHeight: "1.5",
            letterSpacing: "-0.04em",
            fontWeight: "500",
          },
        ],
        "caption2-medi11": [
          "1.1rem",
          {
            lineHeight: "1.5",
            letterSpacing: "-0.04em",
            fontWeight: "500",
          },
        ],
        "caption2-regular11": [
          "1.1rem",
          {
            lineHeight: "1.5",
            letterSpacing: "-0.04em",
            fontWeight: "400",
          },
        ],
      },
    },
  },

  plugins: [],
};

export default config;
