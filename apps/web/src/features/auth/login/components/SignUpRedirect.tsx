import Link from "next/link";

export default function SignUpRedirect() {
  return (
    <div className="w-full text-center">
      <p className="inline mr-1.5">Don&#39;t have an account?</p>
      <Link href="/sign-up" className="text-[#3525CD]">
        Sign up for access
      </Link>
    </div>
  );
}
