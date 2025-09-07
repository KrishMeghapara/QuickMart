import React, { useState } from 'react';
import {
  Grid,
  Card,
  CardMedia,
  CardContent,
  Typography,
  Button,
  Box,
  IconButton,
  Chip,
  Rating,
  Tooltip,
  Fade
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import {
  Add as AddIcon,
  FavoriteBorder as FavoriteIcon,
  Favorite as FavoriteFilledIcon,
  ShoppingCart as CartIcon,
  Visibility as ViewIcon,
  Star as StarIcon
} from '@mui/icons-material';

export default function ProductGrid({ 
  products = [], 
  onAddToCart, 
  viewMode = 'grid',
  loading = false 
}) {
  const [favorites, setFavorites] = useState(new Set());
  const [hoveredProduct, setHoveredProduct] = useState(null);
  const navigate = useNavigate();

  const toggleFavorite = (productId) => {
    const newFavorites = new Set(favorites);
    if (newFavorites.has(productId)) {
      newFavorites.delete(productId);
    } else {
      newFavorites.add(productId);
    }
    setFavorites(newFavorites);
  };

  const getGridCols = () => {
    switch (viewMode) {
      case 'list': return { xs: 1 };
      case 'compact': return { xs: 2, sm: 3, md: 4, lg: 6 };
      default: return { xs: 1, sm: 2, md: 3, lg: 4 };
    }
  };

  if (loading) {
    return (
      <Grid container spacing={3}>
        {[...Array(8)].map((_, index) => (
          <Grid item key={index} {...getGridCols()}>
            <Card sx={{ borderRadius: 3 }}>
              <Box sx={{ 
                height: 200,
                background: 'linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%)',
                backgroundSize: '200% 100%',
                animation: 'loading 1.5s infinite',
                '@keyframes loading': {
                  '0%': { backgroundPosition: '200% 0' },
                  '100%': { backgroundPosition: '-200% 0' }
                }
              }} />
              <CardContent>
                <Box sx={{ height: 24, backgroundColor: '#f0f0f0', borderRadius: 1, mb: 1 }} />
                <Box sx={{ height: 16, backgroundColor: '#f0f0f0', borderRadius: 1, width: '60%', mb: 2 }} />
                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                  <Box sx={{ height: 20, backgroundColor: '#f0f0f0', borderRadius: 1, width: '40%' }} />
                  <Box sx={{ width: 40, height: 40, backgroundColor: '#f0f0f0', borderRadius: '50%' }} />
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    );
  }

  if (!products.length) {
    return (
      <Box sx={{ 
        textAlign: 'center', 
        py: 8,
        border: '2px dashed #e5e7eb',
        borderRadius: 3,
        backgroundColor: '#f9fafb'
      }}>
        <CartIcon sx={{ fontSize: 64, color: '#9ca3af', mb: 2 }} />
        <Typography variant="h5" sx={{ mb: 1, color: '#374151', fontWeight: 600 }}>
          No Products Found
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Try adjusting your search or filter criteria
        </Typography>
      </Box>
    );
  }

  return (
    <Grid container spacing={3}>
      {products.map((product, index) => (
        <Grid item key={product.productID} {...getGridCols()}>
          <Fade in={true} timeout={300 + index * 100}>
            <Card
              onClick={() => navigate(`/product/${product.productID}`)}
              sx={{
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                borderRadius: { xs: 2, sm: 3 },
                border: '1px solid #e5e7eb',
                transition: 'all 0.3s ease',
                cursor: 'pointer',
                '&:hover': {
                  transform: { xs: 'none', sm: 'translateY(-4px)' },
                  boxShadow: { xs: '0 4px 12px rgba(0,0,0,0.1)', sm: '0 12px 40px rgba(0,0,0,0.15)' },
                  borderColor: '#7c3aed',
                }
              }}
              onMouseEnter={() => setHoveredProduct(product.productID)}
              onMouseLeave={() => setHoveredProduct(null)}
            >
              <Box sx={{ position: 'relative', overflow: 'hidden' }}>
                <CardMedia
                  component="img"
                  height="200"
                  image={product.productImage || '/api/placeholder/300/200'}
                  alt={`${product.productName} - ₹${product.productPrice}`}
                  loading="lazy"
                  sx={{
                    objectFit: 'cover',
                    transition: 'transform 0.3s ease',
                    transform: hoveredProduct === product.productID ? 'scale(1.05)' : 'scale(1)',
                  }}
                />
                
                {/* Favorite Button */}
                <IconButton
                  sx={{
                    position: 'absolute',
                    top: 8,
                    right: 8,
                    backgroundColor: 'rgba(255,255,255,0.9)',
                    backdropFilter: 'blur(10px)',
                    '&:hover': { backgroundColor: 'rgba(255,255,255,1)' }
                  }}
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleFavorite(product.productID);
                  }}
                >
                  {favorites.has(product.productID) ? (
                    <FavoriteFilledIcon sx={{ color: '#ef4444' }} />
                  ) : (
                    <FavoriteIcon sx={{ color: '#6b7280' }} />
                  )}
                </IconButton>

                {/* Stock Status */}
                <Chip
                  label={product.stockQuantity > 0 ? 'In Stock' : 'Out of Stock'}
                  size="small"
                  sx={{
                    position: 'absolute',
                    top: 8,
                    left: 8,
                    backgroundColor: product.stockQuantity > 0 ? '#10b981' : '#ef4444',
                    color: 'white',
                    fontWeight: 600,
                    fontSize: '0.75rem'
                  }}
                />

                {/* Quick View Button */}
                {hoveredProduct === product.productID && (
                  <Fade in={true}>
                    <IconButton
                      sx={{
                        position: 'absolute',
                        bottom: 8,
                        right: 8,
                        backgroundColor: 'rgba(124, 58, 237, 0.9)',
                        color: 'white',
                        '&:hover': { backgroundColor: '#7c3aed' }
                      }}
                    >
                      <ViewIcon />
                    </IconButton>
                  </Fade>
                )}
              </Box>

              <CardContent sx={{ flexGrow: 1, p: 2 }}>
                <Typography 
                  variant="h6" 
                  sx={{ 
                    fontWeight: 600,
                    mb: 1,
                    color: '#111827',
                    fontSize: '1rem',
                    lineHeight: 1.3,
                    display: '-webkit-box',
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: 'vertical',
                    overflow: 'hidden'
                  }}
                >
                  {product.productName}
                </Typography>

                <Typography 
                  variant="body2" 
                  color="text.secondary" 
                  sx={{ 
                    mb: 2,
                    display: '-webkit-box',
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: 'vertical',
                    overflow: 'hidden'
                  }}
                >
                  {product.productDescription || 'Fresh and high quality product'}
                </Typography>

                {/* Rating */}
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <Rating 
                    value={4.5} 
                    precision={0.5} 
                    size="small" 
                    readOnly 
                    sx={{ mr: 1 }}
                  />
                  <Typography variant="caption" color="text.secondary">
                    (4.5) 124 reviews
                  </Typography>
                </Box>

                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Typography 
                    variant="h6" 
                    sx={{ 
                      fontWeight: 700,
                      color: '#10b981',
                      fontSize: '1.25rem'
                    }}
                  >
                    ₹{product.productPrice}
                  </Typography>
                  
                  <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
                    <Button
                      variant="contained"
                      size="small"
                      startIcon={<StarIcon />}
                      onClick={(e) => {
                        e.stopPropagation();
                        navigate(`/product/${product.productID}#reviews`);
                      }}
                      sx={{
                        backgroundColor: '#fbbf24',
                        color: 'white',
                        fontSize: '0.75rem',
                        px: 1.5,
                        py: 0.5,
                        borderRadius: 2,
                        '&:hover': {
                          backgroundColor: '#f59e0b',
                          transform: 'translateY(-1px)'
                        }
                      }}
                    >
                      Review
                    </Button>
                    
                    <Tooltip title="Add to Cart">
                      <Button
                        variant="contained"
                        size="small"
                        disabled={product.stockQuantity === 0}
                        onClick={(e) => {
                          e.stopPropagation();
                          onAddToCart?.(product);
                        }}
                        aria-label={`Add ${product.productName} to cart`}
                        sx={{
                          minWidth: 'auto',
                          width: 40,
                          height: 40,
                          borderRadius: '50%',
                          background: 'linear-gradient(135deg, #7c3aed, #6d28d9)',
                          boxShadow: '0 4px 12px rgba(124, 58, 237, 0.3)',
                          '&:hover': {
                            background: 'linear-gradient(135deg, #6d28d9, #5b21b6)',
                            transform: 'scale(1.05)',
                            boxShadow: '0 6px 16px rgba(124, 58, 237, 0.4)',
                          },
                          '&:disabled': {
                            background: '#d1d5db',
                            color: '#9ca3af'
                          }
                        }}
                      >
                        <AddIcon />
                      </Button>
                    </Tooltip>
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Fade>
        </Grid>
      ))}
    </Grid>
  );
}