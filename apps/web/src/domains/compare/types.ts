import type {
  AccommodationResponse,
  Amenity,
  Attraction,
  AttractionUpdate,
  CheckTime,
  DistanceInfo,
  Transportation,
  TransportationUpdate,
  UpdateAccommodationRequest,
  UpdateComparisonTableRequest,
} from "@ssok/api/schemas";

export type { Amenity, Attraction, CheckTime, DistanceInfo, Transportation };

export interface ComparisonFormData
  extends Omit<UpdateComparisonTableRequest, "accommodationRequestList"> {
  accommodationRequestList: (Omit<
    AccommodationResponse,
    | "lowestPrice"
    | "reviewScore"
    | "cleanlinessScore"
    | "nearbyAttractions"
    | "nearbyTransportation"
    | "amenities"
  > & {
    lowestPrice?: string;
    reviewScore?: string;
    cleanlinessScore?: string;
    nearbyAttractions: UpdateAccommodationRequest["nearbyAttractions"];
    nearbyTransportation: UpdateAccommodationRequest["nearbyTransportation"];
    amenities: UpdateAccommodationRequest["amenities"];
  })[];
}

export type Accommodation =
  ComparisonFormData["accommodationRequestList"][number];

export type ComparisonPlace = AttractionUpdate | TransportationUpdate;

export type ViewState = "default" | "edit" | "active";
