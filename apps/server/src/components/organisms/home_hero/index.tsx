import { MainHero } from "../../organisms/common/hero"
import Image from "next/image"
import heroHome from "../../assets/images/hero-home.png";
import { MainButton } from "@/components/common/main_button/main_button";

interface Props extends React.HTMLAttributes<HTMLDivElement> {
    description: string
    buttons: Array<{ title: string; link: string }>
}

const HomeHero: React.FC<Props> = ({ description, buttons, ...rest }) => {
    return <MainHero
        {...rest}
        title="Antonio Escohotado"
        media={
            <Image
                width={2610}
                height={3036}
                src={heroHome.src}
                alt={"Antonio Escohotado"}
            />
        }
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