import { NextResponse } from "next/server";
import { handleCheckout, handlePortal, handleUpdate } from "./handlers";
import { BaseUser } from "payload-access-control";

type RouteHandlers = {
  GET: (request: Request) => Promise<NextResponse>;
};

type StripeHandlers = {
  checkout: RouteHandlers;
  portal: RouteHandlers;
  update: RouteHandlers;
};

export function createStripeInventoryHandlers(
  getCurrentUser: () => Promise<BaseUser | null>,
  getRoutes: () => { nextJS: { subscriptionPageHref: string } }
): StripeHandlers {
  return {
    checkout: {
      GET: (request: Request) =>
        handleCheckout(request, getCurrentUser, getRoutes),
    },
    portal: {
      GET: (request: Request) =>
        handlePortal(request, getCurrentUser, getRoutes),
    },
    update: {
      GET: (request: Request) =>
        handleUpdate(request, getCurrentUser, getRoutes),
    },
  };
}

export function createRouteHandlers(
  getCurrentUser: () => Promise<BaseUser | null>,
  getRoutes: () => { nextJS: { subscriptionPageHref: string } }
) {
  return {
    GET: async (
      request: Request,
      { params }: { params: { stripe: string[] } }
    ) => {
      const path = params.stripe[0];
      const handlers = createStripeInventoryHandlers(getCurrentUser, getRoutes);

      if (path === "checkout" || path === "portal" || path === "update") {
        return handlers[path].GET(request);
      }

      return NextResponse.json({ error: "Route not found" }, { status: 404 });
    },
  };
}
