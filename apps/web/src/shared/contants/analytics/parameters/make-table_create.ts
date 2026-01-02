export const makeTableCreateParameter = (
  boardId: number,
  tableId: number,
  hotelIds: number[],
  hotelCount: number,
) => ({
  board_id: boardId,
  table_id: tableId,
  hotel_ids: hotelIds,
  hotel_count: hotelCount,
});
