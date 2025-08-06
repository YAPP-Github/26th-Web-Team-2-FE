import { Pin } from "@ssok/ui";

type PinProps = {
  className?: string;
  children: React.ReactNode;
  lat: number;
  lng: number;
  isActive: boolean;
  onClick: () => void;
};

const MapPin = ({
  className,
  children,
  lat,
  lng,
  isActive,
  onClick,
}: PinProps) => {
  return (
    <div data-lat={lat} data-lng={lng}>
      <Pin className={className} isActive={isActive} onClick={onClick}>
        {children}
      </Pin>
    </div>
  );
};

export default MapPin;
