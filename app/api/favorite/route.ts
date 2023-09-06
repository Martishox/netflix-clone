import { without } from "lodash";

import prismadb from "@/app/lib/prismadb";
import serverAuth from "@/app/lib/serverAuth";

export async function POST(req: Request) {
  try {
    if (req.method === "POST") {
      const { currentUser } = await serverAuth(req);

      const { movieId } = await req.json();

      const existingMovie = await prismadb.movie.findUnique({
        where: {
          id: movieId,
        },
      });

      if (!existingMovie) {
        throw new Error("Invalid ID");
      }

      const user = await prismadb.user.update({
        where: {
          email: currentUser?.email || "",
        },
        data: {
          favoriteIds: {
            push: movieId,
          },
        },
      });

      return new Response(JSON.stringify(user), { status: 200 });
    }

    return new Response("405", { status: 405 });
  } catch (error) {
    return new Response("500", { status: 500 });
  }
}

export async function DELETE(req: Request) {
  try {
    if (req.method === "DELETE") {
      const { currentUser } = await serverAuth(req);

      const { movieId } = await req.json();

      const existingMovie = await prismadb.movie.findUnique({
        where: {
          id: movieId,
        },
      });

      if (!existingMovie) {
        throw new Error("Invalid ID");
      }

      const updatedFavoriteIds = without(
        currentUser?.favoriteIds,
        movieId
      );

      const updatedUser = await prismadb.user.update({
        where: {
          email: currentUser?.email || "",
        },
        data: {
          favoriteIds: updatedFavoriteIds,
        },
      });

      return new Response(JSON.stringify(updatedUser), {
        status: 200,
      });
    }
    return new Response("405", { status: 405 });
  } catch (error) {
    return new Response("500", { status: 500 });
  }
}
