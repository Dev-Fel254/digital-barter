/**
 * Image utility functions for the Digital Barter application
 */

/**
 * Creates a global CSS class for the "No Image Available" placeholder
 * This ensures consistent styling across the application
 */
export function initImagePlaceholders() {
  // Create a style element
  const style = document.createElement('style');
  
  // Define the CSS for the no-image placeholder
  style.textContent = `
    .no-image-placeholder {
      display: flex;
      align-items: center;
      justify-content: center;
      height: 100%;
      width: 100%;
      background-color: #f0f0f0;
      color: #999;
      font-weight: 500;
      text-align: center;
      padding: 20px;
      box-sizing: border-box;
    }
    
    .no-image-placeholder p {
      margin: 0;
    }
  `;
  
  // Add the style to the document head
  document.head.appendChild(style);
}

/**
 * Vue directive to handle image errors and replace with "No Image Available" placeholder
 * Usage: v-img-fallback in Vue templates
 */
export const imgFallback = {
  mounted(el) {
    // Function to handle image errors
    const handleImageError = () => {
      // Don't modify the DOM if element is no longer in the document
      if (!el.isConnected) return;
      
      // Hide the original image
      el.style.display = 'none';
      
      // Check if we already created a placeholder
      const parent = el.parentNode;
      if (!parent) return;
      
      // Check if we already added a placeholder
      if (parent.querySelector('.no-image-placeholder')) return;
      
      // Create placeholder div
      const placeholder = document.createElement('div');
      placeholder.className = 'no-image-placeholder';
      
      // Add text
      const text = document.createElement('p');
      text.textContent = 'NO IMAGE AVAILABLE';
      placeholder.appendChild(text);
      
      // Insert the placeholder after the image
      parent.appendChild(placeholder);
    };
    
    // Handle image load error
    el.addEventListener('error', handleImageError);
    
    // If image src is empty, null, or undefined, show placeholder immediately
    if (!el.src || el.src === '' || el.src === 'null' || el.src === 'undefined') {
      handleImageError();
    }
  }
};

/**
 * Vue plugin to register the image utilities globally
 */
export default {
  install(app) {
    // Initialize image placeholders
    initImagePlaceholders();
    
    // Register the img-fallback directive
    app.directive('img-fallback', imgFallback);
  }
};
