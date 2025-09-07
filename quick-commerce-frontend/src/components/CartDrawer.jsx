import React, { useState } from "react";
import { 
  Drawer, 
  Box, 
  Typography, 
  IconButton, 
  List, 
  ListItem, 
  ListItemText, 
  ListItemSecondaryAction, 
  Button, 
  Divider, 
  Input,
  Avatar,
  Chip
} from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import DeleteIcon from '@mui/icons-material/Delete';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import PaymentIcon from '@mui/icons-material/Payment';
import { useCart } from "./CartContext";
import { useNavigate } from 'react-router-dom';
import { CartSkeleton } from "./LoadingStates";
import { useToast } from "./ToastProvider";
import "./CartDrawer.css";

export default function CartDrawer({ open, onClose }) {
  const { cart, removeFromCart, updateQuantity, clearCart, loading, error } = useCart();
  const navigate = useNavigate();
  const toast = useToast();
  const total = cart.reduce((sum, item) => sum + (item.product?.productPrice || 0) * item.quantity, 0);

  return (
    <Drawer anchor="right" open={open} onClose={onClose}>
      <Box sx={{ 
        width: { xs: '100vw', sm: 420, md: 480 }, 
        maxWidth: '100vw',
        p: { xs: 2, sm: 3 }, 
        display: 'flex', 
        flexDirection: 'column', 
        height: '100%',
        background: 'var(--glass)',
        backdropFilter: 'blur(20px)',
        borderLeft: '1px solid var(--border)'
      }}>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
          <ShoppingBagIcon sx={{ mr: 1, color: '#667eea' }} />
          <Typography 
            variant="h5" 
            sx={{ 
              flexGrow: 1, 
              fontWeight: 700,
              color: 'var(--text)'
            }}
          >
            Shopping Cart
          </Typography>
          <Chip 
            label={`${cart.length} items`} 
            size="small" 
            sx={{ 
              background: 'linear-gradient(135deg, #e0e7ff, #c7d2fe)', 
              color: '#4c1d95',
              fontWeight: 600,
              mr: 1,
              borderRadius: '12px',
              boxShadow: 'none'
            }} 
          />
          <IconButton onClick={onClose}><CloseIcon /></IconButton>
        </Box>
        <Divider sx={{ mb: 2 }} />
        <List sx={{ flexGrow: 1, overflow: 'auto' }}>
          {loading ? (
            <CartSkeleton />
          ) : error ? (
            <Box sx={{ 
              textAlign: 'center', 
              py: 6,
              color: '#ef4444'
            }}>
              <Typography variant="h6" sx={{ mb: 1 }}>Error loading cart</Typography>
              <Typography variant="body2">{error}</Typography>
            </Box>
          ) : cart.length === 0 ? (
            <Box sx={{ 
              textAlign: 'center', 
              py: 6,
              color: '#6b7280'
            }}>
              <ShoppingBagIcon sx={{ fontSize: 64, mb: 2, opacity: 0.3 }} />
              <Typography variant="h6" sx={{ mb: 1 }}>Your cart is empty</Typography>
              <Typography variant="body2">Add some products to get started!</Typography>
            </Box>
          ) : cart.map(item => (
            <ListItem 
              key={item.cartID} 
              alignItems="flex-start"
              sx={{ 
                mb: 2,
                background: 'var(--surface)',
                borderRadius: 2,
                boxShadow: 'var(--soft-shadow)',
                border: '1px solid var(--border)',
                backdropFilter: 'blur(10px)'
              }}
            >
              <Avatar 
                sx={{ 
                  mr: 2, 
                  background: 'linear-gradient(135deg, #e0e7ff, #8b5cf6)',
                  color: 'white',
                  width: 48,
                  height: 48,
                  fontWeight: 600,
                  boxShadow: '0 2px 8px rgba(139, 92, 246, 0.2)'
                }}
              >
                {item.product?.productName?.charAt(0) || 'P'}
              </Avatar>
              <ListItemText
                primary={<>
                  <Typography variant="subtitle1" sx={{ fontWeight: 700, color: 'var(--text)' }}>
                    {item.product?.productName || 'Product'}
                  </Typography>
                  <Chip 
                    label={`x${item.quantity}`} 
                    size="small" 
                    sx={{ 
                      bgcolor: 'var(--accent)', 
                      color: 'white',
                      fontWeight: 600,
                      fontSize: '0.75rem',
                      ml: 1
                    }} 
                  />
                </>}
                secondary={
                  <>
                    <Typography variant="body2" sx={{ color: 'var(--success)', fontWeight: 600 }}>
                      ₹{item.product?.productPrice || 0} each
                    </Typography>
                    <Typography variant="body2" sx={{ color: 'var(--muted)' }}>
                      {item.product?.category?.categoryName || 'Category'}
                    </Typography>
                  </>
                }
              />
              <ListItemSecondaryAction>
                <Box sx={{ display: 'flex', alignItems: 'center', mr: 1 }}>
                  <IconButton 
                    size="small"
                    onClick={() => {
                      updateQuantity(item.cartID, Math.max(1, item.quantity - 1));
                      toast.info('Quantity updated');
                    }}
                    sx={{ 
                      backgroundColor: '#f3f4f6',
                      color: '#374151',
                      width: 28,
                      height: 28,
                      transition: 'all 0.2s ease',
                      '&:hover': { 
                        backgroundColor: '#e5e7eb',
                        transform: 'scale(1.1)',
                        boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
                      }
                    }}
                  >
                    <Typography sx={{ fontSize: '14px', fontWeight: 700 }}>-</Typography>
                  </IconButton>
                  <Typography sx={{ 
                    mx: 1.5, 
                    minWidth: 20, 
                    textAlign: 'center',
                    fontWeight: 600,
                    color: 'var(--text)'
                  }}>
                    {item.quantity}
                  </Typography>
                  <IconButton 
                    size="small"
                    onClick={() => {
                      updateQuantity(item.cartID, item.quantity + 1);
                      toast.info('Quantity updated');
                    }}
                    sx={{ 
                      backgroundColor: '#f3f4f6',
                      color: '#374151',
                      width: 28,
                      height: 28,
                      transition: 'all 0.2s ease',
                      '&:hover': { 
                        backgroundColor: '#e5e7eb',
                        transform: 'scale(1.1)',
                        boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
                      }
                    }}
                  >
                    <Typography sx={{ fontSize: '14px', fontWeight: 700 }}>+</Typography>
                  </IconButton>
                </Box>
                <IconButton 
                  edge="end" 
                  onClick={() => {
                    removeFromCart(item.cartID);
                    toast.success('Item removed from cart');
                  }}
                  sx={{ 
                    color: '#ef4444',
                    transition: 'all 0.2s ease',
                    '&:hover': { 
                      bgcolor: 'rgba(239, 68, 68, 0.1)',
                      transform: 'scale(1.1)',
                      boxShadow: '0 2px 8px rgba(239, 68, 68, 0.2)'
                    }
                  }}
                >
                  <DeleteIcon />
                </IconButton>
              </ListItemSecondaryAction>
            </ListItem>
          ))}
        </List>
        <Divider sx={{ my: 2 }} />
        <Box sx={{ mb: 2 }}>
          <Typography 
            variant="h6" 
            sx={{ 
              fontWeight: 700,
              color: 'var(--success)'
            }}
          >
            Total: ₹{total}
          </Typography>
        </Box>
        <Button 
          variant="contained" 
          fullWidth 
          disabled={cart.length === 0} 
          startIcon={<PaymentIcon />}
          onClick={() => {
            onClose();
            navigate('/payment');
          }}
          sx={{ 
            mb: 2,
            py: 1.5,
            background: 'linear-gradient(135deg, #8b5cf6, #7c3aed)',
            color: 'white',
            fontWeight: 600,
            fontSize: '1.1rem',
            borderRadius: 3,
            boxShadow: '0 4px 12px rgba(139, 92, 246, 0.3)',
            textShadow: '0 1px 2px rgba(0,0,0,0.1)',
            '&:hover': {
              background: 'linear-gradient(135deg, #7c3aed, #6d28d9)',
              boxShadow: '0 6px 16px rgba(139, 92, 246, 0.4)',
            }
          }}
        >
          Proceed to Payment
        </Button>
        <Button 
          variant="outlined" 
          fullWidth 
          onClick={() => {
            clearCart();
            toast.success('Cart cleared');
          }} 
          disabled={cart.length === 0}
          sx={{
            borderColor: '#d1d5db',
            color: '#6b7280',
            fontWeight: 600,
            borderRadius: 3,
            '&:hover': {
              borderColor: '#ef4444',
              backgroundColor: 'rgba(239, 68, 68, 0.05)',
              color: '#ef4444'
            }
          }}
        >
          Clear Cart
        </Button>
      </Box>
    </Drawer>
  );
} 