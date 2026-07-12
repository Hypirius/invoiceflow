import getUserDetails from "@/lib/getUserDetails";
import DefaultProfileIcon from "public/default-profile-logo.svg";
import { Suspense } from "react";

async function HeadDetails() {
  const { data, isError, error } = await getUserDetails();

  if (isError || !data) {
    console.log(error);
    return <p>Auth error</p>;
  }

  const { displayName, imageUrl, email } = data;

  return (
    <>
      {!imageUrl && <DefaultProfileIcon className="w-8 h-8" />}
      <div className="mx-2">
        <h3 className="text-[22px] font-bold text-[#191C1E] ">{displayName}</h3>
        <p className="text-[12px] text-[#565E74]">{email}</p>
      </div>
    </>
  );
}

function SideNavHead() {
  return (
    <div className="flex items-center justify-center w-full h-25 p-6">
      {/* Add support for image url viewing */}
      <Suspense>
        <HeadDetails />
      </Suspense>
    </div>
  );
}

export default SideNavHead;
