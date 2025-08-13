import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiEdit, FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import { RiDeleteBin6Line } from 'react-icons/ri';
import dummyBlogs from '../data/dummyBlogs';
import '../pages/BlogManagement.css';

const BlogManagement = () => {
  const navigate = useNavigate();

  const [blogs, setBlogs] = useState(dummyBlogs);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(7);

  const totalPages = itemsPerPage ? Math.ceil(blogs.length / itemsPerPage) : 0;

  const handleAddBlog = () => {
    navigate('/blogs/add');
  };

  const handleItemsPerPageChange = (e) => {
    const value = Number(e.target.value);
    setItemsPerPage(value);
    setCurrentPage(1);
  };

  const handlePageChange = (pageNumber) => {
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };

  const handleEdit = (id) => {
    navigate(`/blogs/edit/${id}`);
  };

  const handleDelete = (id) => {
    console.log('Delete blog:', id);
  };

  const currentBlogs = itemsPerPage
    ? blogs.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)
    : [];

  return (
    <div className="blog-management-container">
      {/* Top Header */}
      <div className="blog-top-header">
        <h2>Welcome Back, Admin!</h2>
        <button onClick={handleAddBlog} className="add-blog-button">
          Add Blog
        </button>
      </div>

      {/* Main Card */}
      <div className="blog-main-card">
        <div className="blog-management-header">
          <div>
            <h3>Blog Management</h3>
            <p>Manage All Your Blog Posts In One Place.</p>
          </div>
        </div>

        {/* Table */}
        <div className="blog-table-container">
          <table className="blog-table">
            <thead>
              <tr>
                <th>Blog Image</th>
                <th>Blog Title</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {currentBlogs.map((blog) => (
                <tr key={blog.id}>
                  <td><img src={blog.image} alt={blog.title} /></td>
                  <td>{blog.title}</td>
                  <td className="blog-actions">
                    <button onClick={() => handleEdit(blog.id)}><FiEdit /></button>
                    <button onClick={() => handleDelete(blog.id)}><RiDeleteBin6Line /></button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Bottom Controls */}
        <div className="blog-bottom-controls">
          <div>
            Showing
            <select value={itemsPerPage} onChange={handleItemsPerPageChange}>
              {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((count) => (
                <option key={count} value={count}>{count}</option>
              ))}
            </select>
          </div>
          
          <div className="record-info">
            Showing {currentBlogs.length > 0 ? ((currentPage - 1) * itemsPerPage + 1) : 0} to {((currentPage - 1) * itemsPerPage + currentBlogs.length)} out of {blogs.length} records
          </div>

          {/* Pagination */}
          <div className="blog-pagination">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="arrow-button"
            >
              <FiChevronLeft />
            </button>

            {(() => {
              const buttons = [];
              for (let page = 1; page <= totalPages; page++) {
                buttons.push(
                  <button
                    key={page}
                    onClick={() => handlePageChange(page)}
                    className={currentPage === page ? 'active' : ''}
                  >
                    {page}
                  </button>
                );
              }
              return buttons;
            })()}

            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="arrow-button"
            >
              <FiChevronRight />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogManagement;
