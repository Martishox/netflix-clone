import prismadb from "@/app/lib/prismadb";
import serverAuth from "@/app/lib/serverAuth";

export async function GET(req: Request) {
  try {
    if (req.method === "GET") {
      const { currentUser } = await serverAuth(req);

      const userProfiles = await prismadb.user
        .findUnique({
          where: {
            id: currentUser?.id,
          },
        })
        .profiles();

      return new Response(JSON.stringify(userProfiles), {
        status: 200,
      });
    }

    return new Response("405", { status: 405 });
  } catch (error) {
    console.error("Error creating profile:", error);
    return new Response("Internal Server Error: ", {
      status: 500,
    });
  }
}
