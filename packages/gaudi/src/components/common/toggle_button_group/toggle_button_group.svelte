<script lang="ts">
	import { fade } from 'svelte/transition';

	type ButtonOption = {
		id: string;
		label: string;
		sublabel?: string;
	};

	export let options: ButtonOption[] = [];

	export let selected: ButtonOption;
	export let setOption = (option: ButtonOption) => (selected = option);

	$: activeIndex = options.map(option => option.id).indexOf(selected.id);
</script>

<div class="px-1 py-1 bg-stone-100 rounded-full justify-start items-center gap-6 inline-flex">
	<div class="self-stretch justify-start items-center gap-2 flex">
		{#each options as option, index}
			<div class="relative">
				{#if index == activeIndex}
					<div
						transition:fade
						class="absolute left-0 h-full bg-white rounded-full pointer-events-none w-full selected-interval"
						aria-hidden="true"
					></div>
				{/if}

				<button
					class="relative flex text-xs h-8 rounded-full gap-1 transition-colors duration-150 ease-in-out font-['Montserrat'] justify-center items-center mx-2"
					class:text-black={selected.id === option.id}
					class:text-neutral-400={selected.id !== option.id}
					class:font-normal={selected.id !== option.id}
					class:font-bold={selected.id === option.id}
					on:click={() => setOption(option)}
					aria-pressed={selected.id === option.id}
				>
					{option.label}
					{#if option.sublabel}
						<span class="text-slate-600 text-xs font-['Montserrat'] leading-3">{option.sublabel}</span>
					{/if}
				</button>
			</div>
		{/each}
	</div>
</div>
