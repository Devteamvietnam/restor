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
      <q-tab name="Services" label="Slider" icon="pages" class="cus-tab">
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
      <q-tab-panel name="Services">
        <div class="float-right title">
          <p>
            <b>Slider- List</b>
          </p>
        </div>
        <div class="cus-title-table">
           <q-icon name="pages" />&nbsp;&nbsp;&nbsp;Slider- List
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
              <q-btn class="cus-btn" text-color="black" icon="add" to="/rem/slider/insert" />
              <q-btn class="cus-btn" text-color="black" icon="delete" @click="deleteServices()" />
            </div>
            <div class="row">
              <q-input outlined dense v-model="ServicesFilterByTitle" placeholder="Slider">
                <template v-slot:append>
                  <q-icon name="search" />
                </template>
              </q-input>
            </div>
          </div>
          <q-item v-ripple class="row text-center text-weight-bold q-pa-none q-mt-lg">
            <q-item-section class="col-1 res-col border ml-0">
              <q-checkbox size="xs" v-model="deleteAllServices" class="q-mx-auto" />
            </q-item-section>
            <q-item-section class="col-2 res-update border ml-0">
              <q-item-label class="cursor-pointer">Title</q-item-label>
            </q-item-section>
             <q-item-section class="col-3 res-update border ml-0">
              <q-item-label class="cursor-pointer">Content</q-item-label>
            </q-item-section>
             <q-item-section class="col-2 res-update border ml-0">
              <q-item-label class="cursor-pointer">Image</q-item-label>
            </q-item-section>
              <q-item-section class="col-2 border ml-0" style="border-right: 1px solid rgba(0, 0, 0, 0.12)">
              <q-item-label class="cursor-pointer">Reg.Date</q-item-label>
            </q-item-section>
            <q-item-section
              class="col-2 res-update border ml-0"
              style="border-right: 1px solid rgba(0, 0, 0, 0.12)"
            >
              <q-item-label>Update</q-item-label>
            </q-item-section>
          </q-item>
          <q-list class="bg-white">
            <q-item
              v-for="slider in pagingSlider"
              :key="slider.id"
              v-ripple
              class="row text-center q-pa-none"
            >
              <q-item-section class="col-1 res-col border-row ml-0">
                <q-checkbox class="q-mx-auto" size="xs" v-model="slider.delete" />
              </q-item-section>
              <q-item-section
                class="col-2 res-update border-row ml-0 text-center q-pl-sm cursor-pointer"
              >
                <q-item-label @click.stop="toServicesDetail(slider.id)">{{slider.title}}</q-item-label>
              </q-item-section>
                <q-item-section class="col-3 border-row ml-0 cursor-pointer">
                <q-item-label @click.stop="toServicesDetail(slider.id)">{{slider.content}}</q-item-label>
              </q-item-section>
              <q-item-section v-if="slider.img != null" class="col-2 border-row ml-0 cursor-pointer">
                <q-item-label @click.stop="toServicesDetail(slider.id)" style="padding:5px">
                  <q-img :src="baseUrl + '/api/v1/menu/view' + slider.img.fileType.split('/').pop().toUpperCase() + '/' + slider.img.id" width="100px" />
                </q-item-label>
              </q-item-section>
              <q-item-section v-if="slider.img == null" class="col-2 border-row ml-0 cursor-pointer">
                <q-item-label @click.stop="toServicesDetail(slider.id)" style="padding:5px">
                  <q-img :src="imagePreview" width="100px" />
                </q-item-label>
              </q-item-section>
              
               <q-item-section class="col-2 border-row ml-0" style="border-right: 1px solid rgba(0, 0, 0, 0.12)">
                <q-item-label>{{slider.createdatetime}}</q-item-label>
              </q-item-section>
              <q-item-section
                class="col-2 border-row ml-0"
                style="border-right: 1px solid rgba(0, 0, 0, 0.12);"
              >
                <q-btn
                  class="cus-btn-update"
                  size="xs"
                  color="primary"
                  label="Update"
                  :to="'/rem/slider/update/' + slider.id"
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
  loadAllSlider,
  deleteSlider
} from "src/services/menu/slider";
import { date } from 'quasar'
export default {
  name: 'AdminServicesPage',
  data () {
    return {
      tab: 'Services',
      ServicesFilterByTitle: '',
      deleteAllServices: false,
      current: 1,
      oldApiSliderList: [],
      apiSliderList: [
      ],
      showimage: false,
       imagePreview:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcSy3-WoUO2VRc4jiy-6QK92fkm4d8ZgtG1nHw&usqp=CAU',
      baseUrl: 'http://localhost:8080'
    }
  },
  computed: {
    SliderList () {
      return this.apiSliderList.filter(slider => {
        return slider.title
          .toLowerCase()
          .match(this.ServicesFilterByTitle.toLowerCase())
      })
    },
    maxPage () {
      return Math.ceil(this.SliderList.length / 5)
    },
    pagingSlider () {
      var startIndex = (this.current - 1) * 5
      var endIndex = this.current * 5 - 1
      return this.SliderList.slice(startIndex, endIndex + 1)
    }
  },
  methods: {
    closeTab () {
      this.$router.push('/rem')
    },
    toServicesDetail (sliderId) {
      this.$router.push('/rem/slider/detail/' + sliderId)
    },
    deleteServices () {
      this.$q
        .dialog({
          title: 'Warning',
          message: 'Do you really want to  Delete?',
          persistent: true,
          cancel: true
        })
        .onOk(() => {
          const deleteList = []
          this.apiSliderList.forEach(slider => {
            if (slider.delete === true) {
              deleteList.push(slider.id)
            }
          })
          deleteList.forEach((element, index) => {
            // eslint-disable-next-line no-undef
            deleteSlider(deleteList[index])
          })
          location.reload()
        })
    },
    loadpage () {
      location.reload()
    }
  },
  watch: {
    deleteAllServices: function (val) {
      if (val === true) {
        this.apiSliderList.forEach(slider => {
          slider.delete = true
        })
      } else {
        this.apiSliderList.forEach(slider => {
          slider.delete = false
        })
      }
    }
  },
  created () {
    loadAllSlider().then(response => {
      this.oldApiSliderList = response.data;
      this.oldApiSliderList.forEach(ser => {
        ser.createdatetime = date.formatDate(
          new Date(ser.createdatetime),
          "YYYY-MM-DD HH:mm"
        );
        ser = Object.assign({}, ser, { delete: false });
        this.apiSliderList.push(ser);
      });
    });
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
