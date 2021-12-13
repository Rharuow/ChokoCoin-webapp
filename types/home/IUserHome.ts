export interface IUserHome {
  id: string;
  email: string;
  username: string;
  is_admin: boolean;
  projects: [{ name: string; value: number }];
}
