<script setup>
import { ref, onMounted } from 'vue'

const heroRef = ref(null)

const scrollToSection = (sectionId) => {
  const element = document.getElementById(sectionId)
  if (element) {
    element.scrollIntoView({ behavior: 'smooth' })
  }
}

onMounted(() => {
  if (heroRef.value) {
    heroRef.value.classList.add('fade-in')
  }
})
</script>

<template>
  <section id="home" class="hero" ref="heroRef">
    <div class="hero__background">
      <video 
        class="hero__video"
        autoplay
        muted
        loop
        playsinline
      >
        <source src="/src/assets/videos/Header Video.mp4" type="video/mp4">
        Your browser does not support the video tag.
      </video>
      <div class="hero__overlay"></div>
    </div>

    <!-- Introduction Section -->
    <div class="introduction-section">
      <div class="container">
        <div class="introduction__content">
          <h2 class="introduction__title">MOVIE LIBRARY</h2>
          <p class="introduction__description">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed diam nonummy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua.
          </p>
        </div>
      </div>
    </div>
  </section>
</template>

<style lang="scss" scoped>
.hero {
  position: relative;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;

  &__background {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: -1;
  }

  &__video {
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center;
  }

  &__overlay {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(
      135deg,
      rgba(10, 10, 10, 0.8) 0%,
      rgba(10, 10, 10, 0.4) 50%,
      rgba(10, 10, 10, 0.8) 100%
    );
  }

  &__content {
    text-align: center;
    z-index: 1;
    max-width: 800px;
    margin: 0 auto;
    padding: 0 var(--spacing-md);
  }

  &__title {
    font-size: clamp(2.5rem, 6vw, 4.5rem);
    font-weight: 700;
    margin-bottom: var(--spacing-md);
    color: var(--text-primary);
    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.7);
  }

  &__subtitle {
    font-size: clamp(1.1rem, 3vw, 1.5rem);
    color: var(--text-secondary);
    margin-bottom: var(--spacing-lg);
    text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.7);
  }

  &__actions {
    display: flex;
    gap: var(--spacing-md);
    justify-content: center;
    flex-wrap: wrap;

    @media (max-width: 480px) {
      flex-direction: column;
      align-items: center;
    }
  }
}

.introduction-section {
  background-color: var(--primary-bg);
  padding: var(--spacing-xl) 0;
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 2;

  .introduction__content {
    max-width: 600px;
    text-align: left;
  }

  .introduction__title {
    font-size: clamp(2rem, 5vw, 3rem);
    font-weight: 700;
    color: var(--text-primary);
    margin-bottom: var(--spacing-lg);
    letter-spacing: 2px;
  }

  .introduction__description {
    font-size: 1.1rem;
    color: var(--text-secondary);
    line-height: 1.8;
    margin-bottom: 0;
  }
}
</style>