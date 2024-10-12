
<script context="module">    
    import SubscriptionCard from "./subscription_card.svelte";
    import { EscotaButton } from "index";

    export const meta = {
        title: "Subscription/Component/SubscriptionCard",
        component: SubscriptionCard
    }
</script>
<script>
    import { Story, Template } from "@storybook/addon-svelte-csf";
</script>

<Template let:args>
    <SubscriptionCard {...args}>
        <EscotaButton text="Comprar" variant={"secondary"}/>
    </SubscriptionCard>
</Template>
  
<Story 
    name="Normal" 
    args={{
		price: "49.99€",
		title: "Plan Básico",
		features: ["Acceso a la newsletter", "Acceso anticipado a los vídeos", "Acceso a parte del contenido"],
		mainCard: false
	}}
    parameters={{
        layout: 'fullscreen',
        design: {
            type: 'figspec',
            url: 'https://www.figma.com/file/xq1hrsTcwvQMgX49pwXGcc/Escohotado?node-id=490-2295&m=dev'
        }
    }}
/>

<Story 
    name="Destacado" 
    args={{
		price: "49.99€",
		title: "Plan Básico",
		features: ["Acceso a la newsletter", "Acceso anticipado a los vídeos", "Acceso a parte del contenido"],
		mainCard: true
	}}
    parameters={{
        layout: 'fullscreen',
        design: {
            type: 'figspec',
            url: 'https://www.figma.com/file/xq1hrsTcwvQMgX49pwXGcc/Escohotado?node-id=490-2445&m=dev'
        }
    }}
/>
