"use client";
import Link from "next/link";
import SideNavListItem from "./SideNavListItem";
import SupportIcon from "public/support-icon.svg";
import CreateOrganisationButton from "@/features/user-dashboard/organisation/create-organisation/components/CreateOrganisationButton";

export default function SideNavFooter() {
  return (
    <div className="w-full p-2 *:w-full text-center">
      <CreateOrganisationButton />
      <ul>
        <SideNavListItem className="mb-1">
          <SupportIcon />
          <Link href="/support">Support</Link>
        </SideNavListItem>
      </ul>
    </div>
  );
}
