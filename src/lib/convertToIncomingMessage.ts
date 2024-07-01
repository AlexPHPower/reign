import { type NextRequest } from "next/server";
import { IncomingMessage } from "http";

function hasIncomingMessage(
  req: NextRequest,
): req is NextRequest & { req: IncomingMessage } {
  return (req as NextRequest & { req: unknown }).req instanceof IncomingMessage;
}

export function convertToIncomingMessage(req: NextRequest): IncomingMessage {
  if (hasIncomingMessage(req)) {
    return req.req;
  } else {
    throw new Error("Failed to extract the raw request from NextRequest");
  }
}
