import React, { useState, useEffect } from 'react';
import {
  Box,
  Container,
  Paper,
  Typography,
  TextField,
  Button,
  Grid,
  Card,
  CardContent,
  Alert,
  CircularProgress,
  Divider,
  Avatar,
  Chip,
  Tabs,
  Tab,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  IconButton,
  Badge,
  Fade,
  LinearProgress,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions
} from '@mui/material';
import {
  Person as PersonIcon,
  LocationOn as LocationIcon,
  Edit as EditIcon,
  Save as SaveIcon,
  Add as AddIcon,
  Delete as DeleteIcon,
  ShoppingBag as OrderIcon,
  ShoppingBag as ShoppingBagIcon,
  Settings as SettingsIcon,
  Security as SecurityIcon,
  Notifications as NotificationsIcon,
  LocalShipping as ShippingIcon,
  Payment as PaymentIcon,
  Star as StarIcon,
  CalendarToday as DateIcon,
  AttachMoney as PriceIcon,
  CheckCircle as CheckIcon,
  Cancel as CancelIcon,
  Visibility as VisibilityIcon,
  VisibilityOff as VisibilityOffIcon
} from '@mui/icons-material';
import { useAuth } from '../features/auth/AuthContext';
import { useCart } from '../features/cart/CartContext';
import './UserProfile.css';
import AddAddressForm from '../features/user/AddAddressForm';
import ProfilePictureUpload from '../features/user/ProfilePictureUpload';
import apiService from '../services/apiService';

const API_BASE_URL = 'http://localhost:5236/api';

export default function UserProfile() {
  const { user, token, updateUser } = useAuth();
  const { cart } = useCart();
  const [address, setAddress] = useState(null);
  const [orders, setOrders] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [activeTab, setActiveTab] = useState(0);
  const [showAddressDialog, setShowAddressDialog] = useState(false);
  const [showPasswordDialog, setShowPasswordDialog] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const [formData, setFormData] = useState({
    house: '',
    street: '',
    landmark: '',
    city: '',
    state: '',
    pincode: '',
    phone: ''
  });

  // Fetch user's data on component mount
  useEffect(() => {
    fetchUserData();
  }, []);

  const fetchUserData = async () => {
    try {
      setIsLoading(true);
      setError('');
      
      // Fetch address, orders, and profile in parallel
      const [addressResponse, ordersResponse, profileResponse] = await Promise.allSettled([
        fetchUserAddress(),
        fetchUserOrders(),
        fetchUserProfile()
      ]);

      // Handle address response
      if (addressResponse.status === 'fulfilled') {
        // Address is already set in fetchUserAddress
      } else {
        console.error('Failed to fetch address:', addressResponse.reason);
      }

      // Handle orders response
      if (ordersResponse.status === 'fulfilled') {
        // Orders are already set in fetchUserOrders
      } else {
        console.error('Failed to fetch orders:', ordersResponse.reason);
      }

      // Handle profile response
      if (profileResponse.status === 'fulfilled') {
        // Profile is already updated in fetchUserProfile
      } else {
        console.error('Failed to fetch profile:', profileResponse.reason);
      }

    } catch (error) {
      setError('Failed to load user data');
      console.error('Error fetching user data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchUserAddress = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/Address/GetForCurrentUser`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      if (response.ok) {
        const addressData = await response.json();
        console.log('Fetched address data:', addressData); // Debug log
        setAddress(addressData);
        setFormData({
          house: addressData.house || '',
          street: addressData.street || '',
          landmark: addressData.landmark || '',
          city: addressData.city || '',
          state: addressData.state || '',
          pincode: addressData.pincode || '',
          phone: addressData.phone || ''
        });
      } else if (response.status === 404) {
        setAddress(null);
      } else {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || 'Failed to fetch address');
      }
    } catch (error) {
      console.error('Error fetching address:', error);
      throw error;
    }
  };

  const fetchUserOrders = async () => {
    try {
      if (!user?.UserID) return;

      const response = await fetch(`${API_BASE_URL}/Order/User/${user.UserID}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      if (response.ok) {
        const ordersData = await response.json();
        setOrders(ordersData);
      } else if (response.status === 404) {
        setOrders([]);
      } else {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || 'Failed to fetch orders');
      }
    } catch (error) {
      console.error('Error fetching orders:', error);
      setOrders([]);
      throw error;
    }
  };

  const fetchUserProfile = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/User/Profile`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      if (response.ok) {
        const profileData = await response.json();
        // Update the user context with fresh profile data
        updateUser(profileData);
      }
    } catch (error) {
      console.error('Error fetching user profile:', error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSaveAddress = async () => {
    try {
      setIsSaving(true);
      setError('');
      
      const response = await fetch(`${API_BASE_URL}/Address/UpdateForCurrentUser`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        setSuccess('Address updated successfully!');
        setIsEditing(false);
        await fetchUserAddress(); // Refresh data
        setTimeout(() => setSuccess(''), 3000);
      } else {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || 'Failed to update address');
      }
    } catch (error) {
      setError(error.message || 'Failed to update address');
    } finally {
      setIsSaving(false);
    }
  };

  const handlePasswordChange = async () => {
    if (newPassword !== confirmPassword) {
      setError('New passwords do not match');
      return;
    }
    
    if (newPassword.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }

    try {
      setIsSaving(true);
      setError('');
      
      // Call API to change password
      const response = await fetch(`${API_BASE_URL}/User/ChangePassword`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          currentPassword,
          newPassword
        })
      });

      if (response.ok) {
        setSuccess('Password changed successfully!');
        setShowPasswordDialog(false);
        setCurrentPassword('');
        setNewPassword('');
        setConfirmPassword('');
        setTimeout(() => setSuccess(''), 3000);
      } else {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || 'Failed to change password');
      }
    } catch (error) {
      setError(error.message || 'Failed to change password');
    } finally {
      setIsSaving(false);
    }
  };

  const handleDeleteAddress = () => {
    setShowDeleteDialog(true);
  };

  const confirmDeleteAddress = async () => {
    try {
      setIsSaving(true);
      setError('');
      
      console.log('Address object:', address); // Debug log
      
      const addressId = address?.AddressID || address?.addressID || address?.id;
      if (!addressId) {
        // Fallback: try to get address ID from current user
        const response = await fetch(`${API_BASE_URL}/Address/GetForCurrentUser`, {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });
        
        if (response.ok) {
          const addressData = await response.json();
          const fallbackId = addressData?.AddressID || addressData?.addressID || addressData?.id;
          if (fallbackId) {
            await apiService.deleteAddress(fallbackId);
          } else {
            throw new Error('Could not find address ID');
          }
        } else {
          throw new Error('Address not found');
        }
      } else {
        await apiService.deleteAddress(addressId);
      }
      
      setSuccess('Address deleted successfully!');
      setAddress(null);
      setFormData({
        house: '',
        street: '',
        landmark: '',
        city: '',
        state: '',
        pincode: '',
        phone: ''
      });
      setShowDeleteDialog(false);
      setTimeout(() => setSuccess(''), 3000);
    } catch (error) {
      console.error('Delete address error:', error);
      setError(error.message || 'Failed to delete address.');
    } finally {
      setIsSaving(false);
    }
  };

  const handleProfileUpdate = (updatedUser) => {
    updateUser(updatedUser);
    // Refresh the user data to get the latest profile picture
    setTimeout(() => {
      fetchUserData();
    }, 500);
  };

  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case 'delivered': return 'success';
      case 'shipped': return 'info';
      case 'processing': return 'warning';
      case 'cancelled': return 'error';
      default: return 'default';
    }
  };

  const getStatusIcon = (status) => {
    switch (status?.toLowerCase()) {
      case 'delivered': return <CheckIcon />;
      case 'shipped': return <ShippingIcon />;
      case 'processing': return <CircularProgress size={16} />;
      case 'cancelled': return <CancelIcon />;
      default: return <OrderIcon />;
    }
  };

  const formatOrderDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  if (isLoading) {
    return (
      <Box sx={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        minHeight: '60vh' 
      }}>
        <CircularProgress size={60} sx={{ color: '#667eea' }} />
      </Box>
    );
  }

  return (
    <Box sx={{
      minHeight: '100vh',
      background: 'var(--main-bg)',
      position: 'relative',
      px: { xs: 2, md: 8 },
      py: { xs: 3, md: 6 },
      '&::before': {
        content: '""',
        position: 'absolute',
        top: 0,
        right: 0,
        width: '50%',
        height: '50%',
        background: 'radial-gradient(circle at top right, rgba(102, 126, 234, 0.1) 0%, transparent 50%)',
        pointerEvents: 'none'
      }
    }}>
      {/* Header */}
      <Box sx={{ mb: { xs: 3, md: 4 } }}>
        <Typography sx={{ 
          fontSize: { xs: '2.25rem', md: '3.5rem' },
          fontWeight: 800, 
          mb: 1,
          background: 'linear-gradient(45deg, #667eea 0%, #764ba2 100%)',
          backgroundClip: 'text',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          letterSpacing: '-0.5px',
          lineHeight: 1
        }}>
          My Profile
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ fontSize: '0.95rem', mb: 0 }}>
          Manage your account settings and preferences
        </Typography>
      </Box>

      {/* Alerts */}
      {error && (
        <Alert severity="error" sx={{ mb: 3, borderRadius: 3 }}>
          {error}
        </Alert>
      )}
      {success && (
        <Alert severity="success" sx={{ mb: 3, borderRadius: 3 }}>
          {success}
        </Alert>
      )}

      <Grid container spacing={{ xs: 3, md: 4.5 }} sx={{
        '@media (max-width: 980px)': {
          flexDirection: 'column',
          '& .MuiGrid-item': {
            maxWidth: '100%'
          }
        }
      }}>
        {/* Left Column - Profile Info */}
        <Grid item xs={12} md={5} lg={4} sx={{ minWidth: '320px' }}>
          <Fade in={true} timeout={600}>
            <Card sx={{ 
              borderRadius: '24px', 
              boxShadow: 'var(--soft-shadow)',
              border: '1px solid var(--border)',
              background: 'var(--glass)',
              backdropFilter: 'blur(20px)',
              position: { md: 'sticky' },
              top: { md: 5 }
            }}>
              <CardContent sx={{ p: 4, textAlign: 'center', position: 'relative', minHeight: '500px' }}>
                {/* Profile Picture */}
                <Box sx={{ position: 'relative', display: 'inline-block', mb: 3, mt: 2 }}>
                  <Box sx={{
                    background: 'var(--brand-gradient)',
                    borderRadius: '50%',
                    padding: '8px',
                    display: 'inline-block',
                    boxShadow: 'var(--glow-purple)',
                    transition: 'transform 0.18s ease, box-shadow 0.18s ease',
                    '&:hover': {
                      transform: 'translateY(-4px) scale(1.02)',
                      boxShadow: 'var(--glow-purple-intense)'
                    }
                  }}>
                    {(user?.profilePicture || user?.googlePicture) ? (
                      <img 
                        src={user?.profilePicture ? 
                          (user.profilePicture.startsWith('http') ? user.profilePicture : `http://localhost:5236${user.profilePicture}`) 
                          : user?.googlePicture}
                        alt={user?.UserName || 'User Avatar'}
                        style={{
                          width: 100,
                          height: 100,
                          borderRadius: '50%',
                          objectFit: 'cover',
                          objectPosition: 'center',
                          border: '6px solid white',
                          boxShadow: '0 8px 32px rgba(0,0,0,0.1)'
                        }}
                      />
                    ) : (
                      <Avatar 
                        sx={{ 
                          width: 100, 
                          height: 100, 
                          border: '6px solid white',
                          background: 'var(--surface)',
                          boxShadow: '0 8px 32px rgba(0,0,0,0.1)'
                        }}
                      >
                        <PersonIcon sx={{ fontSize: 70 }} />
                      </Avatar>
                    )}
                  </Box>
                </Box>

                {/* User Info */}
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 1, mb: 1 }}>
                  <Typography variant="h5" sx={{ fontWeight: 800, color: 'var(--text)' }}>
                    {user?.UserName || user?.userName || user?.googleName || 'User Name'}
                  </Typography>
                  {user?.isGoogleUser && (
                    <Chip 
                      icon={<StarIcon sx={{ fontSize: 14 }} />}
                      label="Verified" 
                      size="small" 
                      sx={{ 
                        background: 'var(--success)',
                        color: 'white',
                        fontWeight: 600,
                        fontSize: '0.7rem',
                        height: '20px'
                      }} 
                    />
                  )}
                </Box>
                <Typography variant="body2" sx={{ mb: 2, fontSize: '0.95rem', color: 'var(--muted)', fontWeight: 400 }}>
                  {user?.Email || user?.email || user?.googleEmail || 'user@example.com'}
                </Typography>

                {/* Google User Badge */}
                {user?.isGoogleUser && (
                  <Button
                    fullWidth
                    startIcon={<CheckIcon />}
                    sx={{ 
                      mb: 2,
                      background: 'linear-gradient(135deg, #f0fdf4, #dcfce7)',
                      color: '#166534',
                      fontWeight: 600,
                      borderRadius: '12px',
                      px: 3,
                      py: 1.5,
                      border: '1px solid rgba(34, 197, 94, 0.2)',
                      textTransform: 'none',
                      transition: 'all 0.3s ease',
                      '&:hover': {
                        background: 'linear-gradient(135deg, #dcfce7, #bbf7d0)',
                        transform: 'translateY(-2px)',
                        boxShadow: '0 8px 25px rgba(34, 197, 94, 0.15)'
                      }
                    }}
                  >
                    Google Account
                  </Button>
                )}

                {/* Quick Stats */}
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 3, gap: 3 }}>
                  <Box sx={{ textAlign: 'center' }}>
                    <Box sx={{ mb: 1 }}>
                      <OrderIcon sx={{ fontSize: 24, color: 'var(--brand)', mb: 0.5 }} />
                    </Box>
                    <Typography variant="h6" sx={{ 
                      fontWeight: 700, 
                      color: orders.length > 0 ? 'var(--brand)' : 'var(--muted)', 
                      fontSize: '1.2rem' 
                    }}>
                      {orders.length}
                    </Typography>
                    <Typography variant="caption" sx={{ color: 'var(--muted)', fontSize: '0.75rem' }}>
                      Orders
                    </Typography>
                  </Box>
                  <Box sx={{ textAlign: 'center' }}>
                    <Box sx={{ mb: 1 }}>
                      <ShoppingBagIcon sx={{ fontSize: 24, color: cart.length > 0 ? 'var(--accent)' : 'var(--muted)', mb: 0.5 }} />
                    </Box>
                    <Typography variant="h6" sx={{ 
                      fontWeight: 700, 
                      color: cart.length > 0 ? 'var(--accent)' : 'var(--muted)', 
                      fontSize: '1.2rem' 
                    }}>
                      {cart.length}
                    </Typography>
                    <Typography variant="caption" sx={{ color: 'var(--muted)', fontSize: '0.75rem' }}>
                      Cart Items
                    </Typography>
                  </Box>
                  <Box sx={{ textAlign: 'center' }}>
                    <Box sx={{ mb: 1 }}>
                      <LocationIcon sx={{ fontSize: 24, color: address ? 'var(--success)' : 'var(--muted)', mb: 0.5 }} />
                    </Box>
                    <Typography variant="h6" sx={{ 
                      fontWeight: 700, 
                      color: address ? 'var(--success)' : 'var(--muted)', 
                      fontSize: '1.2rem' 
                    }}>
                      {address ? '1' : '0'}
                    </Typography>
                    <Typography variant="caption" sx={{ color: 'var(--muted)', fontSize: '0.75rem' }}>
                      Address
                    </Typography>
                  </Box>
                </Box>

                {/* Sidebar Actions */}
                <Box sx={{ mt: 4, display: 'flex', flexDirection: 'column', gap: 2 }}>
                  {!user?.isGoogleUser && (
                    <Button
                      fullWidth
                      startIcon={<SecurityIcon />}
                      onClick={() => setShowPasswordDialog(true)}
                      sx={{
                        background: 'var(--surface)',
                        border: '1px solid var(--border)',
                        borderRadius: '12px',
                        p: 2,
                        justifyContent: 'flex-start',
                        color: 'var(--text)',
                        textTransform: 'none',
                        fontWeight: 600,
                        transition: 'all 0.3s ease',
                        '&:hover': {
                          background: 'var(--accent)',
                          color: 'white',
                          transform: 'translateY(-2px)',
                          boxShadow: 'var(--glow-cyan)'
                        }
                      }}
                    >
                      Change Password
                    </Button>
                  )}
                  <Button
                    fullWidth
                    startIcon={<NotificationsIcon />}
                    sx={{
                      background: 'var(--surface)',
                      border: '1px solid var(--border)',
                      borderRadius: '12px',
                      p: 2,
                      justifyContent: 'flex-start',
                      color: 'var(--text)',
                      textTransform: 'none',
                      fontWeight: 600,
                      transition: 'all 0.3s ease',
                      '&:hover': {
                        background: 'var(--accent)',
                        color: 'white',
                        transform: 'translateY(-2px)',
                        boxShadow: 'var(--glow-cyan)'
                      }
                    }}
                  >
                    Notifications
                  </Button>
                  <Button
                    fullWidth
                    startIcon={<SettingsIcon />}
                    sx={{
                      background: 'var(--surface)',
                      border: '1px solid var(--border)',
                      borderRadius: '12px',
                      p: 2,
                      justifyContent: 'flex-start',
                      color: 'var(--text)',
                      textTransform: 'none',
                      fontWeight: 600,
                      transition: 'all 0.3s ease',
                      '&:hover': {
                        background: 'var(--accent)',
                        color: 'white',
                        transform: 'translateY(-2px)',
                        boxShadow: 'var(--glow-cyan)'
                      }
                    }}
                  >
                    Account Settings
                  </Button>
                </Box>
              </CardContent>
            </Card>
          </Fade>
        </Grid>

        {/* Right Column - Content */}
        <Grid item xs={12} md={7} lg={8} sx={{ minWidth: { md: '760px' } }}>
          <Fade in={true} timeout={1000}>
            <Card sx={{ 
              borderRadius: '20px', 
              boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
              border: '1px solid rgba(255, 255, 255, 0.3)',
              background: 'linear-gradient(180deg, rgba(255, 255, 255, 0.98), rgba(255, 255, 255, 0.995))',
              backdropFilter: 'blur(10px)',
              overflow: 'visible'
            }}>
              <CardContent sx={{ p: { xs: 2, md: '22px' } }}>
                {/* Tabs */}
                <Box sx={{ mb: 3 }}>
                  <Box sx={{ display: 'flex', gap: 1.5, mb: 3 }}>
                    {[
                      { id: 0, label: 'Personal Info', icon: <PersonIcon /> },
                      { id: 1, label: 'Address', icon: <LocationIcon /> },
                      { id: 2, label: 'Orders', icon: <OrderIcon /> }
                    ].map((tab) => (
                      <Button
                        key={tab.id}
                        startIcon={tab.icon}
                        onClick={() => setActiveTab(tab.id)}
                        aria-current={activeTab === tab.id ? 'true' : undefined}
                        sx={{
                          px: 2.25,
                          py: 1.25,
                          borderRadius: '999px',
                          textTransform: 'none',
                          fontWeight: 700,
                          transition: 'transform 0.18s cubic-bezier(0.2, 0.9, 0.2, 1), box-shadow 0.18s ease',
                          '&:focus-visible': {
                            outline: 'none',
                            boxShadow: '0 0 0 6px rgba(124, 58, 237, 0.06)'
                          },
                          ...(activeTab === tab.id ? {
                            background: 'linear-gradient(135deg, #667eea, #764ba2)',
                            color: '#fff',
                            boxShadow: '0 6px 20px rgba(124, 58, 237, 0.18), 0 2px 8px rgba(0, 0, 0, 0.06)',
                            transform: 'translateY(-3px)'
                          } : {
                            background: 'rgba(241, 245, 249, 0.92)',
                            border: '1px solid rgba(15, 23, 42, 0.03)',
                            color: '#64748b',
                            '&:hover': {
                              background: 'rgba(226, 232, 240, 0.9)',
                              transform: 'translateY(-1px)'
                            }
                          })
                        }}
                      >
                        {tab.label}
                      </Button>
                    ))}
                  </Box>
                </Box>

                {/* Tab Content */}
                <Box sx={{ p: { xs: 2, md: 3 }, minHeight: '320px' }}>
                  {/* Personal Info Tab */}
                  {activeTab === 0 && (
                    <Box>
                      <Typography variant="h5" sx={{ mb: 3, fontWeight: 700, color: '#111827' }}>
                        Personal Information
                      </Typography>
                      
                      {/* Profile Picture Upload */}
                      <ProfilePictureUpload 
                        user={user} 
                        onProfileUpdate={handleProfileUpdate}
                      />

                      <Grid container spacing={3}>
                        <Grid item xs={12} sm={6}>
                          <TextField
                            fullWidth
                            label="Full Name"
                            value={user?.userName || user?.googleName || user?.UserName || ''}
                            disabled
                            sx={{ mb: 2 }}
                          />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                          <TextField
                            fullWidth
                            label="Email"
                            value={user?.email || user?.googleEmail || user?.Email || ''}
                            disabled
                            sx={{ mb: 2 }}
                          />
                        </Grid>
                        <Grid item xs={12}>
                          <Typography variant="body2" color="text.secondary">
                            {user?.isGoogleUser 
                              ? 'Profile information is managed through your Google account.'
                              : 'Contact support to update your profile information.'
                            }
                          </Typography>
                          {process.env.NODE_ENV === 'development' && (
                            <Typography variant="caption" color="text.secondary" sx={{ mt: 1, display: 'block', fontSize: '0.7rem' }}>
                              Debug: {JSON.stringify({
                                userName: user?.userName,
                                UserName: user?.UserName,
                                email: user?.email,
                                Email: user?.Email,
                                isGoogleUser: user?.isGoogleUser
                              }, null, 2)}
                            </Typography>
                          )}
                        </Grid>
                      </Grid>
                    </Box>
                  )}

                  {/* Address Tab */}
                  {activeTab === 1 && (
                    <Box>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                        <Typography variant="h5" sx={{ fontWeight: 700, color: '#111827' }}>
                          Shipping Address
                        </Typography>
                        <Button
                          variant="contained"
                          startIcon={<AddIcon />}
                          onClick={() => setShowAddressDialog(true)}
                          sx={{ 
                            borderRadius: 3,
                            background: 'linear-gradient(135deg, #667eea, #764ba2)',
                            boxShadow: '0 4px 12px rgba(102, 126, 234, 0.3)',
                            '&:hover': {
                              background: 'linear-gradient(135deg, #5a67d8, #6b46c1)',
                              boxShadow: '0 6px 16px rgba(102, 126, 234, 0.4)'
                            }
                          }}
                        >
                          Add Address
                        </Button>
                      </Box>

                      {address ? (
                        <Card sx={{ 
                          border: '1px solid #e0e0e0', 
                          borderRadius: 4,
                          background: 'rgba(102, 126, 234, 0.02)',
                          boxShadow: '0 2px 12px rgba(0, 0, 0, 0.05)'
                        }}>
                          <CardContent>
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                              <Box>
                                <Typography variant="body1" sx={{ fontWeight: 600, mb: 1 }}>
                                  {formData.house}, {formData.street}
                                </Typography>
                                <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                                  {formData.landmark && `${formData.landmark}, `}
                                  {formData.city}, {formData.state} {formData.pincode}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                  Phone: {formData.phone}
                                </Typography>
                              </Box>
                              <Box sx={{ display: 'flex', gap: 1 }}>
                                <Button
                                  startIcon={<EditIcon />}
                                  onClick={() => setIsEditing(!isEditing)}
                                  size="small"
                                  sx={{
                                    borderRadius: '10px',
                                    px: 2,
                                    py: 1,
                                    background: 'linear-gradient(135deg, #EEF8FF, #E6F1FF)',
                                    color: '#0ea5e9',
                                    border: '1px solid rgba(14, 165, 233, 0.14)',
                                    fontWeight: 700,
                                    textTransform: 'none',
                                    transition: 'transform 0.14s ease, box-shadow 0.14s ease',
                                    '&:hover': {
                                      transform: 'translateY(-2px)',
                                      boxShadow: '0 8px 20px rgba(0, 0, 0, 0.06)'
                                    }
                                  }}
                                >
                                  Change
                                </Button>
                                <Button
                                  startIcon={<DeleteIcon />}
                                  onClick={handleDeleteAddress}
                                  size="small"
                                  sx={{
                                    borderRadius: '10px',
                                    px: 2,
                                    py: 1,
                                    background: 'linear-gradient(135deg, #fff5f5, #fff0f0)',
                                    color: '#ef4444',
                                    border: '1px solid rgba(220, 38, 38, 0.12)',
                                    fontWeight: 700,
                                    textTransform: 'none',
                                    transition: 'transform 0.14s ease, box-shadow 0.14s ease',
                                    '&:hover': {
                                      transform: 'translateY(-2px)',
                                      boxShadow: '0 8px 20px rgba(0, 0, 0, 0.06)'
                                    }
                                  }}
                                >
                                  Remove
                                </Button>
                              </Box>
                            </Box>

                            {isEditing && (
                              <Box sx={{ mt: 3 }}>
                                <Grid container spacing={2}>
                                  <Grid item xs={12} sm={6}>
                                    <TextField
                                      fullWidth
                                      label="House/Flat No."
                                      name="house"
                                      value={formData.house}
                                      onChange={handleInputChange}
                                      size="small"
                                    />
                                  </Grid>
                                  <Grid item xs={12} sm={6}>
                                    <TextField
                                      fullWidth
                                      label="Street"
                                      name="street"
                                      value={formData.street}
                                      onChange={handleInputChange}
                                      size="small"
                                    />
                                  </Grid>
                                  <Grid item xs={12}>
                                    <TextField
                                      fullWidth
                                      label="Landmark"
                                      name="landmark"
                                      value={formData.landmark}
                                      onChange={handleInputChange}
                                      size="small"
                                    />
                                  </Grid>
                                  <Grid item xs={12} sm={4}>
                                    <TextField
                                      fullWidth
                                      label="City"
                                      name="city"
                                      value={formData.city}
                                      onChange={handleInputChange}
                                      size="small"
                                    />
                                  </Grid>
                                  <Grid item xs={12} sm={4}>
                                    <TextField
                                      fullWidth
                                      label="State"
                                      name="state"
                                      value={formData.state}
                                      onChange={handleInputChange}
                                      size="small"
                                    />
                                  </Grid>
                                  <Grid item xs={12} sm={4}>
                                    <TextField
                                      fullWidth
                                      label="Pincode"
                                      name="pincode"
                                      value={formData.pincode}
                                      onChange={handleInputChange}
                                      size="small"
                                    />
                                  </Grid>
                                  <Grid item xs={12}>
                                    <TextField
                                      fullWidth
                                      label="Phone"
                                      name="phone"
                                      value={formData.phone}
                                      onChange={handleInputChange}
                                      size="small"
                                    />
                                  </Grid>
                                  <Grid item xs={12}>
                                    <Box sx={{ display: 'flex', gap: 2 }}>
                                      <Button
                                        variant="contained"
                                        onClick={handleSaveAddress}
                                        disabled={isSaving}
                                        startIcon={isSaving ? <CircularProgress size={16} /> : <SaveIcon />}
                                        sx={{
                                          background: 'linear-gradient(135deg, #667eea, #764ba2)',
                                          borderRadius: 3,
                                          px: 3,
                                          py: 1.5,
                                          boxShadow: '0 4px 12px rgba(102, 126, 234, 0.3)',
                                          '&:hover': {
                                            background: 'linear-gradient(135deg, #5a67d8, #6b46c1)',
                                            boxShadow: '0 6px 16px rgba(102, 126, 234, 0.4)'
                                          }
                                        }}
                                      >
                                        {isSaving ? 'Saving...' : 'Save Changes'}
                                      </Button>
                                      <Button
                                        variant="outlined"
                                        onClick={() => setIsEditing(false)}
                                      >
                                        Cancel
                                      </Button>
                                    </Box>
                                  </Grid>
                                </Grid>
                              </Box>
                            )}
                          </CardContent>
                        </Card>
                      ) : (
                        <Box sx={{ 
                          textAlign: 'center', 
                          py: 6,
                          border: '2px dashed rgba(226, 232, 240, 0.9)',
                          borderRadius: 3,
                          background: 'linear-gradient(180deg, rgba(250, 250, 255, 0.6), rgba(255, 255, 255, 0.8))'
                        }}>
                          <Box sx={{
                            width: 72,
                            height: 72,
                            borderRadius: '50%',
                            background: 'rgba(102, 126, 234, 0.08)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            mx: 'auto',
                            mb: 2
                          }}>
                            <LocationIcon sx={{ fontSize: 32, color: '#667eea' }} />
                          </Box>
                          <Typography variant="h6" sx={{ mb: 1, fontWeight: 700, color: '#0F172A' }}>
                            No Address Added
                          </Typography>
                          <Typography variant="body2" color="text.secondary" sx={{ mb: 3, maxWidth: 280, mx: 'auto', lineHeight: 1.5 }}>
                            Add your shipping address to make checkout faster and more convenient
                          </Typography>
                          <Button
                            variant="contained"
                            startIcon={<AddIcon />}
                            onClick={() => setShowAddressDialog(true)}
                            sx={{
                              background: 'linear-gradient(135deg, #667eea, #764ba2)',
                              borderRadius: 3,
                              px: 3,
                              py: 1.5,
                              boxShadow: '0 4px 12px rgba(102, 126, 234, 0.3)',
                              textTransform: 'none',
                              fontWeight: 600,
                              '&:hover': {
                                background: 'linear-gradient(135deg, #5a67d8, #6b46c1)',
                                boxShadow: '0 6px 16px rgba(102, 126, 234, 0.4)'
                              }
                            }}
                          >
                            Add Address
                          </Button>
                        </Box>
                      )}
                    </Box>
                  )}

                  {/* Orders Tab */}
                  {activeTab === 2 && (
                    <Box>
                      <Typography variant="h5" sx={{ mb: 3, fontWeight: 700, color: '#111827' }}>
                        Order History
                      </Typography>
                      {orders.length > 0 ? (
                        <List sx={{ p: 0 }}>
                          {orders.map((order, index) => (
                            <Card key={order.orderID} sx={{ 
                              mb: 2, 
                              border: '1px solid #e0e0e0',
                              borderRadius: 4,
                              boxShadow: '0 2px 12px rgba(0, 0, 0, 0.05)',
                              background: 'rgba(255, 255, 255, 0.9)'
                            }}>
                              <CardContent sx={{ p: 3 }}>
                                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
                                  <Box>
                                    <Typography variant="h6" sx={{ fontWeight: 600 }}>
                                      Order #{order.orderID}
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                      {formatOrderDate(order.orderDate)}
                                    </Typography>
                                  </Box>
                                  <Box sx={{ textAlign: 'right' }}>
                                    <Typography variant="h6" sx={{ fontWeight: 600, color: 'primary.main' }}>
                                      ${order.totalAmount}
                                    </Typography>
                                  </Box>
                                </Box>
                                <Divider sx={{ my: 2 }} />
                                <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                                  {order.items?.length || 0} item{(order.items?.length || 0) > 1 ? 's' : ''}
                                </Typography>
                                {order.items && order.items.length > 0 && (
                                  <Box sx={{ mb: 2 }}>
                                    {order.items.map((item, itemIndex) => (
                                      <Box key={itemIndex} sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                                        <Typography variant="body2">
                                          {item.product?.productName || 'Product'} x {item.quantity}
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary">
                                          ${item.priceAtTime}
                                        </Typography>
                                      </Box>
                                    ))}
                                  </Box>
                                )}
                                <Box sx={{ mt: 2 }}>
                                  <Button
                                    variant="contained"
                                    size="small"
                                    sx={{ 
                                      mr: 1,
                                      background: 'linear-gradient(135deg, #667eea, #764ba2)',
                                      borderRadius: 2,
                                      '&:hover': {
                                        background: 'linear-gradient(135deg, #5a67d8, #6b46c1)'
                                      }
                                    }}
                                  >
                                    View Details
                                  </Button>
                                  <Button
                                    variant="outlined"
                                    size="small"
                                    sx={{
                                      borderColor: '#667eea',
                                      color: '#667eea',
                                      borderRadius: 2,
                                      '&:hover': {
                                        borderColor: '#5a67d8',
                                        color: '#5a67d8',
                                        background: 'rgba(102, 126, 234, 0.05)'
                                      }
                                    }}
                                  >
                                    Track Order
                                  </Button>
                                </Box>
                              </CardContent>
                            </Card>
                          ))}
                        </List>
                      ) : (
                        <Box sx={{ 
                          textAlign: 'center', 
                          py: 6,
                          border: '2px dashed rgba(226, 232, 240, 0.9)',
                          borderRadius: 3,
                          background: 'linear-gradient(180deg, rgba(250, 250, 255, 0.6), rgba(255, 255, 255, 0.8))'
                        }}>
                          <Box sx={{
                            width: 72,
                            height: 72,
                            borderRadius: '50%',
                            background: 'rgba(102, 126, 234, 0.08)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            mx: 'auto',
                            mb: 2
                          }}>
                            <OrderIcon sx={{ fontSize: 32, color: '#667eea' }} />
                          </Box>
                          <Typography variant="h6" sx={{ mb: 1, fontWeight: 700, color: '#0F172A' }}>
                            No Orders Yet
                          </Typography>
                          <Typography variant="body2" color="text.secondary" sx={{ maxWidth: 280, mx: 'auto', lineHeight: 1.5 }}>
                            Start shopping to see your order history and track your purchases here
                          </Typography>
                        </Box>
                      )}
                    </Box>
                  )}
                </Box>
              </CardContent>
            </Card>
          </Fade>
        </Grid>
      </Grid>

      {/* Address Dialog */}
      <Dialog 
        open={showAddressDialog} 
        onClose={() => setShowAddressDialog(false)}
        maxWidth="md"
        fullWidth
        PaperProps={{
          sx: {
            borderRadius: 4,
            background: 'rgba(255, 255, 255, 0.95)',
            backdropFilter: 'blur(10px)'
          }
        }}
      >
        <DialogTitle sx={{ fontWeight: 700, color: '#111827' }}>Add New Address</DialogTitle>
        <DialogContent>
          <AddAddressForm onSuccess={() => {
            setShowAddressDialog(false);
            fetchUserAddress();
          }} />
        </DialogContent>
      </Dialog>

      {/* Password Change Dialog */}
      <Dialog 
        open={showPasswordDialog} 
        onClose={() => setShowPasswordDialog(false)}
        maxWidth="sm"
        fullWidth
        PaperProps={{
          sx: {
            borderRadius: 4,
            background: 'rgba(255, 255, 255, 0.95)',
            backdropFilter: 'blur(10px)'
          }
        }}
      >
        <DialogTitle sx={{ fontWeight: 700, color: '#111827' }}>Change Password</DialogTitle>
        <DialogContent>
          <Box sx={{ pt: 2 }}>
            <TextField
              fullWidth
              label="Current Password"
              type="password"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              sx={{ mb: 3 }}
            />
            <TextField
              fullWidth
              label="New Password"
              type={showPassword ? 'text' : 'password'}
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              sx={{ mb: 2 }}
              InputProps={{
                endAdornment: (
                  <IconButton
                    onClick={() => setShowPassword(!showPassword)}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                  </IconButton>
                ),
              }}
            />
            <TextField
              fullWidth
              label="Confirm New Password"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              sx={{ mb: 2 }}
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setShowPasswordDialog(false)}>
            Cancel
          </Button>
          <Button
            variant="contained"
            onClick={handlePasswordChange}
            disabled={isSaving}
            sx={{
              background: 'linear-gradient(135deg, #667eea, #764ba2)',
              borderRadius: 3,
              px: 3,
              py: 1.5,
              boxShadow: '0 4px 12px rgba(102, 126, 234, 0.3)',
              '&:hover': {
                background: 'linear-gradient(135deg, #5a67d8, #6b46c1)',
                boxShadow: '0 6px 16px rgba(102, 126, 234, 0.4)'
              }
            }}
          >
            {isSaving ? 'Changing...' : 'Change Password'}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Delete Address Confirmation Dialog */}
      <Dialog 
        open={showDeleteDialog} 
        onClose={() => setShowDeleteDialog(false)}
        maxWidth="sm"
        PaperProps={{
          sx: {
            borderRadius: 4,
            background: 'rgba(255, 255, 255, 0.95)',
            backdropFilter: 'blur(10px)'
          }
        }}
      >
        <DialogTitle sx={{ color: 'error.main', fontWeight: 700 }}>Delete Address</DialogTitle>
        <DialogContent>
          <Typography variant="body1" sx={{ pt: 1 }}>
            Are you sure you want to delete your saved address? This action cannot be undone.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setShowDeleteDialog(false)}>
            Cancel
          </Button>
          <Button
            variant="contained"
            color="error"
            onClick={confirmDeleteAddress}
            disabled={isSaving}
            startIcon={isSaving ? <CircularProgress size={16} /> : <DeleteIcon />}
          >
            {isSaving ? 'Deleting...' : 'Delete Address'}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
} 