import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import './AddBlog.css';
import upload from '../assets/upload.svg';
import dummyBlogs from '../data/dummyBlogs';
import { Editor } from '@tinymce/tinymce-react';

const AddBlog = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const isEditMode = Boolean(id);

  const [formData, setFormData] = useState({
    file: '',
    preview: '',
    mainTitle: '',
    shortDescription: '',
    description: '',
    faqs: [{ question: '', answer: '' }],
  });

  useEffect(() => {
    if (isEditMode) {
      const blogToEdit = dummyBlogs.find((blog) => blog.id === Number(id));
      if (blogToEdit) {
        setFormData({
          file: blogToEdit.file || '',
          preview: blogToEdit.file || '',
          mainTitle: blogToEdit.title || '',
          shortDescription: blogToEdit.shortDescription || '',
          description: blogToEdit.description || '',
          faqs: blogToEdit.faqs || [{ question: '', answer: '' }],
        });
      }
    }
  }, [id, isEditMode]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFaqChange = (index, field, value) => {
    const updatedFaqs = [...formData.faqs];
    updatedFaqs[index][field] = value;
    setFormData({ ...formData, faqs: updatedFaqs });
  };

  const addFaq = () => {
    setFormData({ ...formData, faqs: [...formData.faqs, { question: '', answer: '' }] });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData({
        ...formData,
        file: file.name,
        preview: URL.createObjectURL(file),
      });
    }
  };

  const handleSave = () => {
    console.log(isEditMode ? 'Updating Blog:' : 'Adding Blog:', formData);
    navigate('/blogs');
  };

  const handleCancel = () => {
    navigate('/blogs');
  };

  return (
    <div className="add-blog-container">
      {/* Header */}
      <div className="header">
        <h2>Blog Management</h2>
        <div className="header-actions">
          <button className="cancel-btn" onClick={handleCancel}>Cancel</button>
          <button className="save-btn" onClick={handleSave}>Save</button>
        </div>
      </div>

      {/* Form Card */}
      <div className="form-wrapper">
        <h3>{isEditMode ? 'Edit Blog' : 'Add Blog'}</h3>
        <p>{isEditMode ? 'Update Blog Details To Keep Content Fresh.' : 'Quickly Write And Publish Blogs To Boost Engagement.'}</p>

        {/* Upload Image */}
        <div className="form-group file-upload-group">
          <label>Update Image</label>
          <div className="file-input-wrapper">
            <input type="file" onChange={handleFileChange} />
            <span>{formData.file || 'Update File'}</span>
            <img src={upload} alt="Upload Icon" className="upload-icon" />
          </div>
          {formData.preview && (
            <div className="image-preview">
              <img src={formData.preview} alt="Preview" />
            </div>
          )}
        </div>

        {/* Title */}
        <div className="form-group">
          <label>Title</label>
          <input
            type="text"
            name="mainTitle"
            placeholder="Write Title"
            value={formData.mainTitle}
            onChange={handleChange}
          />
        </div>

        {/* Short Description */}
        <div className="form-group">
          <label>Short Description</label>
          <input
            type="text"
            name="shortDescription"
            placeholder="Write Description"
            value={formData.shortDescription}
            onChange={handleChange}
          />
        </div>

        {/* Description */}
        <div className="form-group">
          <label>Description</label>
          <Editor
            apiKey="lvrlrcqjgu0x83amssn032svvfj3cof1640bfseih7p0w7a5"
            value={formData.description}
            init={{
              height: 400,
              menubar: false,
              statusbar: false,
              plugins: [
                'advlist autolink lists link image charmap preview anchor',
                'searchreplace visualblocks code fullscreen',
                'insertdatetime media table paste code help wordcount'
              ],
              toolbar:
                'undo redo | formatselect | bold italic underline forecolor | \
       alignleft aligncenter alignright alignjustify | \
       bullist numlist outdent indent | removeformat | help'
            }}
            onEditorChange={(content) => setFormData({ ...formData, description: content })}
          />

        </div>

        {/* FAQ Section */}
        <div className="faq-section">
          <h4>FAQ</h4>
          {formData.faqs.map((faq, index) => (
            <div key={index} className="form-row">
              <div className="form-group">
                <label>Question {index + 1}</label>
                <input
                  type="text"
                  placeholder="Write FAQ Question"
                  value={faq.question}
                  onChange={(e) => handleFaqChange(index, 'question', e.target.value)}
                />
              </div>
              <div className="form-group">
                <label>Answer</label>
                <input
                  type="text"
                  placeholder="Write FAQ Answer"
                  value={faq.answer}
                  onChange={(e) => handleFaqChange(index, 'answer', e.target.value)}
                />
              </div>
            </div>
          ))}
          <button className="add-faq-btn" onClick={addFaq}>+ Add FAQ Question</button>
        </div>
      </div>
    </div>
  );
};

export default AddBlog;
