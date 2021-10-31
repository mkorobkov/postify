export interface User {
  id: string;
  name: string;
}

export interface GetUsersMeResponse {
  success: true;
  user: User;
}
