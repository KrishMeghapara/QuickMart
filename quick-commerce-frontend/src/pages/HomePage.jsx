import React, { useEffect, useState } from "react";
import { Box, CircularProgress, Container, Typography, Fade, Alert, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useCart } from "../features/cart/CartContext";
import ProductCarousel from "../features/products/ProductCarousel";
import ProductGrid from "../features/products/ProductGrid";
import { PageSkeleton } from "../components/common/LoadingStates";
import RetryComponent from "../components/common/RetryComponent";
import ModernHero from "../layouts/ModernHero";

import apiService from "../services/apiService";
import { withCache } from "../utils/cache";
import "./HomePage.css";

export default function HomePage({ searchQuery, searchResults, onFilterApply }) {
  const [localCategories, setLocalCategories] = useState([]);
  const [categoryProducts, setCategoryProducts] = useState({});
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [showFilters, setShowFilters] = useState(false);
  const [viewMode, setViewMode] = useState('carousel');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { addToCart } = useCart();
  const navigate = useNavigate();

  const handleFilterApply = async (filters) => {
    try {
      console.log('HomePage: Applying filters:', filters);
      const products = await apiService.filterProducts(filters);
      console.log('HomePage: Filtered products:', products);
      setFilteredProducts(products);
      setShowFilters(true);
    } catch (error) {
      console.error('Filter failed:', error);
    }
  };

  useEffect(() => {
    if (onFilterApply) {
      onFilterApply.current = handleFilterApply;
    }
  }, [onFilterApply]);

  useEffect(() => {
    const loadData = async () => {
      try {
        setError(null);
        console.log('Loading categories...');
        const loadedCategories = await withCache(apiService.getCategories.bind(apiService), 'categories')();
        console.log('Categories loaded:', loadedCategories);
        setLocalCategories(loadedCategories);
        
        const prods = {};
        await Promise.all(
          loadedCategories.map(async cat => {
            try {
              console.log(`Loading products for category ${cat.categoryID}...`);
              const products = await withCache(apiService.getProductsByCategory.bind(apiService), 'products', 2 * 60 * 1000)(cat.categoryID);
              console.log(`Products for category ${cat.categoryID}:`, products);
              prods[cat.categoryID] = products;
            } catch (error) {
              console.error(`Failed to load products for category ${cat.categoryID}:`, error);
              prods[cat.categoryID] = [];
            }
          })
        );
        setCategoryProducts(prods);
      } catch (error) {
        console.error('Failed to load categories:', error);
        setError(error.message || 'Failed to load data');
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  if (loading) {
    return (
      <Box className="main-bg" sx={{ minHeight: '100vh', width: '100vw' }}>
        <PageSkeleton />
      </Box>
    );
  }

  if (error) {
    return (
      <Box className="main-bg" sx={{ minHeight: '100vh', width: '100vw', p: 3 }}>
        <RetryComponent
          error={{ message: error }}
          onRetry={() => window.location.reload()}
          title="Failed to load products"
          description="We couldn't load the product catalog. Please try again."
        />
      </Box>
    );
  }

  return (
    <Box sx={{ minHeight: '100vh', width: '100%', bgcolor: '#f8fafc' }}>
      <ModernHero />
      <Container maxWidth="xl" sx={{ py: 6 }} id="products-section">
            {showFilters ? (
          <Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
              <Typography variant="h4" sx={{ fontWeight: 700 }}>
                Filtered Products ({filteredProducts.length})
              </Typography>
              <Button
                variant="outlined"
                onClick={() => setViewMode(viewMode === 'carousel' ? 'grid' : 'carousel')}
                sx={{ borderColor: 'var(--brand)', color: 'var(--brand)' }}
              >
                {viewMode === 'carousel' ? 'Grid View' : 'Carousel View'}
              </Button>
            </Box>
            {viewMode === 'grid' ? (
              <ProductGrid
                products={filteredProducts}
                onAddToCart={addToCart}
                viewMode="grid"
              />
            ) : (
              <ProductCarousel
                products={filteredProducts}
                categoryName="Filtered Results"
                onAddToCart={addToCart}
                showSeeAll={false}
              />
            )}
          </Box>
        ) : searchQuery ? (
              <Box>
                <Typography variant="h4" sx={{ mb: 3, fontWeight: 700 }}>
                  Search Results for "{searchQuery}"
                </Typography>
                {searchResults?.length > 0 ? (
                  <Box>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                      <Typography variant="h6" sx={{ color: 'var(--muted)' }}>
                        Found {searchResults.length} products
                      </Typography>
                      <Button
                        variant="outlined"
                        onClick={() => setViewMode(viewMode === 'carousel' ? 'grid' : 'carousel')}
                        sx={{ borderColor: 'var(--brand)', color: 'var(--brand)' }}
                      >
                        {viewMode === 'carousel' ? 'Grid View' : 'Carousel View'}
                      </Button>
                    </Box>
                    {viewMode === 'grid' ? (
                      <ProductGrid
                        products={searchResults}
                        onAddToCart={addToCart}
                        viewMode="grid"
                      />
                    ) : (
                      <ProductCarousel
                        products={searchResults}
                        categoryName={`Search Results`}
                        onAddToCart={addToCart}
                        showSeeAll={false}
                      />
                    )}
                  </Box>
                ) : (
                  <Box sx={{ textAlign: 'center', py: 8 }}>
                    <Typography variant="h5" color="text.secondary">
                      No products found
                    </Typography>
                    <Typography variant="body1" color="text.secondary" sx={{ mt: 2 }}>
                      Try searching with different keywords
                    </Typography>
                  </Box>
                )}
              </Box>
            ) : (
              localCategories.length === 0 ? (
                <Box sx={{ textAlign: 'center', py: 8 }}>
                  <Typography variant="h5" color="text.secondary">
                    No categories found
                  </Typography>
                  <Typography variant="body1" color="text.secondary" sx={{ mt: 2 }}>
                    Please check your database connection and ensure categories are available.
                  </Typography>
                </Box>
              ) : (
                localCategories.map((cat, index) => (
                  <Fade in={true} timeout={600 + index * 200} key={cat.categoryID}>
                    <Box sx={{ mb: 6 }}>
                      <ProductCarousel
                        products={categoryProducts[cat.categoryID] || []}
                        categoryName={cat.categoryName}
                        onAddToCart={addToCart}
                        onSeeAll={() => navigate(`/category/${cat.categoryID}`)}
                      />
                    </Box>
                  </Fade>
                ))
              )
            )}

      </Container>
    </Box>
  );
} 