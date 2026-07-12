import { useRouter } from "next/navigation";
import Button from "../ui/Button";

function RefreshPageButton() {
  const router = useRouter();

  return (
    <Button variant="primary" onClick={() => router.refresh()}>
      Refresh
    </Button>
  );
}

export default RefreshPageButton;
