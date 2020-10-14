
const routes = [
  {
    path: '/admin',
    component: () => import('layouts/AdminLayout.vue'),
    children: [
      { path: 'admin', component: () => import('pages/admin/Index.vue') },
      { path: 'slider', component: () => import('pages/admin/Menu/Slider.vue') },
      { path: 'product-list', component: () => import('pages/admin/Menu/Product-list.vue') },
      { path: 'ar-video', component: () => import('pages/admin/Menu/Ar-Video.vue') },
      { path: 'ar-image', component: () => import('pages/admin/Menu/Ar-Image.vue') },
      { path: 'ar-menu', component: () => import('pages/admin/Menu/Ar-Menu.vue') }
    ]
  }
]

// Always leave this as last one
if (process.env.MODE !== 'ssr') {
  routes.push({
    path: '*',
    component: () =>
      import('pages/Error404.vue')
  })
}
export default routes
