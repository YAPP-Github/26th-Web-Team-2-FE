import DialogProvider from "@/shared/providers/modules/dialog-provider";

interface MobileIncompatibleLayoutProps {
  children: React.ReactNode;
}

const MobileIncompatibleLayout = ({
  children,
}: MobileIncompatibleLayoutProps) => {
  return (
    <>
      {children}
      <DialogProvider />
    </>
  );
};

export default MobileIncompatibleLayout;
