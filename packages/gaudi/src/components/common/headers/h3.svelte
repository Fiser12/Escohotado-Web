<script lang="ts">
	import { TextVariant } from "./text-variant.js";

    export let variant: TextVariant = TextVariant.Primary;
</script>

<h3 
    class="text-3xl font-normal font-['YesevaOne']"
    class:text-black={variant === TextVariant.Primary}
    class:text-cyan-950={variant === TextVariant.Secondary}
    class:text-[#978a6c]={variant === TextVariant.Terciary}
>
    <slot></slot>
</h3>