import React, { useEffect, useState } from 'react';
import { MdClose, MdPostAdd, MdImage, MdTitle, MdDescription, MdSave, MdMenu } from 'react-icons/md';
import { createPost } from '../services/apiHandling';
import { fileToBase64 } from '../utils/imageUtils';
import { useNavigate } from 'react-router-dom';
import './CreatePost.css';
import '../styles.css';
import { useSidebar } from '../contexts/SidebarContext';

const CreatePost: React.FC = () => {
  const [title, setTitle] = useState<string>('');
  const [body, setBody] = useState<string>('');
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const navigate = useNavigate();
  const { isOpen, toggleSidebar } = useSidebar();
  const [windowWidth, setWindowWidth] = useState<number>(window.innerWidth);


  useEffect(() => {
        const handleResize = () => setWindowWidth(window.innerWidth);
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
      }, []);

  // Modal state for success/error messages
  const [modal, setModal] = useState<{
    type: 'success' | 'error' | null;
    message: string;
  }>({ type: null, message: '' });

  const validate = (): boolean => {
    const newErrors: Record<string, string> = {};
    if (!title.trim()) newErrors.title = 'Title is required';
    if (!body.trim()) newErrors.body = 'Body is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

      const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      if (e.target.files && e.target.files[0]) {
        const file = e.target.files[0];
        if (!file.type.startsWith('image/')) {
          setErrors((prev) => ({ ...prev, image: 'Please select an image file' }));
          return;
        }

        setImageFile(file);
        setImagePreview(URL.createObjectURL(file)); // 👈 Efficient preview
        setErrors((prev) => ({ ...prev, image: '' }));
      }
    };

  const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault();
      if (!validate()) {
        setModal({ type: 'error', message: 'Please fill in all required fields.' });
        return;
      }

      setIsSubmitting(true);

      try {
        let imageData = '';

        // 👇 Convert image to Base64 if exists
        if (imageFile) {
          imageData = await fileToBase64(imageFile);
        }

        const newPostData = {
          title,
          body,
          image_name: '',           // Optional: keep if you want filename
          imageData,                // 👈 Base64 string saved here
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        };

        const newPost = await createPost(newPostData);

        setModal({
          type: 'success',
          message: `🎉 Post "${newPost.title}" created successfully!`,
        });

        // Reset form
        setTitle('');
        setBody('');
        setImageFile(null);
        setImagePreview(null);
        setErrors({});

        // 👇 Navigate to Dashboard after 1.5 seconds
        setTimeout(() => {
          navigate('/dashboard'); // Go to Dashboard
        }, 1500);
      } catch (error) {
        console.error('Failed to create post:', error);
        setModal({
          type: 'error',
          message: error instanceof Error ? error.message : 'Failed to create post',
        });
      } finally {
        setIsSubmitting(false);
      }
};

  const closeModal = () => {
    setModal({ type: null, message: '' });
  };

  // Auto-hide success modal after 3 seconds
  useEffect(() => {
    if (modal.type === 'success') {
      const timer = setTimeout(() => {
        closeModal();
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [modal.type]);

  return (
    <div className="create-post-page">
      {!isOpen && windowWidth <= 768 && (
              <button
                className="mobile-open-sidebar-btn force-show"
                onClick={toggleSidebar}
                aria-label="Open sidebar"
              >
                <MdMenu size={20} />
              </button> )}
              {isOpen && (
                  <div
                    className="sidebar-backdrop show"
                    onClick={toggleSidebar} // clicking outside closes sidebar
                  ></div>
              )}
      <div className="page-header">
        <MdPostAdd size={50} className="header-icon" />
        <h1>Create New Post</h1>
      </div>
      <p className="subtitle">Fill in the details below to create a new blog post.</p>

      <div className="form-container">
        <form onSubmit={handleSubmit} className="create-post-form">
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
              className={errors.title ? 'input-error' : ''}
            />
            {errors.title && <span className="error-text">{errors.title}</span>}
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
              rows={8}
              className={errors.body ? 'input-error' : ''}
            />
            {errors.body && <span className="error-text">{errors.body}</span>}
          </div>

          <div className="form-group">
                  <label htmlFor="image" className="image-label">
                    <MdImage size={18} />
                    Upload Image (Optional)
                  </label>

                  {/* Hidden actual file input */}
                  <input
                    type="file"
                    id="image"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="file-input-hidden"
                    aria-label="Upload post image"
                  />

                  {/* Beautiful styled label that triggers file input */}
                  <label htmlFor="image" className="file-upload-btn">
                    <span className="btn-text">
                      {imagePreview ? `✅ Image Ready` : 'Choose Image'}
                    </span>
                  </label>

                  {errors.image && <span className="error-text">{errors.image}</span>}

                  {/* Preview if image selected */}
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
                    <div className="form-actions">
                      <button
                        type="submit"
                        className="btn-submit"
                        disabled={isSubmitting}
                      >
                        {isSubmitting ? (
                          <span className="loading">Creating Post...</span>
                        ) : (
                          <>
                            <MdSave size={18} />
                            Create Post
                          </>
                        )}
                      </button>
                    </div>
                  </form>
                </div>

      {/* ========== MODAL TOAST ========== */}
      {modal.type && (
        <div className="feedback-modal-overlay" onClick={closeModal}>
          <div 
            className={`feedback-modal ${modal.type}`} 
            onClick={(e) => e.stopPropagation()}
          >
            <button className="modal-close" onClick={closeModal} aria-label="Close">
              <MdClose size={18} />
            </button>
            <p>{modal.message}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default CreatePost;