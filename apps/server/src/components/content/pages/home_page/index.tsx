import { NewsletterSubscription } from "../../common/newsletterSubscription";
import { ContentWrapper } from "../../../common/content_wrapper/content_wrapper";
import { GridCards } from "../../grid_cards/GridCards";
import HomeHero from "../../../common/home_hero"
import { ContentCardModel } from "hegel";
interface Props extends React.HTMLAttributes<HTMLDivElement> {
  featuredItems: { gridClassname: string, features: ContentCardModel[] }[];
  description: string;
  buttons: Array<{ title: string; link: string }>;
}

export const HomePage = ({ featuredItems, description, buttons, ...rest }: Props) => {
  return (
    <div {...rest}>
      <HomeHero description={description} buttons={buttons} />
      <div id="gridContentHome" className="bg-gray-light py-10">
        <ContentWrapper className="flex flex-col gap-4">
          {featuredItems.map(({ gridClassname, features }, index) => (
            <GridCards features={features} className={gridClassname} key={index} />
          ))}
        </ContentWrapper>
      </div>
      <NewsletterSubscription action={""} />
    </div>
  );
};

