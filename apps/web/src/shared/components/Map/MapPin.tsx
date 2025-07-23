import { Pin } from "@ssok/ui";

type PinProps = {
  className?: string;
  children: React.ReactNode;
  lat?: number;
  lng?: number;
};

const MapPin = ({ className, children, lat, lng }: PinProps) => {
  return (
    <div lat-data={lat} lng-data={lng}>
      <Pin className={className}>{children}</Pin>
    </div>
  );
};

export default MapPin;
