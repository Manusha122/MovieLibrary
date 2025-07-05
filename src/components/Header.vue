<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import LogoWhite from '../assets/logos/Logo White.svg'

const isMenuOpen = ref(false)
const isScrolled = ref(false)

const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value
}

const handleScroll = () => {
  isScrolled.value = window.scrollY > 50
}

const scrollToSection = (sectionId) => {
  const element = document.getElementById(sectionId)
  if (element) {
    element.scrollIntoView({ behavior: 'smooth' })
  }
  isMenuOpen.value = false
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll)
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>

<template>
  <header class="header" :class="{ 'header--scrolled': isScrolled }">
    <div class="container">
      <div class="header__content">
        <div class="header__logo">
          <img 
            :src="LogoWhite" 
            alt="Logoipsum Cinema Logo" 
            class="header__logo-image"
            width="80" 
            height="80"
          />
          
        </div>

        <nav class="header__nav" :class="{ 'header__nav--open': isMenuOpen }">
          <a href="#home" @click="scrollToSection('home')" class="header__nav-link">HOME</a>
          <a href="#screens" @click="scrollToSection('screens')" class="header__nav-link">OUR SCREENS</a>
          <a href="#schedule" @click="scrollToSection('schedule')" class="header__nav-link">SCHEDULE</a>
          <a href="#movie-library" @click="scrollToSection('movie-library')" class="header__nav-link">MOVIE LIBRARY</a>
          <a href="#contact" @click="scrollToSection('contact')" class="header__nav-link">LOCATION & CONTACT</a>
        </nav>

        <button class="header__menu-toggle" @click="toggleMenu" :class="{ 'header__menu-toggle--open': isMenuOpen }">
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>
    </div>
  </header>
</template>

<style lang="scss" scoped>
.header {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  background-color: rgba(10, 10, 10, 0.9);
  backdrop-filter: blur(10px);
  transition: var(--transition);
  border-bottom: 1px solid transparent;

  &--scrolled {
    background-color: rgba(10, 10, 10, 0.95);
    border-bottom-color: var(--border-color);
  }

  &__content {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: var(--spacing-sm) 0;
  }

  &__logo {
   
    &-image {
      width: 180px;
      height: 40px;
      object-fit: contain;
    }

    &-text {
      color: var(--text-primary);
    }
  }

  &__nav {
    display: flex;
    align-items: center;
    gap: var(--spacing-lg);

    @media (max-width: 768px) {
      position: fixed;
      top: 0;
      right: -100%;
      height: 100vh;
      width: 100%;
      background-color: var(--primary-bg);
      flex-direction: column;
      justify-content: center;
      transition: var(--transition);

      &--open {
        right: 0;
      }
    }

    &-link {
      color: var(--text-secondary);
      text-decoration: none;
      font-weight: 500;
      font-size: 0.9rem;
      letter-spacing: 0.5px;
      transition: var(--transition);
      position: relative;

      &::after {
        content: '';
        position: absolute;
        bottom: -4px;
        left: 0;
        width: 0;
        height: 2px;
        background-color: #ffffff;
        transition: var(--transition);
      }

      &:hover {
        color: #ffffff;

        &::after {
          width: 100%;
        }
      }

      @media (max-width: 768px) {
        font-size: 1.5rem;
        padding: var(--spacing-sm) 0;
      }
    }
  }

  &__menu-toggle {
    display: none;
    flex-direction: column;
    background: none;
    border: none;
    cursor: pointer;
    width: 30px;
    height: 30px;
    position: relative;
    z-index: 1001;

    @media (max-width: 768px) {
      display: flex;
    }

    span {
      display: block;
      width: 100%;
      height: 2px;
      background-color: var(--text-primary);
      transition: var(--transition);
      transform-origin: center;

      &:nth-child(1) {
        margin-bottom: 6px;
      }

      &:nth-child(2) {
        margin-bottom: 6px;
      }
    }

    &--open {
      span {
        &:nth-child(1) {
          transform: rotate(45deg) translate(8px, 8px);
        }

        &:nth-child(2) {
          opacity: 0;
        }

        &:nth-child(3) {
          transform: rotate(-45deg) translate(8px, -8px);
        }
      }
    }
  }
}
</style>