import { MainHero } from "../../../common/hero";
import { ContentWrapper } from "../../../../common/content_wrapper/content_wrapper";
import { ImageParallax } from "../../../book/cards/image_parallax";
import Image from "next/image";
import "../../article_page/article-html-content.css";

interface Props {
    title: string;
    coverHref: string;
    description: string;
    contentHtml: string;
    langs: ('es' | 'en')[];
    link: string;
    children: React.ReactNode;
}

export const BookDetail = (props: Props) => {

    return (
        <div className="w-full bg-white">
            <MainHero
                topHeader={true}
                title={props.title}
                description={props.description}
                children={props.children}
                image={
                    <ImageParallax className="relative h-[280px] w-[180px] min-[469px]:w-[366px] min-[469px]:h-[550px]" shadow={false}>
                        <Image
                            fill
                            src={props.coverHref}
                            alt={props.title}
                            className="object-cover"
                        />
                    </ImageParallax>
                }
            />
            <ContentWrapper>
                <div className="article-html-content" dangerouslySetInnerHTML={{ __html: props.contentHtml ?? "<p>Empty</p>" }} />
            </ContentWrapper>
        </div>
    );
};