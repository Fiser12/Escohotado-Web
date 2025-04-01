import { Video } from "payload-types";
import { videoComments } from "./comments.model";

export const generateMockVideo = ({title, url, url_free, thumbnailUrl}: {title: string, url: string, url_free?: string, thumbnailUrl: string}): Video => ({
    id: 1,
    title,
    url,
    url_free,
    forum_post_id: "1",
    last_forum_posts: videoComments,
    thumbnailUrl,
    updatedAt: new Date().toISOString(),
    createdAt: new Date().toISOString(),
})

export const mockVideos = [
    { 
        title: "ESCOHOTADO y su polémica argumentación en ciertos debates", 
        url: "https://www.youtube.com/watch?v=NjXoII_Wkzg", 
        thumbnailUrl: "https://i.ytimg.com/vi/NjXoII_Wkzg/maxresdefault.jpg"
    },
    { 
        title: "¿QUÉ ES EL CANNABIS PARA ANTONIO ESCOHOTADO?", 
        url: "https://www.youtube.com/watch?v=KFjrZgQ1nkE", 
        thumbnailUrl: "https://i.ytimg.com/vi/KFjrZgQ1nkE/maxresdefault.jpg"
    },
    { 
        title: "Jorge explica la influencia de la ESCUELA AUSTRIACA en el pensamiento de ESCOHOTADO", 
        url: "https://www.youtube.com/watch?v=-QBaqXf1FIA", 
        thumbnailUrl: "https://i.ytimg.com/vi/-QBaqXf1FIA/maxresdefault.jpg"
    },
    { 
        title: "Recordando la memorable entrevista a ESCOHOTADO realizada por el profesor y economista Luis Espinosa", 
        url: "https://www.youtube.com/watch?v=ZX36by-G69M", 
        thumbnailUrl: "https://i.ytimg.com/vi/ZX36by-G69M/maxresdefault.jpg"
    },
    { 
        title: "Entrevista de Ayanta Barilli, hija de Dragó, a Antonio Escohotado", 
        url: "https://www.youtube.com/watch?v=S4HxMTmQSck", 
        thumbnailUrl: "https://i.ytimg.com/vi/S4HxMTmQSck/maxresdefault.jpg"
    },
    { 
        title: "Estudiante argentino pregunta a Jorge por la obra y relación con su padre", 
        url: "https://www.youtube.com/watch?v=q2SWjPBaY9g", 
        thumbnailUrl: "https://i.ytimg.com/vi/q2SWjPBaY9g/maxresdefault.jpg"
    },
    { 
        title: "¿Qué es el CRISTIANISMO para ESCOHOTADO?", 
        url: "https://www.youtube.com/watch?v=MRuPv9s6HnE", 
        thumbnailUrl: "https://i.ytimg.com/vi/MRuPv9s6HnE/maxresdefault.jpg"
    },
    { 
        title: "La Emboscadura y ESCOHOTADO enseñan a ser LIBRE ante GOBIERNOS TIRÁNICOS disfrazados de DEMOCRACIA", 
        url: "https://www.youtube.com/watch?v=MaW3fRpzzrc", 
        thumbnailUrl: "https://i.ytimg.com/vi/MaW3fRpzzrc/maxresdefault.jpg"
    },
    { 
        title: "Píldoras epistemológicas Frente el Miedo: Antonio ESCOHOTADO y Carlos MOYA reflexionan en directo", 
        url: "https://www.youtube.com/watch?v=K8GjV3W7zBY", 
        thumbnailUrl: "https://i.ytimg.com/vi/K8GjV3W7zBY/maxresdefault.jpg"
    },
    { 
        title: "ESCOHOTADO y su polémica argumentación en ciertos debates", 
        url: "https://www.youtube.com/watch?v=NjXoII_Wkzg", 
        thumbnailUrl: "https://i.ytimg.com/vi/NjXoII_Wkzg/maxresdefault.jpg"
    }
].map(generateMockVideo)





