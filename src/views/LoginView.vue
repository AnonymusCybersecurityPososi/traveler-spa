<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const nickname = ref('');
const errorMsg = ref('');

const handleLogin = () => {
  if (nickname.value.trim().length < 3) {
    errorMsg.value = 'Нікнейм має містити мінімум 3 символи';
    return;
  }
  
  sessionStorage.setItem('token', `fake-jwt-token-for-${nickname.value}`);
  
  router.push('/cabinet');
};
</script>

<template>
  <div class="flex justify-center items-center h-[70vh]">
    <div class="card w-96 bg-base-100 shadow-xl">
      <div class="card-body">
        <h2 class="card-title justify-center text-2xl mb-4">Вхід</h2>
        <form @submit.prevent="handleLogin">
          <div class="form-control w-full">
            <label class="label"><span class="label-text">Ваш нікнейм</span></label>
            <input 
              v-model="nickname" 
              type="text" 
              placeholder="Введіть нікнейм" 
              class="input input-bordered w-full" 
            />
            <label v-if="errorMsg" class="label"><span class="label-text-alt text-error">{{ errorMsg }}</span></label>
          </div>
          <div class="card-actions justify-end mt-6">
            <button type="submit" class="btn btn-primary w-full">Увійти</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>