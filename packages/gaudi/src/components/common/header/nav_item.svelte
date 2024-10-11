<script lang="ts">
	export let href: string = '/';
	export let text: string;
	export let tabindex: number = 0;
</script>

<a
	{tabindex}
	{href}
	class="text-black text-base font-normal font-montserrat leading-none whitespace-nowrap flex-shrink-0"
>
	{text}
</a>
