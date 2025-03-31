import Image from "next/image";
import classNames from "classnames";
import { Book, Media, Quote, Taxonomy } from "payload-types";
import { routes } from "@/core/routesGenerator";
import { getAuthorFromTaxonomies } from "@/core/mappers/mapTaxonomyToCategoryModel";
import { BaseUser } from "payload-access-control";
import { BookVariantsSelector } from "@/modules/nuqs";
import { DetailBottomSection } from "@/components/common/detail_bottom_section";
import { mapAnyToComment } from "hegel";
import { SEOContentWrapper } from "@/components/common/seo_content_wrapper";
import { Typo } from "@/components/common/typographies/Typographies";
import { SocialMediaShare } from "@/components/common/social_media";
import { MainHero } from "@/components/organisms/common/hero";
import { ImageParallax } from "@/components/organisms/book/cards/image_parallax";
import { ContentWrapper } from "@/components/layout/content_wrapper/content_wrapper";

interface Props extends React.HTMLAttributes<HTMLDivElement> {
    user?: BaseUser | null;
    book: Book;
    quotes: Quote[];
    children: React.ReactNode;
}

export const BookDetail: React.FC<Props> = ({
    user,
    book,
    children,
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
                    <ImageParallax className="relative h-[280px] w-[180px] min-[469px]:w-[366px] min-[469px]:h-[550px] my-6" shadow={false}>
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
            {children}
            <DetailBottomSection
                user={user}
                quotes={quotes}
                comments={mapAnyToComment(book.forum_post_id, book.last_forum_posts ?? [])}
            />
        </SEOContentWrapper>
    );
};
