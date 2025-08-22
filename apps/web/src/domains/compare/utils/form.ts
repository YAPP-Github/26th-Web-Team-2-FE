import type {
  AmenityUpdate,
  AttractionUpdate,
  ComparisonTableResponse,
  TransportationUpdate,
  UpdateAccommodationRequest,
  UpdateComparisonTableRequest,
} from "@ssok/api/schemas";
import type { ComparisonFormData } from "@/domains/compare/types";

export const transformComparisonTableResponseToFormData = ({
  boardId,
  response,
}: {
  boardId: number;
  response: ComparisonTableResponse;
}): ComparisonFormData => {
  const formatPrice = (price: number) => {
    const displayValue = new Intl.NumberFormat("ko-KR").format(price);
    return `${displayValue}원`;
  };

  return {
    tripBoardId: boardId,
    tableName: response.tableName,
    accommodationRequestList:
      response.accommodationResponsesList?.map(
        ({
          lowestPrice,
          reviewScore,
          cleanlinessScore,
          nearbyAttractions,
          nearbyTransportation,
          amenities,
          ...acc
        }) =>
          ({
            ...acc,
            lowestPrice: lowestPrice ? formatPrice(lowestPrice) : undefined,
            reviewScore: reviewScore ? reviewScore.toFixed(1) : undefined,
            cleanlinessScore: cleanlinessScore
              ? cleanlinessScore.toFixed(1)
              : undefined,
            nearbyAttractions: nearbyAttractions?.map((attraction) => {
              return {
                name: attraction.name,
                type: attraction.type,
                latitude: attraction.latitude,
                longitude: attraction.longitude,
                distance: attraction.distance || undefined,
                byFoot: attraction.byFoot,
                byCar: attraction.byCar,
              } satisfies AttractionUpdate;
            }),
            nearbyTransportation: nearbyTransportation?.map((transport) => {
              return {
                name: transport.name,
                type: transport.type,
                latitude: transport.latitude,
                longitude: transport.longitude,
                distance: transport.distance || undefined,
                byFoot: transport.byFoot,
                byCar: transport.byCar,
              } satisfies TransportationUpdate;
            }),
            amenities: amenities
              ?.filter((amenity) => !!amenity.type)
              .map((amenity) => {
                return {
                  type: amenity.type || "",
                  available: amenity.available,
                  description: amenity.description,
                } satisfies AmenityUpdate;
              }),
          }) satisfies ComparisonFormData["accommodationRequestList"][number],
      ) || [],
    accommodationIdList: response.accommodationResponsesList
      ?.filter((acc) => acc.id)
      .map((acc) => acc.id as number),

    factorList: response.factorList || [],
  };
};

export const transformFormDataToUpdateComparisonTableRequest = (
  formData: ComparisonFormData,
): UpdateComparisonTableRequest => {
  const parsePrice = (priceString: string) => {
    // "123,456원" -> 123456
    const numericString = priceString.replace(/[^\d]/g, "");
    return Number(numericString) || 0;
  };

  // biome-ignore lint/suspicious/noExplicitAny: 어느 값이든 허용
  const convertEmptyToUndefined = (value: any): string | undefined => {
    return value === "" ? undefined : value;
  };

  return {
    ...formData,
    accommodationRequestList: formData.accommodationRequestList.map((acc) => {
      return {
        ...acc,
        lowestPrice: acc.lowestPrice ? parsePrice(acc.lowestPrice) : undefined,
        reviewScore: acc.reviewScore?.trim()
          ? Number(acc.reviewScore)
          : undefined,
        cleanlinessScore: acc.cleanlinessScore?.trim()
          ? Number(acc.cleanlinessScore)
          : undefined,
        reviewSummary: convertEmptyToUndefined(acc.reviewSummary),
        nearbyAttractions: acc.nearbyAttractions?.map((attraction) => ({
          ...attraction,
          name: convertEmptyToUndefined(attraction.name),
        })),
        nearbyTransportation: acc.nearbyTransportation?.map((transport) => ({
          ...transport,
          name: convertEmptyToUndefined(transport.name),
        })),
        amenities: acc.amenities?.map((amenity) => ({
          ...amenity,
          description: convertEmptyToUndefined(amenity.description),
        })),
      } satisfies UpdateAccommodationRequest;
    }),
  };
};
