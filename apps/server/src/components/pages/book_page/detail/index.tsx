import { Typo } from "@/components/atoms/typographies";
import { ContentWrapper } from "@/components/layout/content-wrapper";
import { SocialMediaShare } from "@/components/molecules/social_media";
import { ImageParallax } from "@/components/organisms/details/book/cards/image_parallax";
import { DetailBottomSection } from "@/components/organisms/details/common/detail_bottom_section";
import { SEOContentWrapper } from "@/components/organisms/details/common/seo_content_wrapper";
import { MainHero } from "@/components/organisms/lexical/hero";
import { getAuthorFromTaxonomies } from "@/core/mappers/map-taxonomy-to-category-model";
import { routes } from "@/core/routes-generator";
import { LexicalRenderer } from "@/modules/lexical/renderer/lexical-renderer";
import { BookVariantsSelector } from "@/modules/nuqs";
import { ServiceInjector, servicesProd } from "@/modules/services";
import classNames from "classnames";
import { mapAnyToComment } from "hegel";
import Image from "next/image";
import { BaseUser } from "payload-access-control";
import { Book, Media, Quote, Taxonomy } from "payload-types";

interface Props extends React.HTMLAttributes<HTMLDivElement>, ServiceInjector {
    user?: BaseUser | null;
    book: Book;
    quotes: Quote[];
}

export const BookDetail: React.FC<Props> = ({
    user,
    book,
    services = servicesProd,
    quotes,
    className
}) => {
    const divClass = classNames("w-full bg-white", className);
    const variants: { [key: string]: string } = {
        book: "Libro",
        audiobook: "Audiolibro",
        ebook: "Ebook"
    };
    const options = book?.Ediciones?.map((edition) => ({
        label: variants[edition.variant ?? "book"] ?? "Libro",
        id: edition.variant ?? "",
        url: edition.link ?? "#"
    })) ?? [];
    const detailHref = routes.nextJS.generateDetailHref({ collection: "book", value: book })
    const author = getAuthorFromTaxonomies(book.categories as Taxonomy[])?.singular_name
    const coverHref = (book.cover as Media)?.url ?? "#"

    return (
        <SEOContentWrapper
            className={divClass}
            title={book?.title ?? "No title"}
            description={book?.description ?? ""}
            imageHref={coverHref}
            ogType="book"
        >
            <MainHero
                media={
                    <ImageParallax className="relative h-[280px] w-[180px] min-[469px]:w-[366px] min-[469px]:h-[550px] my-6">
                        <Image
                            fill
                            src={coverHref}
                            alt={book.title}
                            className="object-cover"
                        />
                    </ImageParallax>
                }
            >
                <Typo.H1 className='w-full'>{book.title}</Typo.H1>
                <p className="line-clamp-6">{book.description ?? ""}</p>
                <BookVariantsSelector options={options} />
            </MainHero>
            <ContentWrapper className="flex flex-col gap-10">
                <div className="border-t-2 border-gray-light flex justify-between items-center py-5">
                    <SocialMediaShare
                        textToShare={`Quiero compartir con vosotros el libro ${author ? `de ${author}` : ""}: ${book.title}`}
                        relativeLink={detailHref}
                        tags={["Libro", "Lecturas"]}
                    />
                </div>
            </ContentWrapper>
            <LexicalRenderer
                data={book.content}
                services={services}
            />
            <DetailBottomSection
                user={user}
                quotes={quotes}
                comments={mapAnyToComment(book.forum_post_id, book.last_forum_posts ?? [])}
            />
        </SEOContentWrapper>
    );
};
