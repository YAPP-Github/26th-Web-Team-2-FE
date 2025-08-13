import { cn, IcEdit } from "@ssok/ui";
import { useEffect, useRef, useState } from "react";
import InputAutosize from "@/shared/components/input-autosize";

interface PageTitleProps {
  title: string;
  isEditingAvailable?: boolean;
  onTitleChange?: (newTitle: string) => void;
  className?: string;
}

const PageTitle = ({
  title,
  isEditingAvailable,
  onTitleChange,
  className,
}: PageTitleProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [value, setValue] = useState(title);
  const inputRef = useRef<HTMLInputElement>(null);

  const isEditingNow = isEditingAvailable && isEditing;

  useEffect(() => {
    setValue(title);
  }, [title]);

  const handleClick = () => {
    if (!isEditingAvailable) {
      return;
    }

    setIsEditing(true);
    if (inputRef.current) {
      inputRef.current.focus();
      inputRef.current.select();
    }
  };

  const handleSave = () => {
    setIsEditing(false);
    if (value.trim() !== title && onTitleChange) {
      onTitleChange(value.trim());
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSave();
    } else if (e.key === "Escape") {
      setIsEditing(false);
      setValue(title);
    }
  };

  const handleBlur = () => {
    handleSave();
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      className={cn(
        "group flex items-center gap-[1rem] rounded-[1.2rem] px-[0.8rem] py-[0.3rem] transition-colors duration-200",
        isEditingAvailable && "cursor-pointer hover:bg-neutral-90",
        isEditingNow && "bg-neutral-90",
        className,
      )}
    >
      <InputAutosize
        ref={inputRef}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onKeyDown={handleKeyDown}
        onBlur={handleBlur}
        readOnly={!isEditingAvailable}
        disabled={!isEditingAvailable}
        className="bg-transparent text-neutral-30 text-title2-medi28 [&>input]:outline-none"
      />
      {isEditingAvailable && !isEditingNow && (
        <IcEdit
          width="20"
          height="20"
          className="text-neutral-70 opacity-0 transition-opacity duration-200 group-hover:opacity-100"
        />
      )}
    </button>
  );
};

export default PageTitle;
