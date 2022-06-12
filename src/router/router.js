import { createWebHistory, createRouter } from "vue-router";
import MainPage from '@/pages/MainPage';
import TestingPage from '@/pages/TestingPage';
import AbuseName from '@/pages/AbuseName';
import Search from '@/pages/Search';
import Todo from '@/pages/Todo';


const routes = [
  { name: 'main', component: MainPage, path: '/' },
  { name: 'testing', component: TestingPage, path: '/testing' },
  { name: 'abuse', component: AbuseName, path: '/abusive' },
  { name: 'search', component: Search, path: '/search' },
  { name: 'todo', component: Todo, path: '/todo' },
];

const router = createRouter({
  fallback: false,
  history: createWebHistory(),
  routes,
});

export default router;
