import React, { useState, useEffect } from 'react';
import { getPosts } from '../services/apiHandling';
import type { IPost } from '../services/apiHandling';
import { MdSearch, MdEdit, MdDelete, MdManageSearch, MdMenu } from 'react-icons/md';
import EditModal from './modals/EditModal';
import DeleteModal from './modals/DeleteModal';
import './ManagePosts.css';
import { useSidebar } from '../contexts/SidebarContext';

const ManagePosts: React.FC = () => {
  const [posts, setPosts] = useState<IPost[]>([]);
  const [filteredPosts, setFilteredPosts] = useState<IPost[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  //Menu button for Side bar
  const { isOpen, toggleSidebar } = useSidebar();
  const [windowWidth, setWindowWidth] = useState<number>(window.innerWidth);

  // Modals
  const [editModalPost, setEditModalPost] = useState<IPost | null>(null);
  const [deleteModalPost, setDeleteModalPost] = useState<{ id: string; title: string } | null>(null);


  //Use Effect for Side bar
  useEffect(() => {
        const handleResize = () => setWindowWidth(window.innerWidth);
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

  // Fetch posts on mount
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await getPosts();
        setPosts(data);
        setFilteredPosts(data);
      } catch (err) {
        setError('Failed to load posts.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  // Filter posts when search term changes
  useEffect(() => {
    if (!searchTerm.trim()) {
      setFilteredPosts(posts);
    } else {
      setFilteredPosts(
        posts.filter((post) =>
          post.title.toLowerCase().includes(searchTerm.toLowerCase())
        )
      );
    }
  }, [searchTerm, posts]);

  // Handlers
  const handleEditClick = (post: IPost) => {
    setEditModalPost(post);
  };

  const handleDeleteClick = (id: string, title: string) => {
    setDeleteModalPost({ id, title });
  };

  const handleUpdatePost = (updatedPost: IPost) => {
    setPosts(posts.map((p) => (p.id === updatedPost.id ? updatedPost : p)));
    setEditModalPost(null);
  };

  const handleConfirmDelete = async () => {
    if (!deleteModalPost) return;
    try {
      // Assuming deletePost is imported from apiHandling
      await import('../services/apiHandling').then(({ deletePost }) =>
        deletePost(deleteModalPost.id)
      );
      setPosts(posts.filter((p) => p.id !== deleteModalPost.id));
      setDeleteModalPost(null);
    } catch (error) {
      console.error('Failed to delete post:', error);
      alert('Failed to delete post. Please try again.');
    }
  };

  if (loading) {
    return (
      <div className="manage-posts">
        <div className="manage-page-header">
            <MdManageSearch size={50} className="header-icon" />
            <h1>Manage Posts</h1>
        </div>
        <p className="subtitle">Loading posts...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="manage-posts">
        <div className="manage-page-header">
            <MdManageSearch size={50} className="header-icon" />
            <h1>Manage Posts</h1>
        </div>
        <p className="subtitle">Search, edit, or delete any post in your blog.</p>
        <div className="error-message">{error}</div>
      </div>
    );
  }

  return (
    <div className="manage-posts">
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
      <div className="manage-page-header">
            <MdManageSearch size={50} className="header-icon" />
            <h1>Manage Posts</h1>
        </div>
        <p className="subtitle">Search, edit, or delete any post in your blog.</p>

      {/* Search Bar */}
      <div className="search-section">
        <div className="search-bar">
          <MdSearch size={20} className="search-icon" />
          <input
            type="text"
            placeholder="Search posts by title..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            aria-label="Search posts"
          />
        </div>
        {/* <div className="results-count">
          Showing {filteredPosts.length} of {posts.length} posts
        </div> */}
      </div>

      {/* Posts Table */}
      {filteredPosts.length === 0 ? (
        <div className="empty-state">
          <p>No posts match your search.</p>
        </div>
      ) : (
        <div className="table-container">
          <table className="posts-table">
            <thead>
              <tr>
                <th>Title</th>
                {posts.some((p) => p.imageData) && <th>Image</th>}
                <th>Created</th>
                <th>Updated</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {filteredPosts.map((post) => (
                <tr key={post.id} className="table-row">
                  <td className="title-cell">
                    <div className="title-wrapper">
                      <span>{post.title}</span>
                    </div>
                  </td>
                  {posts.some((p) => p.imageData) && (
                    <td className="image-cell">
                      {post.imageData && (
                        <div className="image-preview">
                          <img
                            src={post.imageData}
                            alt={post.title}
                            onError={(e) => {
                              (e.target as HTMLImageElement).src =
                                'https://via.placeholder.com/40?text=IMG';
                            }}
                          />
                        </div>
                      )}
                    </td>
                  )}
                  <td className="date-cell">
                    {new Date(post.createdAt).toLocaleDateString()}
                  </td>
                  <td className="date-cell">
                    {new Date(post.updatedAt).toLocaleDateString()}
                  </td>
                  <td className="action-cell">
                    <div className="action-buttons">
                      <button
                        className="btn-edit"
                        onClick={() => handleEditClick(post)}
                        aria-label={`Edit ${post.title}`}
                        title="Edit"
                      >
                        <MdEdit size={16} />
                      </button>
                      <button
                        className="btn-delete"
                        onClick={() => handleDeleteClick(post.id, post.title)}
                        aria-label={`Delete ${post.title}`}
                        title="Delete"
                      >
                        <MdDelete size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Modals */}
      {editModalPost && (
        <EditModal
          isOpen={true}
          onClose={() => setEditModalPost(null)}
          post={editModalPost}
          onPostUpdated={handleUpdatePost}
        />
      )}

      {deleteModalPost && (
        <DeleteModal
          isOpen={true}
          onClose={() => setDeleteModalPost(null)}
          onConfirm={handleConfirmDelete}
          title={deleteModalPost.title}
        />
      )}
    </div>
  );
};

export default ManagePosts;