import { Book } from "payload-types";

export const generateMockBook = ({title, coverHref}: {title: string, coverHref: string}): Book => ({
    id: 1,
    title,
    cover: { id: 1, url: coverHref, updatedAt: new Date().toISOString(), createdAt: new Date().toISOString() },
    Ediciones: [
        {
            id: "1",
            variant: "book",
            language: "es",
            link: "https://www.amazon.com/dp/B000000000",
        },
        {
            id: "2",
            variant: "ebook",
            language: "en",
            link: "https://www.amazon.com/dp/B000000000",
        },
        {
            id: "3",
            variant: "audiobook",
            language: "es",
            link: "https://www.amazon.com/dp/B000000000",
        }

    ],
    updatedAt: new Date().toISOString(),
    createdAt: new Date().toISOString(),
})

export const mockBooks = [
    {coverHref: "https://laemboscadura.com/wp-content/uploads/De-Physis-a-Polis.webp", title: "De Physis a Polis"}, 
    {coverHref: "https://laemboscadura.com/wp-content/uploads/La-conciencia-infeliz-600x600.png", title: "La conciencia infeliz"}, 
    {coverHref: "https://laemboscadura.com/wp-content/uploads/El-espiritu-de-la-comedia-600x600.png", title: "El espíritu de la comedia"}, 
    {coverHref: "https://laemboscadura.com/wp-content/uploads/Majestades-Crimenes-y-Victimas-600x600.png", title: "Majestades, crímenes y víctimas"}, 
    {coverHref: "https://laemboscadura.com/wp-content/uploads/Realidad-y-Substancia-600x600.png", title: "Realidad y substancia"}, 
    {coverHref: "https://laemboscadura.com/wp-content/uploads/Senta-Semanas-en-el-Tropico-600x600.png", title: "Senta semanas en el trópico"}, 
    {coverHref: "https://laemboscadura.com/wp-content/uploads/HG-de-las-drogas-II-600x600.png", title: "Historia general de las drogas II"}, 
    {coverHref: "https://laemboscadura.com/wp-content/uploads/HG-de-las-drogas-I-1-600x600.png", title: "Historia general de las drogas I"}, 
    {coverHref: "https://laemboscadura.com/wp-content/uploads/Aprendiendo-de-las-drogas-600x600.png", title: "Aprendiendo de las drogas"}, 
    {coverHref: "https://laemboscadura.com/wp-content/uploads/Historia-elemental-de-las-drogas-600x600.png", title: "Historia elemental de las drogas"}, 
    {coverHref: "https://laemboscadura.com/wp-content/uploads/Retrato-del-libertino-600x600.png", title: "Retrato del libertino"}, 
    {coverHref: "https://laemboscadura.com/wp-content/uploads/Rameras-y-esposas-600x600.png", title: "Rameras y esposas"}, 
    {coverHref: "https://laemboscadura.com/wp-content/uploads/Caos-y-orden-edicion-impresa.png", title: "Caos y orden"},
].map(generateMockBook)