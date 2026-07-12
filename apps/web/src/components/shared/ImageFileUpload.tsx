import { ChangeEvent } from "react";
import InputWithLabelAndError from "./InputWIthLabelAndError";
import Image, { StaticImageData } from "next/image";
import useImageUpload from "@/hooks/useImageUpload";
import z from "zod";
import imageUploadSchema from "@/schemas/ImageUploadSchema";
import { cn } from "@/utils/cn";
import ErrorOrSuccessMessage from "./UserMessages/ErrorOrSuccessMessage";

type ImageFileUploadProps = {
  itemKey: string;
  uploadType: "profile-image" | "organisation-logo" | "invoice-pdf";
  ErrorCb: (error: string, key?: string) => void;
  SuccessCb: (data: string, key?: string) => void;
  defaultImage: string | StaticImageData;
  labelText: string;
  className?: string;
  imageClassName?: string;
  inputClassName?: string;
};

function ImageFileUpload({
  itemKey,
  uploadType,
  ErrorCb,
  SuccessCb,
  defaultImage,
  labelText,
  className,
  imageClassName,
  inputClassName,
}: ImageFileUploadProps) {
  const { mutate, data, isSuccess, isError } = useImageUpload(
    itemKey,
    uploadType,
  );

  async function handleImageSubmit(image: File) {
    const result = z.safeParse(imageUploadSchema, image);

    if (!result.success) {
      const message = result.error.issues[0]?.message as string;
      return ErrorCb(message, itemKey);
    }

    mutate(image);
  }

  if (isSuccess) {
    SuccessCb(data, itemKey);
  }

  return (
    <div className={cn("relative", className)}>
      <ErrorOrSuccessMessage
        errorMessage={isError ? "Failed to set image" : undefined}
        successMessage={isSuccess ? "Image has been set" : undefined}
      />
      <InputWithLabelAndError
        id="image"
        labelText={labelText}
        accept=".jpg, .jpeg, .png .webp"
        type="file"
        onChange={(e: ChangeEvent<HTMLInputElement>) =>
          e.target.files?.[0] && handleImageSubmit(e.target.files?.[0])
        }
        className={cn(
          "w-32 h-32 rounded-full left-1/2 -translate-x-1/2 translate-y-[55%] opacity-0 absolute p-0",
          inputClassName,
        )}
      />
      <Image
        src={data ? data : defaultImage}
        alt="profile Image"
        width={128}
        height={128}
        loading="eager"
        className={cn(
          "rounded-full w-32 h-32 m-auto hover:opacity-60",
          imageClassName,
        )}
      />
    </div>
  );
}

export default ImageFileUpload;
