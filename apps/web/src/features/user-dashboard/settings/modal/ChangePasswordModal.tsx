import ModalMain from "@/features/modal/ModalMain";
import ChangePasswordForm from "../components/ChangePasswordForm";
import CloseDialogCross from "@/features/modal/CloseDialogCross";

function ChangePasswordModal() {
  return (
    <ModalMain>
      <div className="bg-white w-100 h-90 p-3 rounded-md relative">
        <ChangePasswordForm />
        <CloseDialogCross />
      </div>
    </ModalMain>
  );
}

export default ChangePasswordModal;
