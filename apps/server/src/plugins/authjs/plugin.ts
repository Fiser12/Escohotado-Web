import { withPayload } from "payload-authjs";
import payloadConfig from "@payload-config";
import NextAuth from "next-auth";
import { authConfig } from "./auth.config";

const nextAuthResult = NextAuth(
  withPayload(authConfig, {
    payloadConfig,
    updateUserOnSignIn: true,
  }),
);

export const handlers = nextAuthResult.handlers;
export const signIn = nextAuthResult.signIn as any;
export const signOut = nextAuthResult.signOut;
export const auth = nextAuthResult.auth;
