export interface UserPayload {
  sub: string;
}

export interface ExtendedRequest {
  user?: UserPayload;
  userId: string;
}
