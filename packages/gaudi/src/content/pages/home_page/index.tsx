import classNames from "classnames";
import { MainHero } from "../../common/hero";
import { MainButton } from "../../../common/main_button/main_button";
import { ContentWrapper } from "../../../server";
import { ImageParallax } from "../../book/cards/image_parallax";
import { NewsletterSubscription } from "../../common/newsletterSubscription";
import { Footer } from "../../common/footer";
import { FeaturedArticle } from "../../featured_grid_home/article";
import { FeaturedQuote } from "../../featured_grid_home/quote";
import { FeaturedBook } from "../../featured_grid_home/book";
import { FeaturedVideo } from "../../featured_grid_home/video";
import heroHome from "../../../assets/images/hero-home.png";

interface Props { }

export const HomePage = (props: Props) => {
  const featuredGridClass = classNames(
    '@container w-full grid grid-cols-1 md:grid-cols-4 gap-4 gap-4 p-4'
  );

  return (
    <div>
      <MainHero
        description="Filósofo y ensayista español, dedicó su vida a explorar y desafiar las convenciones sociales."
        title="Antonio Escohotado"
        image={<img src={heroHome.src} alt="Antonio Escohotado" />}
        topHeader={true}
        changeDirection={false}
      >
        <MainButton text="Conócelo mejor" type="line" />
      </MainHero>
      <div id='gridContentHome' className="bg-gray-light py-10">
        <ContentWrapper>
          <div className={featuredGridClass}>
            <FeaturedArticle
              className="col-span-1 md:col-span-3"
              title="El origen de la civilización"
              author="Antonio Escohotado"
              coverHref="https://placehold.co/150x150"
              href="/"
              categories={[
                { id: "1", singular_name: "Historia" },
                { id: "2", singular_name: "Filosofía" },
              ]}
            />
            <FeaturedQuote
              className="col-span-1"
              quote="La libertad no es algo que se nos dé, sino algo que conquistamos; no es una gracia ni un privilegio, sino una responsabilidad. Ser libre significa asumir la propia vida con todas sus consecuencias, sin delegar en otros las decisiones fundamentales, y sin buscar excusas en el destino o en la sociedad. Solo quien es capaz de enfrentarse a sus miedos y contradicciones puede aspirar a la libertad, porque esta no es un estado de comodidad, sino un proceso de aprendizaje continuo en el que cuestionamos nuestras certezas y ampliamos nuestros horizontes."
              author="Antonio Escohotado"
            />
            <FeaturedBook
              className="col-span-1 md:col-span-2"
              title="Confesiones de un opiófilo"
              quote="Una exploración profunda y provocadora de la mente humana. Filosofía y psicodelia se entrelazan magistralmente."
              author="Antonio Escohotado"
              coverHref="https://placehold.co/150x200"
            />
            <FeaturedVideo
              className="col-span-1 md:col-span-2"
              title=" 250.000 agradecimientos escohotadianos a todos los emboscados "
              coverHref="https://placehold.co/300x200"
              href="/"
              categories={[
                { id: "1", singular_name: "Historia" },
                { id: "2", singular_name: "Filosofía" },
              ]}
            />
          </div>
        </ContentWrapper>
      </div>
      <NewsletterSubscription />
      <Footer />
    </div>
  );
};