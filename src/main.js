import { createApp } from 'vue'
import './styles/main.scss'
import App from './App.vue'

// Add smooth scrolling function to window
window.scrollToSection = (sectionId) => {
  const element = document.getElementById(sectionId)
  if (element) {
    element.scrollIntoView({ behavior: 'smooth' })
  }
}

createApp(App).mount('#app')