import React, { useState, useEffect, useRef } from 'react';
import {
  Box,
  TextField,
  Paper,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Typography,
  Chip,
  IconButton,
  Divider
} from '@mui/material';
import {
  Search as SearchIcon,
  History as HistoryIcon,
  TrendingUp as TrendingIcon,
  Clear as ClearIcon,
  Category as CategoryIcon
} from '@mui/icons-material';

export default function EnhancedSearch({ onSearch, categories = [] }) {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [recentSearches, setRecentSearches] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [loading, setLoading] = useState(false);
  const searchRef = useRef(null);

  const popularSearches = ['Fruits', 'Vegetables', 'Dairy', 'Snacks', 'Beverages'];

  useEffect(() => {
    const saved = localStorage.getItem('recentSearches');
    if (saved) {
      setRecentSearches(JSON.parse(saved));
    }
  }, []);

  useEffect(() => {
    if (query.length > 1) {
      const filtered = categories
        .filter(cat => cat.categoryName.toLowerCase().includes(query.toLowerCase()))
        .slice(0, 5);
      setSuggestions(filtered);
      setShowSuggestions(true);
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }
  }, [query, categories]);

  const handleSearch = (searchQuery) => {
    if (!searchQuery.trim()) return;
    
    // Add to recent searches
    const updated = [searchQuery, ...recentSearches.filter(s => s !== searchQuery)].slice(0, 5);
    setRecentSearches(updated);
    localStorage.setItem('recentSearches', JSON.stringify(updated));
    
    setShowSuggestions(false);
    onSearch(searchQuery);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch(query);
    }
  };

  const clearSearch = () => {
    setQuery('');
    setShowSuggestions(false);
    onSearch('');
  };

  return (
    <Box sx={{ position: 'relative', width: '100%', maxWidth: 500 }}>
      <TextField
        ref={searchRef}
        fullWidth
        placeholder="Search for groceries, fruits, vegetables..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyPress={handleKeyPress}
        onFocus={() => setShowSuggestions(true)}
        sx={{
          '& .MuiOutlinedInput-root': {
            borderRadius: '25px',
            backgroundColor: 'white',
            border: '2px solid #7c3aed',
            '&:hover': {
              borderColor: '#6d28d9',
            },
            '&.Mui-focused': {
              borderColor: '#7c3aed',
              boxShadow: '0 0 0 3px rgba(124, 58, 237, 0.1)',
            }
          },
          '& .MuiInputBase-input': {
            paddingLeft: '48px',
            color: '#111827',
            fontSize: '16px',
          }
        }}
        InputProps={{
          startAdornment: (
            <SearchIcon sx={{ 
              position: 'absolute', 
              left: 16, 
              color: '#7c3aed',
              zIndex: 1 
            }} />
          ),
          endAdornment: query && (
            <IconButton onClick={clearSearch} size="small">
              <ClearIcon sx={{ color: '#6B7280' }} />
            </IconButton>
          )
        }}
      />

      {showSuggestions && (
        <Paper sx={{
          position: 'absolute',
          top: '100%',
          left: 0,
          right: 0,
          zIndex: 1000,
          mt: 1,
          borderRadius: 2,
          boxShadow: '0 8px 32px rgba(0,0,0,0.12)',
          border: '1px solid #e5e7eb',
          maxHeight: 400,
          overflow: 'auto'
        }}>
          {query.length > 1 && suggestions.length > 0 && (
            <>
              <Typography variant="subtitle2" sx={{ p: 2, pb: 1, color: '#6B7280', fontWeight: 600 }}>
                Categories
              </Typography>
              {suggestions.map((category) => (
                <ListItem
                  key={category.categoryID}
                  button
                  onClick={() => handleSearch(category.categoryName)}
                  sx={{ py: 1, '&:hover': { backgroundColor: '#f3f4f6' } }}
                >
                  <ListItemIcon>
                    <CategoryIcon sx={{ color: '#7c3aed' }} />
                  </ListItemIcon>
                  <ListItemText 
                    primary={category.categoryName}
                    sx={{ '& .MuiTypography-root': { color: '#111827' } }}
                  />
                </ListItem>
              ))}
              <Divider />
            </>
          )}

          {recentSearches.length > 0 && (
            <>
              <Typography variant="subtitle2" sx={{ p: 2, pb: 1, color: '#6B7280', fontWeight: 600 }}>
                Recent Searches
              </Typography>
              {recentSearches.map((search, index) => (
                <ListItem
                  key={index}
                  button
                  onClick={() => handleSearch(search)}
                  sx={{ py: 1, '&:hover': { backgroundColor: '#f3f4f6' } }}
                >
                  <ListItemIcon>
                    <HistoryIcon sx={{ color: '#6B7280' }} />
                  </ListItemIcon>
                  <ListItemText 
                    primary={search}
                    sx={{ '& .MuiTypography-root': { color: '#111827' } }}
                  />
                </ListItem>
              ))}
              <Divider />
            </>
          )}

          <Typography variant="subtitle2" sx={{ p: 2, pb: 1, color: '#6B7280', fontWeight: 600 }}>
            Popular Searches
          </Typography>
          <Box sx={{ p: 2, pt: 0 }}>
            {popularSearches.map((search) => (
              <Chip
                key={search}
                label={search}
                onClick={() => handleSearch(search)}
                sx={{
                  mr: 1,
                  mb: 1,
                  backgroundColor: '#f3f4f6',
                  color: '#111827',
                  '&:hover': {
                    backgroundColor: '#e5e7eb',
                  }
                }}
                icon={<TrendingIcon sx={{ color: '#7c3aed' }} />}
              />
            ))}
          </Box>
        </Paper>
      )}
    </Box>
  );
}