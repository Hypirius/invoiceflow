import Image from "next/image";
import InvoiceFlowLogo from "public/invoiceflow-logo.svg";
import abstractBgPath from "public/auth-menu-abstract-bg.jpg";

export default function AuthShowcase() {
  return (
    <div className="h-full w-[45%] relative text-[#EFF1F3]">
      <div className="absolute top-8 left-8 flex items-center gap-2">
        <InvoiceFlowLogo />
        <span className=" w-25 h-7">InvoiceFlow</span>
      </div>
      <div className="w-112.5 h-45 absolute top-[50%] left-[12%] right -translate-12">
        <h1 className="font-semibold text-[40px] leading-none mb-4">
          Secure billing and financial management.
        </h1>
        <p className="text-[16px] font-light">
          Engineered for financial precision and high-velocity workflows.
          Experience the standard in modern institutional trust.
        </p>
      </div>
      <Image
        className="-z-1 absolute object-cover opacity-95"
        src={abstractBgPath}
        alt="Abstract dark background"
        fill
        loading="eager"
        sizes="(max-width: 768px) 100vw, 33vw"
      />
    </div>
  );
}

// TODO: Learn about next js images and optimal optimizations
