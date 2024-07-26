import React from "react";

interface ModalProps {
  isVisible: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isVisible, onClose, children }) => {
  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 ">
      <div className="fixed inset-0 bg-black opacity-50 " onClick={onClose}>
      </div>
      <div className="bg-white rounded-lg shadow-lg z-10 w-1/2 h-4/5 ">
        {children}
      </div>
    </div>
  );
};

export default Modal;
