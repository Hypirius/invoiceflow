import { useMutation } from "@tanstack/react-query";
import postLoginDetails from "../server/postLoginDetails";

export default function useLogin() {
  return useMutation({
    mutationFn: postLoginDetails,
    mutationKey: ["postLogin"],
  });
}

// TODO: Optimize this, maybe use lifecycle methods
