import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import './AddProduct.css';
import dummyProducts from '../data/dummyProducts';
import upload from "../assets/upload.svg";

const AddProduct = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const isEditMode = Boolean(id);
  
const [categories, setCategories] = useState(["Snacks", "Chips"]);

const [formData, setFormData] = useState({
  id: null,
  name: '',
  slang: '',
  price: '',
  description: '',
  ingredient: '',
  advantages: '',
  categories: '',
  colorCode: '',
  image: '',
  rating: 0,
  label: 'BEST',
  isAddingCategory: false,
  newCategory: ''
});

  useEffect(() => {
    if (isEditMode) {
      const productToEdit = dummyProducts.find(p => p.id === Number(id));
      if (productToEdit) {
        setFormData(productToEdit);
      }
    }
  }, [id]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFormData({ ...formData, image: file ? URL.createObjectURL(file) : '' });
  };

  const handleSave = () => {
    navigate('/products');
  };

  const handleCancel = () => {
    navigate('/products');
  };

  // best new button function
  const setLabel = (value) => {
    setFormData({ ...formData, label: value });
  };

  // rating function
  const setRating = (value) => {
    setFormData({ ...formData, rating: value });
  };


  return (
    <div className="add-product-container">
      {/* Header */}
      <div className="header">
        <h2>Product Management</h2>
        <div className="header-actions">
          <button onClick={handleCancel} className="cancel-btn">Cancel</button>
          <button onClick={handleSave} className="save-btn">Save</button>
        </div>
      </div>

      {/* Form */}
      <div className="form-wrapper">
        <h3>{isEditMode ? 'Edit Product' : 'Add Product'}</h3>
        <p>{isEditMode ? 'Update Product Information.' : 'Enter Product Details And Expand Your Inventory.'}</p>

        {/* --------------------------------Label Row-------------------------- */}
        <div className="label-row">
          <span className="label-text">Product Label</span>
          <div className="label-buttons">
            <span
              className={`label-btn ${formData.label === 'BEST' ? 'active' : ''}`}
              onClick={() => setLabel('BEST')}
            >
              BEST
            </span>
            <span
              className={`label-btn ${formData.label === 'NEW' ? 'active' : ''}`}
              onClick={() => setLabel('NEW')}
            >
              NEW
            </span>
          </div>
        </div>
        {/* --------------------------image and upload part--------------------------------------- */}
        {/* Image */}
        <div className="image-rating-upload">
          {/* Left - Image */}
          <div className="product-image">
            {formData.image ? (
              <img src={formData.image} alt="Product" />
            ) : (
              <div className="image-placeholder">No Image</div>
            )}
          </div>

          {/* rating and upload */}
          <div className="right-side">
            {/* Rating Label */}
            <label>Rating</label>
            <div className="rating-stars">
              {[1, 2, 3, 4, 5].map(star => (
                <span
                  key={star}
                  className={star <= formData.rating ? 'star filled' : 'star'}
                  onClick={() => setRating(star)}
                >
                  ★
                </span>
              ))}
            </div>

            {/* Upload Label */}
            <label>Update Image</label>
            <div className="product-upload-input">
              <span>Upload File</span>
              <img src={upload} alt="Upload" className="product-upload-icon" />
              <input
                type="file"
                onChange={handleFileChange}
              />
            </div>
          </div>
        </div>

        {/* ------------------------------------------------form--------------------------------------------------- */}
        <div className="form-grid">

          {/* Categories */}
          <div className="form-field full-width">
            <label>Categories</label>
            {formData.isAddingCategory ? (
              <input
                type="text"
                placeholder="Enter new category and press Enter"
                value={formData.newCategory || ""}
                onChange={(e) =>
                  setFormData({ ...formData, newCategory: e.target.value })
                }
                onKeyDown={(e) => {
                  if (e.key === "Enter" && formData.newCategory.trim() !== "") {
                    setCategories([...categories, formData.newCategory.trim()]);
                    setFormData({
                      ...formData,
                      categories: "",
                      newCategory: "",
                      isAddingCategory: false
                    });
                  }
                }}
                onBlur={() =>
                  setFormData({ ...formData, isAddingCategory: false, newCategory: "" })
                }
                autoFocus
              />
            ) : (
              <select
                name="categories"
                value={formData.categories}
                onChange={(e) => {
                  if (e.target.value === "__add_more__") {
                    setFormData({ ...formData, isAddingCategory: true });
                  } else {
                    handleChange(e);
                  }
                }}
              >
                <option value="">Select Categories</option>
                {categories.map((cat, index) => (
                  <option key={index} value={cat}>
                    {cat}
                  </option>
                ))}
                <option value="__add_more__"> Add More...</option>
              </select>
            )}
          </div>

          {/* Product Name */}
          <div className="form-field">
            <label>Product Name</label>
            <input
              type="text"
              name="name"
              placeholder="Write Product Name"
              value={formData.name}
              onChange={handleChange}
            />
          </div>

          {/* Product Slang */}
          <div className="form-field">
            <label>Product Slang</label>
            <input
              type="text"
              name="slang"
              placeholder="Write Product Slang"
              value={formData.slang}
              onChange={handleChange}
            />
          </div>

          {/* Price */}
          <div className="form-field">
            <label>Select Price</label>
            <input
              type="text"
              name="price"
              placeholder="Write Product Price 5/10/20"
              value={formData.price}
              onChange={handleChange}
            />
          </div>

          {/* Description */}
          <div className="form-field">
            <label>Description</label>
            <textarea
              name="description"
              placeholder="Write Description"
              value={formData.description}
              onChange={handleChange}
            />
          </div>

          {/* Ingredient */}
          <div className="form-field">
            <label>Ingredient</label>
            <input
              type="text"
              name="ingredient"
              placeholder="Write Ingredient"
              value={formData.ingredient}
              onChange={handleChange}
            />
          </div>

          {/* Advantages */}
          <div className="form-field">
            <label>Advantages</label>
            <input
              type="text"
              name="advantages"
              placeholder="Write Comma Separated Advantages"
              value={formData.advantages}
              onChange={handleChange}
            />
          </div>

          {/* Color Code */}
          <div className="form-field full-width">
            <label>Color Code</label>
            <input
              type="text"
              name="colorCode"
              placeholder="Write Color code #ffffff"
              value={formData.colorCode}
              onChange={handleChange}
            />
          </div>

        </div>

      </div>
    </div>
  );
};

export default AddProduct;
