import Divider from "@/components/shared/Divider";
import GoogleLogin from "./GoogleLogin";
import LoginHeader from "./LoginHeader";
import LoginForm from "./LoginForm";
import SignUpRedirect from "./SignUpRedirect";

export default function LoginMenu() {
  return (
    <>
      <LoginHeader />
      <GoogleLogin />
      <Divider text="or" />
      <LoginForm />
      <SignUpRedirect />
    </>
  );
}
