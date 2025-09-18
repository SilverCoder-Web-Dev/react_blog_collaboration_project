import React, { useState, useEffect } from 'react';
import {
  MdClose,
  MdTitle,
  MdDescription,
  MdImage,
  MdSave,
  MdModeEdit,
  MdCloudUpload,
  MdCheckCircle,
  MdError,
} from 'react-icons/md';
import { updatePost } from '../../services/apiHandling';
import type { IPost } from '../../services/apiHandling';
import './EditModal.css';
import '../../styles.css';

interface EditModalProps {
  isOpen: boolean;
  onClose: () => void;
  post: IPost;
  onPostUpdated: (updatedPost: IPost) => void;
}

const EditModal: React.FC<EditModalProps> = ({ isOpen, onClose, post, onPostUpdated }) => {
  const [title, setTitle] = useState<string>(post.title);
  const [body, setBody] = useState<string>(post.body);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(post.imageData || null);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [alertModal, setAlertModal] = useState<{
    isOpen: boolean;
    type: 'success' | 'error';
    message: string;
  }>({
    isOpen: false,
    type: 'success',
    message: '',
  });

  // Prefill form when post changes
  useEffect(() => {
    setTitle(post.title);
    setBody(post.body);
    setImagePreview(post.imageData || null);
  }, [post]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      if (!file.type.startsWith('image/')) {
        showAlert('error', 'Please select an image file');
        return;
      }
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const showAlert = (type: 'success' | 'error', message: string) => {
    setAlertModal({ isOpen: true, type, message });
  };

  const closeAlert = () => {
    setAlertModal((prev) => ({ ...prev, isOpen: false }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      let imageData = post.imageData || '';

      if (imageFile) {
        imageData = await new Promise<string>((resolve, reject) => {
          const reader = new FileReader();
          reader.readAsDataURL(imageFile);
          reader.onload = () => resolve(reader.result as string);
          reader.onerror = reject;
        });
      }

      type UpdatePostData = Omit<IPost, 'id' | 'createdAt'>;
      const updatedPostData: UpdatePostData = {
        title,
        body,
        imageData,
        updatedAt: new Date().toISOString(),
      };

      const updatedPost = await updatePost(post.id, updatedPostData);

      showAlert('success', `🎉 Post "${updatedPost.title}" updated successfully!`);

      onPostUpdated(updatedPost);

      // Auto-close success after 2s
      if (alertModal.type === 'success') {
        setTimeout(() => {
          closeAlert();
          onClose();
        }, 2000);
      }
    } catch (error) {
      console.error('Failed to update post:', error);
      showAlert('error', 'Failed to update post. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const closeModal = () => {
    closeAlert();
    onClose();
  };

  if (!isOpen) return null;

  return (
    <>
      <div className="edit-modal-overlay" onClick={closeModal}>
        <div className="edit-modal" onClick={(e) => e.stopPropagation()}>
          <div className="modal-header">
            <h2>
              <MdModeEdit size={24} />
              Edit Post
            </h2>
            <button className="close-btn" onClick={closeModal} aria-label="Close modal">
              <MdClose size={24} />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="edit-post-form">
            <div className="form-group">
              <label htmlFor="title">
                <MdTitle size={12} />
                Title
              </label>
              <input
                type="text"
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Enter post title"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="body">
                <MdDescription size={12} />
                Body
              </label>
              <textarea
                id="body"
                value={body}
                onChange={(e) => setBody(e.target.value)}
                placeholder="Write your post content..."
                rows={6}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="image" className="image-label">
                <MdImage size={12} />
                Upload Image (Optional)
              </label>

              <input
                type="file"
                id="image"
                accept="image/*"
                onChange={handleImageChange}
                className="file-input-hidden"
                aria-label="Upload post image"
              />

              <label htmlFor="image" className="file-upload-label">
                <MdCloudUpload size={20} />
                <span>{imageFile ? `✅ ${imageFile.name}` : 'Choose Image'}</span>
              </label>

              {imagePreview && (
                <div className="image-preview-container">
                  <img src={imagePreview} alt="Preview" className="image-preview" />
                  <button
                    type="button"
                    className="remove-image-btn"
                    onClick={() => {
                      setImageFile(null);
                      setImagePreview(null);
                    }}
                  >
                    &times;
                  </button>
                </div>
              )}
            </div>

            <div className="modal-actions">
              <button
                type="button"
                className="btn-cancel"
                onClick={closeModal}
                disabled={isSubmitting}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="btn-submit"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <span className="loading">Saving...</span>
                ) : (
                  <>
                    <MdSave size={18} />
                    Save Changes
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* ALERT MODAL POPUP */}
      {alertModal.isOpen && (
        <div className="alert-modal-overlay" onClick={closeAlert}>
          <div className="alert-modal" onClick={(e) => e.stopPropagation()}>
            <div className="alert-icon">
              {alertModal.type === 'success' ? (
                <MdCheckCircle size={48} className="icon-success" />
              ) : (
                <MdError size={48} className="icon-error" />
              )}
            </div>
            <h3 className={alertModal.type}>{alertModal.type === 'success' ? 'Success!' : 'Error!'}</h3>
            <p>{alertModal.message}</p>
            {alertModal.type === 'error' && (
              <button className="alert-btn" onClick={closeAlert}>
                OK
              </button>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default EditModal;