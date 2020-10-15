
const routes = [
  {
    path: '/admin',
    component: () => import('layouts/AdminLayout.vue'),
    children: [
      { path: 'admin', component: () => import('pages/admin/Index.vue') },
      { path: 'slider', component: () => import('pages/admin/Menu/Slider.vue') },
      { path: 'product-list', component: () => import('pages/admin/Menu/ProductList.vue') },
      { path: 'ar-video', component: () => import('pages/admin/Menu/ArVideo.vue') },
      { path: 'ar-image', component: () => import('pages/admin/Menu/ArImage.vue') },
      { path: 'ar-menu', component: () => import('pages/admin/Menu/ArMenu.vue') },
      { path: 'slider/insert', component: () => import('pages/admin/Menu/SliderInsert') },
      { path: 'slider/detail/:sliderId', component: () => import('pages/admin/Menu/SliderDetail') },
      { path: 'slider/update/:sliderId', component: () => import('pages/admin/Menu/SliderUpdate') }
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
