import { Quote } from "payload-types";

export const generateMockQuote = ({quote, autor, categories }: {quote: string, autor: string, categories: string[]}): Quote => ({
    id: 1,
    quote,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    categories: categories.map((category, index) => (
        {
            id: index,
            label: category,
            value: category,
            updatedAt: new Date().toISOString(),
            createdAt: new Date().toISOString(),
            singular_name: category,
        }
    )),
})

//Llenalo con citas de Antonio Escohotado

export const mockQuotes = [
    {quote: "Un país no es rico porque tenga diamantes o petróleo. Un país es rico porque tiene educación. Educación significa que, aunque puedas robar, no robas. Educación significa que tú vas pasando por la calle, la acera es estrecha y tú te bajas y dices: 'Disculpe'. Educación es que, aunque vas a pagar la factura de una tienda o de un restaurante, dices 'Gracias' cuando te la traen, das propina y cuando te devuelven, lo último que te devuelvan, vuelves a decir 'gracias'. Cuando un pueblo tiene eso, cuando un pueblo tiene educación, un pueblo es rico", autor: "Antonio Escohotado", categories: ["Economía", "Moral", "Filosofía"]},
    {quote: "No se dan cuenta de que el ser humano es innovador y de que si tú le quitas la iniciativa le quitas la fuente de riqueza. A mi juicio, el factor que realmente define el valor no es nada sólido o tangible ni mucho menos inmuebles. El valor es la capacidad que tiene un ser humano de hacer más barato algo que se hacía más caro. Eso es el valor", autor: "Antonio Escohotado", categories: ["Economía"]},
    {quote: "Sin libertad no hay nada (...). A mí me gustaría definirla como el arte de hacer posible lo que debo hacer, que es lo que vas encontrando en cada momento: ahí donde te va llevando la investigación, ahí donde la pesquisa te pone (...). El que pise la libertad de mi vecino me está pisando el cuello. Lucharé a muerte por la libertad de mi vecino. Es reconocer que el otro es por lo menos tanto como tú", autor: "Antonio Escohotado", categories: ["Libertad"]},
    {quote: "Eso no existe, es un invento de la extrema izquierda. La extrema izquierda necesita un reflejo especular. Y donde no hay algo pues se lo inventa (...). ¿Quieres decir que hay algún parecido entre Ciudadanos y el fascismo italiano? Tú mientes o no sabes nada del fascismo italiano. O no quieres mirar lo que hace Ciudadanos. O lo de Abascal y Hitler. Abascal es un político conservador, menos hipócrita que los conservadores del PP a mi juicio, pero desde luego no tiene ningún parecido con Hitler (...). No tiene nada que ver. Pues resulta que gran parte del pueblo español se lo cree y les acabar de dar las elecciones. Así como suena, a aguantar", autor: "Antonio Escohotado", categories: ["Política"]},
].map(generateMockQuote)


