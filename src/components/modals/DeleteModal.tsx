import React from 'react';
import { MdClose, MdDelete } from 'react-icons/md';
import './DeleteModal.css';

interface DeleteModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
}

const DeleteModal: React.FC<DeleteModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  title,
}) => {
  if (!isOpen) return null;

  return (
    <div className="delete-modal-overlay" onClick={onClose}>
      <div className="delete-modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="delete-modal-close" onClick={onClose} aria-label="Close">
          <MdClose size={18} />
        </button>
        <div className="delete-modal-icon">
          <MdDelete size={48} />
        </div>
        <h3>Delete Post</h3>
        <p>
          Are you sure you want to delete <strong>“{title}”</strong>?<br />
          This action cannot be undone.
        </p>
        <div className="delete-modal-actions">
          <button className="delete-modal-btn-cancel" onClick={onClose}>
            Cancel
          </button>
          <button className="delete-modal-btn-delete" onClick={onConfirm}>
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteModal;