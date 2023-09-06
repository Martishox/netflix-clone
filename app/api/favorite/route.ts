import { without } from "lodash";

import prismadb from "@/app/lib/prismadb";
import serverAuth from "@/app/lib/serverAuth";
import { useProfileId } from "@/app/component/ContextProvider";

export async function POST(req: Request) {
  try {
    if (req.method === "POST") {
      const { movieId, profileId } = await req.json();

      const existingProfile = await prismadb.profile.findUnique({
        where: {
          id: profileId?.id,
        },
      });

      const existingMovie = await prismadb.movie.findUnique({
        where: {
          id: movieId,
        },
      });

      if (!existingMovie) {
        throw new Error("Invalid Movie ID");
      }

      if (!existingProfile) {
        throw new Error("User Profile not found");
      }

      if (!existingProfile?.favoriteIds.includes(movieId)) {
        const updatedProfile = await prismadb.profile.update({
          where: {
            id: existingProfile?.id,
          },
          data: {
            favoriteIds: {
              push: movieId,
            },
          },
        });

        return new Response(JSON.stringify(updatedProfile), {
          status: 200,
        });
      }
    }

    return new Response("405", { status: 405 });
  } catch (error) {
    return new Response("500", { status: 500 });
  }
}

export async function DELETE(req: Request) {
  try {
    if (req.method === "DELETE") {
      const { movieId, profileId } = await req.json();

      const existingProfile = await prismadb.profile.findUnique({
        where: {
          id: profileId?.id,
        },
      });

      const existingMovie = await prismadb.movie.findUnique({
        where: {
          id: movieId,
        },
      });

      if (!existingMovie) {
        throw new Error("Invalid Movie ID");
      }

      if (!existingProfile) {
        throw new Error("User Profile not found");
      }

      const updatedFavoriteIds = without(
        existingProfile?.favoriteIds || [],
        movieId
      );

      const updatedProfile = await prismadb.profile.update({
        where: {
          id: existingProfile?.id,
        },
        data: {
          favoriteIds: updatedFavoriteIds,
        },
      });

      return new Response(JSON.stringify(updatedProfile), {
        status: 200,
      });
    }

    return new Response("405", { status: 405 });
  } catch (error) {
    return new Response("500", { status: 500 });
  }
}
