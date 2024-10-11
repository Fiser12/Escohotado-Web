<script lang="ts">
	import { Header } from 'gaudi';
	import type { LayoutServerData } from './$types.js';
	import "gaudi/styles.css"
	import { accountMenuBuilder } from '$lib/domain/header_submenu_model.js';
	import { signIn } from '@auth/sveltekit/client';

	export let data: LayoutServerData;
</script>

<div class="app">
	<Header 
		user={data.user} 
		menuSectionsLoader={accountMenuBuilder} 
		signIn={() => signIn('keycloak')}
	/>
	<main>
		<slot />
	</main>
</div>
