import Divider from "@/components/shared/Divider";
import GoogleOAuthButton from "@/components/shared/GoogleOAuthButton";
import LoginHeader from "./LoginHeader";
import LoginForm from "./LoginForm";
import SignUpRedirect from "./SignUpRedirect";

export default function LoginMenu() {
  return (
    <>
      <LoginHeader />
      <GoogleOAuthButton />
      <Divider text="or" />
      <LoginForm />
      <SignUpRedirect />
    </>
  );
}
