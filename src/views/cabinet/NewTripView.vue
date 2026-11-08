<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useTravelStore } from '../../stores/travel';

const store = useTravelStore();
const router = useRouter();

const formData = ref({
  title: '',
  location: '',
  date: '',
  description: '',
  tags: '',
  image: ''
});

const submitTrip = () => {
  const newTrip = {
    id: crypto.randomUUID(),
    title: formData.value.title,
    location: formData.value.location,
    date: formData.value.date,
    description: formData.value.description,
    tags: formData.value.tags.split(',').map(t => t.trim()).filter(t => t),
    image: formData.value.image || 'https://picsum.photos/400/300'
  };

  store.addTrip(newTrip);
  router.push('/');
};
</script>

<template>
  <div>
    <h2 class="text-2xl font-semibold mb-4">Додати нову подорож</h2>
    <form @submit.prevent="submitTrip" class="grid grid-cols-1 md:grid-cols-2 gap-4">
      
      <div class="form-control">
        <label class="label"><span class="label-text">Назва подорожі</span></label>
        <input v-model="formData.title" type="text" class="input input-bordered" required />
      </div>

      <div class="form-control">
        <label class="label"><span class="label-text">Місто / Країна</span></label>
        <input v-model="formData.location" type="text" class="input input-bordered" required />
      </div>

      <div class="form-control">
        <label class="label"><span class="label-text">Дата</span></label>
        <input v-model="formData.date" type="date" class="input input-bordered" required />
      </div>

      <div class="form-control">
        <label class="label"><span class="label-text">Мітки (через кому)</span></label>
        <input v-model="formData.tags" type="text" placeholder="Гори, Ліс, Відпочинок" class="input input-bordered" />
      </div>

      <div class="form-control md:col-span-2">
        <label class="label"><span class="label-text">URL Фотографії (опціонально)</span></label>
        <input v-model="formData.image" type="url" class="input input-bordered" />
      </div>

      <div class="form-control md:col-span-2">
        <label class="label"><span class="label-text">Опис</span></label>
        <textarea v-model="formData.description" class="textarea textarea-bordered h-32" required></textarea>
      </div>

      <div class="md:col-span-2 mt-4 text-right">
        <button type="submit" class="btn btn-success px-8">Опублікувати</button>
      </div>
    </form>
  </div>
</template>