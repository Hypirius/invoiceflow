import fetchUrls from "@/config/fetchUrls";
import handleFetch from "@/lib/handleFetch";

type signatureRes = {
  signature: string;
  apiKey: string;
  timestamp: number;
  upload_preset: string;
};

async function handleImageUpload(data: FormData) {
  const res = await fetch(fetchUrls.cloudinary, {
    method: "POST",
    body: data,
  });

  if (!res.ok) {
    throw new Error("Failed to upload to cloud service");
  }

  const result = await res.json();

  return result;
}

async function postImage(image: File, uploadType: string) {
  const result = await handleFetch<signatureRes>({
    url: `${fetchUrls.signature}?type=${uploadType}`,
    method: "POST",
    cache: "no-cache",
  });

  const signatureResult = result.data as signatureRes;
  const formData = new FormData();

  formData.append("file", image);
  formData.append("api_key", signatureResult?.apiKey);
  formData.append("timestamp", `${signatureResult?.timestamp}`);
  formData.append("signature", signatureResult?.signature);
  formData.append("upload_preset", signatureResult?.upload_preset);

  // Upload to Cloudinary

  const uploadResult = await handleImageUpload(formData);

  return uploadResult.secure_url as string;
}

//TODO: types could be shared and null checks can be avoided, error handling could be added

export default postImage;
