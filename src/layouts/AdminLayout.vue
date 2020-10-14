<template>
  <q-layout view="hHh Lpr lFf">
  <q-header elevated  >
      <q-toolbar class="cus-toolbar row flex justify-between">
        <div class="flex justify-between col-sm-3 col-4" style="max-width:250px">
          <h5  style="padding:0px; margin:0px">RESTORANG</h5>
          <q-btn
            flat
            dense
            round
            @click="leftDrawerOpen = !leftDrawerOpen"
            icon="menu"
            aria-label="Menu"
          />
        </div>
                <div class="q-pl-sm q-gutter-sm row items-center no-wrap">
          <q-btn v-if="$q.screen.gt.xs" dense flat>
          </q-btn>
        </div>
      </q-toolbar>
    </q-header>
    <q-drawer v-model="leftDrawerOpen" show-if-above bordered content-class="bg-grey-1" :width="250">
      <q-item style="margin-top:20px;">
        <q-item-label
          style="font-size: 20px; font-weight:bolder; color:#1976D2; margin: auto"
        >DASHBOARD</q-item-label>
      </q-item>
      <q-list padding exact active-class>
        <q-expansion-item v-for="sub in menu" :key="sub.name">
          <template v-slot:header>
            <q-item-section avatar v-if="sub.icon != ''">
              <q-icon color="primary" :name="sub.icon" />
            </q-item-section>
            <q-item-section @click="toMenu(sub.to, sub.name)" :class="{ active: currentMenu == sub.name }">{{ sub.name }}</q-item-section>
          </template>
          <q-list>
            <q-item
              clickable
              v-for="item in sub.subMenu"
              :key="item.name"
              class="cus-sub-menu"
              :active="link === item.name"
              @click="link = item.name"
              active-class="active"
            >
              <q-item-section avatar v-if="item.icon != ''">
                <q-icon size="xs" :name="item.icon" />
              </q-item-section>
              <q-item-section
                style="margin-left:-33px"
                v-if="item.icon != ''"
                @click="toSubmenu(item.to, sub.name)"
              >{{ item.name }}</q-item-section>
              <q-item-section
                style="margin-left:20px"
                v-if="item.icon === ''"
                @click="toSubmenu(item.to, sub.name)"
              >{{ item.name }}</q-item-section>
            </q-item>
          </q-list>
        </q-expansion-item>
      </q-list>
    </q-drawer>
    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
// eslint-disable-next-line no-unused-vars
import { LocalStorage, SessionStorage } from 'quasar'

export default {
  name: 'MainLayout',
  data () {
    return {
      currentMenu: '',
      link: '',
      leftDrawerOpen: false,
      baseUrl: process.env.API
    }
  },
  computed: {
    showAdminBoard () {
      if (this.currentUser && this.currentUser.roles) {
        return this.currentUser.roles.includes('ROLE_ADMIN')
      }

      return false
    },
    menu () {
      return this.$store.state.Menu.menu
    }
  },
  methods: {
    clickMenu () {
      this.$store.commit('changeShowMenuList', !this.$store.state.showMenuList)
      this.right = !this.right
    },
    toMenu (link, name) {
      if (this.$route.path !== link) {
        this.$router.push(link)
        this.currentMenu = name
        this.link = ''
      }
    },
    toSubmenu (link, menuName) {
      if (this.$route.path !== link) {
        this.$router.push(link)
        this.currentMenu = menuName
      }
    }
  },
  created () {
  }
}
</script>

<style scoped>
.cus-title {
  font-size: 20px;
  height: 50px;
  line-height: 50px;
  margin: 0px;
}
.cus-sub-menu {
  padding-left: 70px;
  margin: -10px 0px;
}
.active {
  font-weight: bold;
  color: #1976d2;
}
.cus-text {
  color: #1976d2;
  font-weight: bold;
}
  .clickMenu{
    background-color: #E6F1Fc;
    color: #1976D2;
    border-radius: 15px;
  }
/* @media screen and (min-width: 760px){
    #dropDown {
    position: relative;
    margin-right: -10%;
  }
} */
</style>
