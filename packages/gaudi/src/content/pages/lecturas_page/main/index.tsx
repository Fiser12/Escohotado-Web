import { useState } from "react";
import { H2 } from "../../../../common/headers/H2";
import { ContentGridList } from "../../../common/content_grid_list";
import { ContentWrapper } from "../../../../common/content_wrapper/content_wrapper";
import { SelectDropdown } from "../../../common/selectors/select_dropdown";
import { TagIcon } from "../../../../common/icons/tag_icon";
import { PenIcon } from "../../../../common/icons/pen_icon";
import { HeadlineCard } from "../../../article/cards/article_headline_card";
import { HighlightSection } from "../../../article/highlight/section_highlight";
import { ArticleCard } from "../../../article/cards/article_card";
import { CarouselBook } from "../../../book/carousel";
import handwrittenBackground from "../../../../assets/images/handwritting-bg.jpg";
import smokeEscohotado from "../../../../assets/images/escohotado-articles-portada.png";

export const ArticlePage = () => {

  const articles = [
    {
      title: "El impacto del prohibicionismo en la libertad individual",
      publishedAt: "2024-10-15T12:00:00Z",
      author: "Ana Pérez",
      textLink: "Leer artículo",
      coverHref: "https://placehold.co/300x150?text=Prohibicionismo",
      href: "/article/prohibicionismo-libertad",
      categories: [
        { id: "1", singular_name: "Filosofía política" },
        { id: "2", singular_name: "Políticas de drogas" },
      ],
      hasPermission: true,
    },
    {
      title: "¿Es el uso de drogas una cuestión ética o política?",
      publishedAt: "2024-09-20T10:30:00Z",
      author: "Carlos Gómez",
      textLink: "Explorar más",
      coverHref: "https://placehold.co/300x150?text=Ética+y+drogas",
      href: "/article/etica-y-politica-drogas",
      categories: [
        { id: "1", singular_name: "Ética" },
        { id: "2", singular_name: "Filosofía" },
      ],
      hasPermission: true,
    },
    {
      title: "Legalización y justicia social: un enfoque filosófico",
      publishedAt: "2024-08-05T08:00:00Z",
      author: "María López",
      textLink: "Ver detalles",
      coverHref: "https://placehold.co/300x150?text=Justicia+Social",
      href: "/article/legalizacion-justicia",
      categories: [
        { id: "1", singular_name: "Justicia social" },
        { id: "2", singular_name: "Política" },
      ],
      hasPermission: false,
    },
    {
      title: "Legalización y justicia social: un enfoque filosófico",
      publishedAt: "2024-08-05T08:00:00Z",
      author: "María López",
      textLink: "Ver detalles",
      coverHref: "https://placehold.co/300x150?text=Justicia+Social",
      href: "/article/legalizacion-justicia",
      categories: [
        { id: "1", singular_name: "Justicia social" },
        { id: "2", singular_name: "Política" },
      ],
      hasPermission: true,
    },
  ];

  //Tags
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  const tags = {
    tag1: { label: "Filosofía" },
    tag2: { label: "Ética" },
    tag3: { label: "Justicia social" },
    tag4: { label: "Política" },
    tag5: { label: "Drogas" },
  };

  const handleTagChange = (tag: string[]) => {
    setSelectedTags(tag);
    console.log("Etiquetas seleccionadas:", tags);
  };

  const [selectedAuthor, setSelectedAuthors] = useState<string[]>([]);

  //Authors
  const authors = {
    tag1: { label: "Antonio Escohotado" },
    tag2: { label: "Jorge Escohotado" },
  };

  const handleAuthorChange = (author: string[]) => {
    setSelectedAuthors(author);
    console.log("Etiquetas seleccionadas:", tags);
  };

  //Books
  const booksExample = [
    { title: 'La conciencia infeliz', coverHref: 'https://laemboscadura.com/wp-content/uploads/La-conciencia-infeliz-300x300.png', link: '/book1' },
    { title: 'El espíritu de la comedia', coverHref: 'https://laemboscadura.com/wp-content/uploads/El-espiritu-de-la-comedia-300x300.png', link: '/book2' },
    { title: 'De Physis a Polis', coverHref: 'https://laemboscadura.com/wp-content/uploads/De-Physis-a-Polis.webp', link: '/book3' },
    { title: 'Majestades, crímenes y víctimas', coverHref: 'https://laemboscadura.com/wp-content/uploads/Majestades-Crimenes-y-Victimas-300x300.png', link: '/book4' },
    { title: 'Realidad y substancia', coverHref: 'https://laemboscadura.com/wp-content/uploads/Realidad-y-Substancia-300x300.png', link: '/book5' },
    { title: 'La conciencia infeliz', coverHref: 'https://laemboscadura.com/wp-content/uploads/La-conciencia-infeliz-300x300.png', link: '/book6' },
    { title: 'El espíritu de la comedia', coverHref: 'https://laemboscadura.com/wp-content/uploads/El-espiritu-de-la-comedia-300x300.png', link: '/book7' },
    { title: 'De Physis a Polis', coverHref: 'https://laemboscadura.com/wp-content/uploads/De-Physis-a-Polis.webp', link: '/book8' },
    { title: 'Majestades, crímenes y víctimas', coverHref: 'https://laemboscadura.com/wp-content/uploads/Majestades-Crimenes-y-Victimas-300x300.png', link: '/book9' },
    { title: 'Realidad y substancia', coverHref: 'https://laemboscadura.com/wp-content/uploads/Realidad-y-Substancia-300x300.png', link: '/book10' },
  ];

  return (
    <div className="w-full bg-gray-light">
      <div id="headerArticles" className="@container w-full bg-white pt-12.5">
        <ContentWrapper className="mx-auto flex flex-col gap-7.5">
          <H2 label="Últimos artículos"></H2>
          <div className="grid grid-cols-3 @max-md:grid-cols-1 items-center gap-4 md:gap-10">
            <img
              src={smokeEscohotado.src}
              alt="Escohotado image"
              className="order-2 md:order-none"
            />
            <div className="w-full col-span-2 order-1 md:order-none">
              <HeadlineCard author="Daniel Pedrero Rodríguez" href="#" title="Más de 700 días sin la figura de Antonio Escohotado" textLink="Leer más"></HeadlineCard>
              <HeadlineCard author="Juan Manuel Ortiz" href="#" title="A propósito de la vigencia actual de «El espíritu de la comedia», ensayo de Antonio Escohotado" textLink="Leer más"></HeadlineCard>
              <HeadlineCard author="Héctor López" href="#" title="Una noche con Antonio" textLink="Leer más"></HeadlineCard>
            </div>
          </div>
        </ContentWrapper>
      </div>
      <HighlightSection description="¿Te gustaría pasear por la biblioteca de artículos personales de Escohotado?" textButton="Accede al contenido completo" href="#" coverHref={handwrittenBackground.src}></HighlightSection>
      <div className="@container w-full pt-12.5">
        <CarouselBook books={booksExample} />
        <ContentWrapper className="mx-auto flex flex-col gap-7.5 pb-16">
          <H2 label="Artículos"></H2>
          <div className="flex gap-3">
            <SelectDropdown
              title="Etiquetas"
              multiple={true}
              showSelectionAtLabel={true}
              showClearButton={true}
              selectedTags={selectedTags}
              tags={tags}
              onSelectedTagsChange={handleTagChange}
              color="primary"
              iconButton={<TagIcon />}
            />
            <SelectDropdown
              title="Autores"
              multiple={true}
              showSelectionAtLabel={true}
              showClearButton={true}
              selectedTags={selectedAuthor}
              tags={authors}
              onSelectedTagsChange={handleAuthorChange}
              color="white"
              iconButton={<PenIcon />}
            />
          </div>
          <ContentGridList
            items={articles}
            renderBox={(article) => (
              <ArticleCard
                title={article.title}
                publishedAt={article.publishedAt}
                author={article.author}
                textLink={article.textLink}
                coverHref={article.coverHref}
                href={article.href}
                categories={article.categories}
                hasPermission={article.hasPermission}
              />
            )}
            gridCols="md:grid-cols-2 lg:grid-cols-3"
            gap="gap-6"
          />
        </ContentWrapper>
      </div>
    </div>
  );
};