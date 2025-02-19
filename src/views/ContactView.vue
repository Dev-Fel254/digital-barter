<template>
  <div class="contact page-content">
    <div class="container py-4">
      <div class="contact-wrapper">
        <h1 class="gradient-text">Contact Us</h1>
        <p class="subtitle">Complete the form below to contact us directly.</p>

        <form @submit.prevent="handleSubmit" class="contact-form">
          <div class="form-group">
            <label for="name">Name<span class="required">*</span></label>
            <input 
              type="text" 
              id="name" 
              v-model="form.name" 
              class="form-control" 
              required
            >
          </div>

          <div class="form-group">
            <label for="email">Email<span class="required">*</span></label>
            <input 
              type="email" 
              id="email" 
              v-model="form.email" 
              class="form-control" 
              required
            >
          </div>

          <div class="form-group">
            <label for="phone">Phone</label>
            <input 
              type="tel" 
              id="phone" 
              v-model="form.phone" 
              class="form-control"
            >
          </div>

          <div class="form-group">
            <label for="address">Address</label>
            <textarea 
              id="address" 
              v-model="form.address" 
              class="form-control" 
              rows="3"
            ></textarea>
          </div>

          <div class="form-group">
            <label for="comment">Comment<span class="required">*</span></label>
            <textarea 
              id="comment" 
              v-model="form.comment" 
              class="form-control" 
              rows="5" 
              required
            ></textarea>
          </div>

          <div class="form-group security-code">
            <label for="securityCode">Security Code<span class="required">*</span></label>
            <div class="security-wrapper">
              <div class="code-display">{{ securityCode }}</div>
              <input 
                type="text" 
                id="securityCode" 
                v-model="form.securityCode" 
                class="form-control" 
                required
              >
            </div>
          </div>

          <button type="submit" class="submit-btn">Send</button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ContactView',
  data() {
    return {
      form: {
        name: '',
        email: '',
        phone: '',
        address: '',
        comment: '',
        securityCode: ''
      },
      securityCode: Math.random().toString(36).substring(2, 8).toUpperCase()
    }
  },
  methods: {
    handleSubmit() {
      // Handle form submission
      console.log('Form submitted:', this.form)
    }
  }
}
</script>

<style lang="scss" scoped>
.contact {
  background-color: #fafafa;
  min-height: calc(100vh - 200px);
}

.contact-wrapper {
  max-width: 800px;
  margin: 0 auto;
  background: white;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);

  h1 {
    font-size: 2.5rem;
    font-weight: 700;
    margin-bottom: 1rem;
    background: linear-gradient(45deg, var(--primary-color), var(--secondary-color));
    -webkit-background-clip: text;
    background-clip: text;
    color: transparent;
  }

  .subtitle {
    color: #4a5568;
    margin-bottom: 2rem;
    font-size: 1.1rem;
  }
}

.contact-form {
  .form-group {
    margin-bottom: 1.5rem;

    label {
      display: block;
      margin-bottom: 0.5rem;
      color: #2d3748;
      font-weight: 500;

      .required {
        color: var(--secondary-color);
        margin-left: 4px;
      }
    }

    .form-control {
      width: 100%;
      padding: 0.75rem;
      border: 1px solid #e2e8f0;
      border-radius: 6px;
      font-size: 1rem;
      transition: all 0.3s ease;

      &:focus {
        outline: none;
        border-color: var(--primary-color);
        box-shadow: 0 0 0 3px rgba(255, 215, 0, 0.1);
      }
    }
  }

  .security-code {
    .security-wrapper {
      display: flex;
      gap: 1rem;
      align-items: center;

      .code-display {
        background: linear-gradient(45deg, var(--primary-color), var(--secondary-color));
        padding: 0.75rem 1rem;
        border-radius: 6px;
        color: white;
        font-weight: 600;
        letter-spacing: 2px;
      }

      .form-control {
        flex: 1;
      }
    }
  }

  .submit-btn {
    background: linear-gradient(45deg, var(--primary-color), var(--secondary-color));
    color: white;
    border: none;
    padding: 1rem 2rem;
    border-radius: 6px;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.3s ease;
    width: 100%;

    &:hover {
      transform: translateY(-2px);
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    }
  }
}

@media (max-width: 768px) {
  .contact-wrapper {
    padding: 1.5rem;
  }

  .security-code {
    .security-wrapper {
      flex-direction: column;
      
      .code-display {
        width: 100%;
        text-align: center;
      }
    }
  }
}
</style>