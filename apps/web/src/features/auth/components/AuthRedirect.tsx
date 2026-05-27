import Link from "next/link";

type AuthRedirectProps = {
  prompt: string;
  href: string;
  linkText: string;
};

export default function AuthRedirect({
  prompt,
  href,
  linkText,
}: AuthRedirectProps) {
  return (
    <div className="w-full text-center">
      <p className="inline mr-1.5">{prompt}</p>
      <Link href={href} className="text-[#3525CD]">
        {linkText}
      </Link>
    </div>
  );
}
