<script setup lang="ts">
import { ref } from 'vue';
import { useTravelStore } from '../../stores/travel';

const store = useTravelStore();
const formData = ref({ ...store.profile });
const isSaved = ref(false);

const saveProfile = () => {
  store.updateProfile(formData.value);
  isSaved.value = true;
  setTimeout(() => isSaved.value = false, 3000);
};
</script>

<template>
  <div>
    <h2 class="text-2xl font-semibold mb-4">Налаштування профілю</h2>
    <form @submit.prevent="saveProfile" class="flex flex-col gap-4 max-w-md">
      
      <div class="avatar mb-4">
        <div class="w-24 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
          <img :src="formData.avatarUrl" alt="Avatar" />
        </div>
      </div>

      <div class="form-control">
        <label class="label"><span class="label-text">Ім'я</span></label>
        <input v-model="formData.name" type="text" class="input input-bordered" required />
      </div>

      <div class="form-control">
        <label class="label"><span class="label-text">URL Аватара</span></label>
        <input v-model="formData.avatarUrl" type="url" class="input input-bordered" />
      </div>

      <div class="form-control">
        <label class="label"><span class="label-text">Біографія</span></label>
        <textarea v-model="formData.bio" class="textarea textarea-bordered h-24" required></textarea>
      </div>

      <button type="submit" class="btn btn-primary mt-2">Зберегти зміни</button>
      
      <div v-if="isSaved" class="alert alert-success mt-4">
        <span>Профіль успішно оновлено!</span>
      </div>
    </form>
  </div>
</template>