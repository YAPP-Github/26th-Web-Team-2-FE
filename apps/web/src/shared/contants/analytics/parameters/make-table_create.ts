export const makeTableCreateParameter = (
  board_id: number,
  table_id: number,
  hotel_id: number,
  hotel_count: number,
) => ({
  board_id,
  table_id,
  hotel_id,
  hotel_count,
});
