<template>
  <div class="privacy page-content">
    <div class="container py-4">
      <div class="privacy-wrapper">
        <h1 class="gradient-text">Privacy Policy</h1>
        
        <div class="privacy-section">
          <p class="intro">We recognize the importance of protecting the privacy of personal information about our customers. Personal 
          information includes all of the personally identifying information that is provided to us. We are sensitive to these 
          privacy interests and believe that protecting valuable personal/financial information is one of our most significant 
          responsibilities.</p>

          <p class="highlight">The policies outlined below describe our policies to protect your privacy.</p>
        </div>

        <div class="privacy-section">
          <h2>Use, Collection and Retention of Client Information</h2>
          <p>We collect, retain and use only the information about our customers that is required by law to administer our 
          business and provide high level services to our clients. We retain this information no longer than necessary to 
          meet these objectives. All transmitted credit card information is handled securely through digitally encrypted 
          Secure Socket Layers (SSL) technology.</p>
        </div>

        <div class="privacy-section">
          <h2>Spam Policy</h2>
          <p>Spam is flooding the Internet with many copies of the same message, in an attempt to force the message on 
          people who would not otherwise choose to receive it. Email spam targets individual users with direct mail 
          messages and costs the sender very little to send. Most of the costs are paid for by the recipient or the carriers 
          rather than by the sender.</p>

          <p>We don't condone the use of spam and the sending of unsolicited email in any form, nor do we control other web 
          sites involvement and/or practices in this area.</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'PrivacyView'
}
</script>

<style lang="scss" scoped>
.privacy {
  background-color: #fafafa;
}

.privacy-wrapper {
  max-width: 900px;
  margin: 0 auto;
  background: white;
  padding: 2.5rem;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);

  h1 {
    font-size: 2.5rem;
    font-weight: 700;
    margin-bottom: 2rem;
    background: linear-gradient(45deg, var(--primary-color), var(--secondary-color));
    -webkit-background-clip: text;
    background-clip: text;
    color: transparent;
  }
}

.privacy-section {
  margin-bottom: 2.5rem;

  &:last-child {
    margin-bottom: 0;
  }

  h2 {
    font-size: 1.5rem;
    color: #2d3748;
    margin-bottom: 1rem;
    font-weight: 600;
    position: relative;
    padding-left: 1rem;

    &::before {
      content: '';
      position: absolute;
      left: 0;
      top: 0;
      height: 100%;
      width: 4px;
      background: linear-gradient(45deg, var(--primary-color), var(--secondary-color));
      border-radius: 2px;
    }
  }

  p {
    color: #4a5568;
    line-height: 1.7;
    margin-bottom: 1rem;
    font-size: 1rem;

    &:last-child {
      margin-bottom: 0;
    }

    &.intro {
      font-size: 1.1rem;
      color: #2d3748;
    }

    &.highlight {
      color: var(--primary-color);
      font-weight: 500;
      font-size: 1.1rem;
      padding-left: 1rem;
      border-left: 3px solid var(--secondary-color);
    }
  }
}

@media (max-width: 768px) {
  .privacy-wrapper {
    padding: 1.5rem;
  }

  h1 {
    font-size: 2rem;
  }

  .privacy-section {
    h2 {
      font-size: 1.25rem;
    }
  }
}
</style>