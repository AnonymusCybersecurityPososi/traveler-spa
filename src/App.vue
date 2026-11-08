<script setup lang="ts">
import { useRouter } from 'vue-router';
import { computed } from 'vue';

const router = useRouter();
const isAuthenticated = computed(() => !!sessionStorage.getItem('token'));

const logout = () => {
  sessionStorage.removeItem('token');
  router.push('/login');
};
</script>

<template>
  <div class="min-h-screen bg-base-200">
    <div class="navbar bg-base-100 shadow-md">
      <div class="flex-1">
        <router-link to="/" class="btn btn-ghost text-xl">Щоденник Мандрівника</router-link>
      </div>
      <div class="flex-none">
        <ul class="menu menu-horizontal px-1 gap-2">
          <li><router-link to="/">Стрічка</router-link></li>
          <li v-if="!isAuthenticated"><router-link to="/login">Увійти</router-link></li>
          <li v-if="isAuthenticated"><router-link to="/cabinet">Кабінет</router-link></li>
          <li v-if="isAuthenticated"><a @click="logout" class="text-error">Вийти</a></li>
        </ul>
      </div>
    </div>

    <main class="container mx-auto p-4">
      <router-view v-slot="{ Component }">
        <Transition name="fade" mode="out-in" appear>
          <component :is="Component" />
        </Transition>
      </router-view>
    </main>
  </div>
</template>