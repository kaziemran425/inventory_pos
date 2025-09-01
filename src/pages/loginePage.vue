<!-- LoginPage.vue -->
<template>
  <div class="login-page ">
    <div class="login-card bg-red">
      <h2>Login</h2>

      <!-- Login Form -->
      <form @submit.prevent="handleLogin">
        <!-- Email -->
        <div class="input-group">
          <label>Email</label>
          <input v-model="email" type="email" placeholder="Enter email" required />
        </div>

        <!-- Password -->
        <div class="input-group">
          <label>Password</label>
          <input v-model="password" type="password" placeholder="Enter password" required />
        </div>

        <!-- Remember + Forgot -->
        <div class="options">
          <label>
            <input type="checkbox" v-model="remember" />
            Remember me
          </label>
          <a href="#">Forgot password?</a>
        </div>

        <!-- Login button -->
        <button class="login-btn" type="submit" :disabled="loading">
          <span v-if="!loading">Log in</span>
          <span v-else>Logging in…</span>
        </button>
      </form>

      <!-- Divider -->
      <div class="divider"><span>OR</span></div>

      <!-- Google Sign-in -->
      <button class="google-btn" @click="signInWithGoogle">
        <img src="https://www.svgrepo.com/show/355037/google.svg" alt="Google" />
        Sign in with Google
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";

const email = ref("");
const password = ref("");
const remember = ref(false);
const loading = ref(false);

function handleLogin() {
  loading.value = true;
  setTimeout(() => {
    alert(`Login: ${email.value}, Remember: ${remember.value}`);
    loading.value = false;
  }, 1500);
}

function signInWithGoogle() {
  alert("Google sign-in clicked! (connect Firebase/Auth here)");
}
</script>

<style scoped>
.login-page {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background: #f1f5f9;
}
.login-card {
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
}
.login-btn {
  width: 100%;
  padding: 0.75rem;
  background: #2563eb;
  color: white;
  font-weight: bold;
  border: none;
  border-radius: 0.5rem;
  cursor: pointer;
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
</style>
