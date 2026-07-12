"use client";

import { ReactNode, useContext, useEffect, useRef } from "react";
import { ToggleContext } from "./context/toggle";

function ModalMain({ children }: { children: ReactNode }) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const values = useContext(ToggleContext);

  const isOpen = values?.isOpen;

  useEffect(() => {
    const dialogEl = dialogRef.current;
    if (!dialogEl) return;

    if (isOpen) {
      dialogEl.showModal();
    }

    if (!isOpen) return dialogEl.close();
  }, [isOpen]);

  return (
    <>
      {isOpen && (
        <dialog
          ref={dialogRef}
          className="flex items-center justify-center m-auto [&]:w-fit"
        >
          {children}
        </dialog>
      )}
    </>
  );
}

export default ModalMain;
