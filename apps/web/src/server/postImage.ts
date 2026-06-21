const cloudinaryUrl =
  "https://api.cloudinary.com/v1_1/usercreationsystem/image/upload";

async function postImage(image: File, uploadType: string) {
  const result = await fetch(
    `http://localhost:3000/v1/upload-image?type=${uploadType}`,
    {
      cache: "no-store",
    },
  );

  const signatureResult = await result.json();
  const formData = new FormData();

  formData.append("file", image);
  formData.append("api_key", signatureResult.data.apiKey);
  formData.append("timestamp", `${signatureResult.data.timestamp}`);
  formData.append("signature", signatureResult.data.signature);
  formData.append("upload_preset", signatureResult.data.upload_preset);

  // Upload to Cloudinary
  const uploadResponse = await fetch(cloudinaryUrl, {
    method: "POST",
    body: formData,
  });

  const uploadResult = await uploadResponse.json();

  console.log(uploadResult);

  return uploadResult.secure_url as string;
}

//TODO: types could be shared

export default postImage;
