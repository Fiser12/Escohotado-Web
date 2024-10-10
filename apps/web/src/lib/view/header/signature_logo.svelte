<script lang="ts">
	import logo from 'gaudi/assets/svgs/signature.svg';

	export let homeUrl: string = '/';
	export let tabindex: number = 0;

</script>

<div class="flex-shrink min-w-0 mr-4">
	<a href={homeUrl} class="inline-block" tabindex={tabindex}>
		<img src={logo} alt="Antonio Escohotado" class="w-full max-w-[240px] h-auto object-contain" />
	</a>
</div>
