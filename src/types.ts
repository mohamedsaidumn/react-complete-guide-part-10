export type TaskType = { id: string; text: string };

export type HTTP_METHOD = "GET" | "POST" | undefined;
export type HTTP_HEADERS = { "Content-Type": string } | undefined;

export type HTTP_REQUEST_CONFIG = {
  url: string;
  method?: HTTP_METHOD;
  body?: any;
  headers?: HTTP_HEADERS;
};
