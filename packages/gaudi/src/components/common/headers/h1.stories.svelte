<script context="module">    
    import H1 from "./h1.svelte";

    export const meta = {
        title: "Common/Atoms/Headers/H1",
        component: H1
    }
</script>
<script>
    import { Story, Template } from "@storybook/addon-svelte-csf";
</script>

<Template let:args>
    <H1>Titulo H1</H1>
</Template>
  
<Story name="Primary" args={{ label: "Button", }}/>
