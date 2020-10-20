<template>
  <div  class="cus-layout">
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
      <q-tab name="arimage" label="Ar-image" icon="camera" class="cus-tab">
        <q-icon
          name="fas fa-times"
          size="10px"
          style="margin: 0px 0px 2px 10px"
          @click.stop="closeTab"
        />
      </q-tab>
    </q-tabs>
    <q-tab-panels v-model="tab" animated class="cus-tab-section">
      <q-tab-panel name="arimage">
        <div class="float-right title">
          <p>
            <b>Arimage- List</b>
          </p>
        </div>
        <div class="cus-title-table">
           <q-icon name="camera" />&nbsp;&nbsp;&nbsp;Arimage- List
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
              <q-btn class="cus-btn" text-color="black" icon="add" to="/rem/ar-image/insert" />
              <q-btn class="cus-btn" text-color="black" icon="delete" @click="deleteAr()" />
            </div>
            <div class="row">
              <q-input outlined dense v-model="ArimageFilterByTitle" placeholder="Slider">
                <template v-slot:append>
                  <q-icon name="search" />
                </template>
              </q-input>
            </div>
          </div>
         <q-item v-ripple class="row text-center text-weight-bold q-pa-none q-mt-lg">
            <q-item-section class="col-1 res-col border ml-0">
              <q-checkbox size="xs" v-model="deleteAllArimage" class="q-mx-auto" />
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
              v-for="arimage in pagingArimage"
              :key="arimage.id"
              v-ripple
              class="row text-center q-pa-none"
            >
             <q-item-section class="col-1 res-col border-row ml-0">
                <q-checkbox class="q-mx-auto" size="xs" v-model="arimage.delete" />
              </q-item-section>
              <q-item-section
                class="col-5 res-update border-row ml-0 text-center q-pl-sm cursor-pointer"
              >
                <q-item-label @click.stop="toArimageDetail(arimage.id)">{{arimage.title}}</q-item-label>
              </q-item-section>
              <q-item-section class="col-3 border-row ml-0">
                <q-item-label>{{arimage.createdDate}}</q-item-label>
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
                  :to="'/rem/ar-image/update/' + arimage.id"
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
import {
  loadAllArImage,
  deleteArImage
} from 'src/services/menu/ArImage'
import { date } from 'quasar'
export default {
  name: 'AdminArimagePage',
  data () {
    return {
      tab: 'arimage',
      ArimageFilterByTitle: '',
      deleteAllArimage: false,
      current: 1,
      oldApiArimageList: [],
      apiArimageList: [],
      baseUrl: 'http://localhost:8080'
    }
  },
  computed: {
    ArimageList () {
      return this.apiArimageList.filter(arimage => {
        return arimage.title
          .toLowerCase()
          .match(this.ArimageFilterByTitle.toLowerCase())
      })
    },
    maxPage () {
      return Math.ceil(this.ArimageList.length / 5)
    },
    pagingArimage () {
      var startIndex = (this.current - 1) * 5
      var endIndex = this.current * 5 - 1
      return this.ArimageList.slice(startIndex, endIndex + 1)
    }
  },
  methods: {
    closeTab () {
      this.$router.push('/rem')
    },
    toArimageDetail (arimageId) {
      this.$router.push('/rem/ar-image/detail/' + arimageId)
    },
    deleteAr () {
      this.$q
        .dialog({
          title: 'Warning',
          message: 'Do you really want to  Delete?',
          persistent: true,
          cancel: true
        })
        .onOk(() => {
          const deleteList = []
          this.apiArimageList.forEach(arimage => {
            if (arimage.delete === true) {
              deleteList.push(arimage.id)
            }
          })
          deleteList.forEach((element, index) => {
            deleteArImage(deleteList[index])
          })
          location.reload()
        })
    },
    loadpage () {
      location.reload()
    }
  },
  watch: {
    deleteAllArimage: function (val) {
      if (val === true) {
        this.apiArimageList.forEach(arimage => {
          arimage.delete = true
        })
      } else {
        this.apiArimageList.forEach(arimage => {
          arimage.delete = false
        })
      }
    }
  },
  created () {
    loadAllArImage().then(response => {
      this.oldApiArimageList = response.data
      this.oldApiArimageList.forEach(ari => {
        ari.createdDate = date.formatDate(
          new Date(ari.createdDate),
          'YYYY-MM-DD HH:mm'
        )
        ari = Object.assign({}, ari, { delete: false })
        this.apiArimageList.push(ari)
      })
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
