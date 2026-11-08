<script setup lang="ts">
import { ref, computed } from 'vue';
import { useTravelStore } from '../stores/travel';

const store = useTravelStore();
const searchQuery = ref('');
const sortBy = ref<'dateDesc' | 'dateAsc'>('dateDesc');

const filteredAndSortedTrips = computed(() => {
  let result = [...store.trips];

  if (searchQuery.value) {
    const q = searchQuery.value.toLowerCase();
    result = result.filter(trip => 
      trip.tags.some(tag => tag.toLowerCase().includes(q)) || 
      trip.location.toLowerCase().includes(q)
    );
  }

  result.sort((a, b) => {
    const dateA = new Date(a.date).getTime();
    const dateB = new Date(b.date).getTime();
    return sortBy.value === 'dateDesc' ? dateB - dateA : dateA - dateB;
  });

  return result;
});
</script>

<template>
  <div>
    <div class="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
      <h1 class="text-3xl font-bold">Стрічка подорожей</h1>
      <div class="flex gap-2">
        <input 
          v-model="searchQuery" 
          type="text" 
          placeholder="Пошук за мітками або містом..." 
          class="input input-bordered w-full max-w-xs" 
        />
        <select v-model="sortBy" class="select select-bordered">
          <option value="dateDesc">Спочатку нові</option>
          <option value="dateAsc">Спочатку старі</option>
        </select>
      </div>
    </div>

    <TransitionGroup name="list" tag="div" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 relative">
      <div 
        v-for="trip in filteredAndSortedTrips" 
        :key="trip.id" 
        class="card bg-base-100 shadow-xl hover:shadow-2xl transition-shadow w-full"
      >
        <figure><img :src="trip.image" :alt="trip.title" class="h-48 w-full object-cover" /></figure>
        <div class="card-body">
          <h2 class="card-title">{{ trip.title }}</h2>
          <p class="text-sm text-gray-500">{{ trip.location }} | {{ trip.date }}</p>
          <p class="truncate">{{ trip.description }}</p>
          <div class="card-actions justify-end mt-2">
            <span v-for="tag in trip.tags" :key="tag" class="badge badge-outline">{{ tag }}</span>
          </div>
          <div class="card-actions justify-end mt-4">
            <router-link :to="`/trips/${trip.id}`" class="btn btn-primary btn-sm">Детальніше</router-link>
          </div>
        </div>
      </div>
    </TransitionGroup>
    
    <div v-if="filteredAndSortedTrips.length === 0" class="text-center mt-10 text-xl opacity-50">
      Подорожей не знайдено 
    </div>
  </div>
</template>