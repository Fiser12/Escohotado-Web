import classNames from "classnames";
import { CategoryModel, mapAnyToComment } from "hegel";
import { BaseUser, fetchPermittedContentQuery } from "payload-access-control";
import { Quote, Video } from "payload-types";
import { Tag } from "@/components/atoms/tag";
import { Typo } from "@/components/atoms/typographies";
import { DetailBottomSection } from "@/components/organisms/details/common/detail_bottom_section";
import { SEOContentWrapper } from "@/components/organisms/details/common/seo_content_wrapper";
import { routes } from "@/core/routes-generator";
import { ContentWrapper } from "@/components/layout/content-wrapper";
import { SocialMediaShare } from "@/components/molecules/social_media";
import { VideoEmbed } from "@/components/atoms/video-embed";
import { LockedHighlightSection } from "@/components/organisms/details/article/highlight";

interface Props extends React.HTMLAttributes<HTMLDivElement> {
    video: Video;
    user?: BaseUser | null;
    quotes: Quote[];
    children: React.ReactNode;
}

export const VideoDetail: React.FC<Props> = ({
    video,
    user,
    quotes,
    className,
    children,
}) => {
    const containerClass = classNames('bg-white text-black flex flex-col gap-12 md:gap-16 pt-12', className);

    const tagDateContainerClass = classNames('flex flex-col md:flex-row gap-3 justify-between');
    const categoriesClass = classNames('flex flex-wrap gap-1 max-h-7');
    const date = video.publishedAt ? new Date(video.publishedAt) : null;
    const formattedDate = date ? date.toLocaleDateString('es-ES', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    }) : "";
    const detailHref = routes.nextJS.generateDetailHref({ collection: "video", value: video })
    const duration = segundosAFormatoHHMMSS(video.duration ?? 0);
    const videoHref = fetchPermittedContentQuery(
        user,
        video.permissions_seeds ?? '',
        video.url,
        video.url_free,
    )
    const categories: CategoryModel[] = []
    return <SEOContentWrapper
        className={containerClass}
        title={video.title ?? "No title"}
        description={""}
        imageHref={video.thumbnailUrl ?? "#"}
        ogType="video"
    >
        <ContentWrapper className="flex flex-col gap-12">
            {videoHref ?
                <VideoEmbed url={videoHref} /> :
                <LockedHighlightSection />
            }
            <div className="flex flex-col gap-6 md:gap-10">
                <Typo.H3 className='w-full'>{video.title ?? "No title"}</Typo.H3>
                <div className={tagDateContainerClass}>
                    <div className={categoriesClass}>
                        {categories?.map((category, index) =>
                            <Tag key={index} text={category.label}></Tag>
                        )}
                    </div>
                    <div className="flex flex-col gap-2 items-end">
                        <p className="text-gray-disabled">{formattedDate}</p>
                        {duration != "00" &&
                            <p className="text-gray-disabled">Duración: {duration}</p>
                        }
                    </div>
                </div>
            </div>
            <div className="border-t-2 border-gray-light flex justify-between items-center py-5">
                <SocialMediaShare
                    textToShare={`Quiero compartir con vosotros el vídeo de Antonio Escohotado (In Memoriam): ${video.title}`}
                    relativeLink={detailHref}
                    tags={["Vídeo", "AntonioEscohotado"]}
                />
            </div>
        </ContentWrapper>
        {children}
        <DetailBottomSection
            quotes={quotes}
            user={user}
            comments={mapAnyToComment(video.forum_post_id, video.last_forum_posts ?? [])}
        />
    </SEOContentWrapper>
};
function segundosAFormatoHHMMSS(totalSegundos: number) {
    const date = new Date(totalSegundos * 1000);
    return date.toISOString().slice(11, 19).replace("00:", "").replace("00:", "");
}
