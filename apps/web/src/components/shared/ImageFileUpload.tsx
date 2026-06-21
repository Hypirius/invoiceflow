import { ChangeEvent } from "react";
import InputWithLabelAndError from "./InputWIthLabelAndError";
import Image, { StaticImageData } from "next/image";
import useImageUpload from "@/hooks/useImageUpload";
import z from "zod";
import imageUploadSchema from "@/schemas/ImageUploadSchema";

type ImageFileUploadProps = {
  itemKey: string;
  uploadType: "profile-image" | "organisation-logo" | "invoice-pdf";
  ErrorCb: (error: string, key?: string) => void;
  SuccessCb: (data: string, key?: string) => void;
  defaultImage: string | StaticImageData;
  src?: string;
  error?: string;
};

function ImageFileUpload({
  itemKey,
  uploadType,
  ErrorCb,
  SuccessCb,
  defaultImage,
  src,
  error,
}: ImageFileUploadProps) {
  const { mutateAsync } = useImageUpload(itemKey, uploadType);

  async function handleImageSubmit(image: File) {
    const result = z.safeParse(imageUploadSchema, image);

    if (!result.success) {
      const message = result.error.issues[0]?.message as string;
      return ErrorCb(message, itemKey);
    }

    const uploadResult = await mutateAsync(image);
    SuccessCb(uploadResult, itemKey);
  }

  return (
    <div className="relative">
      <InputWithLabelAndError
        id="image"
        labelText="Enter Image (optional)"
        accept=".jpg, .jpeg, .png"
        type="file"
        onChange={(e: ChangeEvent<HTMLInputElement>) =>
          e.target.files?.[0] && handleImageSubmit(e.target.files?.[0])
        }
        error={error}
        className="w-32 h-32 rounded-full left-1/2 -translate-x-1/2 translate-y-[55%] opacity-0 absolute p-0"
      />
      <Image
        src={src ? src : defaultImage}
        alt="profile Image"
        width={128}
        height={128}
        className="rounded-full w-32 h-32 m-auto hover:opacity-60"
      />
    </div>
  );
}

export default ImageFileUpload;
