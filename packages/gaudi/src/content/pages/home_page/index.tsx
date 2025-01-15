import classNames from "classnames";
import { MainHero } from "../../common/hero";
import { MainButton } from "../../../common/main_button/main_button";
import { ContentWrapper } from "../../../server";
import { NewsletterSubscription } from "../../common/newsletterSubscription";
import { Footer } from "../../common/footer";
import { FeaturedArticle } from "../../featured_grid_home/article";
import { FeaturedQuote } from "../../featured_grid_home/quote";
import { FeaturedBook } from "../../featured_grid_home/book";
import { FeaturedVideo } from "../../featured_grid_home/video";
import heroHome from "../../../assets/images/hero-home.png";
import Image from "next/image";

type FeaturedType = "article" | "quote" | "book" | "video";

export interface FeaturedBase {
  id: string;
  type: FeaturedType;
  className: string;
}

export interface FeaturedArticleProps extends FeaturedBase {
  type: "article";
  title: string;
  author: string;
  coverHref: string;
  href: string;
  categories: Array<{ id: string; singular_name: string }>;
}

export interface FeaturedQuoteProps extends FeaturedBase {
  type: "quote";
  quote: string;
  author: string;
}

export interface FeaturedBookProps extends FeaturedBase {
  type: "book";
  title: string;
  quote: string;
  author: string;
  coverHref: string;
  href: string;
}

export interface FeaturedVideoProps extends FeaturedBase {
  type: "video";
  title: string;
  coverHref: string;
  href: string;
  categories: Array<{ id: string; singular_name: string }>;
}

export type Featured = FeaturedArticleProps | FeaturedQuoteProps | FeaturedBookProps | FeaturedVideoProps;

interface Props {
  featuredItems: Featured[];
  description: string;
  buttons: Array<{ title: string; link: string }>;
}

const renderFeatured = (item: Featured) => {
  switch (item.type) {
    case "article":
      return (
        <FeaturedArticle
          key={item.id}
          className={item.className}
          title={item.title}
          author={item.author}
          coverHref={item.coverHref}
          href={item.href}
          categories={item.categories}
        />
      );
    case "quote":
      return (
        <FeaturedQuote
          key={item.id}
          className={item.className}
          quote={item.quote}
          author={item.author}
        />
      );
    case "book":
      return (
        <FeaturedBook
          key={item.id}
          className={item.className}
          title={item.title}
          quote={item.quote}
          author={item.author}
          coverHref={item.coverHref}
        />
      );
    case "video":
      return (
        <FeaturedVideo
          key={item.id}
          className={item.className}
          title={item.title}
          coverHref={item.coverHref}
          href={item.href}
          categories={item.categories}
        />
      );
    default:
      return null;
  }
};


export const HomePage = ({ featuredItems, description, buttons }: Props) => {
  const featuredGridClass = classNames(
    '@container w-full grid grid-cols-1 md:grid-cols-4 gap-4 gap-4 p-4'
  );

  return (
    <div>
      <MainHero
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
        { buttons.map((button, index) => (
          <a key={index} href={button.link}>
            <MainButton text={button.title} type="line" />
          </a>
        )) }
      </MainHero>
      <div id="gridContentHome" className="bg-gray-light py-10">
        <ContentWrapper>
          <div className={featuredGridClass}>
            {featuredItems.map(renderFeatured)}
          </div>
        </ContentWrapper>
      </div>
      <NewsletterSubscription />
      <Footer />
    </div>
  );
};