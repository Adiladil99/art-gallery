import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: "home",
    component: () => import("../views/HomeView.vue"),
  },
  {
    path: '/wishlist',
    name: "WishlistView",
    component: () => import("../views/WishlistView.vue"),
  },
  {
    path: '/picture/:slug',
    name: "PictureView",
    component: () => import("../views/PictureView.vue"),
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (to.hash) {
        const el = document.querySelector(to.hash);
        if (el) {
        const scrollTop = el.getBoundingClientRect().top + window.pageYOffset - 85;
        window.scrollTo({
          top: scrollTop,
          behavior: 'smooth'
        });
        return null;
      }

    }
    else {
      document.getElementById('app').scrollIntoView({ behavior: 'smooth' })
    }
  }
})

export default router
