import { ContentWrapper } from "../../../../common/content_wrapper/content_wrapper";
import { ImageParallax } from "../../cards/image_parallax";
import { MainHero } from "../../../common/hero";
import { MainButton } from "../../../../common/main_button/main_button";
import { SelectBoxes } from "../../../common/selectors/grid_select_boxes";
import { SelectDropdown } from "../../../common/selectors/select_dropdown";
import { ESFlag } from "../../../../common/icons/flags/ES";
import { ENFlag } from "../../../../common/icons/flags/EN";
import { useState } from "react";
import { H3 } from "../../../../common/headers/H3";
import { ContentGridList } from "../../../common/content_grid_list";
import { BookCard } from "../../cards";

interface Props {
    title: string;
    description: string;
    coverHref: string;
}

export const BookDetail = (props: Props) => {
    const options = [
        { id: '1', label: 'eBook', },
        { id: '2', label: 'Tapa blanda', },
    ];

    //Flags
    const [selectedTags, setSelectedTags] = useState<string[]>([]);

    const tags = {
        tag1: {
            label: "ES",
            icon: <ESFlag />
        },
        tag2: {
            label: "EN",
            icon: <ENFlag />
        },
    };

    const handleTagChange = (tag: string[]) => {
        setSelectedTags(tag);
        console.log("Etiquetas seleccionadas:", tags);
    };

    //Books
    const items = [
        { url: "https://laemboscadura.com/wp-content/uploads/De-Physis-a-Polis.webp", title: "De Physis a Polis" },
        { url: "https://laemboscadura.com/wp-content/uploads/La-conciencia-infeliz-600x600.png", title: "La conciencia infeliz" },
        { url: "https://laemboscadura.com/wp-content/uploads/El-espiritu-de-la-comedia-600x600.png", title: "El espíritu de la comedia" },
    ];

    return (
        <div className="w-full h-auto md:h-screen bg-gray-light">
            <MainHero
                title="Rameras y Esposas"
                description="Este libro rememora cuatro leyendas que podrían decirse ocho, pues los mitos de Ishtar, Hera, Deyanira y María son también los de Gilgamesh, Zeus, Hércules y José. Sucesivas en el tiempo, mediterráneas en sentido amplio, iluminan modos distintos de asumir el destino «varón» y el destino «hembra» en el proceloso juego de las relaciones humanas. Exponen etapas de una larga guerra, repleta de equívocos, con razones y cláusulas para diversos armisticios que se van estableciendo entre géneros."
                children={
                    <div className="flex flex-col gap-8 w-full">
                        <SelectBoxes options={options}></SelectBoxes>
                        <SelectDropdown
                            title="Selecciona idioma"
                            multiple={false}
                            showSelectionAtLabel={true}
                            showClearButton={false}
                            selectedTags={selectedTags}
                            tags={tags}
                            onSelectedTagsChange={handleTagChange}
                            color="white"
                            className="min-w-[190px]"
                        />
                        <MainButton text="Comprar" />
                    </div>
                }
                image={
                    <ImageParallax
                        className="px-2 sm:px-20 md:px-0 lg:px-8"
                        shadow={false}
                    >
                        <img src="https://laemboscadura.com/wp-content/uploads/Rameras-y-esposas.png" alt={props.title} />
                    </ImageParallax>
                }
                className="h-full"
            />
        </div>
    );
};