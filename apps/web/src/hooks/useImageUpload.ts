import { useMutation } from "@tanstack/react-query";
import postImage from "../server/postImage";

function useImageUpload(key: string, uploadType: string) {
  return useMutation({
    mutationKey: [key],
    mutationFn: (data: File) => postImage(data, uploadType),
  });
}

export default useImageUpload;
