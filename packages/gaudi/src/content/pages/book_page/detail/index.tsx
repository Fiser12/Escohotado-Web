"use client";

import { MainHero } from "../../../common/hero";
import { MainButton } from "../../../../common/main_button/main_button";
import { SelectBoxes } from "../../../common/selectors/grid_select_boxes";
import { SelectDropdown } from "../../../common/selectors/select_dropdown";
import { useState } from "react";
import "../../../pages/lecturas_page/detail/article-html-content.css";
import { ContentWrapper } from "../../../../common/content_wrapper/content_wrapper";
import { ESFlag } from "../../../../common/icons/flags/ES";
import { ENFlag } from "../../../../common/icons/flags/EN";
import { ImageParallax } from "../../../book/cards/image_parallax";

interface Props {
    title: string;
    coverHref: string;
    description: string;
    contentHtml: string;
    options: { id: string, label: string }[];
    langs: ('es' | 'en')[];
    link: string;
}
const titleMap = { "es": "Español", "en": "Inglés" };
const flagMap = { "es": <ESFlag />, "en": <ENFlag /> };

export const BookDetail = (props: Props) => {

    const [selectedTags, setSelectedTags] = useState<string[]>([]);
    const handleTagChange = (tag: string[]) => {
        setSelectedTags(tag);
    };
    const langsTags: Record<string, { label: string, icon: JSX.Element }> = props.langs.reduce((acc, lang) => {
        acc[lang] = {
            label: titleMap[lang],
            icon: flagMap[lang],
        };
        return acc;
    }, {} as Record<string, { label: string, icon: JSX.Element }>);

    return (
        <div className="w-full bg-white">
            <MainHero
                title={props.title}
                description={props.description}
                children={
                    <div className="flex flex-col gap-8 w-full">
                        <SelectBoxes options={props.options} />
                        {Object.values(props.langs).length > 1 &&
                            <SelectDropdown
                                title="Selecciona idioma"
                                multiple={false}
                                showSelectionAtLabel={true}
                                showClearButton={false}
                                selectedTags={selectedTags}
                                tags={langsTags}
                                onSelectedTagsChange={handleTagChange}
                                color="white"
                                className="min-w-[190px]"
                            />
                        }
                        <a href={props.link}>
                            <MainButton text="Comprar" />
                        </a>
                    </div>
                }
                image={
                    <ImageParallax
                        className="px-2 sm:px-20 md:px-0 lg:px-8"
                        shadow={false}
                    >
                        <img src={props.coverHref} alt="Portada libro" />
                    </ImageParallax>
                }
            />
            <ContentWrapper>
                <div className="article-html-content" dangerouslySetInnerHTML={{ __html: props.contentHtml ?? "<p>Empty</p>" }} />
            </ContentWrapper>
        </div>
    );
};