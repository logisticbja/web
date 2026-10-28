import { getSchedules } from "@/lib/schedule";

export const dynamic = "force-static";
export const revalidate = 300;

export async function GET() {
  try {
    return Response.json(await getSchedules());
  } catch {
    return Response.json([], { status: 502 });
  }
}
