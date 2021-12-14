import { getSession } from "next-auth/client";
import { IProject } from "../../types/IProject";
import { api, authorization } from "./api";

export const getProjects: () => Promise<Array<IProject> | null> = async () => {
  const auth = await authorization();
  const session = await getSession();
  if (auth.status && session) {
    const { data } = (await api.get("projects", {
      headers: {
        Authorization: `Bearer ${session?.user.token}`,
      },
    })) as { data: Array<IProject> };
    return data;
  }
  return null;
};
