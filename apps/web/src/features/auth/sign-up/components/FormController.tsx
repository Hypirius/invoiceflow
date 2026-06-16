import Button from "@/components/ui/Button";
import { FullDetailsType } from "../../types";

type FormControllerProps = {
  handleSubmitStep: (
    action: "next" | "back" | "submit",
    data?: FullDetailsType,
  ) => void;
  selectedFormId: string;
};

function FormController({
  handleSubmitStep,
  selectedFormId,
}: FormControllerProps) {
  return (
    <div id="form-controls" className="mt-5 absolute bottom-0 w-full">
      <div className="flex justify-between *:w-20 w-full">
        <Button variant="outlined" onClick={() => handleSubmitStep("back")}>
          Back
        </Button>
        <Button variant="primary" type="submit" form={selectedFormId}>
          Next
        </Button>
      </div>
    </div>
  );
}

export default FormController;
