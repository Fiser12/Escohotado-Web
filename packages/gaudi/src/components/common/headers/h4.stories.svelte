
<script context="module">    
    import H4 from "./h4.svelte";

    export const meta = {
        title: "Common/Atoms/Headers/H4",
        component: H4
    }
</script>

<script>
    import { Story, Template } from "@storybook/addon-svelte-csf";
</script>

<Template let:args>
    <H4>Titulo H4</H4>
</Template>
  
<Story name="Primary" args={{ label: "Button", }}/>
