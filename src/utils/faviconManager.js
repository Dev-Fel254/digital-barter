/**
 * Simple utility to manage favicon changes based on authentication state
 */

// Set the favicon based on authentication state
export function setFavicon(isAuthenticated) {
  const baseUrl = process.env.BASE_URL || '/';
  
  // SVG favicon
  let svgLink = document.querySelector('link[rel="icon"][type="image/svg+xml"]');
  if (!svgLink) {
    svgLink = document.createElement('link');
    svgLink.rel = 'icon';
    svgLink.type = 'image/svg+xml';
    document.head.appendChild(svgLink);
  }
  
  // PNG fallback favicon
  let pngLink = document.querySelector('link[rel="alternate icon"][type="image/png"]');
  if (!pngLink) {
    pngLink = document.createElement('link');
    pngLink.rel = 'alternate icon';
    pngLink.type = 'image/png';
    document.head.appendChild(pngLink);
  }
  
  // Set the appropriate favicon based on auth state
  if (isAuthenticated) {
    svgLink.href = `${baseUrl}db-favicon.svg`;
    pngLink.href = `${baseUrl}db-favicon-32x32.png`;
  } else {
    svgLink.href = `${baseUrl}default-favicon.svg`;
    pngLink.href = `${baseUrl}default-favicon-32x32.png`;
  }
}

// Initialize favicon based on current auth state
export function initFavicon() {
  const isAuthenticated = !!localStorage.getItem('token');
  setFavicon(isAuthenticated);
}

// Export a global function that can be called from anywhere
window.updateFavicon = setFavicon;
