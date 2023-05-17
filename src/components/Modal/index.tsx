import "./style.css";
import { useModal } from "../../context/modalContext";
import { ModalProps } from "../../interface/modal";

// Componente que da estructura a los diferentes modales que utilizamos en nuestra página

const Modal = ({ children }: ModalProps) => {
  const { setModal}= useModal(); // Corrección: solo asignar el segundo elemento de la tupla

  return (
    <div className="modal_big" onClick={() => setModal(null)}>
      <div onClick={(e) => e.stopPropagation()}>{children}</div>
    </div>
  );
};

export default Modal;