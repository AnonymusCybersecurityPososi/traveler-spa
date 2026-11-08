import { defineStore } from 'pinia';
import { ref, computed } from 'vue';

export interface Trip {
  id: string;
  title: string;
  location: string;
  date: string;
  description: string;
  tags: string[];
  image: string;
}

export interface UserProfile {
  name: string;
  avatarUrl: string;
  bio: string;
}

export const useTravelStore = defineStore('travel', () => {
  const trips = ref<Trip[]>([
    {
      id: '1',
      title: 'Експедиція до Карпат',
      location: 'Яремче, Україна',
      date: '2026-08-15',
      description: 'Тиждень у горах з наметами. Чудові краєвиди та свіже повітря.',
      tags: ['Гори', 'Природа', 'Відпочинок'],
      image: 'https://picsum.photos/seed/karpaty/400/300'
    },
    {
      id: '2',
      title: 'Технологічна виставка',
      location: 'Київ, Україна',
      date: '2026-10-10',
      description: 'Відвідали виставку новітнього заліза та рішень з кібербезпеки.',
      tags: ['Місто', 'Технології'],
      image: 'https://picsum.photos/seed/kyiv/400/300'
    }
  ]);

  const profile = ref<UserProfile>({
    name: 'Маргоша',
    avatarUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Margosha',
    bio: 'Студентка кібербезпеки з Одеси. У вільний час люблю паяти плати, ремонтувати техніку та подорожувати новими місцями.'
  });

  const addTrip = (trip: Trip) => {
    trips.value.unshift(trip);
  };

  const updateProfile = (newProfile: UserProfile) => {
    profile.value = { ...newProfile };
  };

  return { trips, profile, addTrip, updateProfile };
});