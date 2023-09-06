import prismadb from "@/app/lib/prismadb";
import serverAuth from "@/app/lib/serverAuth";

export async function GET(req: Request) {
  try {
    if (req.method !== "GET") {
      return new Response("405", { status: 405 });
    }

    const { currentUser } = await serverAuth(req);

    const favoritedMovies = await prismadb.movie.findMany({
      where: {
        id: {
          in: currentUser?.favoriteIds,
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
