import prismadb from "@/app/lib/prismadb";

export async function GET(
  req: Request,
  { params }: { params: { profileId: string } }
) {
  try {
    if (req.method === "GET") {
      const { profileId } = params;

      const userProfile = await prismadb.profile.findUnique({
        where: {
          id: profileId,
        },
      });

      if (!userProfile) {
        return new Response("404", { status: 404 });
      }

      return new Response(JSON.stringify(userProfile), {
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
