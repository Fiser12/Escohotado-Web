import { getUser } from '$src/lib/server/auth.service.js';
import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types.js';
import { videoCmsList, getTotalVideos } from '$src/lib/server/cms/video/video-cms-list.js';
import { notNull } from '../../../../../../../packages/gaudi/src/domain/optional_helpers.js';

export const load: PageServerLoad = async ({ locals, url   }) => {
	const user = await getUser(locals);
	if (!user) return redirect(303, '/');
    const page = notNull(url.searchParams.get('page'), page => Number(page));
    const limit = notNull(url.searchParams.get('limit'), limit => Number(limit));

	return {
		videos: await videoCmsList(page, limit),
		totalVideos: await getTotalVideos()
	};
};
