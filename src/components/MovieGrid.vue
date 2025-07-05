<script setup>
import { ref, onMounted, inject } from 'vue'
import MovieCard from './MovieCard.vue'
import axios from 'axios'
import BatmanImage from '../assets/Images/Batman.jpg'
import WildWildWestImage from '../assets/Images/Wild West.jpg'
import TheAmazingSpidermanImage from '../assets/Images/Spiderman.jpg'


const movies = inject('movies')
const isLoading = inject('isLoading')
const searchQuery = ref('')

// Initialize with some default movies
const initializeMovies = () => {
  movies.value = [
    {
      id: 1,
      title: 'Batman Returns',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed diam nonummy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua.',
      image: BatmanImage
    },
    {
      id: 2,
      title: 'Wild Wild West',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed diam nonummy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua.',
      image: WildWildWestImage
    },
    {
      id: 3,
      title: 'The Amazing Spiderman',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed diam nonummy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua.',
      image: TheAmazingSpidermanImage
    }
  ]
}

const searchMovies = async () => {
  if (!searchQuery.value.trim()) return

  isLoading.value = true
  
  try {
    const response = await axios.get(`https://api.tvmaze.com/search/shows?q=${searchQuery.value}`)
    
    if (response.data.length > 0) {
      const newMovies = response.data.slice(0, 3).map((result, index) => ({
        id: Date.now() + index,
        title: result.show.name,
        description: result.show.summary 
          ? result.show.summary.replace(/<[^>]*>/g, '').substring(0, 150) + '...'
          : 'No description available',
        image: result.show.image?.medium || 'https://images.pexels.com/photos/7991579/pexels-photo-7991579.jpeg?auto=compress&cs=tinysrgb&w=400&h=600&fit=crop'
      }))
      
      // Add new movies to existing ones
      movies.value = [...movies.value, ...newMovies]
    }
  } catch (error) {
    console.error('Error searching movies:', error)
  } finally {
    isLoading.value = false
    searchQuery.value = ''
  }
}

const removeMovie = (movieId) => {
  movies.value = movies.value.filter(movie => movie.id !== movieId)
}

onMounted(() => {
  initializeMovies()
})
</script>

<template>
  <section id="movie-library" class="movie-grid section">
    <div class="container">
      <div class="movie-grid__header">
        <h2 class="movie-grid__title">Collect your favourites</h2>
        
        <div class="movie-grid__search">
          <div class="search-container">
            <input 
              v-model="searchQuery"
              type="text"
              placeholder="Search title and add to grid"
              class="search-input"
              @keyup.enter="searchMovies"
            />
            <button 
              @click="searchMovies"
              class="search-button"
              :disabled="isLoading || !searchQuery.trim()"
            >
              <span v-if="isLoading" class="loading-spinner"></span>
              <span v-else>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/>
                </svg>
              </span>
            </button>
          </div>
        </div>
      </div>

      <div class="movie-grid__container">
        <MovieCard 
          v-for="movie in movies"
          :key="movie.id"
          :movie="movie"
          @remove="removeMovie"
        />
      </div>

      <div v-if="movies.length === 0" class="movie-grid__empty">
        <div class="empty-state">
          <svg width="64" height="64" viewBox="0 0 24 24" fill="currentColor" class="empty-icon">
            <path d="M18 4l2 4h-3l-2-4h-2l2 4h-3l-2-4H8l2 4H7L5 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V4h-4z"/>
          </svg>
          <h3>No movies in your collection yet</h3>
          <p>Search for movies to add them to your personal library!</p>
        </div>
      </div>
    </div>
  </section>
</template>

<style lang="scss" scoped>
.movie-grid {
  background: #252524;
  padding: var(--spacing-xl) 0;
  min-height: 80vh;

  &__header {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    margin-bottom: var(--spacing-xl);
    gap: var(--spacing-lg);

    @media (max-width: 768px) {
      flex-direction: column;
      gap: var(--spacing-md);
    }
  }

  &__title {
    font-size: clamp(2rem, 4vw, 3rem);
    font-weight: 500;
    color: var(--text-primary);
    margin-bottom: 0;
    text-align: left;
    letter-spacing: -0.02em;
    line-height: 1.1;
  }

  &__search {
    flex-shrink: 0;
    min-width: 400px;

    @media (max-width: 768px) {
      min-width: 100%;
    }
  }

  &__container {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
    gap: var(--spacing-lg);
    margin-bottom: var(--spacing-lg);

    @media (max-width: 768px) {
      grid-template-columns: 1fr;
      gap: var(--spacing-md);
    }
  }

  &__empty {
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 400px;
    padding: var(--spacing-xl);
  }
}

.search-container {
  display: flex;
  background-color: #252524;
  border: 2px solid #ffffff;
  border-radius: 12px;
  overflow: hidden;
  backdrop-filter: blur(10px);
  transition: var(--transition);

  &:focus-within {
    border-color: #ffffff;
    box-shadow: 0 0 0 3px rgba(255, 215, 0, 0.1);
  }
}

.search-input {
  flex: 1;
  padding: var(--spacing-sm) var(--spacing-md);
  border: none;
  background: transparent;
  color: var(--text-primary);
  font-size: 1rem;
  outline: none;

  &::placeholder {
    color: var(--text-muted);
    font-style: italic;
  }
}

.search-button {
  padding: var(--spacing-sm) var(--spacing-md);
  background: #252524;
  color: #ffffff;
  border: none;
  font-weight: 600;
  cursor: pointer;
  transition: var(--transition);
  min-width: 60px;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover:not(:disabled) {
    background: #252524;
    transform: translateY(-1px);
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none;
  }

  svg {
    width: 16px;
    height: 15px;
  }
}

.empty-state {
  text-align: center;
  max-width: 400px;

  .empty-icon {
    color: #ffffff;
    margin-bottom: var(--spacing-md);
    opacity: 0.5;
  }

  h3 {
    font-size: 1.5rem;
    color: var(--text-primary);
    margin-bottom: var(--spacing-sm);
    font-weight: 600;
  }

  p {
    color: var(--text-muted);
    font-size: 1rem;
    line-height: 1.6;
    margin-bottom: 0;
  }
}
</style>