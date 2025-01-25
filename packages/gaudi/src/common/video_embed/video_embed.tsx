function extractYouTubeVideoId(url: string) {
    const regex = /(?:https?:\/\/)?(?:www\.)?youtube\.com\/.*v=([^&\s]+)/;
    const match = url.match(regex);
    return match ? match[1] : null;
}

function extractVimeoIds(url: string) {
    //This is the format expected, you should extract with regex both ids
    //vimeo.com/1050333850/b2ddcc5898
    const regex = /(?:https?:\/\/)?(?:www\.)?vimeo\.com\/([^\/]+)\/([^\/]+)/;
    const match = url.match(regex);
    return match ? match[1] : null;
}

const YouTubeEmbed = (props: { videoId: string; }) => {
    return (
        <div className="w-full max-w-[80rem] mx-auto aspect-video max-h-[600px]">
            <iframe
                className="w-full h-full"
                src={`https://www.youtube.com/embed/${props.videoId}`}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen

            ></iframe>
        </div>
    );
};

const VimeoEmbed: React.FC<{ id1: string; id2: string; }> = ({ id1, id2 }) => {
    return (
        <div className="w-full max-w-[80rem] mx-auto aspect-video max-h-[600px]">
            <iframe
                className="w-full h-full"

                src="https://player.vimeo.com/video/1050333850?h=b2ddcc5898&amp;title=0&amp;byline=0&amp;portrait=0&amp;badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479"
                allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media"
                title="Escohotado Video 1"
            >
            </iframe>
            <script src="https://player.vimeo.com/api/player.js">
            </script>
        </div>
    );
};

export const VideoEmbed: React.FC<{ url: string; }> = ({ url }) => {
    const videoId = extractYouTubeVideoId(url);
    if (url.includes('youtube.com') && videoId) {
        return <YouTubeEmbed videoId={videoId} />;
    }
    if (url.includes('vimeo.com')) {
        const ids = extractVimeoIds(url);
        return (ids && ids[0] && ids[1] &&
            <VimeoEmbed id1={ids[0]} id2={ids[1]} />
        );
    }
};
