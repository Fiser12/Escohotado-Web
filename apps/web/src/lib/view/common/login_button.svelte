<script lang="ts">
	import { signIn } from '@auth/sveltekit/client';

	import { EscotaButton } from 'gaudi';
</script>

<button on:click={() => signIn('keycloak')}>
	<EscotaButton text="Entrar" variant="secondary" />
</button>