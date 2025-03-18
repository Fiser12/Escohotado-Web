import classNames from "classnames";
import { H1 } from "../../../../common/headers/H1";
import { H4 } from "../../../../common/headers/H4";
import { ContentWrapper } from "../../../../common/content_wrapper/content_wrapper";
import { Tag } from "../../../../common/tag/tag";
import "./article-html-content.css";
import Image from "next/image";
import { CategoryModel } from "hegel";
import { SocialMediaShare } from "../../../../common/social_media";
import Link from "next/link";
import { FlagWithLabels } from "../../../../common/icons/flags/Flags";
import { MainButton } from "../../../../client";
import { DownloadDocIcon } from "../../../../common/icons/download_doc_icon";

interface Props extends React.HTMLAttributes<HTMLDivElement> {
    title: string;
    currentLocale: string;
    locales: string[];
    publishedAt: string;
    author?: string;
    coverHref?: string | null;
    detailHref: string;
    downloadUrl?: string | null;
    categories: CategoryModel[];
    children: React.ReactNode;
}

export const ArticleDetail: React.FC<Props> = ({
    publishedAt,
    author,
    title,
    coverHref,
    categories,
    downloadUrl,
    detailHref,
    locales,
    currentLocale,
    children,
    className,
    ...rest
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
    const date = new Date(publishedAt);
    const formattedDate = date.toLocaleDateString('es-ES', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });

    return (
        <div className={containerClass} {...rest}>
            { coverHref &&
            <div className="relative w-full h-[200px] md:h-[350px]">
                <Image
                    fill
                    src={coverHref}
                    alt={title}
                    className="object-cover"
                />
            </div> }
            <ContentWrapper className="flex flex-col ">
                <div className="md:pb-10 flex flex-col gap-6 md:gap-10">
                    <div className="flex flex-col gap-2">
                        <H4 label={author ?? ""}></H4>
                        <H1 label={title ?? "No title"} />
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
                        textToShare={`Quiero compartir con vosotros el artículo ${author ? `de ${author}`: ""}: ${title}`} 
                        relativeLink={detailHref} 
                        tags={["Artículo", author?.replace(" ", "")].mapNotNull(it => it)} 
                    />
                    <div className="flex gap-3">
                        { locales
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
            {children}
        </div>
    );
};