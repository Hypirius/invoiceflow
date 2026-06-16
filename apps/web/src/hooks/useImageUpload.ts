import { useMutation } from "@tanstack/react-query";
import postImage from "../server/postImage";

function useImageUpload(key: string) {
  return useMutation({
    mutationKey: [key],
    mutationFn: postImage,
  });
}

export default useImageUpload;
