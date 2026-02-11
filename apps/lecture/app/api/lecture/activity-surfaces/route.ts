import { NextResponse } from "next/server";
import type { ActivitySurfaceEnvelope } from "../../../lib/activity-surface";

const MAX_SURFACES = 500;
const surfaceStore: ActivitySurfaceEnvelope[] = [];

const buildResponse = (data: ActivitySurfaceEnvelope[]) =>
  NextResponse.json({ count: data.length, data });

export async function GET(request: Request) {
  const url = new URL(request.url);
  const activityId = url.searchParams.get("activityId");

  if (activityId) {
    const filtered = surfaceStore.filter((surface) => surface.activityId === activityId);
    return buildResponse(filtered);
  }

  return buildResponse(surfaceStore);
}

export async function POST(request: Request) {
  const payload = (await request.json()) as ActivitySurfaceEnvelope | ActivitySurfaceEnvelope[];
  const incoming = Array.isArray(payload) ? payload : [payload];

  for (const item of incoming) {
    surfaceStore.push(item);
  }

  if (surfaceStore.length > MAX_SURFACES) {
    surfaceStore.splice(0, surfaceStore.length - MAX_SURFACES);
  }

  return buildResponse(surfaceStore);
}
