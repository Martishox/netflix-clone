import { getServerSession } from "next-auth/next";

import prismadb from "@/app/lib/prismadb";
import { authOptions } from "../utils/authOptions";

const serverAuth = async (req: Request) => {
  const session = await getServerSession(authOptions);

  if (!session?.user?.email) {
    throw new Error("Not signed in");
  }

  if (!session) {
    return {
      redirect: {
        destination: "/auth",
        permanent: true,
      },
    };
  }

  const currentUser = await prismadb.user.findUnique({
    where: {
      email: session.user.email,
    },
  });

  if (!currentUser) {
    throw new Error("Not signed in");
  }

  return { currentUser, props: {} };
};

export default serverAuth;
