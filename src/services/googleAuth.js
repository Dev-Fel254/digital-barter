/**
 * Google OAuth implementation for Digital Barter
 */

// Replace these with your actual Google OAuth credentials
const GOOGLE_CLIENT_ID = 'YOUR_GOOGLE_CLIENT_ID';
const GOOGLE_REDIRECT_URI = window.location.origin + '/auth/callback';

/**
 * Initiates Google OAuth login flow
 */
export const signInWithGoogle = () => {
  // Google OAuth endpoint
  const googleAuthUrl = 'https://accounts.google.com/o/oauth2/v2/auth';
  
  // OAuth parameters
  const params = {
    client_id: GOOGLE_CLIENT_ID,
    redirect_uri: GOOGLE_REDIRECT_URI,
    response_type: 'token',
    scope: 'email profile',
    prompt: 'select_account',
    state: 'google-auth' // Used to identify the auth provider in the callback
  };
  
  // Build the authorization URL with query parameters
  const authUrl = new URL(googleAuthUrl);
  Object.keys(params).forEach(key => {
    authUrl.searchParams.append(key, params[key]);
  });
  
  // Redirect to Google's OAuth page
  window.location.href = authUrl.toString();
};

/**
 * Handles the OAuth callback from Google
 * @param {string} hash - The URL hash containing the access token
 * @returns {Promise<Object>} User data
 */
export const handleGoogleCallback = async (hash) => {
  if (!hash) return null;
  
  // Parse the hash to get the access token
  const params = new URLSearchParams(hash.substring(1));
  const accessToken = params.get('access_token');
  
  if (!accessToken) return null;
  
  // Fetch user info from Google
  try {
    const response = await fetch('https://www.googleapis.com/oauth2/v3/userinfo', {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    });
    
    if (!response.ok) {
      throw new Error('Failed to fetch user data from Google');
    }
    
    const userData = await response.json();
    
    // Return formatted user data
    return {
      provider: 'google',
      id: userData.sub,
      name: userData.name,
      email: userData.email,
      avatar: userData.picture,
      accessToken
    };
  } catch (error) {
    console.error('Google auth error:', error);
    return null;
  }
};
