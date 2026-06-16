import AuthPageHeader from "@/features/auth/components/AuthPageHeader";
import AuthRedirect from "@/features/auth/components/AuthRedirect";
import SignUp from "@/features/auth/sign-up/components/SignUp";

function SignUpMenu() {
  return (
    <>
      <AuthPageHeader
        headText="Sign up"
        subText="Welcome, please create an account to access services"
      />
      <SignUp />
      <AuthRedirect
        prompt="Already have an account?"
        href="/login"
        linkText="Log in"
      />
    </>
  );
}

export default SignUpMenu;
