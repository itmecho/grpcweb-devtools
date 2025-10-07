export type GrpcWebMessageEventData = {
  type: "__GRPCWEB_DEVTOOLS__";
} & GrpcWebData;

export type GrpcWebData = {
  method: string;
  methodType: string;
  request?: Record<string, unknown>;
  response?: Record<string, unknown>;
  error?: Error;
};

type BaseMessage = {
  target: string;
};

export type InitMessage = BaseMessage & {
  action: "init";
  tabId: number;
};

export type DataMessage = BaseMessage & {
  action: "gRPCWebData";
  data: GrpcWebData;
};

export type Message = InitMessage | DataMessage;
