import { NewsletterSubscription } from "@/components/layout/newsletter-subscription";
import { BaseUser, evalPermissionByRoleQuery } from "payload-access-control";
import { SubscriptionsSection } from "@/components/organisms/subscription/subscriptions.organism";
import { LexicalRenderer } from "@/modules/lexical/renderer/lexical-renderer";
import { ServiceInjector, servicesProd } from "@/modules/services";
import { SerializedEditorState } from "@payloadcms/richtext-lexical/lexical";

interface Props extends React.HTMLAttributes<HTMLDivElement>, ServiceInjector {
  user?: BaseUser | null
  action: string
  lexicalContent?: SerializedEditorState
}

export const HomePage = ({ user, action, lexicalContent, services = servicesProd, ...rest }: Props) => {
  const hasPermission = evalPermissionByRoleQuery(user, 'basic')

  return <div {...rest}>
    <LexicalRenderer
      data={lexicalContent}
      services={services}
      className="h-full"
    />
    { hasPermission &&
      <SubscriptionsSection 
        className="pb-16 pt-16" 
        services={services} 
        user={user}
      />
    }
    <NewsletterSubscription action={action} />
  </div>
};

