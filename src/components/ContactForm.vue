<script setup>
import { ref, reactive } from 'vue'

const form = reactive({
  firstName: '',
  lastName: '',
  email: '',
  telephone: '',
  message: ''
})

const errors = reactive({
  firstName: '',
  lastName: '',
  email: '',
  message: ''
})

const isSubmitting = ref(false)
const agreeToTerms = ref(false)

const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)

const validateField = (field) => {
  errors[field] = ''
  switch (field) {
    case 'firstName':
      if (!form.firstName.trim()) errors.firstName = 'First name is required'
      break
    case 'lastName':
      if (!form.lastName.trim()) errors.lastName = 'Last name is required'
      break
    case 'email':
      if (!form.email.trim()) errors.email = 'Email is required'
      else if (!validateEmail(form.email)) errors.email = 'Enter a valid email'
      break
    case 'message':
      if (!form.message.trim()) errors.message = 'Message is required'
      break
  }
}

const validateForm = () => {
  validateField('firstName')
  validateField('lastName')
  validateField('email')
  validateField('message')
  return !Object.values(errors).some(error => error !== '')
}

const submitForm = async () => {
  if (!validateForm()) return
  if (!agreeToTerms.value) return alert('Please agree to the Terms & Conditions')
  isSubmitting.value = true
  setTimeout(() => {
    alert(`Form submitted!\n\nFirst Name: ${form.firstName}\nLast Name: ${form.lastName}\nEmail: ${form.email}\nTelephone: ${form.telephone}\nMessage: ${form.message}`)
    Object.keys(form).forEach(key => form[key] = '')
    Object.keys(errors).forEach(key => errors[key] = '')
    agreeToTerms.value = false
    isSubmitting.value = false
  }, 1000)
}
</script>

<template>
  <section id="contact" class="contact-section">
    <div class="container">
      <div class="contact-layout">
        <!-- Contact Form -->
        <div class="contact-form">
          <div class="contact-form__header">
            <h2 class="contact-form__title">How to reach us</h2>
            <p class="contact-form__description">Lorem ipsum dolor sit amet, consectetur.</p>
          </div>

          <form @submit.prevent="submitForm" class="contact-form__form">
            <div class="form-row">
              <div class="form-group">
                <label for="firstName">First Name *</label>
                <input id="firstName" v-model="form.firstName" type="text" :class="{ error: errors.firstName }" @blur="validateField('firstName')" />
                <div v-if="errors.firstName" class="error-message">{{ errors.firstName }}</div>
              </div>

              <div class="form-group">
                <label for="lastName">Last Name *</label>
                <input id="lastName" v-model="form.lastName" type="text" :class="{ error: errors.lastName }" @blur="validateField('lastName')" />
                <div v-if="errors.lastName" class="error-message">{{ errors.lastName }}</div>
              </div>
            </div>

            <div class="form-group">
              <label for="email">Email *</label>
              <input id="email" v-model="form.email" type="email" :class="{ error: errors.email }" @blur="validateField('email')" />
              <div v-if="errors.email" class="error-message">{{ errors.email }}</div>
            </div>

            <div class="form-group">
              <label for="telephone">Telephone</label>
              <input id="telephone" v-model="form.telephone" type="tel" />
            </div>

            <div class="form-group">
              <label for="message">Message *</label>
              <textarea id="message" v-model="form.message" rows="3" :class="{ error: errors.message }" @blur="validateField('message')"></textarea>
              <div v-if="errors.message" class="error-message">{{ errors.message }}</div>
            </div>

            <div class="form-group">
              <label class="checkbox-container">
                <input type="checkbox" v-model="agreeToTerms" />
                <span>
                  I agree to the <a href="#">Terms & Conditions</a>
                </span>
              </label>
            </div>

            <div class="form-group">
              <p class="required-note">* required fields</p>
            </div>

            <div class="form-group button-container">
            <button
                   type="submit"
                   class="btn btn--primary contact-form__submit"
                  :disabled="isSubmitting"
            >
            <span v-if="isSubmitting">Sending...</span>
            <span v-else>SUBMIT</span>
            </button>
            </div>

          </form>
        </div>

        <!-- Map Section -->
        <div class="map-section">
          <div class="map-container">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d48588.133010545425!2d-3.7152472!3d40.4363503!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xd422f35d4f0c269%3A0x754405946e8ca584!2sAmadeus%20IT%20Group!5e0!3m2!1sen!2slk!4v1751705257569!5m2!1sen!2slk"
              width="100%"
              height="100%"
              style="border:0;"
              allowfullscreen=""
              loading="lazy"
              referrerpolicy="no-referrer-when-downgrade"
              title="Amadeus IT Group Location"
            ></iframe>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped lang="scss">
.contact-section {
  background-color: #000;
  padding: 3rem 1rem;
  color: white;
  font-family: Boomer Tantrum;
}

.contact-layout {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0;
  max-height: 100%;
  height: 100%px;

  @media (max-width: 1024px) {
    grid-template-columns: 1fr;
    height: auto;
  }
}

.contact-form {
  padding: 2rem;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;

  &__header {
    margin-bottom: 1.5rem;
  }

  &__title {
    font-size: 2rem;
    font-weight: 700;
    color: white;
    font-family: Barlow SemiBold;
  }

  &__description {
    font-size: 1rem;
    color: #aaa;
    font-family: Barlow SemiBold;
  }

  &__form {
    flex: 1;
  }

  .button-container {
  display: flex;
  justify-content: flex-end;
}


  &__submit {
    width: 50%;
    padding: 0.75rem;
    background-color: #d49d00;
    border: none;
    font-weight: bold;
    color: white;
    cursor: pointer;
    transition: background 0.3s ease;
    

    &:hover:not(:disabled) {
      background-color: #eeb500;
    }

    &:disabled {
      opacity: 0.6;
      cursor: not-allowed;
    }
  }
}

.form-row {
  display: flex;
  gap: 1rem;

  @media (max-width: 768px) {
    flex-direction: column;
  }
}

.form-group {
  margin-bottom: 1rem;

  label {
    display: block;
    margin-bottom: 0.25rem;
    font-weight: 500;
  }

  input,
  textarea {
    width: 100%;
    padding: 0.5rem;
    background: #333;
    border: 1px solid #444;
    color: white;
    border-radius: 4px;

    &.error {
      border-color: red;
    }
  }

  textarea {
    resize: vertical;
    min-height: 60px;
  }

  .error-message {
    color: red;
    font-size: 0.8rem;
  }
}

.checkbox-container {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.9rem;
  color: #aaa;

  input[type='checkbox'] {
    width: 16px;
    height: 16px;
    accent-color: #0a0000;
    cursor: pointer;
    margin: 1;
  }

  a {
    color: #fff;
    text-decoration: underline;
  }
}

.map-section {
  height: 100%;
  background: none;

  @media (max-width: 1024px) {
    height: 100%;
  }
}

.map-container {
  width: 100%;
  height: 100%;

  iframe {
    width: 100%;
    height: 100%;
    border: 0;
    filter: none;
  }
}
</style>
