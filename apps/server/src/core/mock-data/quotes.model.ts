import { Quote } from "payload-types";

export const generateMockQuote = ({ cita, categorías }: { cita: string, categorías: string[] }): Quote => ({
    id: 1,
    quote: cita,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    categories: categorías.map((categoría, index) => (
        {
            id: index,
            label: categoría,
            value: categoría,
            updatedAt: new Date().toISOString(),
            createdAt: new Date().toISOString(),
            singular_name: categoría,
        }
    )),
})

//Llenalo con citas de Antonio Escohotado

export const mockQuotes = [
    {
        "cita": "La libertad se gana día a día.",
        "context": "Principio fundamental de su filosofía sobre la naturaleza dinámica de la autonomía personal",
        "categorías": ["libertad", "filosofía", "existencialismo", "autonomía"]
    },
    {
        "cita": "De la piel para dentro mando yo.",
        "context": "Aforismo que sintetiza su defensa radical de la soberanía individual",
        "categorías": ["libertad", "individualismo", "ética", "autonomía"]
    },
    {
        "cita": "Quien pisa la libertad de mi prójimo está pisando mi cuello. Por la libertad de mi prójimo, lucharé hasta la muerte.",
        "context": "Declaración de interdependencia ética en la defensa de las libertades",
        "categorías": ["libertad", "ética", "convivencia", "derechos-humanos"]
    },
    {
        "cita": "La ciencia es un mito, sólo que es el mito más hermoso, el único generalizable a toda la especie y quizás el más digno de respetarse.",
        "context": "Reflexión epistemológica sobre el método científico como narrativa colectiva",
        "categorías": ["ciencia", "epistemología", "mitología", "filosofía"]
    },
    {
        "cita": "Nada vivo se mantiene sin esforzarse continuamente por realizar su específica naturaleza, y es por eso un mero conato o aspiración de cumplimiento de cierto sí mismo.",
        "context": "Visión dinámica de la existencia humana desde su ontología",
        "categorías": ["filosofía", "existencialismo", "naturaleza-humana", "ética"]
    },
    {
        "cita": "Genéricamente, el capitalismo necesita más a la democracia que la democracia al capitalismo.",
        "context": "Tesis sobre la relación simbiótica entre sistemas económicos y políticos",
        "categorías": ["economía", "política", "capitalismo", "democracia"]
    },
    {
        "cita": "Cívico es reducir lo obligatorio a mínimos, vedando el acceso a las magistraturas de quienes pretendan lo contrario.",
        "context": "Principio de mínima intervención estatal en la vida civil",
        "categorías": ["política", "liberalismo", "sociedad", "ética"]
    },
    {
        "cita": "No admito estancamientos porque a mí lo que me gusta es conocer y eso nunca tiene fin.",
        "context": "Manifiesto intelectual sobre el conocimiento como proceso inacabado",
        "categorías": ["conocimiento", "educación", "curiosidad", "filosofía"]
    },
    {
        "cita": "Detesto el victimismo y pago sin vacilaciones el peaje de la independencia.",
        "context": "Crítica a las narrativas de opresión y defensa de la autosuficiencia",
        "categorías": ["ética", "individualismo", "sociedad", "libertad"]
    },
    {
        "cita": "La libertad, que en sus etapas iniciales llama a la insumisión, madura como sentimiento de goce ante ella misma.",
        "context": "Evolución psicológica de la experiencia libertaria",
        "categorías": ["libertad", "psicología", "filosofía", "autonomía"]
    },
    {
        "cita": "El mayor disparate de nuestros ancestros fue imaginar que las cosas fundamentales surgen por decreto creador (divino o gubernativo) y se extinguen por decreto derogatorio (divino o gubernativo).",
        "context": "Crítica al constructivismo social y defensa del orden espontáneo",
        "categorías": ["política", "filosofía", "autoritarismo", "sociedad"]
    },
    {
        "cita": "Mi destino es la lucidez.",
        "context": "Testamento vital como compromiso con el pensamiento crítico",
        "categorías": ["filosofía", "ética", "existencialismo", "conocimiento"]
    },
    {
        "cita": "Aceptar el amplio margen de incertidumbre que posee la realidad es lo que significa ser libre.",
        "context": "Epistemología aplicada a la condición humana libre",
        "categorías": ["libertad", "epistemología", "filosofía", "incertidumbre"]
    },
    {
        "cita": "El genio de los griegos bautizó las drogas con un término que significa a la vez remedio y veneno, pues dependiendo de conocimiento, ocasión e individuo lo uno se transforma en lo otro.",
        "context": "Perspectiva histórica sobre el uso de sustancias psicoactivas",
        "categorías": ["drogas", "historia", "filosofía", "cultura"]
    },
    {
        "cita": "Todos somos madera, y el fuego es eterno.",
        "context": "Máxima existencial sobre la condición humana y su transformación",
        "categorías": ["filosofía", "existencialismo", "naturaleza-humana", "poética"]
    },
    {
        "cita": "La naturaleza humana sólo es creativa cuando aprende a disfrutar de las incertidumbres de la libertad.",
        "context": "Antropología filosófica vinculada a la autonomía individual",
        "categorías": ["libertad", "naturaleza-humana", "creatividad", "filosofía"]
    },
    {
        "cita": "Mercado significa libertad para producir y libertad para consumir. Atacarlo es atacar la autonomía de la voluntad.",
        "context": "Defensa del liberalismo económico como extensión de la libertad individual",
        "categorías": ["economía", "liberalismo", "libertad", "capitalismo"]
    },
    {
        "cita": "El emboscado jura odio eterno a la crueldad en general, fuere cual fuere su objeto.",
        "context": "Posicionamiento ético contra toda forma de violencia institucional",
        "categorías": ["ética", "violencia", "sociedad", "liberalismo"]
    },
    {
        "cita": "La sustancia no prohibida está regulada, como es el caso del alcohol etílico. Cuando se prohíbe, se generan casos como el periodo de la ley seca en Estados Unidos.",
        "context": "Análisis sobre las consecuencias no deseadas de la prohibición",
        "categorías": ["drogas", "política", "historia", "sociedad"]
    },
    {
        "cita": "La inspiración viene trabajando, y al amparo también de grietas surgidas en la rutina psíquica.",
        "context": "Psicología de la creatividad y los procesos intelectuales",
        "categorías": ["creatividad", "psicología", "conocimiento", "filosofía"]
    }
]
    .map(generateMockQuote)


export const mockSexQuotes = [
    {
        "cita": "Para mí el asunto del sexo ha sido un auténtico misterio, algo sacramental.",
        "context": "Reflexión personal sobre su relación con el sexo como una experiencia trascendental y significativa.",
        "categorías": ["sexo", "existencialismo", "filosofía", "experiencia"]
    },
    {
        "cita": "Puede haber amor sin sexo, puede haber actos ajenos al amor y al sexo, pero es imposible que haya verdadero sexo sin amor.",
        "context": "Afirmación sobre la conexión esencial entre el sexo y el amor verdadero.",
        "categorías": ["sexo", "amor", "relaciones", "filosofía"]
    },
    {
        "cita": "El acto sexual es un acto de colaboración.",
        "context": "Descripción del sexo como una interacción basada en la cooperación mutua.",
        "categorías": ["sexo", "relaciones", "colaboración", "filosofía"]
    },
    {
        "cita": "La mujer no se ha liberado mediante una revolución feminista, sino gracias al capitalismo.",
        "context": "Análisis sobre cómo los cambios económicos y sociales han influido en la liberación femenina, incluyendo aspectos relacionados con la sexualidad.",
        "categorías": ["sexo", "feminismo", "capitalismo", "sociedad"]
    },
    {
        "cita": "Al triunfar el cristianismo desaparecen las hieródulas. La mitología empieza a ser ocupada por personas decentes, que, sin enardecerse en batallas carnales, trabajan de buena gana catorce horas diarias.",
        "context": "Crítica al impacto del cristianismo en las prácticas sexuales y culturales de la antigüedad.",
        "categorías": ["sexo", "religión", "historia", "cultura"]
    },
    {
        "cita": "La sexualidad masculina continúa siendo la misma de siempre, pero la femenina ha dado un salto cualitativo y cuantitativo socialmente.",
        "context": "Observación sobre los cambios en las dinámicas sexuales y de género a lo largo del tiempo.",
        "categorías": ["sexo", "género", "sociedad", "evolución"]
    },
    {
        "cita": "Pasar la noche con una mujer inteligente, con una colosal puta, con una cortesana sagrada, te va a instruir mucho más que tres meses de mili o de monasterio budista.",
        "context": "Reflexión sobre el aprendizaje y la trascendencia que pueden surgir de experiencias sexuales significativas.",
        "categorías": ["sexo", "aprendizaje", "filosofía", "experiencia"]
    },
    {
        "cita": "\"Los genitales son una cosa muy accesoria: útiles para la reproducción. A mi juicio, lo que nos rige es la admiración. O el desprecio.\"",
        "context": "\"Una reflexión sobre cómo las emociones y valores trascienden lo físico en las relaciones humanas.\"",
        "categorías": ["sexo", "filosofía", "relaciones", "emociones"]
    }
]
.map(generateMockQuote)

export const mockAustrianSchoolQuotes = [
    {
        "cita": "La economía de mercado es un orden espontáneo, no el resultado de un diseño humano.",
        "context": "Reflexión inspirada en las ideas de Friedrich Hayek sobre cómo los mercados funcionan de manera eficiente sin necesidad de planificación centralizada.",
        "categorías": ["economía", "orden-espontáneo", "escuela-austriaca", "liberalismo"]
    },
    {
        "cita": "El socialismo evolutivo es una forma de describir la adaptación del liberalismo a las necesidades humanas sin caer en el dogmatismo.",
        "context": "Escohotado utiliza este término para explicar cómo las ideas de Hayek y Keynes pueden converger hacia una justicia social compatible con el mercado.",
        "categorías": ["economía", "liberalismo", "justicia-social", "escuela-austriaca"]
    },
    {
        "cita": "El mercado es un mecanismo que coordina millones de decisiones individuales en tiempo real.",
        "context": "Inspirado por la visión austriaca, esta cita destaca la capacidad del mercado para asignar recursos eficientemente sin intervención estatal.",
        "categorías": ["economía", "mercado", "escuela-austriaca", "libertad"]
    },
    {
        "cita": "La intervención estatal en el mercado puede degenerar en un festín de amigotes que capturan a los burócratas y legisladores.",
        "context": "Crítica a los monopolios y cárteles que surgen cuando el Estado interviene excesivamente en la economía, basada en principios austriacos.",
        "categorías": ["economía", "intervencionismo", "corrupción", "escuela-austriaca"]
    },
    {
        "cita": "\"La inversión se ve más desanimada que estimulada por una alta demanda de bienes de consumo.\"",
        "context": "\"Cita atribuida a Hayek que describe cómo los bajos tipos de interés pueden distorsionar las estructuras productivas.\"",
        "categorías": ["economía", "intervencionismo", "corrupción", "escuela-austriaca"]
    }
]
.map(generateMockQuote)


export const mockCommunismQuotes = [
    [
        {
          "cita": "El comunismo representa en la historia un movimiento conservador y no un grito de ruptura como yo pensaba.",
          "context": "Escohotado redefine el comunismo como un fenómeno reaccionario que surge tras avances en libertad política, en lugar de ser un movimiento revolucionario.",
          "categorías": ["comunismo", "historia", "libertad", "conservadurismo"]
        },
        {
          "cita": "El comunismo venía a acabar con la clase media y la prosperidad, no con la pobreza.",
          "context": "Crítica al comunismo por su impacto destructivo sobre las clases medias y su incapacidad para resolver problemas sociales fundamentales.",
          "categorías": ["comunismo", "clase-media", "sociedad", "crítica-social"]
        },
        {
          "cita": "La secta es un compromiso de por vida donde no se discute lo infalible del jefe. Esto me recuerda cómo los rusos promulgaron leyes secretas, creando el sistema gulag.",
          "context": "Comparación entre el comunismo y las dinámicas sectarias, destacando su carácter autoritario y represivo.",
          "categorías": ["comunismo", "autoritarismo", "sectas", "represión"]
        },
        {
          "cita": "El principal valor de mi investigación es que conecta el comunismo primitivo (cristianismo evangélico) con el científico del siglo XIX.",
          "context": "Escohotado traza una línea histórica entre las raíces religiosas del comunismo y su evolución hacia una ideología política moderna.",
          "categorías": ["comunismo", "historia", "religión", "ideología"]
        },
        {
          "cita": "El comunismo es la religión del no ser: parece que hay sustancia, pero no hay nada.",
          "context": "Crítica filosófica al comunismo, describiéndolo como una ideología vacía que niega la naturaleza humana y la realidad material.",
          "categorías": ["comunismo", "filosofía", "existencialismo", "crítica-social"]
        },
        {
          "cita": "\"El comunismo científico es una regresión al colectivismo más primitivo, disfrazado de progreso.\"",
          "context": "\"Escohotado argumenta que el marxismo no representa un avance histórico sino una vuelta a formas arcaicas de organización social.\"",
          "categorías": ["comunismo", "filosofía", "ideología", "crítica-social"]
        }
    ]
    .map(generateMockQuote)
]

export const mockHegelQuotes = [
    {
      "cita": "Lo verdadero es el todo.",
      "context": "Hegel afirma que la verdad no puede ser fragmentada; solo se comprende en su totalidad, como un proceso dinámico y absoluto.",
      "categorías": ["dialéctica", "verdad", "idealismo-absoluto", "filosofía"]
    },
    {
      "cita": "La razón es espontáneamente dialéctica; apenas ha afirmado una cosa, tiende a negarla o a contradecirla y luego a superar esa contradicción.",
      "context": "Descripción del movimiento dialéctico de la razón, que avanza mediante contradicciones hacia una síntesis superadora.",
      "categorías": ["dialéctica", "razón", "contradicción", "filosofía"]
    },
    {
      "cita": "La historia no es una serie de eventos aislados, sino un proceso racional en el que las contradicciones internas llevan a la transformación y al progreso.",
      "context": "Hegel explica cómo la historia humana sigue un desarrollo lógico basado en la resolución de contradicciones.",
      "categorías": ["historia", "dialéctica", "progreso", "filosofía"]
    },
    {
      "cita": "La idea absoluta es contradictoria, se mueve y cambia, se niega y se transforma en su contrario.",
      "context": "Reflexión sobre la naturaleza dinámica de la idea absoluta como principio activo que evoluciona mediante contradicciones.",
      "categorías": ["idea-absoluta", "dialéctica", "idealismo-absoluto", "filosofía"]
    },
    {
      "cita": "\"El espíritu se manifiesta en tres etapas: subjetiva, objetiva y absoluta.\"",
      "context": "\"Hegel describe cómo el espíritu evoluciona desde la conciencia individual hasta alcanzar su forma más elevada en arte, religión y filosofía.\"",
      "categorías": ["espíritu", "filosofía", "arte", "religión"]
    }
]
.map(generateMockQuote)

export const mockMuerteQuotes = [
    {
      "cita": "La muerte es una dimensión de la vida; ella es nuestra compañera más fiel, la única que nunca nos abandona puesto que puede sobrevenir en cualquier momento.",
      "context": "Reflexión sobre la inevitabilidad de la muerte y su papel como parte esencial de la existencia humana.",
      "categorías": ["muerte", "vida", "filosofía", "trascendencia"]
    },
    {
      "cita": "Rechazar la muerte, hasta el extremo, es negarse a vivir. Para vivir plenamente hay que tener el coraje de integrar a la muerte en la vida.",
      "context": "Propuesta filosófica para aceptar la muerte como parte integral de una vida auténtica.",
      "categorías": ["muerte", "vida", "existencialismo", "aceptación"]
    },
    {
      "cita": "La muerte no existe como tal; es un paso natural en el devenir de la materia.",
      "context": "Interpretación hegeliana de la muerte como parte del proceso dialéctico y transformación constante.",
      "categorías": ["muerte", "dialéctica", "filosofía", "trascendencia"]
    },
    {
      "cita": "La muerte ilumina nuestra vida. Si nuestra muerte carece de sentido, tampoco lo tuvo nuestra vida.",
      "context": "Octavio Paz reflexiona sobre cómo el significado de la muerte está intrínsecamente ligado al sentido de la vida.",
      "categorías": ["muerte", "vida", "filosofía", "sentido"]
    },
    {
      "cita": "La separación entre cuerpo y alma implica un fin natural, pero abre un horizonte hacia una forma de existencia puramente espiritual.",
      "context": "Edith Stein propone que tras la muerte, el alma accede a un modo de existencia espiritual gracias a su conexión con lo divino.",
      "categorías": ["muerte", "alma", "espiritualidad", "trascendencia"]
    },
    {
      "cita": "\"La historia tiene el poder de acabarlo todo en el desarrollo del tiempo; más allá del tiempo no hay Nada.\"",
      "context": "\"Hegel analiza cómo la muerte asegura nuestra finitud dentro del marco temporal y cómo esto define nuestra libertad.\"",
      "categorías": ["muerte", "historia", "filosofía", "libertad"]
    }
]
.map(generateMockQuote)
