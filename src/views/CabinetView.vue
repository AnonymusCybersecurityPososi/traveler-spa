<script setup lang="ts">
</script>

<template>
  <div class="max-w-5xl mx-auto">
    <h1 class="text-3xl font-bold mb-6">Особистий кабінет</h1>
    
    <div class="tabs tabs-boxed mb-6">
      <router-link to="/cabinet/profile" class="tab" exact-active-class="tab-active">Профіль</router-link>
      <router-link to="/cabinet/new-trip" class="tab" exact-active-class="tab-active">Нова подорож</router-link>
    </div>

    <div class="bg-base-100 rounded-box shadow p-6">
      <router-view v-slot="{ Component }">
        <Transition name="fade" mode="out-in" appear>
          <component :is="Component" />
        </Transition>
      </router-view>
    </div>
  </div>
</template>