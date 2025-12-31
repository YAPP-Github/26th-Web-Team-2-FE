export const makeHotelAddParameter = (
  boardId: number,
  hotelId: number,
  hotelDomain: string,
) => ({
  board_id: boardId,
  hotel_id: hotelId,
  hotel_domain: hotelDomain,
});
