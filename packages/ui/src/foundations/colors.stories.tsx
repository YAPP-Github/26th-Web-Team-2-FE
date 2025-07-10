const colorGroups = {
  base: ["bg-white", "bg-black", "bg-primary"],
  neutral: [
    "bg-neutral-100",
    "bg-neutral-99",
    "bg-neutral-98",
    "bg-neutral-95",
    "bg-neutral-90",
    "bg-neutral-80",
    "bg-neutral-70",
    "bg-neutral-60",
    "bg-neutral-50",
    "bg-neutral-40",
    "bg-neutral-35",
    "bg-neutral-30",
    "bg-neutral-25",
    "bg-neutral-20",
    "bg-neutral-15",
    "bg-neutral-10",
    "bg-neutral-5",
    "bg-neutral-0",
  ],
  "neutral-variant": [
    "bg-neutral-variant-100",
    "bg-neutral-variant-99",
    "bg-neutral-variant-98",
    "bg-neutral-variant-95",
    "bg-neutral-variant-90",
    "bg-neutral-variant-80",
    "bg-neutral-variant-70",
    "bg-neutral-variant-60",
    "bg-neutral-variant-50",
    "bg-neutral-variant-40",
    "bg-neutral-variant-35",
    "bg-neutral-variant-30",
    "bg-neutral-variant-25",
    "bg-neutral-variant-20",
    "bg-neutral-variant-15",
    "bg-neutral-variant-10",
    "bg-neutral-variant-5",
    "bg-neutral-variant-0",
  ],
  primary: [
    "bg-primary-100",
    "bg-primary-99",
    "bg-primary-98",
    "bg-primary-95",
    "bg-primary-90",
    "bg-primary-80",
    "bg-primary-70",
    "bg-primary-60",
    "bg-primary-50",
    "bg-primary-40",
    "bg-primary-35",
    "bg-primary-30",
    "bg-primary-25",
    "bg-primary-20",
    "bg-primary-15",
    "bg-primary-10",
    "bg-primary-5",
    "bg-primary-0",
  ],
  secondary: [
    "bg-secondary-100",
    "bg-secondary-99",
    "bg-secondary-98",
    "bg-secondary-95",
    "bg-secondary-90",
    "bg-secondary-80",
    "bg-secondary-70",
    "bg-secondary-60",
    "bg-secondary-50",
    "bg-secondary-40",
    "bg-secondary-35",
    "bg-secondary-30",
    "bg-secondary-25",
    "bg-secondary-20",
    "bg-secondary-15",
    "bg-secondary-10",
    "bg-secondary-5",
    "bg-secondary-0",
  ],
  error: [
    "bg-error-100",
    "bg-error-99",
    "bg-error-98",
    "bg-error-95",
    "bg-error-90",
    "bg-error-80",
    "bg-error-70",
    "bg-error-60",
    "bg-error-50",
    "bg-error-40",
    "bg-error-35",
    "bg-error-30",
    "bg-error-25",
    "bg-error-20",
    "bg-error-15",
    "bg-error-10",
    "bg-error-5",
    "bg-error-0",
  ],
  tertiary: [
    "bg-tertiary-100",
    "bg-tertiary-99",
    "bg-tertiary-98",
    "bg-tertiary-95",
    "bg-tertiary-90",
    "bg-tertiary-80",
    "bg-tertiary-70",
    "bg-tertiary-60",
    "bg-tertiary-50",
    "bg-tertiary-40",
    "bg-tertiary-35",
    "bg-tertiary-30",
    "bg-tertiary-25",
    "bg-tertiary-20",
    "bg-tertiary-15",
    "bg-tertiary-10",
    "bg-tertiary-5",
    "bg-tertiary-0",
  ],
};

const opacityVariables = [
  "--opacity-5",
  "--opacity-12",
  "--opacity-22",
  "--opacity-35",
  "--opacity-52",
  "--opacity-74",
  "--opacity-100",
];

export default {
  title: "Foundations/Colors",
  parameters: {
    layout: "centered",
  },
};

export const Colors = () => (
  <div className="flex flex-col gap-16 p-8">
    {/* 색상 보기 */}
    <section>
      <h2 className="mb-6 font-bold text-3xl text-gray-800">
        Ssok Color Palette 🎨
      </h2>
      <div className="flex flex-col gap-12">
        {Object.entries(colorGroups).map(([groupName, variables]) => (
          <div key={groupName}>
            <h3 className="text mb-4 text-2xl text-gray-700 text-title2-medi28">
              {groupName}
            </h3>
            <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
              {variables.map((variable) => (
                <div
                  key={variable}
                  className="flex flex-col items-center gap-2"
                >
                  <div className={`h-20 w-20 rounded-lg ${variable}`} />
                  <code className="break-words text-center text-gray-600 text-xs leading-tight">
                    {variable}
                  </code>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>

    {/* 투명도 보기 */}
    <section>
      <h2 className="mb-6 font-bold text-3xl text-gray-800">
        🟡 Opacity Tokens
      </h2>
      <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
        {opacityVariables.map((variable) => (
          <div key={variable} className="flex flex-col items-center gap-2">
            <div
              className="h-20 w-20 rounded-lg bg-black shadow-inner"
              style={{ opacity: `var(${variable})` }}
            />
            <code className="text-center text-gray-600 text-xs">
              {variable}
            </code>
          </div>
        ))}
      </div>
    </section>
  </div>
);
