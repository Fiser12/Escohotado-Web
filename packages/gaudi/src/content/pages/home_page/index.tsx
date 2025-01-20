import classNames from "classnames";
import { MainHero } from "../../common/hero";
import { MainButton } from "../../../common/main_button/main_button";
import { NewsletterSubscription } from "../../common/newsletterSubscription";
import { Footer } from "../../common/footer";
import heroHome from "../../../assets/images/hero-home.png";
import Image from "next/image";
import { ContentWrapper } from "../../../common/content_wrapper/content_wrapper";
import { GridCardsBlock } from "../../featured_grid_home/GridCardsBlock";

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
  hasPermission: boolean;
  href: string | null;
  detailHref: string;
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
  hasPermission: boolean;
  href: string | null;
  detailHref: string;
  categories: Array<{ id: string; singular_name: string }>;
}

export type Featured = FeaturedArticleProps | FeaturedQuoteProps | FeaturedBookProps | FeaturedVideoProps;

interface Props {
  featuredItems: { gridClassname: string, features: Featured[] }[];
  description: string;
  buttons: Array<{ title: string; link: string }>;
}


export const HomePage = ({ featuredItems, description, buttons }: Props) => {
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
        {buttons.map((button, index) => (
          <a key={index} href={button.link}>
            <MainButton text={button.title} type="line" />
          </a>
        ))}
      </MainHero>
      <div id="gridContentHome" className="bg-gray-light py-10">
        <ContentWrapper className="flex flex-col gap-4">
          {featuredItems.map(({ gridClassname, features }, index) => (
            <GridCardsBlock features={features} gridClassname={gridClassname} key={index} />
          ))}
        </ContentWrapper>
      </div>
      <NewsletterSubscription />
      <Footer />
    </div>
  );
};

