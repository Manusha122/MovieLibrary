<script setup>
import { provide, ref } from 'vue'
import Header from './components/Header.vue'
import Hero from './components/Hero.vue'
import MovieGrid from './components/MovieGrid.vue'
import ContactForm from './components/ContactForm.vue'
import Map from './components/Map.vue'
import Footer from './components/Footer.vue'

// Global state for movies
const movies = ref([])
const isLoading = ref(false)

// Provide global state
provide('movies', movies)
provide('isLoading', isLoading)
</script>

<template>
  <div id="app">
    <Header />
    <Hero />
    <MovieGrid />
    <ContactForm />
    <Map />
    <Footer />
  </div>
</template>

<style lang="scss">
@import './styles/main.scss';
</style>