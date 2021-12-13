export interface IUserHome {
    id: string;
    email: string;
    username: string;
    projects: [{ name: string; value: number }];
}