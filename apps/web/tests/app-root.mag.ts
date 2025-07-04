import { test } from "magnitude-test";

test("can click count button and see the count", async (agent) => {
  await agent.act("click count button");
  await agent.check("check the count is 1");
});
