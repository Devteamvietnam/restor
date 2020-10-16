<template>
  <div class="cus-layout">
    <q-tabs
      v-model="tab"
      dense
      class="text-grey"
      active-color="primary"
      align="left"
      inline-label
      indicator-color="transparent"
      no-caps
    >
      <q-tab name="armenu" label="AR-MENU" icon="menu" class="cus-tab">
        <q-icon
          name="fas fa-times"
          size="10px"
          style="margin: 0px 0px 2px 10px"
          @click.stop="closeTab"
        />
      </q-tab>
    </q-tabs>
    <!-- <q-separator /> -->
    <q-tab-panels v-model="tab" animated class="cus-tab-section">
      <q-tab-panel name="armenu">
        <div class="float-right title">
          <p>
            <b>AR-MENU</b>
          </p>
        </div>
        <div class="cus-title-table">
          <q-icon name="comment" />&nbsp;&nbsp;&nbsp;Menu - List
        </div>
        <div class="cus-container">
          <div class="row flex justify-between res-menu">
            <div>
              <q-btn
                color="white"
                text-color="black"
                icon="sync"
                class="cus-btn"
                @click="loadpage()"
              />
              <q-btn class="cus-btn" text-color="black" icon="add" to="/admin/ar-menu/insert" />
              <q-btn class="cus-btn" text-color="black" icon="delete" @click="deleteArmenu()" />
            </div>
            <div class="row">
              <q-input outlined dense v-model="ArmenuFilterByTitle" placeholder="Title">
                <template v-slot:append>
                  <q-icon name="search" />
                </template>
              </q-input>
            </div>
          </div>
          <q-item v-ripple class="row text-center text-weight-bold q-pa-none q-mt-lg">
            <q-item-section class="col-1 res-col border ml-0">
              <q-checkbox size="xs" v-model="deleteAllArmenuList" class="q-mx-auto" />
            </q-item-section>
            <q-item-section class="col-5 res-update border ml-0">
              <q-item-label class="cursor-pointer">Title</q-item-label>
            </q-item-section>
            <q-item-section class="col-3 border ml-0">
              <q-item-label class="cursor-pointer">Reg.Date</q-item-label>
            </q-item-section>
            <q-item-section
              class="col-3 res-update border ml-0"
              style="border-right: 1px solid rgba(0, 0, 0, 0.12)"
            >
              <q-item-label>Update</q-item-label>
            </q-item-section>
          </q-item>
          <q-list class="bg-white">
            <q-item
              v-for="armenu in pagingArmenu"
              :key="armenu.id"
              v-ripple
              class="row text-center q-pa-none"
            >
              <q-item-section class="col-1 res-col border-row ml-0">
                <q-checkbox class="q-mx-auto" size="xs" v-model="armenu.delete" />
              </q-item-section>
              <q-item-section
                class="col-5 res-update border-row ml-0 text-center q-pl-sm cursor-pointer"
              >
                <q-item-label @click.stop="toArMenuDetail(armenu.id)">{{armenu.title}}</q-item-label>
              </q-item-section>
              <q-item-section class="col-3 border-row ml-0">
                <q-item-label>{{armenu.createdatetime}}</q-item-label>
              </q-item-section>
              <q-item-section
                class="col-3 border-row ml-0"
                style="border-right: 1px solid rgba(0, 0, 0, 0.12);"
              >
                <q-btn
                  class="cus-btn-update"
                  size="xs"
                  color="primary"
                  label="Update"
                  :to="'/admin/ar-menu/update/' + armenu.id"
                />
              </q-item-section>
            </q-item>
          </q-list>
          <div class="flex flex-center">
            <q-pagination size="xs" v-model="current" :max="maxPage" :input="true"></q-pagination>
          </div>
        </div>
      </q-tab-panel>
    </q-tab-panels>
  </div>
</template>

<script>
// eslint-disable-next-line no-unused-vars
import { date } from 'quasar'
export default {
  name: 'AdminArMenuPage',
  data () {
    return {
      tab: 'armenu',
      ArmenuFilterByTitle: '',
      deleteAllArmenuList: false,
      current: 1,
      oldApiArmenuList: [
        {
          id: '1',
          title: 'Food 1',
          category: 'Drink',
          content: 'this is content',
          price: '100',
          createdatetime: '2020-10-16'
        },
        {
          id: '2',
          title: 'Food 2',
          category: 'Meet',
          content: 'this is content',
          price: '100',
          createdatetime: '2020-10-16'
        }
      ],
      apiArmenuList: []
    }
  },
  computed: {
    ArmenuList () {
      return this.apiArmenuList.filter(Armenu => {
        return Armenu.title
          .toLowerCase()
          .match(this.ArmenuFilterByTitle.toLowerCase())
      })
    },
    maxPage () {
      return Math.ceil(this.apiArmenuList.length / 5)
    },
    pagingArmenu () {
      var startIndex = (this.current - 1) * 5
      var endIndex = this.current * 5 - 1
      return this.apiArmenuList.slice(startIndex, endIndex + 1)
    }
  },
  methods: {
    closeTab () {
      this.$router.push('/admin')
    },
    toArMenuDetail (armenuId) {
      this.$router.push('/admin/ar-menu/detail/' + armenuId)
    },
    deleteArmenu () {
      this.$q
        .dialog({
          title: 'Warning',
          message: 'Do you really want to  Delete?',
          persistent: true,
          cancel: true
        })
        .onOk(() => {
          const deleteList = []
          this.apiArmenuList.forEach(armenu => {
            if (armenu.delete === true) {
              deleteList.push(armenu.id)
            }
          })
          location.reload()
        })
    },
    loadpage () {
      location.reload()
    }
  },
  watch: {
    deleteAllArmenu: function (val) {
      if (val === true) {
        this.apiArmenuList.forEach(armenu => {
          armenu.delete = true
        })
      } else {
        this.apiArmenuList.forEach(armenu => {
          armenu.delete = false
        })
      }
    }
  },
  created () {
    this.oldApiArmenuList.forEach(ser => {
      ser.createdatetime = date.formatDate(
        new Date(ser.createdatetime),
        'YYYY-MM-DD HH:mm'
      )
      ser = Object.assign({}, ser, { delete: false })
      this.apiArmenuList.push(ser)
    })
  }
}
</script>

<style scoped>
.cus-layout {
  margin: 16px;
}
.cus-tab {
  border: 1px solid rgba(0, 0, 0, 0.12);
  border-bottom: none;
  border-radius: 10px 10px 0px 0px;
}
.cus-tab-section {
  height: 83vh;
  border: 1px solid rgba(0, 0, 0, 0.12);
  border-radius: 0px 10px 10px 10px;
}
.title {
  width: 160px;
  height: 20px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.12);
  text-align: center;
}
.cus-title-table {
  width: 100%;
  border: 1px solid rgba(0, 0, 0, 0.12);
  height: 48px;
  line-height: 48px;
  font-size: 18px;
  margin-top: 48px;
  padding-left: 16px;
}
.cus-container {
  padding: 32px 16px 32px 16px;
  border: 1px solid rgba(0, 0, 0, 0.12);
  font-size: 14px;
  border-top: none;
}
.cus-btn {
  width: 32px;
  height: 32px;
  margin-right: 16px;
  color: rgba(0, 0, 0, 0.12);
}
.border {
  border: 1px solid rgba(0, 0, 0, 0.12);
  border-right: none;
}
.border-row {
  border-left: 1px solid rgba(0, 0, 0, 0.12);
  border-bottom: 1px solid rgba(0, 0, 0, 0.12);
}
.ml-0 {
  margin-left: 0px;
}
.cus-btn-update {
  max-width: 80px;
  min-width: 34px;
  margin: 0 auto;
  width: 50%;
}
@media only screen and (max-width: 700px) {
  .res-col {
    max-width: 20px;
  }
  .res-menu {
    padding: 0 8px;
  }
  .res-update {
    text-align: left;
  }
}
</style>
