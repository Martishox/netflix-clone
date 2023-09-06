import serverAuth from "@/app/lib/serverAuth";

export async function GET(req: Request) {
  try {
    if (req.method !== "GET") {
      return new Response("405", { status: 405 });
    }

    const { currentUser } = await serverAuth(req);

    return new Response(JSON.stringify(currentUser), { status: 200 });
  } catch (error) {
    return new Response("500", { status: 500 });
  }
}
