<script lang="ts">
	import { relativeUrls } from '$src/lib/domain/routing.js';
	import { EscotaButton, H2, H4, ContentWrapper, notNull } from 'gaudi';
	import type { PageData } from './$types.js';
	import { ToggleButtonGroup, SubscriptionCard } from 'gaudi';

	export let data: PageData;
	const options = [
		{ id: 'month', label: 'Pago mensual' },
		{ id: 'year', label: 'Pago anual', sublabel: 'ahorra 10%' }
	];
	let selected: any = options[1];
</script>

<ContentWrapper
	classname="space-y-6 gap-2 flex flex-col items-center pt-16"
	backgroundClassname="bg-white"
>
	<H2>Elige tu plan y accede al legado Escohotado.</H2>
	<H4>Descubre videos, artículos y textos exclusivos.</H4>
	<p class="text-center text-cyan-950 text-base font-normal font-['Montserrat'] leading-normal">
		También puedes elegir la modalidad de pago que mejor se adapte a ti.
	</p>

	<ToggleButtonGroup bind:selected {options} />

	<div class="h-96 justify-start items-start gap-7 inline-flex">
		{#if data.productsByInterval[selected.id]}
			{#each data.productsByInterval[selected.id] as product}
				{#each product.prices as price}
					{@const subscriptionByPrice = data.currentSubscriptions.find(
						(item) => item.priceId == price.id
					)}
					{@const priceStr = ((price.unitAmount || 0) / 100).toLocaleString('es-ES', {
						style: 'currency',
						currency: 'EUR'
					})}
					<SubscriptionCard
						title={product.name}
						price={priceStr}
						features={JSON.parse(product.metadata.features)}
						mainCard={product.metadata?.prominent == 'true'}
					>
						{#if subscriptionByPrice}
							{#if subscriptionByPrice.canceled?.isCanceled == false}
								<a
									href={relativeUrls.subscriptions.updateSubscription(
										subscriptionByPrice.subscriptionId,
										true
									)}
								>
									<EscotaButton text="Cancelar" />
								</a>
							{:else}
								<a
									href={relativeUrls.subscriptions.updateSubscription(
										subscriptionByPrice.subscriptionId,
										false
									)}
								>
									<EscotaButton text="Resuscribirse" />
								</a>
								{@const canceledDate = notNull(
									subscriptionByPrice.canceled?.cancelAt,
									(cancelAt) => new Date(cancelAt * 1000)
								)}
								{#if canceledDate}
									<p>La suscripción se cancelará el {canceledDate.toLocaleDateString()}</p>
								{/if}
							{/if}
						{:else if data.currentSubscriptions && data.currentSubscriptions.length}
							<a
								href={relativeUrls.subscriptions.portalUpdateSubscription(
									data.currentSubscriptions[0].subscriptionId
								)}
							>
								<EscotaButton text="Cambiar" />
							</a>
						{:else}
							<a href={relativeUrls.subscriptions.checkout(price.id)}>
								<EscotaButton text="Suscribirse" />
							</a>
						{/if}
					</SubscriptionCard>
				{/each}
			{/each}
		{:else}
			<p>No hay productos disponibles para el intervalo seleccionado.</p>
		{/if}
	</div>

	{#if data.currentSubscriptions && data.currentSubscriptions.length}
		<a href={relativeUrls.subscriptions.portal}>
			<EscotaButton text="Ir a Stripe" />
		</a>
	{/if}
</ContentWrapper>
