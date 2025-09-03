<!-- SignupPage.vue -->
<template>
  <div class="q-pa-md">
    <q-card class="my-card">
      <div class="signup-page">
        <div class="signup-card">
          <h2>Create Account</h2>
          <div class="q-py-md">
            Manage all your inventory efficiently. Please set up your personal
            account.
          </div>

          <!-- Signup Form -->
          <form @submit.prevent="handleSignup">
            <!-- First Name -->
            <div class="input-group">
              <label>First Name</label>
              <input
                v-model="firstName"
                type="text"
                placeholder="Enter first name"
                required
              />
            </div>

            <!-- Last Name -->
            <div class="input-group">
              <label>Last Name</label>
              <input
                v-model="lastName"
                type="text"
                placeholder="Enter last name"
                required
              />
            </div>

            <!-- Email -->
            <div class="input-group">
              <label>Email</label>
              <input
                v-model="email"
                type="email"
                placeholder="Enter your email"
                required
              />
            </div>

            <!-- Phone Number -->
            <div class="input-group">
              <label>Phone Number</label>
              <input
                v-model="phone"
                type="tel"
                placeholder="Enter phone number"
                required
              />
            </div>

            <!-- Password -->
            <div class="input-group">
              <label>Password</label>
              <input
                v-model="password"
                type="password"
                placeholder="Enter password"
                required
              />
            </div>

            <!-- Confirm Password -->
            <div class="input-group">
              <label>Confirm Password</label>
              <input
                v-model="confirmPassword"
                type="password"
                placeholder="Confirm password"
                required
              />
            </div>

            <!-- Remember -->
            <div class="options">
              <label>
                <input type="checkbox" v-model="remember" />
                Remember me
              </label>
            </div>

            <!-- Signup button -->
            <button class="signup-btn" type="submit" :disabled="loading">
              <span v-if="!loading">Sign Up</span>
              <span v-else>Signing up…</span>
            </button>
          </form>

          <!-- Divider -->
          <div class="divider"><span>OR</span></div>

          <!-- Google Signup -->
          <button class="google-btn" @click="signUpWithGoogle">
            <img
              src="https://www.svgrepo.com/show/355037/google.svg"
              alt="Google"
            />
            Sign up with Google
          </button>

          <!-- Already have account -->
          <p class="login-link">
            Already have an account? <a href="#">Login</a>
          </p>
        </div>
      </div>
    </q-card>
  </div>
</template>

<script setup>
import { ref } from "vue";

const firstName = ref("");
const lastName = ref("");
const email = ref("");
const phone = ref("");
const password = ref("");
const confirmPassword = ref("");
const remember = ref(false);
const loading = ref(false);

function handleSignup() {
  if (password.value !== confirmPassword.value) {
    alert("Passwords do not match!");
    return;
  }
  loading.value = true;
  setTimeout(() => {
    alert(
      `Signup success:\nName: ${firstName.value} ${lastName.value}\nEmail: ${email.value}\nPhone: ${phone.value}`
    );
    loading.value = false;
  }, 1500);
}

function signUpWithGoogle() {
  alert("Google Sign-up clicked! (connect Firebase/Auth here)");
}
</script>

<style scoped>
.signup-page {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background: #f1f5f9;
}
.signup-card {
  width: 100%;
  max-width: 400px;
  background: white;
  padding: 2rem;
  border-radius: 0.75rem;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
}
.input-group {
  display: flex;
  flex-direction: column;
  margin-bottom: 1rem;
}
.input-group input {
  padding: 0.6rem;
  border: 1px solid #cbd5e1;
  border-radius: 0.5rem;
}
.options {
  display: flex;
  justify-content: space-between;
  margin-bottom: 1rem;
  font-size: 0.9rem;
}
.signup-btn {
  width: 100%;
  padding: 0.75rem;
  background: #16a34a;
  color: white;
  font-weight: bold;
  border: none;
  border-radius: 0.5rem;
  cursor: pointer;
}
.signup-btn:hover {
  background: #15803d;
}
.divider {
  display: flex;
  align-items: center;
  margin: 1rem 0;
  color: #94a3b8;
}
.divider::before,
.divider::after {
  content: "";
  flex: 1;
  border-bottom: 1px solid #e2e8f0;
}
.divider:not(:empty)::before {
  margin-right: 0.75rem;
}
.divider:not(:empty)::after {
  margin-left: 0.75rem;
}
.google-btn {
  width: 100%;
  padding: 0.7rem;
  border: 1px solid #cbd5e1;
  border-radius: 0.5rem;
  background: white;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.6rem;
  cursor: pointer;
}
.google-btn img {
  width: 20px;
  height: 20px;
}
.login-link {
  text-align: center;
  margin-top: 1rem;
  font-size: 0.9rem;
}
.login-link a {
  color: #2563eb;
  text-decoration: none;
}
.login-link a:hover {
  text-decoration: underline;
}
</style>
