import Divider from "@/components/shared/Divider";
import GoogleLogin from "./GoogleLogin";
import LoginHeader from "./LoginHeader";
import LoginForm from "./LoginForm";
import SignUpRedirect from "./SignUpRedirect";

export default function LoginMenu() {
  return (
    <div className=" w-100 h-120 flex flex-col justify-center text-[#191C1E] gap-5">
      <LoginHeader />
      <GoogleLogin />
      <Divider text="or" />
      <LoginForm />
      <SignUpRedirect />
    </div>
  );
}
