import { COLLECTION_SLUG_ARTICLE_WEB } from "@/core/collections-slugs";
import { LexicalRenderer } from "@/modules/lexical/renderer/lexical-renderer";
import { ServiceInjector } from "@/modules/services";
import { BaseUser, ContentProtected } from "payload-access-control";
import { ArticleWeb } from "payload-types";
import { BlockedContentArea } from "./blocked-content-area";

interface Props extends React.HTMLAttributes<HTMLDivElement>, ServiceInjector {
    user?: BaseUser | null
    article: ArticleWeb
}

export const ArticleContentProtected = ({
    user, article, services
}: Props) => {
    return <ContentProtected
        user={user}
        content={article}
        collection={COLLECTION_SLUG_ARTICLE_WEB}
    >
        {({ hasPermissions, isUnlocked }) => <> {(hasPermissions || isUnlocked) ?
            <LexicalRenderer data={article.content} services={services} /> :
            <BlockedContentArea
                user={user}
                data={article.preview_content}
                services={services}
                permissions={article.permissions_seeds?.split(',')}
                collection={COLLECTION_SLUG_ARTICLE_WEB}
                contentId={article.id} />
        } </>}
    </ContentProtected>;
};


