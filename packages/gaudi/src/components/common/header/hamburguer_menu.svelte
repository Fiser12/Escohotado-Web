<script lang="ts">
	import hamburguer from '../../../assets/svgs/hamburguer.svg';
	import { createEventDispatcher } from 'svelte';

	const dispatch = createEventDispatcher();

	function handleClick() {
		dispatch('toggleMenu');
	}
</script>

<div class="flex lg:hidden justify-end items-center gap-4 flex-grow">
	<button on:click={handleClick} class="focus:outline-none">
		<img src={hamburguer} alt="menu" class="w-6 h-6" />
	</button>
</div>
