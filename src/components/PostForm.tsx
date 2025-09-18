import React, { useState, useEffect, type FormEvent, type ChangeEvent } from 'react';
import type { IPost } from '../services/apiHandling';
import './PostForm.css';

// Define the props interface for PostForm.
interface IPostFormProps {
  post: IPost | null;
  onSave: (postData: Omit<IPost, 'id' | 'createdAt' | 'updatedAt'>) => void;
  onCancel: () => void;
}

// The PostForm component handles the UI for creating and editing posts.
const PostForm: React.FC<IPostFormProps> = ({ post, onSave, onCancel }) => {
  const [title, setTitle] = useState<string>(post?.title || '');
  const [body, setBody] = useState<string>(post?.body || '');
  const [imageData, setImageData] = useState<string | undefined>(post?.imageData);

  // When a new post is selected for editing, update the form state.
  useEffect(() => {
    setTitle(post?.title || '');
    setBody(post?.body || '');
    setImageData(post?.imageData);
  }, [post]);

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImageData(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!title || !body) {
      console.log('Title and body are required.');
      return;
    }

    const postData = {
      title,
      body,
      imageData: imageData ?? '',
    };
    onSave(postData);
  };

  return (
    <div className="post-form-container">
      <h2 className="post-form-title">
        {post ? 'Edit Post' : 'Create a New Post'}
      </h2>
      <form onSubmit={handleSubmit} className="post-form-body">
        <div className='form-field-wrapper'>
          <label htmlFor="title" className="form-label">
            Title
          </label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="form-input"
            required
          />
        </div>
        <div>
          <label htmlFor="body" className="form-label">
            Body
          </label>
          <textarea
            id="body"
            rows={4}
            value={body}
            onChange={(e) => setBody(e.target.value)}
            className="form-textarea"
            required
          ></textarea>
        </div>
        <div>
          <label htmlFor="image" className="form-label">
            Image
          </label>
          <input
            type="file"
            id="image"
            accept="image/*"
            onChange={handleImageChange}
            className="form-file-input"
          />
          {imageData && (
            <div className="form-image-preview-container">
              <img src={imageData} alt="Preview" className="form-image-preview" />
            </div>
          )}
        </div>
        <div className="form-actions">
          <button
            type="submit"
            className="form-button"
          >
            {post ? 'Update Post' : 'Create Post'}
          </button>
          <button
            type="button"
            onClick={onCancel}
            className="form-button form-button-secondary"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default PostForm;
