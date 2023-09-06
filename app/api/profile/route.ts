import prismadb from "@/app/lib/prismadb";
import serverAuth from "@/app/lib/serverAuth";

export async function POST(req: Request) {
  try {
    if (req.method === "POST") {
      const { name, image, kid } = await req.json();

      const { currentUser } = await serverAuth(req);

      const existingProfilesCount = await prismadb.profile.count({
        where: {
          userId: currentUser?.id,
        },
      });

      if (existingProfilesCount >= 4) {
        return new Response(
          "You have reached the maximum limit of profiles.",
          {
            status: 400,
          }
        );
      }

      const createProfile = await prismadb.profile.create({
        data: {
          name: name,
          image: image,
          kid: kid,
          user: {
            connect: {
              id: currentUser?.id,
            },
          },
        },
      });

      const updatedUser = await prismadb.user.update({
        where: {
          id: currentUser?.id,
        },
        data: {
          profiles: {
            connect: { id: createProfile.id },
          },
        },
        include: {
          profiles: true,
        },
      });

      return new Response(JSON.stringify(updatedUser), {
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
