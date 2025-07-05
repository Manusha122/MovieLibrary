<script setup>
import { computed } from 'vue'

import twitterIcon from '../assets/Icons/Twitter White.svg'
import youtubeIcon from '../assets/Icons/Youtube White.svg'

const currentYear = computed(() => new Date().getFullYear())

const socialLinks = [
  {
    name: 'Twitter',
    url: 'https://twitter.com',
    icon: twitterIcon
  },
  {
    name: 'YouTube',
    url: 'https://youtube.com',
    icon: youtubeIcon
  }
]
</script>

<template>
  <footer class="footer">
    <div class="container">
      <div class="footer__content">
        <div class="footer__info">
          <h3 class="footer__title">Amadeus IT Group</h3>
          <address class="footer__address">
            C. Salvador de Madariaga, 1<br />
            28027 Madrid<br />
            Spain
          </address>
        </div>

        <div class="footer__social-row">
          <span class="footer__social-title">Follow us on</span>
          <div class="footer__social-links">
            <a
              v-for="social in socialLinks"
              :key="social.name"
              :href="social.url"
              target="_blank"
              rel="noopener noreferrer"
              class="footer__social-link"
              :title="social.name"
            >
              <img :src="social.icon" :alt="social.name" class="footer__icon" />
            </a>
          </div>
        </div>
      </div>

      <div class="footer__bottom-row">
        <p class="footer__copyright">
          Copyright © {{ currentYear }} Amadeus Hotels. All rights reserved.
        </p>
        <p class="footer__credits">
          Photos by
          <a href="https://www.pexels.com/@felixmoonstream" target="_blank" rel="noopener noreferrer">
            Felix Mooneeram
          </a>
          &amp;
          <a href="https://www.pexels.com/@serge-kutuzov" target="_blank" rel="noopener noreferrer">
            Serge Kutuzov
          </a>
          on
          <a href="https://unsplash.com" target="_blank" rel="noopener noreferrer">Unsplash</a>
        </p>
      </div>
    </div>
  </footer>
</template>

<style scoped lang="scss">
.footer {
  background-color: #252524;
  border-top: 1px solid var(--border-color);
  padding: var(--spacing-xl) 0 var(--spacing-md);

  &__content {
    display: grid;
    grid-template-columns: 1fr auto;
    gap: var(--spacing-xl);
    align-items: start;
    margin-bottom: var(--spacing-lg);

    @media (max-width: 768px) {
      grid-template-columns: 1fr;
      gap: var(--spacing-lg);
      text-align: center;
    }
  }

  &__info {
    .footer__title {
      font-size: 1.5rem;
      font-weight: 700;
      color: var(--text-primary);
      margin-bottom: var(--spacing-sm);
    }

    .footer__address {
      color: var(--text-secondary);
      font-style: normal;
      line-height: 1.6;
    }
  }

  &__social-row {
    display: flex;
    align-items: center;
    gap: var(--spacing-sm);
    justify-content: flex-end;

    @media (max-width: 768px) {
      justify-content: center;
      flex-direction: column;
    }

    .footer__social-title {
      font-size: 1rem;
      font-weight: 600;
      color: var(--text-primary);
    }
  }

  &__social-links {
    display: flex;
    gap: var(--spacing-sm);

    @media (max-width: 768px) {
      justify-content: center;
    }
  }

  &__social-link {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background-color: var(--secondary-bg);
    border: 1px solid var(--border-color);
    transition: var(--transition);
    text-decoration: none;

    &:hover {
      background-color: var(--accent-color);
      transform: translateY(-2px);
    }
  }

  &__icon {
    width: 18px;
    height: 18px;
    object-fit: contain;
    display: block;
  }

  &__bottom-row {
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-top: 1px solid var(--border-color);
    padding-top: var(--spacing-md);
    color: var(--text-muted);
    font-size: 0.9rem;

    @media (max-width: 768px) {
      flex-direction: column;
      text-align: center;
      gap: var(--spacing-xs);
    }

    .footer__credits a {
      color: #fff;
      text-decoration: underline;
    }
  }
}
</style>
