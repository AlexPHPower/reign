import { type NextRequest } from "next/server";
import { type IncomingMessage } from "http";

export function convertToIncomingMessage(req: NextRequest): IncomingMessage {
  const rawRequest = (req as any).req as IncomingMessage;
  if (!rawRequest) {
    throw new Error("Failed to extract the raw request from NextRequest");
  }
  return rawRequest;
}
