/*
Global JavaScript file
*/

// Import
import Vue from "vue";
import App from "./App.vue";
import VueRouter from "vue-router";
import VueCookies from 'vue-cookies'

import Home from "./components/Home";
import Login from "./components/Login";
import Profile from "./components/Profile";
import Register from "./components/Register";
import Dashboard from "./components/Dashboard";
import Post from "./components/Post";
import Edit from "./components/Edit";

// Add properties to instances
Vue.config.productionTip = false;
Vue.prototype.$urlRoot = 'http://localhost:3003'
Vue.use(VueRouter);
Vue.use(VueCookies)

// fix fetch compatibility for Internet Explorer 11
require('es6-promise').polyfill()
require('isomorphic-fetch')

// Road definition
const router = new VueRouter({
  mode : 'history',
  routes : [
    { path: "*", redirect: "/"}, 
    { path: "/", component: Home, name: "home", meta: {requiresAuth: true}},
    { path: "/register", component: Register, name: "register", meta: {requiresAuth: false}},
    { path: "/login", component: Login, name: "login", meta: {requiresAuth: false}},
    { path: "/profile/:id(\\d+)", component: Profile, name: "profile", meta: {requiresAuth: true}},
    { path: "/dashboard", component: Dashboard, name: "dashboard", meta: {requiresAuth: true, requiresAdminAuth: true}}, 
    { path: "/post/:id(\\d+)", component: Post, name: "post", meta: {requiresAuth: true}},
    { path: "/edit/:id(\\d+)", component: Edit, name: "edit", meta: {requiresAuth: true}},
  ]
});

// Navigation guards 
router.beforeEach((to, from, next) => {

  const authUser = VueCookies.get('token'); 
  const authAdmin = VueCookies.get('userRole'); 

  if(to.meta.requiresAuth){ 
    if(!authUser){
      next('/login')
      return
    }
    if(!authUser){
      next(false);
    } 
    else if(to.meta.requiresAdminAuth){
      if(authAdmin!=1){ 
        next(false);
      }else{
        next();
      }
    }
    else{
      next();
    }
  }else{
    next(); 
  }

});

new Vue({
  router,
  render: h => h(App)
}).$mount("#app");

