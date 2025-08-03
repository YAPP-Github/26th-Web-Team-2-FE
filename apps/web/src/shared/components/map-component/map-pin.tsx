import { Pin } from "@ssok/ui";

type PinProps = {
  className?: string;
  children: React.ReactNode;
  lat: number;
  lng: number;
  isActive: boolean;
};

const MapPin = ({ className, children, lat, lng, isActive }: PinProps) => {
  return (
    <div data-lat={lat} data-lng={lng}>
      <Pin className={className} isActive={isActive}>
        {children}
      </Pin>
    </div>
  );
};

export default MapPin;
