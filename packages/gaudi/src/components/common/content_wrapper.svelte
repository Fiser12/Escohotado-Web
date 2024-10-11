<script lang="ts">
	export let classname: string = '';
	export let backgroundClassname: string = '';
</script>

<div class="w-full h-full px-6 {backgroundClassname}">
	<div class="mx-auto max-w-screen-xl w-full {classname}">
		<slot></slot>
	</div>
</div>
