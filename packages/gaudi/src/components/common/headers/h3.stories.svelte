
<script context="module">    
    import H3 from "./h3.svelte";

    export const meta = {
        title: "Common/Atoms/Headers/H3",
        component: H3
    }
</script>
<script>
    import { Story, Template } from "@storybook/addon-svelte-csf";
</script>

<Template let:args>
    <H3>Titulo H3</H3>
</Template>
  
<Story name="Primary" args={{ label: "Button", }}/>
