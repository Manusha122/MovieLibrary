<script setup>
import { ref } from 'vue'

const props = defineProps({
  movie: {
    type: Object,
    required: true
  }
})

const emit = defineEmits(['remove'])

const cardRef = ref(null)

const removeMovie = () => {
  if (cardRef.value) {
    cardRef.value.classList.add('removing')
    setTimeout(() => {
      emit('remove', props.movie.id)
    }, 300)
  }
}
</script>

<template>
  <div class="movie-card" ref="cardRef">
    <div class="movie-card__image-container">
      <img 
        :src="movie.image" 
        :alt="movie.title"
        class="movie-card__image"
      />
      <button 
        class="movie-card__remove"
        @click="removeMovie"
        title="Remove movie"
      >
        ×
      </button>
    </div>
    
    <div class="movie-card__content">
      <h3 class="movie-card__title">{{ movie.title }}</h3>
      <p class="movie-card__description">{{ movie.description }}</p>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.movie-card {
  background-color: #343232;
  border-radius: var(--border-radius);
  overflow: hidden;
  transition: var(--transition);
  border: 2px solid var(--border-color);
  position: relative;

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 8px 2px rgba(0, 0, 0, 0.3);
    border-color: var(--accent-color);
  }

  &.removing {
    opacity: 0;
    transform: scale(0.8);
    transition: all 0.3s ease;
  }

  &__image-container {
    position: relative;
    height: 500px;
    overflow: hidden;
  }

  &__image {
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center;
    transition: var(--transition);
  }

  &__remove {
    position: absolute;
    top: var(--spacing-sm);
    right: var(--spacing-sm);
    width: 32px;
    height: 32px;
    border-radius: 1%;
    background-color: #252524;
    color: white;
    border: none;
    cursor: pointer;
    font-size: 1.2rem;
    font-weight: bold;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: var(--transition);
    opacity: 0;
    transform: scale(0.8);

    &:hover {
      background-color:#252524;
      transform: scale(1.1);
    }
  }

  &:hover &__remove {
    opacity: 1;
    transform: scale(1);
  }

  &__content {
    padding: var(--spacing-md);
  }

  &__title {
    font-size: 1.25rem;
    font-weight: 700;
    color: var(--text-primary);
    margin-bottom: var(--spacing-sm);
    line-height: 1.3;
  }

  &__description {
    color: var(--text-secondary);
    line-height: 1.6;
    margin-bottom: 0;
    font-size: 0.9rem;
  }
}
</style>