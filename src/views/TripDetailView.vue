<script setup lang="ts">
import { computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useTravelStore } from '../stores/travel';

const route = useRoute();
const router = useRouter();
const store = useTravelStore();

const trip = computed(() => {
  return store.trips.find(t => t.id === route.params.id);
});

if (!trip.value) {
  router.push({ name: 'not-found' });
}
</script>

<template>
  <div v-if="trip" class="max-w-4xl mx-auto">
    <button @click="router.back()" class="btn btn-ghost mb-4">← Назад до стрічки</button>
    
    <div class="card bg-base-100 shadow-xl">
      <figure><img :src="trip.image" :alt="trip.title" class="w-full max-h-96 object-cover" /></figure>
      <div class="card-body">
        <h1 class="card-title text-4xl">{{ trip.title }}</h1>
        <div class="flex flex-wrap gap-2 my-2">
          <div class="badge badge-primary">{{ trip.location }}</div>
          <div class="badge badge-secondary">{{ trip.date }}</div>
        </div>
        <div class="divider"></div>
        <p class="text-lg whitespace-pre-wrap">{{ trip.description }}</p>
        
        <h3 class="font-bold text-xl mt-6 mb-2">Мітки</h3>
        <div class="flex gap-2">
          <span v-for="tag in trip.tags" :key="tag" class="badge badge-accent">{{ tag }}</span>
        </div>
      </div>
    </div>
  </div>
</template>