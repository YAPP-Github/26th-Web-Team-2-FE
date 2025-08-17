"use client";
export const isShareSupported = (): boolean =>
  typeof window !== "undefined" && !!navigator.share;

export const share = async (
  data: ShareData,
): Promise<"shared" | "copiedToClipboard" | "failed"> => {
  try {
    if (isShareSupported()) {
      await navigator.share(data);
      return "shared";
    }

    if (data.url && typeof navigator.clipboard !== "undefined") {
      await navigator.clipboard.writeText(data.url);
      return "copiedToClipboard";
    }

    return "failed";
  } catch (error) {
    console.error("공유 실패:", error);
    return "failed";
  }
};

export default share;
