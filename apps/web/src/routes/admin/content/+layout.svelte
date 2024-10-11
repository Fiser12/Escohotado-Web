<script lang="ts">
	import { H3, ContentWrapper } from "gaudi";
	import { Sidebar, SidebarGroup, SidebarItem, SidebarWrapper } from 'flowbite-svelte';
	import { YoutubeSolid, NewspaperSolid } from 'flowbite-svelte-icons';

	import { page } from '$app/stores';
	import { relativeUrls } from '$src/lib/domain/routing.js';
	$: activeUrl = $page.url.pathname;
</script>

<svelte:head>
	<title>Administración de contenido</title>
	<meta name="description" content="Svelte demo app" />
</svelte:head>

<ContentWrapper>
	<H3>Administración de contenido</H3>

	<div class="grid grid-cols-1 lg:grid-cols-4 gap-4 mt-8">
		<div class="lg:col-span-1">
			<Sidebar {activeUrl}>
				<SidebarWrapper>
					<SidebarGroup>
						<SidebarItem label="Vídeos" href={relativeUrls.admin.content.videos}>
							<svelte:fragment slot="icon">
								<YoutubeSolid class="w-6 h-6 text-gray-500" />
							</svelte:fragment>
						</SidebarItem>
						<SidebarItem label="Artículos" href={relativeUrls.admin.content.articles}>
							<svelte:fragment slot="icon">
								<NewspaperSolid class="w-6 h-6 text-gray-500" />
							</svelte:fragment>
						</SidebarItem>
					</SidebarGroup>
				</SidebarWrapper>
			</Sidebar>
		</div>
		<div class="lg:col-span-3">
			<slot />
		</div>
	</div>
</ContentWrapper>
