import prismadb from "@/app/lib/prismadb";
import serverAuth from "@/app/lib/serverAuth";

export async function GET(req: Request) {
  try {
    if (req.method !== "GET") {
      return new Response("405", { status: 405 });
    }

    await serverAuth(req);

    const moviesCount = await prismadb.movie.count();
    const randomIndex = Math.floor(Math.random() * moviesCount);

    const randomMovies = await prismadb.movie.findMany({
      take: 1,
      skip: randomIndex,
    });

    return new Response(JSON.stringify(randomMovies[0]), {
      status: 200,
    });
  } catch (error) {
    return new Response("500", { status: 500 });
  }
}
