import classNames from "classnames";
import { H3 } from "../../../../common/headers/H3";
import { ContentWrapper } from "../../../../common/content_wrapper/content_wrapper";
import { Tag } from "../../../../common/tag/tag";
import { CategoryModel } from "hegel";
import { VideoEmbed } from "../../../../common/video_embed/video_embed";
import { SocialMediaShare } from "../../../../common/social_media";

interface Props extends React.HTMLAttributes<HTMLDivElement> {
    title: string;
    publishedAt: string;
    author?: string;
    duration: number;
    videoHref?: string | null;
    detailHref: string;
    categories: CategoryModel[];
    children: React.ReactNode;
}

export const VideoDetail: React.FC<Props> = ({
    className,
    title,
    publishedAt,
    categories,
    detailHref,
    duration: durationStr,
    videoHref,
    children,
    ...rest
}) => {
    const containerClass = classNames(
        'bg-white text-black flex flex-col gap-12 md:gap-16 pt-12',
        className
    );

    const tagDateContainerClass = classNames(
        'flex flex-col md:flex-row gap-3 justify-between'
    );

    const categoriesClass = classNames(
        'flex flex-wrap gap-1 max-h-7'
    );
    const date = new Date(publishedAt);
    const formattedDate = date.toLocaleDateString('es-ES', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
    const duration = segundosAFormatoHHMMSS(durationStr);
    return (
        <div className={containerClass} {...rest}>
            <ContentWrapper className="flex flex-col gap-12">
                {videoHref &&
                    <VideoEmbed url={videoHref} />
                }
                <div className="flex flex-col gap-6 md:gap-10">
                    <H3 label={title ?? "No title"} />
                    <div className={tagDateContainerClass}>
                        <div className={categoriesClass}>
                            {categories?.map((category, index) =>
                                <Tag key={index} text={category.label}></Tag>
                            )}
                        </div>
                        <div className="flex flex-col gap-2 items-end">
                            <p className="text-gray-disabled">{formattedDate}</p>
                            { duration != "00" &&
                                <p className="text-gray-disabled">Duración: {duration}</p>
                            }
                        </div>
                    </div>
                </div>
                <div className="border-t-2 border-gray-light flex justify-between items-center py-5">
                    <SocialMediaShare
                        textToShare={`Quiero compartir con vosotros el vídeo de Antonio Escohotado (In Memoriam): ${title}`}
                        relativeLink={detailHref}
                        tags={["Vídeo", "AntonioEscohotado"]}
                    />
                </div>
            </ContentWrapper>
            {children}
        </div>
    );
};
function segundosAFormatoHHMMSS(totalSegundos: number) {
    const date = new Date(totalSegundos * 1000);
    return date.toISOString().slice(11, 19).replace("00:", "").replace("00:", "");
}
