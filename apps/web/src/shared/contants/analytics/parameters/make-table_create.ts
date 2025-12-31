export const makeTableCreateParameter = (
  board_id: number,
  table_id: number,
  hotel_ids: number[],
  hotel_count: number,
) => ({
  board_id,
  table_id,
  hotel_ids,
  hotel_count,
});
