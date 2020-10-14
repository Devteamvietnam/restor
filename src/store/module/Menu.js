const state = {
  menu: [{
    name: 'Home',
    icon: 'home',
    to: '/admin/home',
    subMenu: []
  },
  {
    name: 'Menu',
    icon: 'menu',
    to: '/admin',
    subMenu: [{
      name: 'Slider',
      icon: 'pages',
      to: '/admin/slider'
    },
    {
      name: 'Product List ',
      icon: 'restaurant',
      to: '/admin/product'
    },
    {
      name: 'AR',
      icon: 'camera',
      to: '/admin/arproductlist'
    },
    {
      name: 'Menu Footer ',
      icon: 'web',
      to: '/admin/footer'
    }
    ]
  }
  ]
}
// const mutations = {
//     setApprovalMenu(state) {
//         state.menu = state.approvalMenu
//     },
// }

export default {
  namespaced: true,
  state
}
