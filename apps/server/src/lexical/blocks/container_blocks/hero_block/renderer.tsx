import { HomeHero } from "gaudi/server"

export const renderer = async ({ node }: any) => {
    return <HomeHero description={node.fields.description} buttons={node.fields.buttons}/>
}