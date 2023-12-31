import bcrypt from "bcrypt";
import prismadb from "@/app/lib/prismadb";

export async function POST(req: Request) {
  try {
    if (req.method !== "POST") {
      return new Response("405", { status: 405 });
    }

    const { email, name, password } = await req.json();

    const existingUser = await prismadb.user.findUnique({
      where: {
        email,
      },
    });

    if (existingUser) {
      return new Response(JSON.stringify({ error: "Email taken" }), {
        status: 422,
      });
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const user = await prismadb.user.create({
      data: {
        email,
        name,
        hashedPassword,
        image: "",
        emailVerified: new Date(),
      },
    });
    return new Response(JSON.stringify(user), { status: 200 });
  } catch (error) {
    return new Response(
      JSON.stringify({ error: `Something went wrong: ${error}` }),
      { status: 400 }
    );
  }
}
