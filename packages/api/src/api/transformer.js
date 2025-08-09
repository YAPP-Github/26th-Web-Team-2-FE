/**
 * @param {import("./openapi.json")} spec
 * @return {import("openapi3-ts/oas31").OpenAPIObject}
 */
export default (spec) => {
  // FIX: deleteTripBoard
  spec.paths["/api/trip-boards/{boardId}"].delete =
    spec.paths["/api/trip-boards/{tripBoardId}"].delete;
  spec.paths["/api/trip-boards/{boardId}"].delete.parameters = [
    {
      name: "boardId",
      in: "path",
      description: "여행 보드 ID",
      required: true,
      schema: { type: "integer" },
    },
  ];
  delete spec.paths["/api/trip-boards/{tripBoardId}"];

  // FIX: leaveTripBoard
  spec.paths["/api/trip-boards/leave/{boardId}"] =
    spec.paths["/api/trip-boards/leave/{tripBoardId}"];
  spec.paths["/api/trip-boards/leave/{boardId}"].post.parameters = [
    {
      name: "boardId",
      in: "path",
      description: "여행 보드 ID",
      required: true,
      schema: { type: "integer" },
    },
  ];
  delete spec.paths["/api/trip-boards/leave/{tripBoardId}"];

  return spec;
};
