import prismadb from "@/app/lib/prismadb";
import serverAuth from "@/app/lib/serverAuth";

export async function GET(req: Request) {
  try {
    if (req.method !== "GET") {
      return new Response("405", { status: 405 });
    }

    await serverAuth(req);

    const movies = await prismadb.movie.findMany();

    return new Response(JSON.stringify(movies), {
      status: 200,
    });
  } catch (error) {
    return new Response("500", { status: 500 });
  }
}
