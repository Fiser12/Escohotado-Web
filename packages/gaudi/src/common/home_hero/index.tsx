import { MainHero } from "../../content/common/hero"
import { MainButton } from "../main_button/main_button"
import Image from "next/image"
import heroHome from "../../assets/images/hero-home.png";

interface Props {
    description: string
    buttons: Array<{ title: string; link: string }>
}

const HomeHero: React.FC<Props> = ({ description, buttons }) => {
    return <MainHero
        description={description}
        title="Antonio Escohotado"
        image={
            <Image
                width={2610}
                height={3036}
                src={heroHome.src}
                alt={"Antonio Escohotado"}
            />
        }
        topHeader={true}
        changeDirection={false}
    >
        {buttons.map((button, index) => (
            <a key={index} href={button.link}>
                <MainButton text={button.title} type="line" />
            </a>
        ))}
    </MainHero>
}
export default HomeHero