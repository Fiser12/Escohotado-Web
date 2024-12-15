import { Meta, StoryObj } from "@storybook/react";
import { BookDetail } from ".";
import { ESFlag } from "../../../../common/icons/flags/ES";
import { ENFlag } from "../../../../common/icons/flags/EN";

const meta: Meta = {
    title: "Pages/Book/Detail",
    component: BookDetail,
    parameters: {
        layout: "fullscreen",
        design: {
            type: "figspec",
            url: "https://www.figma.com/files/xq1hrsTcwvQMgX49pwXGcc/Escohotado?node-id=672-2292&t=IbC3J7bF5FGU0FcI-4",
        },
    },
    args: {
        title: "Rameras y Esposas",
        description: "Reedición de «Rameras y Esposas» (1993) de Antonio Escohotado, en formato impreso, con cuadernillo a color de 20 páginas.",
        options: [
            { id: '1', label: 'eBook', },
            { id: '2', label: 'Tapa blanda', },
        ],
        coverHref: "https://laemboscadura.com/wp-content/uploads/Rameras-y-esposas.png",
        langs: ["es", "en"],
        contentHtml: `
<h2>La conciencia infeliz</h2><p>La filosofía de la religión de Hegel plantea el problema de la religiosidad desde un punto de vista que se aparta tanto de la edificación y de la mera fe como de una interpretación humanista, escéptica o atea. La tesis fundamental en este terreno es la identidad de objeto entre la filosofía y la religión, identidad que deviene contradicción en el desarrollo de ambas por cuanto la filosofía se mueve en el elemento del&nbsp;<em>concepto</em>&nbsp;y la religiosidad se conforma con la&nbsp;<em>representación;&nbsp;</em>el resultado de esta divergencia consiste en que la primera desemboca en la libertad del saber absoluto, mientras la segunda permanece dentro del marco de la «conciencia infeliz».</p><p>La diferencia entre el concepto y la representación es el eje sobre el cual gira todo el pensamiento hegeliano, que en vez de adoptar una actitud de incredulidad ante la religión exige incesantemente de ella un rigor respecto del propio contenido y demuestra la impotencia de la teología dogmática para expresar la Revelación. Es la religiosidad positiva –dirá Hegel- quien no cree que lo divino se haya encarnado y revelado plenamente a los hombres, y el trabajo de la filosofía consiste en liberar el concepto concreto actuante, pero oculto bajo la forma de categorías abstractas e inadecuadas.</p><p>El presente ensayo intenta proporcionar una concepción total del fenómeno judío-cristiano que sintetice el devenir histórico de esa religiosidad con el despliegue a nivel especulativo de sus nociones dentro de la odisea general del espíritu, implicada por las diversas figuras de la conciencia infeliz. En esa medida, se articula en torno a la idea fundamental de la Trinidad y desarrolla en tres apartados genéricos, correspondientes al Padre, al Hijo y al Espíritu, el movimiento del alma religiosa desde el Pentateuco hasta la Reforma.</p><p></p>`    }
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Desktop: Story = {
};

export const Mobile: Story = {
    parameters: {
        viewport: {
            defaultViewport: 'iphonex',
        },
    }
};