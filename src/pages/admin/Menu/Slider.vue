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
              <q-btn class="cus-btn" text-color="black" icon="add" to="/admin/slider/insert" />
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
              v-for="services in pagingServices"
              :key="services.id"
              v-ripple
              class="row text-center q-pa-none"
            >
              <q-item-section class="col-1 res-col border-row ml-0">
                <q-checkbox class="q-mx-auto" size="xs" v-model="services.delete" />
              </q-item-section>
              <q-item-section
                class="col-2 res-update border-row ml-0 text-center q-pl-sm cursor-pointer"
              >
                <q-item-label @click.stop="toServicesDetail(services.id)">{{services.title}}</q-item-label>
              </q-item-section>
                <q-item-section class="col-3 border-row ml-0 cursor-pointer">
                <q-item-label @click.stop="toServicesDetail(services.id)">{{services.content}}</q-item-label>
              </q-item-section>
              <q-item-section class="col-2 border-row ml-0 cursor-pointer">
                <q-item-label @click.stop="toServicesDetail(services.id)" style="padding:5px">  
                  <q-img src="https://cdn.quasar.dev/img/mountains.jpg" width="100px" />
                </q-item-label>             
              </q-item-section>
               <q-item-section class="col-2 border-row ml-0" style="border-right: 1px solid rgba(0, 0, 0, 0.12)">
                <q-item-label>{{services.createdatetime}}</q-item-label>           
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
                  :to="'/admin/slider/update/' + services.id"
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
// import {
//   loadAllServices,
//   deleteServices
// } from "src/service/servi/serviceslist";
import { date } from "quasar";
export default {
  name: "AdminServicesPage",
  data() {
    return {
      tab: "Services",
      ServicesFilterByTitle: "",
      deleteAllServices: false,
      current: 1,
      oldApiServicesList: [
        {
          id:"1",
          title:"Background image 1",
          content:"content 1 content 1 content 1 content 1 content 1 content 1 ",
          createdatetime:"2-2-2012",
        },
         {
          id:"2",
          title:"Background image 2",
          content:"content 2 content 2 content 2 content 2 content 2 content 2 ",
          createdatetime:"2-2-2012",
        },
         {
          id:"3",
          title:"Background image 3",
          content:"content 3 content 3 content 3 content 3 content 3 content 3 ",
          createdatetime:"2-2-2012",
        },
      ],
      apiServicesList: [
      ]
    };
  },
  computed: {
    ServicesList() {
      return this.apiServicesList.filter(services => {
        return services.title
          .toLowerCase()
          .match(this.ServicesFilterByTitle.toLowerCase());
      });
    },
    deleteBlogList() {
      let list = [];
      for (let i = 0; i < this.apiServicesList.length; i++) {
        list.push({ id: this.apiServicesList[i].id, chosen: false });
      }
      return list;
    },
    maxPage() {
      return Math.ceil(this.ServicesList.length / 5);
    },
    pagingServices() {
      var startIndex = (this.current - 1) * 5;
      var endIndex = this.current * 5 - 1;
      return this.ServicesList.slice(startIndex, endIndex + 1);
    }
  },
  methods: {
    closeTab() {
      this.$router.push("/tpm");
    },
    toServicesDetail(sliderId) {
      this.$router.push("/admin/slider/detail/" + sliderId);
    },
    deleteServices() {
      this.$q
        .dialog({
          title: "Warning",
          message: "Do you really want to  Delete?",
          persistent: true,
          cancel: true
        })
        .onOk(() => {
          let deleteList = [];
          this.apiServicesList.forEach(services => {
            if (services.delete === true) {
              deleteList.push(services.id);
            }
          });
          deleteList.forEach((element, index) => {
            deleteServices(deleteList[index]);
          });

          location.reload();
        });
    },
    loadpage() {
      location.reload();
    }
  },
  watch: {
    deleteAllServices: function(val) {
      if (val === true) {
        this.apiServicesList.forEach(services => {
          services.delete = true;
        });
      } else {
        this.apiServicesList.forEach(services => {
          services.delete = false;
        });
      }
    }
  },
  created() {
    // loadAllServices().then(response => {
    //   this.oldApiServicesList = response.data;
    //   this.oldApiServicesList.forEach(ser => {
    //     ser.createdatetime = date.formatDate(
    //       new Date(ser.createdatetime),
    //       "YYYY-MM-DD HH:mm"
    //     );
    //     ser = Object.assign({}, ser, { delete: false });
    //     this.apiServicesList.push(ser);
    //   });
    // });apiServicesList
      this.oldApiServicesList.forEach(ser => {
        ser.createdatetime = date.formatDate(
          new Date(ser.createdatetime),
          "YYYY-MM-DD HH:mm"
        );
        ser = Object.assign({}, ser, { delete: false });
        this.apiServicesList.push(ser);
      });
   
  }
};
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
