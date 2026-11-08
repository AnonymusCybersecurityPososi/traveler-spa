import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  linkActiveClass: 'active',
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/trips/:id',
      name: 'trip-details',
      component: () => import('../views/TripDetailView.vue') // Ледаче завантаження
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/LoginView.vue')
    },
    {
      path: '/cabinet',
      name: 'cabinet',
      component: () => import('../views/CabinetView.vue'),
      meta: { requiresAuth: true },
      redirect: '/cabinet/profile',
      children: [
        {
          path: 'new-trip',
          name: 'new-trip',
          component: () => import('../views/cabinet/NewTripView.vue')
        },
        {
          path: 'profile',
          name: 'profile',
          component: () => import('../views/cabinet/ProfileView.vue')
        }
      ]
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'not-found',
      component: () => import('../views/NotFoundView.vue')
    }
  ]
});

router.beforeEach((to, from, next) => {
  const isAuthenticated = !!sessionStorage.getItem('token');

  if (to.meta.requiresAuth && !isAuthenticated) {
    next('/login');
  } else if (to.path === '/login' && isAuthenticated) {
    next('/cabinet');
  } else {
    next();
  }
});

export default router;