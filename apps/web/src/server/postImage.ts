const cloudinaryUrl =
  "https://api.cloudinary.com/v1_1/usercreationsystem/image/upload";

async function postImage(image: File) {
  console.log(image);
  const result = await fetch("http://localhost:3000/v1/upload-image", {
    cache: "no-store",
  });

  const signatureResult = await result.json();
  const formData = new FormData();

  formData.append("file", image);
  formData.append("api_key", signatureResult.data.apiKey);
  formData.append("timestamp", `${signatureResult.data.timestamp}`);
  formData.append("signature", signatureResult.data.signature);
  formData.append("folder", signatureResult.data.folder);
  formData.append("tags", signatureResult.data.tags);
  // formData.append("max_file_size", signatureResult.data.max_file_size);
  // formData.append("allowed_formats", signatureResult.data.allowed_formats);

  console.log(Object.fromEntries(formData));

  // Upload to Cloudinary
  const uploadResponse = await fetch(cloudinaryUrl, {
    method: "POST",
    body: formData,
  });

  console.log(uploadResponse);

  const uploadResult = await uploadResponse.json();

  console.log(uploadResult);

  return uploadResult.secure_url as string;
}

export default postImage;

//TODO: Change backend to set max file size and accept image type for backend level security checks, Also check potentailly about req to route without adding proper details as it is a get request, add error handling
