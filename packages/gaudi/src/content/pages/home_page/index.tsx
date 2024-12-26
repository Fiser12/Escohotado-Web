import classNames from "classnames";
import { MainHero } from "../../common/hero";
import { MainButton } from "../../../common/main_button/main_button";
import { ContentWrapper } from "../../../server";
import { ImageParallax } from "../../book/cards/image_parallax";
import { NewsletterSubscription } from "../../common/newsletterSubscription";
import { Footer } from "../../common/footer";
import { FeaturedArticle } from "../../featured_grid_home/article";

interface Props { }

export const HomePage = (props: Props) => {
  const featuredGridClass = classNames(
    'w-full grid grid-cols-1 md:grid-cols-4 gap-4 gap-4 p-4'
  );

  return (
    <div>
      <MainHero
        description="Filósofo y ensayista español, dedicó su vida a explorar y desafiar las convenciones sociales."
        title="Antonio Escohotado"
        image={<img src="https://placehold.co/300x300?text=Antonio+Escohotado" alt="Antonio Escohotado" />}
        changeDirection={false} topHeader={true}      >
        <MainButton text="Conócelo mejor" type="line" />
      </MainHero>
      <div id='gridContentHome' className="bg-gray-light py-10">
        <ContentWrapper>
          <div className={featuredGridClass}>
            <FeaturedArticle
              className="col-span-1 md:col-span-2 lg:col-span-3"
              title="El origen de la civilización"
              author="Antonio Escohotado"
              coverHref="https://placehold.co/200x200"
              href="/"
              categories={[
                { id: "1", singular_name: "Historia" },
                { id: "2", singular_name: "Filosofía" },
              ]}
            />
            <FeaturedArticle
            className="cols-span-1 md:col-span-2 lg:col-span-1"
              title="El origen de la civilización"
              author="Antonio Escohotado"
              coverHref="https://placehold.co/200x200"
              href="/"
              categories={[
                { id: "1", singular_name: "Historia" },
                { id: "2", singular_name: "Filosofía" },
              ]}
            />
          </div>
        </ContentWrapper>
      </div>
      <MainHero
        description="Una exploración profunda y provocadora de la mente humana. Filosofía y psicodelia se entrelazan magistralmente."
        title="Confesiones de un opiófilo"
        quote='- Javier López, autor de "Pensamientos de un Alquimista"'
        image={<ImageParallax
          className="max-h-[550px] px-2 sm:px-20 md:px-8 lg:px-10"
          shadow={false}
        >
          <img src="https://placehold.co/350x500" alt="Sample image" />
        </ImageParallax>}
        changeDirection={true} topHeader={false}      >
        <MainButton text="Sumérgete en la lectura" color="secondary" className="mt-5" />
      </MainHero>
      <NewsletterSubscription />
      <Footer />
    </div>
  );
};