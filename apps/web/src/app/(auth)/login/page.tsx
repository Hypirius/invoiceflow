import Divider from "@/components/shared/Divider";
import GoogleOAuthButton from "@/features/auth/components/GoogleOAuthButton";
import AuthRedirect from "@/features/auth/components/AuthRedirect";
import AuthPageHeader from "@/features/auth/components/AuthPageHeader";
import LoginMain from "@/features/auth/login/components/LoginMain";

export default function LoginMenu() {
  return (
    <>
      <AuthPageHeader
        headText="Log in"
        subText="Welcome back. Please enter your details"
      />
      <GoogleOAuthButton />
      <Divider text="or" />
      <LoginMain />
      <AuthRedirect
        prompt="Don't have an account?"
        href="/sign-up"
        linkText="Sign up for access"
      />
    </>
  );
}
