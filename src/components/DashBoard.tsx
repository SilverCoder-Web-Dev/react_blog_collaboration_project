import React, { useEffect, useState } from 'react';
import EditModal from './modals/EditModal';
import DeleteModal from './modals/DeleteModal';
import '../styles.css';

// Reuse IPost type from api.ts
import { getPosts, deletePost, type IPost } from '../services/apiHandling';
import {
  MdDashboard,
  MdOutlineCalendarToday,
  MdOutlineEdit,
  MdError,
  MdOutlineFolderOpen,
  MdOutlineStickyNote2,
  MdMenu,
  MdEdit,
  MdDelete,
  MdAccessTime
} from 'react-icons/md';
import { BiNote } from 'react-icons/bi';
import { useSidebar } from '../contexts/SidebarContext'; // 👈 Import context

const Dashboard: React.FC = () => {
  const [posts, setPosts] = useState<IPost[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const { isOpen, toggleSidebar } = useSidebar(); // 👈 Use context
  const [windowWidth, setWindowWidth] = useState<number>(window.innerWidth);
  const [editModalPost, setEditModalPost] = useState<IPost | null>(null);
  const [deleteModalPost, setDeleteModalPost] = useState<{ id: string; title: string } | null>(null);

    useEffect(() => {
      const handleResize = () => setWindowWidth(window.innerWidth);
      window.addEventListener('resize', handleResize);
      return () => window.removeEventListener('resize', handleResize);
    }, []);
  
    useEffect(() => {
      console.log('Current posts:', posts);
      posts.forEach(p => {
        console.log(`Post ID: ${p.id} | Has imageData:`, !!p.imageData, '| Preview:', p.imageData?.substring(0, 50));
      });
    }, [posts]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await getPosts();
        setPosts(data);
      } catch (err) {
        setError('Failed to load posts. Please try again later.');
        console.error('Fetch Posts Error:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

        const handleEditClick = (post: IPost) => {
        setEditModalPost(post);
      };

      const handleDeleteClick = (id: string, title: string) => {
        setDeleteModalPost({ id, title });
      };

      const handleUpdatePost = (updatedPost: IPost) => {
        setPosts(posts.map(p => p.id === updatedPost.id ? updatedPost : p));
      };

      const handleConfirmDelete = async () => {
        if (!deleteModalPost) return;
        try {
          await deletePost(deleteModalPost.id);
          setPosts(posts.filter(p => p.id !== deleteModalPost.id));
          setDeleteModalPost(null);
        } catch (error) {
          console.error('Failed to delete post:', error);
          alert('Failed to delete post. Please try again.');
        }
      };

  if (loading) {
    return (
      <div className="dashboard">
        {!isOpen && windowWidth <= 768 && (
        <button
          className="mobile-open-sidebar-btn force-show"
          onClick={toggleSidebar}
          aria-label="Open sidebar"
        >
          <MdMenu size={20} />
        </button>
      )}
          {isOpen && (
            <div
              className="sidebar-backdrop show"
              onClick={toggleSidebar} // clicking outside closes sidebar
            ></div>
        )}
        <div className="dashboard-header">
          <div className="title-with-icon">
            <MdDashboard size={46} className="header-icon" />
            <h1>Dashboard</h1>
          </div>
          <p className="subtitle">Welcome back! Here’s what’s happening with your content.</p>
        </div>
        <div className="loading-skeleton">
          <div className="skeleton-card"></div>
          <div className="skeleton-card"></div>
          <div className="skeleton-card"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="dashboard">
        <div className="dashboard-header">
          <div className="title-with-icon">
            <MdDashboard size={46} className="header-icon" />
            <h1>Dashboard</h1>
          </div>
          <p className="subtitle">Welcome back! Here’s what’s happening with your content.</p>
        </div>
        {!isOpen && windowWidth <= 768 && (
        <button
          className="mobile-open-sidebar-btn force-show"
          onClick={toggleSidebar}
          aria-label="Open sidebar"
        >
          <MdMenu size={20} />
        </button>
      )}
        {isOpen && (
          <div
            className="sidebar-backdrop show"
            onClick={toggleSidebar} // clicking outside closes sidebar
          ></div>
      )}
        <div className="error-state">
          <div className="error-icon">
            <MdError size={48} color="#ef4444" />
          </div>
          <h3>Oops! Something went wrong.</h3>
          <p>{error}</p>
        </div>
      </div>
    );
  }

  const totalPosts = posts.length;
  const sortedPosts = [...posts].sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );
  const lastPost = sortedPosts[0];
  const lastPostDate = lastPost ? new Date(lastPost.createdAt).toLocaleDateString() : 'N/A';
  const lastEditDate = lastPost ? new Date(lastPost.updatedAt).toLocaleDateString() : 'N/A';

  return (
    <div className="dashboard">
      {isOpen && (
        <div
          className="sidebar-backdrop show"
          onClick={toggleSidebar} // clicking outside closes sidebar
        ></div>
    )}

      <div className="dashboard-header">
        {!isOpen && windowWidth <= 768 && (
        <button
          className="mobile-open-sidebar-btn force-show"
          onClick={toggleSidebar}
          aria-label="Open sidebar"
        >
          <MdMenu size={20} />
        </button>
      )}
        <div className="title-with-icon">
          <MdDashboard size={46} className="header-icon" />
          <h1>Dashboard</h1>
        </div>

        <p className="subtitle">Welcome back! Here’s what’s happening with your content.</p>
      </div>

      {/* STATS CARDS */}
      <div className="stats-section">
        <div className="stat-card">
          <div className="stat-icon-wrapper blue">
            <BiNote size={28} />
          </div>
          <div className="stat-content">
            <h3>Total Posts</h3>
            <p className="stat-value">{totalPosts}</p>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon-wrapper indigo">
            <MdOutlineCalendarToday size={28} />
          </div>
          <div className="stat-content">
            <h3>Last Post</h3>
            <p className="stat-value">{lastPostDate}</p>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon-wrapper violet">
            <MdOutlineEdit size={28} />
          </div>
          <div className="stat-content">
            <h3>Last Edit</h3>
            <p className="stat-value">{lastEditDate}</p>
          </div>
        </div>
      </div>

      {/* POSTS TABLE */}
      <div className="posts-section">
        <div className="section-header">
          <div className="section-header-title">
            <MdAccessTime size={36} color="#3B82F6" className='recents-icon'/>
            <h2>Recent Posts</h2>
          </div>
          <span className="post-count">Showing {Math.min(5, posts.length)} of {posts.length}</span>
        </div>

        {posts.length === 0 ? (
          <div className="empty-state">
            <MdOutlineFolderOpen size={64} color="#93C5FD" />
            <h3>No Posts Yet</h3>
            <p>Start creating content — your audience is waiting!</p>
          </div>
        ) : (
          <div className="table-container">
            <table className="modern-table">
              <thead>
                <tr>
                  <th>Title</th>
                  {/*<th>Body Preview</th>*/}
                  <th>Image</th>
                  <th>Created</th>
                  <th>Updated</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {sortedPosts.slice(0, 5).map((post) => (
                  <tr key={post.id} className="table-row">
                    <td className="title-cell">
                      <div className="title-wrapper">
                        <MdOutlineStickyNote2 size={18} color="#3B82F6" />
                        <span>{post.title}</span>
                      </div>
                    </td>
                    {/*<td className="body-cell">
                      <div className="body-preview">
                        {post.body.length > 60 ? `${post.body.substring(0, 60)}...` : post.body}
                      </div>
                    </td>*/}
                      {posts.some(p => p.imageData) && (
                        <td className="image-cell">
                          {post.imageData && (
                            <div className="image-preview">
                              <img
                                src={post.imageData}
                                alt={post.title}
                                onError={(e) => {
                                  console.error('Image load error for post:', post.id);
                                  (e.target as HTMLImageElement).src = 'https://via.placeholder.com/40?text=IMG';
                                }}
                              />
                            </div>
                          )}
                        </td>
                      )}
                    <td className="date-cell">{new Date(post.createdAt).toLocaleDateString()}</td>
                    <td className="date-cell">{new Date(post.updatedAt).toLocaleDateString()}</td>
                    {/* ACTIONS COLUMN */}
                    <td className="action-cell">
                        <div className="action-buttons">
                          <button
                            className="btn-edit"
                            onClick={() => handleEditClick(post)}
                            aria-label={`Edit post ${post.title}`}
                          >
                            <MdEdit size={16} />
                          </button>
                          <button
                            className="btn-delete"
                            onClick={() => handleDeleteClick(post.id, post.title)}
                            aria-label={`Delete post ${post.title}`}
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
      </div>
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

export default Dashboard;