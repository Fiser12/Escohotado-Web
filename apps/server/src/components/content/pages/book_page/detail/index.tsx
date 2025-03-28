import { MainHero } from "../../../common/hero";
import { ContentWrapper } from "../../../../common/content_wrapper/content_wrapper";
import { ImageParallax } from "../../../book/cards/image_parallax";
import Image from "next/image";
import classNames from "classnames";
import { SocialMediaShare } from "../../../../common/social_media";
import { H1 } from "../../../../common/headers/H1";

interface Props extends React.HTMLAttributes<HTMLDivElement> {
    title: string;
    coverHref: string;
    description: string;
    langs: ('es' | 'en')[];
    link: string;
    detailHref: string;
    author?: string;
    bookButtons: React.ReactNode;
    children: React.ReactNode;
}

export const BookDetail: React.FC<Props> = ({
    title,
    coverHref,
    description,
    bookButtons,
    link,
    children,
    detailHref,
    author,
    className,
    ...rest
}) => {
    const divClass = classNames("w-full bg-white", className);

    return (
        <div className={divClass} {...rest}>
            <MainHero
                media={
                    <ImageParallax className="relative h-[280px] w-[180px] min-[469px]:w-[366px] min-[469px]:h-[550px] my-6" shadow={false}>
                        <Image
                            fill
                            src={coverHref}
                            alt={title}
                            className="object-cover"
                        />
                    </ImageParallax>
                }
            >
                <H1 label={title} />
                <p className="line-clamp-6">{description}</p>
                {bookButtons}
            </MainHero>
            <ContentWrapper className="flex flex-col gap-10">
                <div className="border-t-2 border-gray-light flex justify-between items-center py-5">
                    <SocialMediaShare
                        textToShare={`Quiero compartir con vosotros el libro ${author ? `de ${author}` : ""}: ${title}`}
                        relativeLink={detailHref}
                        tags={["Libro", "Lecturas"]}
                    />
                </div>
            </ContentWrapper>
            {children}
        </div>
    );
};
