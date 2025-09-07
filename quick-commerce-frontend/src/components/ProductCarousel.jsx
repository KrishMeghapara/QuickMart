import React, { useRef } from 'react';
import { Chip } from '@mui/material';
import './ProductCarousel.css';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

export default function ProductCarousel({ products, categoryName, onAddToCart, onSeeAll }) {
  const scrollRef = useRef(null);
  const navigate = useNavigate();

  const scroll = (direction) => {
    const { current } = scrollRef;
    if (!current) return;
    const cardWidth = current.querySelector('.product-card')?.offsetWidth || 220;
    const scrollAmount = cardWidth * 2.5; 
    if (direction === 'left') {
      current.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
    } else {
      current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <div className="category-section">
      <div className="category-header">
        <div>
          <h2 className="category-title">{categoryName}</h2>
          <Chip 
            label={`${products.length} items`} 
            size="small" 
            sx={{ 
              background: 'var(--brand-gradient)',
              color: 'white',
              fontWeight: 600,
              mt: 1,
              boxShadow: 'var(--glow-purple)'
            }} 
          />
        </div>
        <button className="see-all-btn" onClick={onSeeAll}>see all <ArrowForwardIosIcon fontSize="small" /></button>
      </div>
      <div className="carousel-wrapper">
        <button className="carousel-arrow left" onClick={() => scroll('left')}><ArrowBackIosNewIcon /></button>
        <div className="carousel-row" ref={scrollRef}>
          {products.map(prod => (
            <div 
              className="product-card" 
              key={prod.productID}
              onClick={() => navigate(`/product/${prod.productID}`)}
              style={{ cursor: 'pointer' }}
            >
              <div className="product-badges">
                {prod.productPrice < 100 && (
                  <Chip 
                    icon={<span style={{ fontSize: '0.8rem' }}>🔥</span>}
                    label="Best Deal" 
                    size="small" 
                    sx={{ 
                      background: 'linear-gradient(135deg, var(--danger), #DC2626)',
                      color: 'white',
                      fontWeight: 700,
                      fontSize: '0.75rem',
                      height: '22px',
                      borderRadius: '12px',
                      boxShadow: '0 2px 6px rgba(185,28,28,0.3)',
                      '& .MuiChip-icon': {
                        marginLeft: '4px',
                        marginRight: '-2px'
                      }
                    }} 
                  />
                )}
                {prod.productPrice > 200 && (
                  <Chip 
                    icon={<span style={{ fontSize: '0.8rem' }}>🏷️</span>}
                    label="Premium" 
                    size="small" 
                    sx={{ 
                      background: 'linear-gradient(135deg, var(--success), #10B981)',
                      color: 'white',
                      fontWeight: 700,
                      fontSize: '0.75rem',
                      height: '22px',
                      borderRadius: '12px',
                      boxShadow: '0 2px 6px rgba(5,150,105,0.3)',
                      '& .MuiChip-icon': {
                        marginLeft: '4px',
                        marginRight: '-2px'
                      }
                    }} 
                  />
                )}
                {!prod.isInStock && (
                  <Chip 
                    label="Out of Stock" 
                    size="small" 
                    sx={{ 
                      bgcolor: 'var(--muted)', 
                      color: 'white',
                      fontWeight: 700,
                      fontSize: '0.7rem',
                      borderRadius: '12px'
                    }} 
                  />
                )}
              </div>
              <div className="product-img-wrapper">
                {prod.productImg && prod.productImg !== 'false' ? (
                  <img 
                    className="product-img" 
                    src={prod.productImg} 
                    alt={prod.productName}
                    onError={(e) => {
                      e.target.style.display = 'none';
                      e.target.nextSibling.style.display = 'block';
                    }}
                  />
                ) : null}
                {(!prod.productImg || prod.productImg === 'false') && (
                  <div className="placeholder-icon">📦</div>
                )}
                <div style={{ display: 'none', fontSize: '3rem', color: '#d1d5db', opacity: 0.5 }}>📦</div>
              </div>
              <div className="product-meta">
                <div>
                  <div className="product-delivery"><span role="img" aria-label="clock">⏱️</span> 12 MINS</div>
                  <div className="product-name">{prod.productName}</div>
                  <div className="product-qty">{prod.productQty || ''}</div>
                </div>
                <div className="product-price-row">
                  <div>
                    <span className="product-price">₹{prod.productPrice}</span>
                    {prod.productPrice > 150 && (
                      <div style={{ fontSize: '0.75rem', color: 'var(--muted)', textDecoration: 'line-through', marginTop: '2px' }}>
                        ₹{Math.round(prod.productPrice * 1.2)}
                      </div>
                    )}
                  </div>
                  <Button
                    variant="contained"
                    size="small"
                    className="add-btn"
                    onClick={() => onAddToCart(prod)}
                    disabled={!prod.isInStock}
                  >
                    ADD
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
        <button className="carousel-arrow right" onClick={() => scroll('right')}><ArrowForwardIosIcon /></button>
      </div>

    </div>
  );
} 