import React, { useState, useEffect } from 'react';
import { MdClose, MdTitle, MdDescription, MdImage, MdSave } from 'react-icons/md';
import { updatePost } from '../../services/apiHandling';
import type { IPost } from '../../services/apiHandling';
import './EditModal.css';

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
  const [modal, setModal] = useState<{
    type: 'success' | 'error' | null;
    message: string;
  }>({ type: null, message: '' });

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
        setModal({ type: 'error', message: 'Please select an image file' });
        return;
      }
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

    const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
        // Start with existing image data (fallback to empty string)
        let imageData = post.imageData || '';

        // If new image selected, convert to Base64
        if (imageFile) {
        imageData = await new Promise<string>((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(imageFile);
            reader.onload = () => resolve(reader.result as string);
            reader.onerror = reject;
        });
        }

        // Define update data shape explicitly
        type UpdatePostData = Omit<IPost, 'id' | 'createdAt'>;
        const updatedPostData: UpdatePostData = {
        title,
        body,
        imageData,
        updatedAt: new Date().toISOString(),
        };

        // Call API
        const updatedPost = await updatePost(post.id, updatedPostData);

        setModal({
        type: 'success',
        message: `🎉 Post "${updatedPost.title}" updated successfully!`,
        });

        // Notify parent to update state
        onPostUpdated(updatedPost);

        // Auto-close after 2 seconds
        setTimeout(() => {
        onClose();
        }, 2000);
    } catch (error) {
        console.error('Failed to update post:', error);
        setModal({
        type: 'error',
        message: 'Failed to update post. Please try again.',
        });
    } finally {
        setIsSubmitting(false);
    }
    };

  const closeModal = () => {
    setModal({ type: null, message: '' });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="edit-modal-overlay" onClick={closeModal}>
      <div className="edit-modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>
            <MdTitle size={24} />
            Edit Post
          </h2>
          <button className="close-btn" onClick={closeModal} aria-label="Close modal">
            <MdClose size={24} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="edit-post-form">
          {modal.type && (
            <div className={`feedback-toast ${modal.type}`}>
              <p>{modal.message}</p>
            </div>
          )}

          <div className="form-group">
            <label htmlFor="title">
              <MdTitle size={18} />
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
              <MdDescription size={18} />
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
              <MdImage size={18} />
              Upload Image (Optional)
            </label>
            <input
              type="file"
              id="image"
              accept="image/*"
              onChange={handleImageChange}
            />

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
  );
};

export default EditModal;