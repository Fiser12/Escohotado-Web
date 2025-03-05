import { getPayload } from "@/payload/utils/getPayload";
import { LexicalRenderer } from "@/lexical/lexicalRenderer";
import { ContentWrapper, H2, H4, NewsletterSubscription, SubscriptionsGroupCard } from "gaudi/server";
import { signIn } from '@/payload/plugins/authjs/plugin';
import { getCurrentUserQuery } from "@/core/auth/payloadUser/getCurrentUserQuery";
import { Subscription } from "payload-types";
import { SubscriptionsSection } from "@/ui/organisms/subscriptions.organism";
import { evalPermissionQuery } from "@/core/auth/permissions/evalPermissionQuery";

const Page = async () => {
  const payload = await getPayload();
  const homeData = await payload.findGlobal({
    slug: "home_page"
  })
  const user = await getCurrentUserQuery(payload);
  const hasPermission = evalPermissionQuery(user, 'basic');

  return (
    <>
      {homeData.content &&
        <LexicalRenderer
          data={homeData.content}
          className="h-full"
        />
      }
      { !hasPermission &&
        <SubscriptionsSection className="pb-16"  />
      }
      <NewsletterSubscription />
    </>
  );
};

export default Page;
