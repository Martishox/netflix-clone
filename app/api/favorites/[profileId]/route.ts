import prismadb from "@/app/lib/prismadb";

export async function GET(
  req: Request,
  { params }: { params: { profileId: string } }
) {
  try {
    if (req.method !== "GET") {
      return new Response("405", { status: 405 });
    }

    const { profileId } = params;

    const userProfile = await prismadb.profile.findUnique({
      where: {
        id: profileId,
      },
    });

    if (!userProfile) {
      return new Response("404", { status: 404 });
    }

    const favoritedMovies = await prismadb.movie.findMany({
      where: {
        id: {
          in: userProfile.favoriteIds,
        },
      },
    });

    return new Response(JSON.stringify(favoritedMovies), {
      status: 200,
    });
  } catch (error) {
    return new Response("500", { status: 500 });
  }
}
