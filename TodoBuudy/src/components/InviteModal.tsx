import React from "react";
import InviteForm from "./InviteForm";
import Modal from "./Modal";


interface InviteModalProps {
  isOpen: boolean;
  onClose: () => void;
  onInviteSent: () => void;
}

const InviteModal: React.FC<InviteModalProps> = ({ isOpen, onClose, onInviteSent }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Invite New User">
      <InviteForm onInviteSent={onInviteSent} onClose={onClose} />
    </Modal>
  );
};

export default InviteModal;
