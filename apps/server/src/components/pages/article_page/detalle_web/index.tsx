import { DownloadDocIcon, FlagWithLabels } from "@/components/assets/icons";
import { Tag } from "@/components/atoms/tag";
import { Typo } from "@/components/atoms/typographies";
import { DetailBottomSection } from "@/components/organisms/details/common/detail_bottom_section";
import { SEOContentWrapper } from "@/components/organisms/details/common/seo_content_wrapper";
import { getAuthorFromTaxonomies, mapTaxonomyToCategoryModel } from "@/core/mappers/map-taxonomy-to-category-model";
import { routes } from "@/core/routes-generator";
import { ServiceInjector } from "@/modules/services";
import classNames from "classnames";
import { mapAnyToComment } from "hegel";
import Image from "next/image";
import Link from "next/link";
import { BaseUser, evalPermissionByRoleQuery } from "payload-access-control";
import { ArticleWeb, Media, Pdf, Quote, Taxonomy } from "payload-types";
import { ContentWrapper } from "@/components/layout/content-wrapper";
import { SocialMediaShare } from "@/components/molecules/social_media";
import { ArticleContentProtected } from "./article-content-protected";
import { MainButton } from "@/components/atoms/main-button";

export interface Props extends React.HTMLAttributes<HTMLDivElement>, ServiceInjector {
    article: ArticleWeb;
    currentLocale: string;
    quotes: Quote[];
    user?: BaseUser | null;
}

export const ArticleDetail: React.FC<Props> = ({
    article,
    currentLocale,
    services,
    className,
    quotes,
    user
}) => {
    const containerClass = classNames(
        'bg-white text-black flex flex-col gap-12 md:gap-16 mb-15',
        className
    );

    const tagDateContainerClass = classNames(
        'flex flex-col md:flex-row gap-5 justify-between'
    );

    const categoriesClass = classNames(
        'flex flex-wrap gap-1'
    );
    const date = article.publishedAt ? new Date(article.publishedAt) : null;
    const formattedDate = date ? date.toLocaleDateString('es-ES', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    }) : "";
    const cover = (article.cover as Media | null)?.url
    const document = typeof article.document === "number" ? null : article.document as Pdf | null;
    const downloadUrl = evalPermissionByRoleQuery(user, document?.permissions_seeds) ? document?.url : null;
    const author = getAuthorFromTaxonomies(article.categories as Taxonomy[])?.singular_name
    // @ts-ignore
    const locales: string[] = article?.locales ?? [];
    const coverHref = (article.cover as Media | null)?.url
    const detailHref = routes.nextJS.generateDetailHref({ collection: "article_web", value: article })
    const categories = article.categories?.cast<Taxonomy>().map(mapTaxonomyToCategoryModel) ?? []

    return (
        <SEOContentWrapper
            title={article?.title ?? "No title"}
            description={""}
            imageHref={cover}
            className={containerClass}
            ogType="article"
        >
            {coverHref &&
                <div className="relative w-full h-[200px] md:h-[350px]">
                    <Image
                        fill
                        src={coverHref}
                        alt={article?.title}
                        className="object-cover"
                    />
                </div>}
            <ContentWrapper className="flex flex-col ">
                <div className="md:pb-10 flex flex-col gap-6 md:gap-10">
                    <div className="flex flex-col gap-2">
                        {author && <Typo.H4>{author}</Typo.H4>}
                        <Typo.H1 >{article.title}</Typo.H1>
                    </div>
                    <div className={tagDateContainerClass}>
                        <div className={categoriesClass}>
                            {categories?.map((category, index) =>
                                <Tag key={index} text={category.label}></Tag>
                            )}
                        </div>
                        <p className="text-gray-disabled">{formattedDate}</p>
                    </div>
                </div>
                <div className="border-b-2 border-gray-light flex justify-between items-center pb-5">
                    <SocialMediaShare
                        textToShare={`Quiero compartir con vosotros el artículo ${author ? `de ${author}` : ""}: ${article.title}`}
                        relativeLink={detailHref}
                        tags={["Artículo"]}
                    />
                    <div className="flex gap-3">
                        {locales
                            .filter(locale => locale !== currentLocale)
                            .map(locale => <Link key={locale} href={detailHref + `?locale=${locale}`}>
                                <FlagWithLabels locale={locale} className="h-7 w-7" />
                            </Link>)
                        }
                        {downloadUrl &&
                            <a href={downloadUrl} target="_blank">
                                <MainButton text="Descargar PDF" icon={<DownloadDocIcon />} />
                            </a>
                        }
                    </div>
                </div>
            </ContentWrapper>
            <ArticleContentProtected
                user={user}
                article={article}
                services={services}
            />
            <DetailBottomSection
                quotes={quotes}
                comments={mapAnyToComment(article.forum_post_id, article.last_forum_posts ?? [])}
                user={user}
            />
        </SEOContentWrapper>
    );
};

