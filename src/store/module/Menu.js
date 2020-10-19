const state = {
  menu: [{
    name: 'Home',
    icon: 'home',
    to: '/rem/home',
    subMenu: []
  },
  {
    name: 'Menu',
    icon: 'menu',
    to: '/rem',
    subMenu: [{
      name: 'Slider',
      icon: 'pages',
      to: '/rem/slider'
    },
    {
      name: 'Product List ',
      icon: 'restaurant',
      to: '/rem/product-list'
    },
    {
      name: 'AR - Video',
      icon: 'camera_roll',
      to: '/rem/ar-video'
    },
    {
      name: 'AR - Image',
      icon: 'camera',
      to: '/rem/ar-image'
    },
    {
      name: 'AR - Menu',
      icon: 'menu',
      to: '/rem/ar-menu'
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
