import prismadb from "@/app/lib/prismadb";
import serverAuth from "@/app/lib/serverAuth";

export async function GET(
  req: Request,
  { params }: { params: { movieId: string } }
) {
  try {
    if (req.method !== "GET") {
      return new Response("405", { status: 405 });
    }

    await serverAuth(req);

    const { movieId } = params;

    if (typeof movieId !== "string") {
      throw new Error("Invalid Id");
    }

    if (!movieId) {
      throw new Error("Missing Id");
    }

    const movies = await prismadb.movie.findUnique({
      where: {
        id: movieId,
      },
    });

    return new Response(JSON.stringify(movies), { status: 200 });
  } catch (error) {
    return new Response("500", { status: 500 });
  }
}
