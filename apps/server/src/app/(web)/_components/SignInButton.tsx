import { signIn } from "@/plugins/authjs/plugin";
import { EscotaButton } from "node_modules/gaudi/src/common/escota_button/escota_button";

export function SignInButton() {
  return (
    <form
      action={async () => {
        "use server";
        await signIn("keycloak");
      }}
    >
      <button type="submit">
        <EscotaButton text="Entrar" variant="secondary" />
      </button>
    </form>
  );
}
