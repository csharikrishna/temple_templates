import { QueryClient } from "@tanstack/react-query";
import { createRouter, rootRouteId } from "@tanstack/react-router";
import { describe, expect, it } from "vitest";

import { routeTree } from "@/routeTree.gen";

describe("App routing", () => {
  const router = createRouter({ routeTree, context: { queryClient: new QueryClient() } });

  const requiredRoutes = [
    "/",
    "/our-story",
    "/temple-project",
    "/worship",
    "/community",
    "/events",
    "/gallery",
    "/donations",
    "/membership",
    "/volunteer",
    "/governance",
    "/contact",
    "/login",
    "/signup",
    "/reset-password",
    "/admin",
  ];

  it.each(requiredRoutes)("matches a route for %s without falling back to not found", (path) => {
    const matches = router.matchRoutes(path);

    expect(matches.length).toBeGreaterThan(0);
    expect(matches.at(-1)?.routeId).not.toBe(rootRouteId);
    expect(matches.at(-1)?.routeId).toBe(path);
  });
});
