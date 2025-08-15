export interface Toast {
  id: string;
  variant: "success";
  content: string;
  duration?: number;
  state?: "entering" | "visible" | "exiting";
}
