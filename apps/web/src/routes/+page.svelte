<script lang="ts">
	import { MainSection } from 'gaudi';
	import type { LayoutServerData } from './$types.js';

	export let data: LayoutServerData;
</script>

<svelte:head>
	<title>Home</title>
	<meta name="description" content="Svelte demo app" />
</svelte:head>

<section>
	<MainSection/>
</section>
