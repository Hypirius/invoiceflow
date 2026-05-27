import Button from "@/components/ui/Button";
import GoogleLogo from "public/google-icon-logo.svg";

export default function GoogleOAuthButton() {
  return (
    <Button
      variant="outlined"
      className="w-full p-2 flex items-center justify-center gap-3"
    >
      <span>
        <GoogleLogo className="w-5 h-5" />
      </span>
      <span>Continue with google</span>
    </Button>
  );
}
