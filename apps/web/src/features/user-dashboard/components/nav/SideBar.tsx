import SideNavWrapper from "@/components/shared/SIdeNavWrapper";
import SideNavHead from "./SideNavHead";
import SideNavMain from "./SideNavMain";
import SideNavFooter from "./SideNavFooter";

async function SideBar() {
  return (
    <>
      <SideNavWrapper>
        <SideNavHead />
        <SideNavMain />
        <SideNavFooter />
      </SideNavWrapper>
    </>
  );
}
export default SideBar;
