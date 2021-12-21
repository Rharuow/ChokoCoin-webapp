import { getSession } from "next-auth/client";
import { IUser } from "../../types/IUser";
import { api, authorization } from "./api";

export const getUsers: () => Promise<Array<IUser> | null> = async () => {
  const auth = await authorization();
  const session = await getSession();
  if (auth.status && session) {
    const { data } = (await api.get("users", {
      headers: {
        Authorization: `Bearer ${session?.user.token}`,
      },
    })) as { data: Array<IUser> };
    return data;
  }
  return null;
};
