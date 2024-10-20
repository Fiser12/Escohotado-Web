import { SvelteKitAuth, type Session } from '@auth/sveltekit';
import Keycloak from '@auth/sveltekit/providers/keycloak';
import { env } from '$env/dynamic/private';
import { redirect } from '@sveltejs/kit';
import { externalUrl } from './routing.js';
import type {  UserModel, Optional } from 'hegel';
import {  notNull } from 'hegel';

const authjsSecret = env.AUTH_SECRET;

const kcConfig = {
	issuer: externalUrl.keycloak.issuer,
	clientId: env.AUTH_KEYCLOAK_ID,
	clientSecret: env.AUTH_KEYCLOAK_SECRET
};

export const { handle, signIn, signOut } = SvelteKitAuth({
	trustHost: true,
	secret: authjsSecret,
	providers: [Keycloak(kcConfig)],
	callbacks: {
		async session({ session }: any) {
			return session
		}
	}
});

export async function getUser(locals: App.Locals): Promise<Optional<UserModel>> {
	return notNull(await locals.auth(), session => mapSessionToUserModel(session));
}

export async function restrictAuth(locals: App.Locals): Promise<UserModel> {
	const user = await getUser(locals);
	if (!user) return redirect(303, '/');
	return user;
}


export function mapSessionToUserModel(session: any): UserModel | undefined {
	const user = session.user;
	if (!user || user.email == null) return undefined;

	return {
		userId: user.id ?? "",
		name: user.name,
		email: user.email,
		image: user.image
	};
}
