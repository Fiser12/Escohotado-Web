<script lang="ts">
	import { ContentWrapper } from "gaudi";
  import type { PageData } from "./$houdini"
  export let data: PageData

  $: ({ GetAllMedia } = data)

</script>

<svelte:head>
	<title>Adminsitración de usuarios</title>
	<meta name="description" content="Svelte demo app" />
</svelte:head>


<ContentWrapper>
  {#await $GetAllMedia}
    <p>Cargando usuarios...</p>
  {:then result}
    <ul>
      {JSON.stringify(result?.data?.allMedia?.docs)}
    </ul>
  {:catch error}
    <p>Error al cargar los usuarios: {error.message}</p>
  {/await}
</ContentWrapper>
