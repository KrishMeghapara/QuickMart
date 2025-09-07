# Google OAuth Setup Guide

## Overview

This guide will help you set up Google OAuth authentication for your Quick Commerce application. Google OAuth allows users to sign in with their Google accounts, providing a seamless and secure authentication experience.

## Prerequisites

- Google Cloud Console account
- Access to your application's configuration files

## Step 1: Create Google Cloud Project

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select an existing one
3. Enable the Google+ API and Google OAuth2 API

## Step 2: Configure OAuth Consent Screen

1. In Google Cloud Console, go to **APIs & Services** > **OAuth consent screen**
2. Choose **External** user type (unless you have a Google Workspace)
3. Fill in the required information:
   - **App name**: Quick Commerce
   - **User support email**: Your email
   - **Developer contact information**: Your email
4. Add scopes:
   - `openid`
   - `email`
   - `profile`
5. Add test users (your email addresses for testing)

## Step 3: Create OAuth 2.0 Credentials

1. Go to **APIs & Services** > **Credentials**
2. Click **Create Credentials** > **OAuth 2.0 Client IDs**
3. Choose **Web application**
4. Add authorized JavaScript origins:
   - `http://localhost:5173` (for development)
   - `http://localhost:3000` (alternative dev port)
   - Your production domain (when deployed)
5. Add authorized redirect URIs:
   - `http://localhost:5173` (for development)
   - Your production domain (when deployed)
6. Copy the **Client ID** - you'll need this for configuration

## Step 4: Configure Backend

### Update `appsettings.Development.json`:
```json
{
  "Google": {
    "ClientId": "your-google-client-id-here"
  }
}
```

### Update `appsettings.json` (for production):
```json
{
  "Google": {
    "ClientId": "your-production-google-client-id"
  }
}
```

## Step 5: Configure Frontend

### Update `src/main.jsx`:
```jsx
<GoogleOAuthProvider clientId="your-google-client-id-here">
  {/* Your app components */}
</GoogleOAuthProvider>
```

## Step 6: Run Database Migration

```bash
cd Quick-CommerceApiForEx
dotnet ef database update
```

## Step 7: Test the Integration

1. Start your backend API
2. Start your frontend application
3. Go to the login page
4. Click "Continue with Google"
5. Complete the Google OAuth flow
6. Verify that you're logged in successfully

## Features Implemented

### ✅ **Backend Features**
- Google OAuth service for token verification
- User model with Google-specific fields
- Google login endpoint (`/api/User/GoogleLogin`)
- Automatic user creation for new Google users
- JWT token generation for Google users

### ✅ **Frontend Features**
- Google login button component
- Integration with Google OAuth library
- Profile picture display for Google users
- Seamless login flow
- Error handling for failed authentication

### ✅ **User Experience**
- One-click Google login
- Automatic profile picture from Google
- No password required for Google users
- Consistent UI with existing design
- Mobile-friendly interface

## Security Considerations

### ✅ **Implemented Security Measures**
- Token verification with Google's servers
- JWT token generation with proper expiration
- Secure token storage in localStorage
- HTTPS enforcement in production
- Input validation and sanitization

### 🔒 **Best Practices**
- Always use HTTPS in production
- Regularly rotate your Google Client ID
- Monitor OAuth consent screen usage
- Implement proper error handling
- Log authentication events for security

## Troubleshooting

### Common Issues

1. **"Invalid Google token" error**
   - Check that your Client ID is correct
   - Verify that your domain is in authorized origins
   - Ensure Google+ API is enabled

2. **"Redirect URI mismatch" error**
   - Add your exact domain to authorized redirect URIs
   - Include both HTTP and HTTPS versions if needed

3. **"OAuth consent screen not configured" error**
   - Complete the OAuth consent screen setup
   - Add test users if using external user type

4. **Database migration errors**
   - Ensure Entity Framework is properly configured
   - Check your connection string
   - Run `dotnet ef migrations list` to see available migrations

### Debug Steps

1. Check browser console for JavaScript errors
2. Check backend logs for API errors
3. Verify Google Cloud Console configuration
4. Test with different browsers/devices
5. Check network tab for failed requests

## Production Deployment

### Environment Variables
Set these in your production environment:
```bash
GOOGLE_CLIENT_ID=your-production-client-id
JWT_KEY=your-secure-jwt-key
```

### Security Checklist
- [ ] Use HTTPS in production
- [ ] Set secure JWT key
- [ ] Configure proper CORS settings
- [ ] Enable Google Cloud Console monitoring
- [ ] Set up error logging
- [ ] Test with production Google Client ID

## API Endpoints

### Google Login
- **POST** `/api/User/GoogleLogin`
- **Body**: `{ "IdToken": "google-id-token" }`
- **Response**: JWT token and user data

### Response Format
```json
{
  "Token": "jwt-token-here",
  "UserID": 123,
  "UserName": "John Doe",
  "Email": "john@example.com",
  "GooglePicture": "https://...",
  "IsGoogleUser": true
}
```

## Future Enhancements

### Planned Features
- [ ] Google account linking for existing users
- [ ] Multiple Google accounts per user
- [ ] Google Calendar integration
- [ ] Google Drive file uploads
- [ ] Google Analytics integration
- [ ] Social login with other providers (Facebook, Apple)

### Advanced Features
- [ ] Token refresh mechanism
- [ ] Offline access tokens
- [ ] Google Workspace integration
- [ ] Custom OAuth scopes
- [ ] Multi-tenant OAuth support

## Support

If you encounter issues:
1. Check this guide first
2. Review Google Cloud Console logs
3. Check your application logs
4. Verify configuration settings
5. Test with a fresh browser session

## Resources

- [Google OAuth 2.0 Documentation](https://developers.google.com/identity/protocols/oauth2)
- [React OAuth Google Library](https://www.npmjs.com/package/@react-oauth/google)
- [Google Cloud Console](https://console.cloud.google.com/)
- [OAuth 2.0 Best Practices](https://oauth.net/2/)

---

**Note**: Keep your Google Client ID secure and never commit it to version control. Use environment variables for sensitive configuration.
