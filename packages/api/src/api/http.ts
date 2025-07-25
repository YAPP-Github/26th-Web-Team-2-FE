export const http = async <T>(url: string, init: RequestInit): Promise<T> => {
  const response = await fetch(url, init);
  try {
    const data = handleDate(await response.json());

    return {
      data,
      status: response.status,
      headers: response.headers,
    } as T;
  } catch (_error) {
    return {
      data: null,
      status: response.status,
      headers: response.headers,
    } as T;
  }
};

const isDateString = (value: unknown): boolean => {
  const pattern =
    /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(?:\.\d*)?(?:[-+]\d{2}:?\d{2}|Z)?$/;
  return !!value && typeof value === "string" && pattern.test(value);
};

const handleDate = <T>(body: T): T => {
  if (body === null || body === undefined || typeof body !== "object") {
    return body;
  }

  for (const key of Object.keys(body)) {
    // biome-ignore lint/suspicious/noExplicitAny: body 타입이 결정되지 않아 타입 추론 불가
    const value = (body as any)[key];
    if (isDateString(value)) {
      // biome-ignore lint/suspicious/noExplicitAny: body 타입이 결정되지 않아 타입 추론 불가
      (body as any)[key] = new Date(value);
    } else if (typeof value === "object") {
      handleDate(value);
    }
  }

  return body;
};
