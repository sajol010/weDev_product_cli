import { createWebHistory, createRouter } from 'vue-router';

// Layouts

import DefaultLayout from "@/layouts/DefaultLayout"
import AuthLayout from "@/layouts/AuthLayout"


// Products

import ProductList from "@/components/products/ProductList"
import ProductAdd from "@/components/products/ProductAdd"
import ProductEdit from "@/components/products/ProductEdit"


import Login from "@/components/auth/Login"
//middlewares
import nextFactory from "@/middleware/pipeline";
import auth from "@/middleware/auth";
import checkAuth from "@/middleware/checkAuth";
window.auth = auth;
window.checkAuth = checkAuth;

//Stores
import store from "@/store/index";

const routes = [
    {
        path: '/products',
        component: DefaultLayout,
        meta: {
            middleware: ['auth']
        },
        children:[
            {
                path: '/products',
                component: ProductList,
                name:'ListProduct',

            },
            {
                path: '/products/create',
                component: ProductAdd,
                name:'AddProduct'
            },
            {
                path: '/products/edit/:id',
                component: ProductEdit,
                name:'EditProduct'
            }
        ]
    },

    {
        path: '/login',
        component: AuthLayout,
        meta: {
            middleware: ['checkAuth']
        },
        children: [
            {
                path: '/login',
                component: Login,
                name:'Login'
            },
            // {
            //     path: '/register',
            //     component: ProductEdit,
            //     name:'Register'
            // }

        ]
    },


    { path: "/:pathMatch(.*)*", redirect: "/products" }, //dont remove this line
];

const router = createRouter({
    mode: 'history',
    history: createWebHistory(),
    routes,
});





//Restricted area. not permitted to change or delete
router.beforeEach((to, from, next) => {
    if (to.meta.middleware) {
        const middleware = Array.isArray(to.meta.middleware) ? to.meta.middleware : [to.meta.middleware]
        const context = {
            from,
            next,
            router,
            to,
            store
        }
        const nextMiddleware = nextFactory(context, middleware, 1);
        return window[middleware[0]]({ context, next: nextMiddleware });
    }

    return next();
})
export default router;