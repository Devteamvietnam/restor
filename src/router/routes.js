
const routes = [
  {
    path: '/admin',
    component: () => import('layouts/AdminLayout.vue'),
    children: [
      { path: 'admin', component: () => import('pages/admin/Index.vue') },
      { path: 'slider', component: () => import('pages/admin/Menu/Slider.vue') },
      { path: 'slider/insert', component: () => import('pages/admin/Menu/SliderInsert') },
      { path: 'slider/detail/:sliderId', component: () => import('pages/admin/Menu/SliderDetail') },
      { path: 'slider/update/:sliderId', component: () => import('pages/admin/Menu/SliderUpdate') },
      { path: 'product-list', component: () => import('pages/admin/Menu/ProductList.vue') },
      { path: 'product-list/insert', component: () => import('pages/admin/Menu/ProductListInsert.vue') },
      { path: 'product-list/detail/:productId', component: () => import('pages/admin/Menu/ProductListDetail.vue') },
      { path: 'product-list/update/:productId', component: () => import('pages/admin/Menu/ProductListUpdate.vue') },
      { path: 'ar-video', component: () => import('pages/admin/Menu/ArVideo.vue') },
      { path: 'ar-video/insert', component: () => import('pages/admin/Menu/ArVideoInsert.vue') },
      { path: 'ar-video/detail/:arvideoId', component: () => import('pages/admin/Menu/ArVideoDetail.vue') },
      { path: 'ar-video/update/:arvideoId', component: () => import('pages/admin/Menu/ArVideoUpdate.vue') },
      { path: 'ar-image', component: () => import('pages/admin/Menu/ArImage.vue') },
      { path: 'ar-image/insert', component: () => import('pages/admin/Menu/ArImageInsert.vue') },
      { path: 'ar-image/detail/:arimageId', component: () => import('pages/admin/Menu/ArImageDetail.vue') },
      { path: 'ar-image/update/:arimageId', component: () => import('pages/admin/Menu/ArImageUpdate.vue') },
      { path: 'ar-menu', component: () => import('pages/admin/Menu/ArMenu.vue') }
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
