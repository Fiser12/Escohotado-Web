import { NewsletterSubscription } from "@/components/layout/newsletterSubscription";
import { BaseUser, evalPermissionByRoleQuery } from "payload-access-control";
import { SubscriptionsSection } from "@/components/organisms/subscription/subscriptions.organism";
import { LexicalRenderer } from "@/modules/lexical/renderer/lexicalRenderer";
import { ServiceInjector, Services, servicesProd } from "@/modules/services";
import { SerializedEditorState } from "@payloadcms/richtext-lexical/lexical";

interface Props extends React.HTMLAttributes<HTMLDivElement>, ServiceInjector {
  user?: BaseUser | null
  action: string
  lexicalContent: SerializedEditorState
}

export const HomePage = ({ user, action, lexicalContent, services, ...rest }: Props) => {
  const hasPermission = evalPermissionByRoleQuery(user, 'basic');

  return (
    <div {...rest}>
      {lexicalContent &&
        <LexicalRenderer
          data={lexicalContent}
          services={services ?? servicesProd}
          className="h-full"
        />
      }
      {!hasPermission &&
        <SubscriptionsSection className="pb-16" />
      }
      <NewsletterSubscription action={action} />
    </div>
  );
};

