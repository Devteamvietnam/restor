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
      name: 'AR - Video',
      icon: 'camera_roll',
      to: '/admin'
    },
    {
      name: 'AR - Image',
      icon: 'camera',
      to: '/admin'
    },
    {
      name: 'AR - Menu',
      icon: 'menu',
      to: '/admin'
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
