export const makeBoardCreateParameter = (
  boardId: number,
  boardName: string,
) => ({
  board_id: boardId,
  board_name: boardName,
});
