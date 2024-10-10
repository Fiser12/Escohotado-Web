<script lang="ts">
	import ContentWrapper from '$src/lib/view/common/content_wrapper.svelte';
	import escohotadoFumandoImg from 'gaudi/assets/img/escohotado-fumando.png';
	import { EscotaButton } from 'gaudi';
</script>

<ContentWrapper classname="h-96 relative" backgroundClassname="bg-white">
	<img
		class="absolute right-0 h-full object-cover fade-in"
		src={escohotadoFumandoImg}
		alt="Antonio Escohotado fumando"
	/>
	<div class="absolute left-0 top-0 w-1/2 h-full flex flex-col md:justify-center p-6 pt-12 md:pt-0">
		<div class="flex-col items-start gap-6 flex">
			<h1 class="text-title-primary text-4xl md:text-5xl font-normal font-yesevaone leading-tight">
				Antonio Escohotado
			</h1>
			<p class="hidden sm:block text-black text-base font-normal font-montserrat leading-normal">
				Filósofo y ensayista español, dedicó su vida a explorar y desafiar las convenciones
				sociales.
			</p>
			<a href="/">
				<EscotaButton text="Descubre su legado" variant="secondary"/>
			</a>
		</div>
	</div>
</ContentWrapper>

<style>
	.fade-in {
		animation: fadeIn 2s ease-out;
	}

	@keyframes fadeIn {
		from {
			opacity: 0;
		}
		to {
			opacity: 1;
		}
	}
</style>
