<template>
  <div class="auth-callback">
    <div class="loading-container">
      <div class="spinner"></div>
      <h2>Completing authentication...</h2>
      <p>You will be redirected shortly</p>
    </div>
  </div>
</template>

<script>
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'
import supabase from '@/services/supabase'
import { handleGoogleCallback } from '@/services/googleAuth'

export default {
  name: 'AuthCallback',
  setup() {
    const router = useRouter()
    
    onMounted(async () => {
      try {
        // Get the provider from the URL if available
        const urlParams = new URLSearchParams(window.location.search);
        const provider = urlParams.get('provider');
        const state = urlParams.get('state');
        
        // Check if this is a Google OAuth callback (will have a hash with access_token)
        if (window.location.hash && (state === 'google-auth' || provider === 'google')) {
          console.log('Handling Google OAuth callback');
          
          // Process the Google OAuth callback
          const userData = await handleGoogleCallback(window.location.hash);
          
          if (userData) {
            console.log('Google authentication successful:', userData);
            
            // Store user data in localStorage
            localStorage.setItem('token', userData.accessToken);
            localStorage.setItem('user', JSON.stringify({
              name: userData.name,
              email: userData.email,
              avatar: userData.avatar,
              registrationDate: new Date().toLocaleDateString(),
              provider: 'google'
            }));
            
            // Trigger auth change event
            window.dispatchEvent(new Event('user-auth-change'));
            
            // Show success message in console
            console.log('Successfully logged in with Google');
            
            // Redirect to categories page after a short delay
            setTimeout(() => {
              router.push('/categories');
            }, 1500);
            
            return;
          }
        }
        
        // For our mock implementation, check if we have mock OAuth data
        const mockOAuthProvider = localStorage.getItem('mockOAuthProvider');
        const mockOAuthUser = JSON.parse(localStorage.getItem('mockOAuthUser') || 'null');
        const mockOAuthToken = localStorage.getItem('mockOAuthToken');
        
        if (mockOAuthProvider && mockOAuthUser && mockOAuthToken) {
          console.log('Using mock OAuth data for provider:', mockOAuthProvider);
          
          // Create user data based on the mock OAuth data
          const userData = {
            name: mockOAuthUser.user_metadata.full_name,
            email: mockOAuthUser.email,
            avatar: mockOAuthUser.user_metadata.avatar_url,
            registrationDate: new Date().toLocaleDateString(),
            provider: mockOAuthProvider
          };
          
          // Store user data in localStorage for the app to use
          localStorage.setItem('token', mockOAuthToken);
          localStorage.setItem('user', JSON.stringify(userData));
          
          // Clean up mock OAuth data
          localStorage.removeItem('mockOAuthProvider');
          localStorage.removeItem('mockOAuthUser');
          localStorage.removeItem('mockOAuthToken');
          
          // Trigger auth change event
          window.dispatchEvent(new Event('user-auth-change'));
          
          // Show success message in console
          console.log(`Successfully logged in with ${mockOAuthProvider}`);
          
          // Redirect to categories page after a short delay
          setTimeout(() => {
            router.push('/categories');
          }, 1500);
          
          return;
        }
        
        // If no mock data, try to use Supabase session
        const { data, error } = await supabase.auth.getSession()
        
        if (error) throw error
        
        if (data?.session) {
          // Get user data
          const { data: { user } } = await supabase.auth.getUser()
          
          // Create user data based on the provider
          let userData = {
            name: user?.user_metadata?.full_name || 'User',
            email: user?.email || 'user@example.com',
            avatar: user?.user_metadata?.avatar_url,
            registrationDate: new Date().toLocaleDateString(),
            provider: provider
          }
          
          // For our mock implementation, create more realistic user data
          if (provider) {
            switch(provider) {
              case 'google':
                userData.name = 'Google User';
                userData.email = 'google.user@example.com';
                break;
              case 'facebook':
                userData.name = 'Facebook User';
                userData.email = 'facebook.user@example.com';
                break;
              case 'twitter':
                userData.name = 'Twitter User';
                userData.email = 'twitter.user@example.com';
                break;
            }
          }
          
          // Store user data in localStorage for the app to use
          localStorage.setItem('token', data.session.access_token)
          localStorage.setItem('user', JSON.stringify(userData))
          
          // Trigger auth change event
          window.dispatchEvent(new Event('user-auth-change'))
          
          // Redirect to categories page
          setTimeout(() => {
            router.push('/categories')
          }, 1500)
        } else {
          // If no session, redirect to login
          router.push('/auth/login')
        }
      } catch (error) {
        console.error('Auth callback error:', error)
        router.push('/auth/login')
      }
    })
    
    return {}
  }
}
</script>

<style lang="scss" scoped>
.auth-callback {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: calc(100vh - 200px);
  padding: 2rem;
  background-color: var(--background-light);
}

.loading-container {
  text-align: center;
  padding: 2rem;
  background: white;
  border-radius: 10px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  
  h2 {
    margin-top: 1.5rem;
    color: var(--text-color);
  }
  
  p {
    color: var(--text-light);
  }
}

.spinner {
  width: 50px;
  height: 50px;
  border: 5px solid rgba(255, 215, 0, 0.3);
  border-radius: 50%;
  border-top-color: var(--primary-color);
  margin: 0 auto;
  animation: spin 1s ease-in-out infinite;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}
</style>
