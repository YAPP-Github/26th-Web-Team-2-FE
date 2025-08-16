import type { Meta, StoryObj } from "@storybook/react-vite";
import ToastItem from "@/components/toast/toast-item";
import useToast from "@/hooks/use-toast";
import { SsokUiProvider } from "@/providers/ssok-ui-provider";
import Button from "../button";

const ToastDemo = () => {
  const { toast } = useToast();

  return (
    <div className="flex flex-col gap-[2rem] p-[2rem]">
      <div>
        <h3 className="mb-[1rem] text-heading1-semi20">Toast 테스트</h3>
        <div className="flex flex-wrap gap-[1rem]">
          <Button
            type="button"
            size="md"
            variant="primary"
            onClick={() => toast.success("성공적으로 저장되었습니다!")}
          >
            단일 Toast
          </Button>
          <Button
            type="button"
            size="md"
            variant="primary"
            onClick={() => {
              toast.success("첫 번째 메시지입니다.");
              setTimeout(() => toast.success("두 번째 메시지입니다."), 100);
              setTimeout(() => toast.success("세 번째 메시지입니다."), 200);
            }}
          >
            여러 개 Toast (스택)
          </Button>
          <Button
            type="button"
            size="md"
            variant="primary"
            onClick={() =>
              toast.success(
                "아주 긴 메시지입니다. 이 메시지는 Toast 컴포넌트의 최대 너비를 테스트하기 위한 것입니다. 정말 긴 내용이 들어가도 잘 보이는지 확인해보세요.",
              )
            }
          >
            긴 메시지 Toast
          </Button>
          <Button
            type="button"
            size="md"
            variant="primary"
            onClick={() => toast.success("10초 동안 유지됩니다.", 10_000)}
          >
            긴 시간 Toast (10초)
          </Button>
        </div>
      </div>
    </div>
  );
};

const meta: Meta<typeof ToastDemo> = {
  title: "Components/Toast",
  component: ToastDemo,
  decorators: [
    (Story) => (
      <SsokUiProvider>
        <Story />
      </SsokUiProvider>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => <ToastDemo />,
};

export const Toast = () => {
  return (
    <ToastItem
      toast={{
        id: "1",
        variant: "success",
        content: "성공적으로 저장되었습니다!",
      }}
    />
  );
};
