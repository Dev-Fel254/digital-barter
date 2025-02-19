<template>
  <div class="terms page-content">
    <div class="container py-4">
      <div class="terms-wrapper">
        <h1 class="gradient-text">Terms of Service</h1>
        
        <div class="terms-section">
          <h2>Terms</h2>
          <p>This site provides these services to you subject to the following conditions. By visiting, browsing, shopping, 
          or otherwise using this site you agree to this User Agreement, and all of its terms and conditions. By 
          accepting this Agreement, you represent that you have the capacity to be bound by it or if you are acting on behalf of a 
          company or entity that you have the authority to bind such entity. Customers should check this User Agreement frequently.</p>
        </div>

        <div class="terms-section">
          <h2>Site Activity</h2>
          <p>The following activity on the site is expressly prohibited: Any non-personal or commercial use of any algorithmic 
          system, or method to process private or copy portions of the site or the content contained therein without prior 
          written consent.</p>
          <p>Any site collection or use of any product listings, descriptions, or prices from the site for the benefit of another 
          merchant that supplies products competitive with or comparable to those offered on this site; and, the use of 
          any data mining, robots, or similar data gathering and extraction tools. This site does not contain or upload third-party data that is not in 
          or from the site, and is not responsible for the contents of any third-party sites linked to or from the site.</p>
        </div>

        <div class="terms-section">
          <h2>Copyright</h2>
          <p>All site content (text and files) contains information, data, software, photographs, graphs, videos, typefaces, 
          graphics, music, sounds, and other material (collectively "Content") that are protected by copyrights, trademarks, 
          trade secrets, or other proprietary rights, and that these rights are valid and protected in all forms, media and 
          technologies existing now or hereinafter developed. All Content is copyrighted as a collective work. You may not 
          modify, remove, delete, augment, add to, publish, transmit, participate in the transfer or sale of, create derivative 
          works, or in any way exploit any of the Content, in whole or in part. If no specific restrictions are displayed, 
          you may make copies of select portions of the Content, provided that the copies are made only for your personal 
          use and that you maintain any notices contained in the Content, such as all copyright notices, trademark legends, 
          or other proprietary rights notices.</p>
        </div>

        <div class="terms-section">
          <h2>Limitation Of Liability</h2>
          <p>This site, including, but not limited to, negligence, shall not be liable for any loss or property, profit, or personal 
          injury due to fraud or inability to use the functionalities of this site.</p>
        </div>

        <div class="terms-section">
          <h2>Your Account</h2>
          <p>If you use this site, you are responsible for maintaining the confidentiality of your account and password and for 
          restricting access to your computer, and you agree to accept responsibility for all activities that occur under your 
          account or password. If you are under 18, you may use this site only with involvement of a parent or guardian.</p>
        </div>

        <div class="terms-section">
          <h2>Privacy Statement</h2>
          <p>All prices are subject to change. We will inform, products and offers, this site reserves the right to make 
          adjustments due to changing market conditions, product discontinuation, manufacturer price changes without prior notice or 
          advertisements and other extenuating circumstances.</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TermsView'
}
</script>

<style lang="scss" scoped>
.terms {
  background-color: #fafafa;
}

.terms-wrapper {
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

.terms-section {
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
  }
}

@media (max-width: 768px) {
  .terms-wrapper {
    padding: 1.5rem;
  }

  h1 {
    font-size: 2rem;
  }

  .terms-section {
    h2 {
      font-size: 1.25rem;
    }
  }
}
</style>