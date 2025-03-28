import { getPayload } from "@/payload/utils/getPayload";
import { LexicalRenderer } from "@/lexical/lexicalRenderer";
import { getCurrentUserQuery } from "@/core/auth/payloadUser/getCurrentUserQuery";
import { SubscriptionsSection } from "@/modules/organisms/subscriptions.organism";
import { evalPermissionByRoleQuery } from "payload-access-control";
import { NewsletterSubscription } from "@/components/content/common/newsletterSubscription";

const Page: React.FC<{action: string}> = async ({action}) => {
  const payload = await getPayload();
  const homeData = await payload.findGlobal({
    slug: "home_page"
  })
  const user = await getCurrentUserQuery(payload);
  const hasPermission = evalPermissionByRoleQuery(user, 'basic');

  return (
    <>
      {homeData.content &&
        <LexicalRenderer
          data={homeData.content}
          className="h-full"
        />
      }
      {!hasPermission &&
        <SubscriptionsSection className="pb-16" />
      }
      <NewsletterSubscription action={action} />
    </>
  );
};

export default Page;
