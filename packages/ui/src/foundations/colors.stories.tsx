const colorGroups = {
  base: ["--color-white", "--color-black", "--color-primary"],
  neutral: [
    "--color-neutral-100",
    "--color-neutral-99",
    "--color-neutral-98",
    "--color-neutral-95",
    "--color-neutral-90",
    "--color-neutral-80",
    "--color-neutral-70",
    "--color-neutral-60",
    "--color-neutral-50",
    "--color-neutral-40",
    "--color-neutral-35",
    "--color-neutral-30",
    "--color-neutral-25",
    "--color-neutral-20",
    "--color-neutral-15",
    "--color-neutral-10",
    "--color-neutral-5",
    "--color-neutral-0",
  ],
  "neutral-variant": [
    "--color-neutral-variant-100",
    "--color-neutral-variant-99",
    "--color-neutral-variant-98",
    "--color-neutral-variant-95",
    "--color-neutral-variant-90",
    "--color-neutral-variant-80",
    "--color-neutral-variant-70",
    "--color-neutral-variant-60",
    "--color-neutral-variant-50",
    "--color-neutral-variant-40",
    "--color-neutral-variant-35",
    "--color-neutral-variant-30",
    "--color-neutral-variant-25",
    "--color-neutral-variant-20",
    "--color-neutral-variant-15",
    "--color-neutral-variant-10",
    "--color-neutral-variant-5",
    "--color-neutral-variant-0",
  ],
  primary: [
    "--color-primary-100",
    "--color-primary-99",
    "--color-primary-98",
    "--color-primary-95",
    "--color-primary-90",
    "--color-primary-80",
    "--color-primary-70",
    "--color-primary-60",
    "--color-primary-50",
    "--color-primary-40",
    "--color-primary-35",
    "--color-primary-30",
    "--color-primary-25",
    "--color-primary-20",
    "--color-primary-15",
    "--color-primary-10",
    "--color-primary-5",
    "--color-primary-0",
  ],
  secondary: [
    "--color-secondary-100",
    "--color-secondary-99",
    "--color-secondary-98",
    "--color-secondary-95",
    "--color-secondary-90",
    "--color-secondary-80",
    "--color-secondary-70",
    "--color-secondary-60",
    "--color-secondary-50",
    "--color-secondary-40",
    "--color-secondary-35",
    "--color-secondary-30",
    "--color-secondary-25",
    "--color-secondary-20",
    "--color-secondary-15",
    "--color-secondary-10",
    "--color-secondary-5",
    "--color-secondary-0",
  ],
  error: [
    "--color-error-100",
    "--color-error-99",
    "--color-error-98",
    "--color-error-95",
    "--color-error-90",
    "--color-error-80",
    "--color-error-70",
    "--color-error-60",
    "--color-error-50",
    "--color-error-40",
    "--color-error-35",
    "--color-error-30",
    "--color-error-25",
    "--color-error-20",
    "--color-error-15",
    "--color-error-10",
    "--color-error-5",
    "--color-error-0",
  ],
  tertiary: [
    "--color-tertiary-100",
    "--color-tertiary-99",
    "--color-tertiary-98",
    "--color-tertiary-95",
    "--color-tertiary-90",
    "--color-tertiary-80",
    "--color-tertiary-70",
    "--color-tertiary-60",
    "--color-tertiary-50",
    "--color-tertiary-40",
    "--color-tertiary-35",
    "--color-tertiary-30",
    "--color-tertiary-25",
    "--color-tertiary-20",
    "--color-tertiary-15",
    "--color-tertiary-10",
    "--color-tertiary-5",
    "--color-tertiary-0",
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
            <h3 className="mb-4 text-2xl text-gray-700 text-title2-medi28">
              {groupName}
            </h3>
            <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
              {variables.map((variable) => (
                <div
                  key={variable}
                  className="flex flex-col items-center gap-2"
                >
                  <div
                    className="h-20 w-20 rounded-lg "
                    style={{ backgroundColor: `var(${variable})` }}
                  />
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
