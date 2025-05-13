"use client"

import { useEffect, useState } from "react"
import Navbar from "./Navbar"
import {
  FaWhatsapp,
  FaInfoCircle,
  FaRuler,
  FaPalette,
  FaTrademark,
  FaLeaf,
  FaSprayCan,
  FaIndustry,
} from "react-icons/fa"
import "../../styles/Products.css"

const ProductList = () => {
  const [products, setProducts] = useState([])
  const [expandedCard, setExpandedCard] = useState(null)
  const [inquirySent, setInquirySent] = useState({})

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/products")
        const data = await response.json()
        setProducts(data)
      } catch (error) {
        console.error("Error fetching products:", error)
      }
    }

    fetchProducts()
  }, [])

  const toggleCardExpansion = (index) => {
    setExpandedCard(expandedCard === index ? null : index)
  }

  const openWhatsApp = (product, event, index) => {
    const phoneNumber = "+919344733072"

    const message =
      `Hello, I am interested in \"${product.name}\". Here are the details:\n\n` +
      `- \uD83D\uDCCF Size: ${product.length}\n` +
      `- \uD83C\uDFA8 Color: ${product.color}\n` +
      `- \uD83C\uDF7F\uFE0F Brand: ${product.brand}\n` +
      `- \uD83E\uDEA5 Material: ${product.material}\n` +
      `- \u2728 Finishing: ${product.finishing}\n` +
      `- \uD83C\uDFED Usage: ${product.usage}\n\n` +
      `Please provide more details. Thank you!`

    const encodedMessage = encodeURIComponent(message)

    const isMobile = /Android|iPhone|iPad|iPod/i.test(navigator.userAgent)
    const whatsappUrl = isMobile
      ? `whatsapp://send?phone=${phoneNumber}&text=${encodedMessage}`
      : `https://web.whatsapp.com/send?phone=${phoneNumber}&text=${encodedMessage}`

    setInquirySent((prev) => ({ ...prev, [index]: true }))

    setTimeout(() => {
      setInquirySent((prev) => ({ ...prev, [index]: false }))
    }, 30000)

    window.open(whatsappUrl, "_blank")
  }

  return (
    <div className="user-product-container">
      <div className="user-product-header">
        <h1>Our Premium Products</h1>
        <p>Discover our high-quality weaving shuttles crafted with precision</p>
      </div>

      <div className="user-product-list">
        {products.map((product, index) => (
          <div
            className={`user-product-card ${expandedCard === index ? "user-product-card-expanded" : ""}`}
            key={product._id || index}
          >
            <div className="user-product-image-container">
              <div className="user-product-image">
                <img src={product.image || "/placeholder.svg"} alt={product.name} />
              </div>
              <div className="user-product-badge">Premium</div>
            </div>

            <div className="user-product-content">
              <h3 className="user-product-title">{product.name}</h3>

              <div className="user-product-specs">
                <div className="user-spec-item">
                  <FaRuler className="user-spec-icon" />
                  <span>{product.length}</span>
                </div>
                <div className="user-spec-item">
                  <FaPalette className="user-spec-icon" />
                  <span>{product.color}</span>
                </div>
              </div>

              <div className={`user-product-details ${expandedCard === index ? "user-visible" : ""}`}>
                <div className="user-details-grid">
                  <div className="user-detail-item">
                    <FaTrademark className="user-detail-icon" />
                    <div>
                      <h4>Brand</h4>
                      <p>{product.brand}</p>
                    </div>
                  </div>

                  <div className="user-detail-item">
                    <FaLeaf className="user-detail-icon" />
                    <div>
                      <h4>Material</h4>
                      <p>{product.material}</p>
                    </div>
                  </div>

                  <div className="user-detail-item">
                    <FaSprayCan className="user-detail-icon" />
                    <div>
                      <h4>Finishing</h4>
                      <p>{product.finishing}</p>
                    </div>
                  </div>

                  <div className="user-detail-item">
                    <FaIndustry className="user-detail-icon" />
                    <div>
                      <h4>Usage</h4>
                      <p>{product.usage}</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="user-product-actions">
                <button
                  className="user-details-btn"
                  onClick={() => toggleCardExpansion(index)}
                  aria-expanded={expandedCard === index}
                >
                  <FaInfoCircle />
                  {expandedCard === index ? "Less Details" : "More Details"}
                </button>

                <button
                  className={`user-inquiry-btn ${inquirySent[index] ? "user-inquiry-sent" : ""}`}
                  onClick={(e) => openWhatsApp(product, e, index)}
                  disabled={inquirySent[index]}
                >
                  <FaWhatsapp />
                  {inquirySent[index] ? "Inquiry Sent" : "Make Inquiry"}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default ProductList