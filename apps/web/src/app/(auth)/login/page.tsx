import Divider from "@/components/shared/Divider";
import GoogleOAuthButton from "@/components/shared/GoogleOAuthButton";
import LoginHeader from "@/features/auth/login/components/LoginHeader";
import LoginForm from "@/features/auth/login/components/LoginForm";
import SignUpRedirect from "@/features/auth/login/components/SignUpRedirect";

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
