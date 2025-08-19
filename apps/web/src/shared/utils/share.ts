"use client";

export const share = async (
  data: ShareData,
): Promise<"shared" | "copiedToClipboard" | "failed"> => {
  try {
    if (window.navigator.share) {
      await window.navigator.share(data);
      return "shared";
    }

    if (data.url && navigator.clipboard) {
      await navigator.clipboard.writeText(data.url);
      return "copiedToClipboard";
    }

    if (data.url) {
      const textArea = document.createElement("textarea");
      textArea.value = data.url.toString();
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand("copy");
      document.body.removeChild(textArea);
      return "copiedToClipboard";
    }

    return "failed";
  } catch (error) {
    console.error("공유 실패:", error);
    return "failed";
  }
};

export default share;
