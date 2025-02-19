<template>
  <div class="faq page-content">
    <div class="container py-4">
      <div class="faq-wrapper">
        <h1 class="gradient-text">FAQ</h1>
        
        <div class="faq-list">
          <div 
            v-for="(item, index) in faqItems" 
            :key="index"
            class="faq-item"
            :class="{ 'active': activeIndex === index }"
          >
            <div 
              class="faq-question"
              @click="toggleQuestion(index)"
            >
              <span class="question-number">{{ index + 1 }}.</span>
              <span class="question-text">{{ item.question }}</span>
              <span class="toggle-icon"></span>
            </div>
            <div class="faq-answer" v-show="activeIndex === index">
              <p v-for="(paragraph, pIndex) in item.answer" :key="pIndex">{{ paragraph }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'FaqView',
  data() {
    return {
      activeIndex: 0,
      faqItems: [
        {
          question: 'What is this site about?',
          answer: [
            'This site is an online exchange service where you can access details about unwanted or surplus items and view requests for wanted goods. Its main aim is to help you to get rid of your unwanted items or enable you to find goods that others no longer need at no cost.',
            'This site is a complete swap site that allows you to swap items with, or sell items to, other internet users. It allows you to search or browse for specific items offered for swap or sale. You can swap any unwanted items from your home or business to another user who may have use for them. You can also post for items you wish.',
            'Search/browse through the extensive list of categories, find items that may be useful for you, make offers, wait for the other party to respond by accepting or rejecting your offer, add comments, swap and enjoy!',
            'Thus with the minimum effort, you can swap, sell or buy stuff from other people via the internet.'
          ]
        },
        {
          question: 'Why use this site?',
          answer: ['Our platform provides a safe and efficient way to trade or swap items with other users. We offer a user-friendly interface, secure transactions, and a growing community of traders.']
        },
        {
          question: 'How do I create a listing?',
          answer: ['To create a listing, log into your account and click on "My Booth". Then click "Add New Item" and fill in the required details about your item including photos, description, and whether you want to swap or sell.']
        },
        {
          question: 'How can I contact a user about an item I\'m interested in?',
          answer: ['When you find an item you\'re interested in, click the "Contact Seller" button on the item\'s page. You can then send a message directly to the user through our secure messaging system.']
        },
        {
          question: 'What happens when a swap/sale is confirmed?',
          answer: ['Once both parties agree to a swap or sale, you\'ll receive confirmation and contact details. You can then arrange the exchange or delivery method that works best for both parties.']
        },
        {
          question: 'What is your policy on spam?',
          answer: ['We have a strict no-spam policy. Any user found sending unsolicited messages or creating fake listings will have their account suspended. We encourage users to report any suspicious activity.']
        }
      ]
    }
  },
  methods: {
    toggleQuestion(index) {
      this.activeIndex = this.activeIndex === index ? null : index
    }
  }
}
</script>

<style lang="scss" scoped>
.faq {
  background-color: #fafafa;
}

.faq-wrapper {
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

.faq-list {
  .faq-item {
    margin-bottom: 1rem;
    border: 1px solid #e2e8f0;
    border-radius: 8px;
    overflow: hidden;
    transition: all 0.3s ease;

    &.active {
      border-color: var(--primary-color);
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);

      .faq-question {
        background-color: rgba(255, 215, 0, 0.05);

        .toggle-icon {
          transform: rotate(180deg);
        }
      }
    }
  }

  .faq-question {
    padding: 1.25rem;
    cursor: pointer;
    display: flex;
    align-items: center;
    transition: all 0.3s ease;

    &:hover {
      background-color: rgba(255, 215, 0, 0.05);
    }

    .question-number {
      color: var(--primary-color);
      font-weight: 600;
      margin-right: 0.5rem;
    }

    .question-text {
      flex: 1;
      color: #2d3748;
      font-weight: 500;
    }

    .toggle-icon {
      width: 20px;
      height: 20px;
      position: relative;
      transition: transform 0.3s ease;

      &::before,
      &::after {
        content: '';
        position: absolute;
        background-color: var(--primary-color);
        border-radius: 2px;
      }

      &::before {
        width: 2px;
        height: 12px;
        left: 9px;
        top: 4px;
      }

      &::after {
        width: 12px;
        height: 2px;
        left: 4px;
        top: 9px;
      }
    }
  }

  .faq-answer {
    padding: 0 1.25rem 1.25rem;
    color: #4a5568;
    line-height: 1.7;

    p {
      margin-bottom: 1rem;

      &:last-child {
        margin-bottom: 0;
      }
    }
  }
}

@media (max-width: 768px) {
  .faq-wrapper {
    padding: 1.5rem;
  }

  h1 {
    font-size: 2rem;
  }
}
</style>