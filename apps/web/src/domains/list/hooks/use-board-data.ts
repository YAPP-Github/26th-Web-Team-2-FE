// TODO: 백엔드 API 연동 후 삭제 예정
const mockBoardData = {
  boardName: "도키도키 나고야",
  place: "나고야",
  startDate: "2023-10-01",
  endDate: "2023-10-05",
  members: [
    { id: 1, name: "유저1" },
    { id: 2, name: "유저2" },
    { id: 3, name: "유저3" },
  ],
};

export const useBoardData = () => {
  return mockBoardData;
};
