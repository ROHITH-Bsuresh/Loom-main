"use client"

import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import axios from "axios"
import "./ByBrand.css"

const ByBrand = () => {
  const [brands, setBrands] = useState([])
  const [selectedBrand, setSelectedBrand] = useState("")
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    // Fetch all brands and products
    setLoading(true)
    axios
      .get("http://localhost:5000/api/products")
      .then((res) => {
        // Extract unique brands from the products list
        const uniqueBrands = [...new Set(res.data.map((product) => product.brand))]
        setBrands(uniqueBrands)
        setLoading(false)
      })
      .catch((err) => {
        console.error(err)
        setLoading(false)
      })
  }, [])

  useEffect(() => {
    // Fetch products based on selected brand
    if (selectedBrand) {
      setLoading(true)
      axios
        .get(`http://localhost:5000/api/products?brand=${selectedBrand}`)
        .then((res) => {
          setProducts(res.data)
          setLoading(false)
        })
        .catch((err) => {
          console.error(err)
          setLoading(false)
        })
    } else {
      setProducts([]) // Reset products if no brand is selected
    }
  }, [selectedBrand])

  const handleBrandChange = (e) => {
    setSelectedBrand(e.target.value)
  }

  return (
    <div className="brand-page">
      <div className="brand-header">
        <h1>Discover Products by Brand</h1>
        <p className="subtitle">Select a brand to explore our collection</p>
      </div>

      {/* Dropdown to select brand */}
      <div className="dropdown-container">
        <div className="select-wrapper">
          <select value={selectedBrand} onChange={handleBrandChange} className="brand-select">
            <option value="">Choose a Brand</option>
            {brands.map((brand, idx) => (
              <option key={idx} value={brand}>
                {brand}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Loading indicator */}
      {loading && (
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>Loading products...</p>
        </div>
      )}

      {/* Displaying products of the selected brand */}
      {selectedBrand && !loading && (
        <div className="results-header">
          <h2>
            {products.length > 0
              ? `Showing ${products.length} products from ${selectedBrand}`
              : `No products found for ${selectedBrand}`}
          </h2>
        </div>
      )}

      {selectedBrand && products.length > 0 && !loading ? (
        <div className="product-grid">
          {products.map((prod) => (
            <div key={prod._id} className="product-card" onClick={() => navigate(`/product/${prod._id}`)}>
              <div className="product-card-inner">
                <h3 className="product-name">{prod.name}</h3>
                <div className="product-price">₹{prod.price}</div>
                <div className="product-details">
                  <div className="detail-item">
                    <span className="detail-label">Brand:</span>
                    <span className="detail-value">{prod.brand}</span>
                  </div>
                  <div className="detail-item">
                    <span className="detail-label">Material:</span>
                    <span className="detail-value">{prod.material}</span>
                  </div>
                  <div className="detail-item">
                    <span className="detail-label">Color:</span>
                    <span className="detail-value">{prod.color}</span>
                  </div>
                  <div className="detail-item">
                    <span className="detail-label">Length:</span>
                    <span className="detail-value">{prod.length}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        selectedBrand && !loading && <div className="no-products">No products found for this brand.</div>
      )}
    </div>
  )
}

export default ByBrand
