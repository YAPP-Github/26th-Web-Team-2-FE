import { IcCollapse, IcExpand, IcInfo, TextWithIcon } from "@ssok/ui";
import BubbleInfo from "./bubble-info";

type TitleSectionProps = {
  isInputExpanded: boolean; // 입력창 확장 여부
  isTooltipVisible: boolean; // 툴팁 표시 여부
  toggleInputExpansion: () => void; // 입력창 확장/축소 토글 함수
  handleTooltipVisible: (visible: boolean) => void; // 툴팁 표시/숨김 함수
};

const TitleContainer = ({
  isInputExpanded,
  isTooltipVisible,
  toggleInputExpansion,
  handleTooltipVisible,
}: TitleSectionProps) => {
  return (
    <div className="flex justify-between">
      <div className="flex items-center gap-[0.8rem]">
        <p className="text-heading1-semi20 text-neutral-10">
          숙소 링크 저장하기
        </p>
        {isInputExpanded && (
          <TextWithIcon
            onMouseEnter={() => handleTooltipVisible(true)}
            onMouseLeave={() => handleTooltipVisible(false)}
            icon={
              <IcInfo width="20px" height="20px" className="text-primary-70" />
            }
            className="flex-row-reverse gap-[0.2rem]"
          >
            <TextWithIcon.Text className="text-caption2-regular11 text-neutral-50">
              저장 가능한 링크
            </TextWithIcon.Text>
          </TextWithIcon>
        )}
        {isTooltipVisible && (
          <BubbleInfo>
            지금은 부킹닷컴, 아고다, 호텔스컴바인 링크만 지원 중이에요
          </BubbleInfo>
        )}
      </div>
      <button type="button" onClick={toggleInputExpansion}>
        {!isInputExpanded && <IcExpand width="24px" height="24px" />}
        {isInputExpanded && <IcCollapse width="24px" height="24px" />}
      </button>
    </div>
  );
};

export default TitleContainer;
