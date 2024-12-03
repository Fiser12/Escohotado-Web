import { ContentWrapper } from "../../../../common/content_wrapper/content_wrapper";
import { H2 } from "../../../../common/headers/H2";
import { MainButton } from "../../../../common/main_button/main_button";
import { ContentGridList } from "../../../common/content_grid_list";
import { MainHero } from "../../../common/hero";
import { BookCard } from "../../cards";
import { ImageParallax } from "../../cards/image_parallax";

export const BookMain = () => {
    const items = [
        { url: "https://laemboscadura.com/wp-content/uploads/De-Physis-a-Polis.webp", title: "De Physis a Polis" },
        { url: "https://laemboscadura.com/wp-content/uploads/La-conciencia-infeliz-600x600.png", title: "La conciencia infeliz" },
        { url: "https://laemboscadura.com/wp-content/uploads/El-espiritu-de-la-comedia-600x600.png", title: "El espíritu de la comedia" },
        { url: "https://laemboscadura.com/wp-content/uploads/Majestades-Crimenes-y-Victimas-600x600.png", title: "Majestades, crímenes y víctimas" },
        { url: "https://laemboscadura.com/wp-content/uploads/Realidad-y-Substancia-600x600.png", title: "Realidad y substancia" },
        { url: "https://laemboscadura.com/wp-content/uploads/Senta-Semanas-en-el-Tropico-600x600.png", title: "Senta semanas en el trópico" },
        { url: "https://laemboscadura.com/wp-content/uploads/HG-de-las-drogas-II-600x600.png", title: "Historia general de las drogas II" },
        { url: "https://laemboscadura.com/wp-content/uploads/HG-de-las-drogas-I-1-600x600.png", title: "Historia general de las drogas I" },
        { url: "https://laemboscadura.com/wp-content/uploads/Aprendiendo-de-las-drogas-600x600.png", title: "Aprendiendo de las drogas" },
        { url: "https://laemboscadura.com/wp-content/uploads/Historia-elemental-de-las-drogas-600x600.png", title: "Historia elemental de las drogas" },
        { url: "https://laemboscadura.com/wp-content/uploads/Retrato-del-libertino-600x600.png", title: "Retrato del libertino" },
        { url: "https://laemboscadura.com/wp-content/uploads/Rameras-y-esposas-600x600.png", title: "Rameras y esposas" },
        { url: "https://laemboscadura.com/wp-content/uploads/Caos-y-orden-edicion-impresa.png", title: "Caos y orden" },
    ];

    return (
        <div className="w-full h-auto md:h-screen bg-white">
            <MainHero
                title="Rameras y Esposas"
                description="Reedición de «Rameras y Esposas» (1993) de Antonio Escohotado, en formato impreso, con cuadernillo a color de 20 páginas."
                children={
                    <MainButton text="Sumérgete en la lectura" />
                }
                image={
                    <ImageParallax
                        className="px-2 sm:px-20 md:px-0 lg:px-8"
                        shadow={false}
                    >
                        <img src="https://laemboscadura.com/wp-content/uploads/Rameras-y-esposas.png" alt="Portada libro" />
                    </ImageParallax>
                }
                className="bg-gray-light"
            />
            <ContentWrapper className="mx-auto flex flex-col gap-10 py-16">
                <H2 label="Biblioteca" />
                <ContentGridList
                    items={items}
                    renderBox={(item, index) => {
                        const libro = item as { url: string, title: string };
                        return <BookCard
                            key={index}
                            title={libro.title}
                            coverHref={libro.url}
                            link={"#"}
                        />
                    }
                    }
                />
            </ContentWrapper>
        </div>
    );
};