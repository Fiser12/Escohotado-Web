<script lang="ts">
	import { H3, TextVariant } from "../../../index";

    export let title: string;
    export let price: string;
    export let features: string[];
    export let mainCard: boolean = false;
</script>

<div
	class="w-96 h-96 p-10 rounded-sm border border-stone-300 flex-col justify-center items-center gap-10 inline-flex"
    class:bg-stone-100={mainCard}
    class:bg-white={!mainCard}
>
	<div class="flex-col justify-start items-center gap-4 flex">
        <H3 variant={mainCard ? TextVariant.Terciary : TextVariant.Primary}>{title}</H3>
		<div class="justify-start items-end gap-2.5 inline-flex">
			<div class="text-[#426578] text-2xl font-bold font-['Montserrat'] leading-normal">{price}</div>
			<div class="text-neutral-400 text-base font-normal font-['Montserrat'] leading-normal">
				al año
			</div>
		</div>
	</div>
	<div class="flex-col justify-start items-start gap-5 flex">
        {#each features as feature}
            <div class="justify-start items-center gap-1 inline-flex">
                <div class="w-3.5 h-3.5 px-0.5 py-0.5 justify-center items-center flex"></div>
                <div class="text-neutral-800 text-sm font-normal font-['Montserrat'] leading-none">
                    {feature}
                </div>
            </div>
		{/each}
	</div>
    <slot/>
</div>
