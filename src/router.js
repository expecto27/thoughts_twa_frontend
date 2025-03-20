import { createWebHistory, createRouter } from "vue-router";
import ListThoughts from "./components/ListThoughts.vue";
import AddThought from "./components/AddThought.vue";
import CommingSoon from "./components/CommingSoon.vue";
const routes = [
    {
        path: "/listThoughts",
        name: "thoughts",
        alias: "/thoughts",
        component: ListThoughts,
        meta: {
            title: "мои мысли"
        }
    },
    {
        path: "/addThoughts",
        name: "add",
        alias: "/addthoughts",
        component: AddThought,
        meta: {
            title: "предложка"
        }
    },
    {
        path: "/soon",
        name: "soon",
        alias: "/commingSoon",
        component: CommingSoon,
        meta: {
            title: "скоро"
        }
    }
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

router.beforeEach((to, from, next) => {
    document.title = to.meta.title || 'главная страница';
    next();
});

export default router;