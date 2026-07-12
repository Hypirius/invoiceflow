import Link from "next/link";
import SideNavListItem from "./SideNavListItem";
import TeamIcon from "public/team-icon.svg";
import SettingIcon from "public/settings-icon.svg";

export default function SideNavMain() {
  return (
    <ul className="grow size-full flex flex-col gap-1 border-t border-b border-[#565E74] py-4 px-2">
      <SideNavListItem>
        <TeamIcon />
        <Link href="/user/dashboard/organisations">Organisations</Link>
      </SideNavListItem>
      <SideNavListItem>
        <SettingIcon />
        <Link href="/user/dashboard/settings">Settings</Link>
      </SideNavListItem>
    </ul>
  );
}
