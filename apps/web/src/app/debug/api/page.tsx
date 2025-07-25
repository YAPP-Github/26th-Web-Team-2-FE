"use client";
import { useSuccess } from "@ssok/api";

const DebugAPIPage = () => {
  const { data } = useSuccess();
  return <div>{JSON.stringify(data)}</div>;
};

export default DebugAPIPage;
