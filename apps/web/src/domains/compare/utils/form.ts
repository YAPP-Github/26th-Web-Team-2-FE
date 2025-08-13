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
                distance:
                  attraction.byFoot?.distance || attraction.byCar?.distance,
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
                distance:
                  transport.byFoot?.distance || transport.byCar?.distance,
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
    factorList: response.factorsList || [],
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

  return {
    ...formData,
    accommodationRequestList: formData.accommodationRequestList.map((acc) => {
      return {
        ...acc,
        lowestPrice: acc.lowestPrice ? parsePrice(acc.lowestPrice) : undefined,
        reviewScore: acc.reviewScore ? Number(acc.reviewScore) : undefined,
        cleanlinessScore: acc.cleanlinessScore
          ? Number(acc.cleanlinessScore)
          : undefined,
      } satisfies UpdateAccommodationRequest;
    }),
  };
};
