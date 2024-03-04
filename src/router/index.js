import { createRouter, createWebHistory } from "vue-router";
import DefaultLayout from '../components/DefaultLayout.vue'
import Home from '../views/Home.vue'
import AddUser from '../views/add/AddUser.vue'
import EditUser from '../views/edit/EditUser.vue'

const routes = [
  {
    path: "/",
    component: DefaultLayout,
    children: [
      {
        path: "/",
        name: "home",
        component: Home,
      },
      {
        path: "/add-user",
        name: "add_user",
        component: AddUser,
      },
      {
        path: "/edit-user/:id",
        name: "edit_user",
        component: EditUser,
      },
    ]
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
