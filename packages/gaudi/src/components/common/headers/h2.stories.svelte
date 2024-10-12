
<script context="module">    
    import H2 from "./h2.svelte";

    export const meta = {
        title: "Common/Atoms/Headers/H2",
        component: H2
    }
</script>
<script>
    import { Story, Template } from "@storybook/addon-svelte-csf";
</script>

<Template let:args>
    <H2>Titulo H2</H2>
</Template>
  
<Story name="Primary" args={{ label: "Button", }}/>
