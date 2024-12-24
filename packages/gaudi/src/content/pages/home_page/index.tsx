import classNames from "classnames";
import { MainHero } from "../../common/hero";
import { MainButton } from "../../../common/main_button/main_button";
import { ContentWrapper } from "../../../server";
import { ImageParallax } from "../../book/cards/image_parallax";
import { NewsletterSubscription } from "../../common/newsletterSubscription";
import { Footer } from "../../common/footer";

interface Props { }

export const HomePage = (props: Props) => {

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
          <div></div>
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