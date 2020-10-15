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
      <q-tab name="Us" label="Slider" class="cus-tab">
        <q-icon
          name="fas fa-times"
          size="10px"
          style="margin: 0px 0px 2px 10px"
          @click.stop="closeTab"
        />
      </q-tab>
    </q-tabs>
    <q-tab-panels v-model="tab" animated class="cus-tab-section">
      <q-tab-panel name="Us">
        <div class="float-right title">
          <p>
            <b>Product > Slider</b>
          </p>
        </div>
        <!----conten-detail-->
        <div class="boderlist">
          <div class="title-list" style="padding:10px;">
            <b>Slider - Detail</b>
          </div>
          <q-separator />
          <q-form @submit="onSubmitDelete" class="cus-form" style="margin-top:20px;">
            <div class="row">
              <!----our-skill-->
              <div class="col-xs-3 col-sm-3 col-md-3">
                <p style="margin-top:20px;margin-left:30px;">
                  <b>Title</b>
                </p>
              </div>
              <div class="col-xs-9 col-sm-9 col-md-9">
                <p style="margin-top:20px;margin-left:30px;">
                  <i>{{ourskill.title}}</i>
                </p>
              </div>
              <!----gerenal-Introduction--->
              <div class="col-xs-3 col-sm-3 col-md-3">
                <p style="margin-left:30px;">
                  <b>Content</b>
                </p>
              </div>
              <div class="col-xs-9 col-sm-9 col-md-9">
                <q-item-label v-html="ourskill.content" style="margin:0px 30px;" />
              </div>
              <!-----image--->
              <div class="col-xs-3 col-sm-3 col-md-3">
                <p style="margin-left:30px;">
                  <b>Image</b>
                </p>
              </div>
              <div class="col-xs-9 col-sm-9 col-md-9">
                <!-- <div v-if="!showPreview" class="text-grey-8 q-gutter-xs border-image">
                  <q-img
                    :src="baseUrl + '/api/v1/blog/view' + ourskill.img.fileType.split('/').pop().toUpperCase() + '/' + ourskill.img.id"
                    height="170px"
                    width="40%"
                    style="margin:0px 20px;margin-left:30px;"
                  />
                  <br />
                </div> -->
                <div  class="text-grey-8 q-gutter-xs">
                  <q-img
                    :src="imagePreview"
                    spinner-color="white"
                    height="auto"
                    width="40%"
                    style="margin:0px 20px;margin-left:30px;"
                  />
                  <br />
                  <br />
                </div>
              </div>
              <!--button-->
              <div class="col-xs-12 col-sm-12 col-md-12 text-right" style="margin:20px;width:90%">
                <q-btn
                  class="my-custom-toggle"
                  spread
                  no-caps
                  unelevated
                  toggle-color="primary"
                  color="white"
                  text-color="primary"
                  label="List"
                  style="margin-right: 5px;padding:0px 10px;"
                  :to="'/admin/slider'"
                />
                <q-btn
                  class="my-custom-toggle"
                  spread
                  no-caps
                  unelevated
                  toggle-color="primary"
                  color="white"
                  text-color="primary"
                  label="Update"
                  :to="'/admin/slider/update/' + ourskill.id"
                  style="margin-right: 5px;"
                />
                <q-btn
                  class="my-custom-toggle"
                  spread
                  no-caps
                  unelevated
                  toggle-color="primary"
                  color="white"
                  text-color="primary"
                  label="Delete"
                  type="submit"
                />
              </div>
            </div>
          </q-form>
        </div>
      </q-tab-panel>
    </q-tab-panels>
  </div>
</template>

<script>
// import {
//   loadAllOurSkill,
//   loadAllPercent,
//   deleteServicesOurSkill,
//   deleteServicesPercent
// } from "src/service/servi/serviceslist";
export default {
  name: 'AdminServicesPage',
  data () {
    return {
      separator: 'cell',
      tab: 'Us',
      val: false,
      val1: true,
      searchkey: '',
      current: 1,
      maxPage: 5,
      ourskill: {},
      ourskillist: [
        {
          id: '1',
          title: 'Background image 1',
          content: 'content 1 content 1 content 1 content 1 content 1 content 1 ',
          createdatetime: '2-2-2012'
        },
        {
          id: '2',
          title: 'Background image 2',
          content: 'content 2 content 2 content 2 content 2 content 2 content 2 ',
          createdatetime: '2-2-2012'
        },
        {
          id: '3',
          title: 'Background image 3',
          content: 'content 3 content 3 content 3 content 3 content 3 content 3 ',
          createdatetime: '2-2-2012'
        }
      ],
      percent: [],
      apipercent: [],
      showPreview: false,
      imagePreview:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcSy3-WoUO2VRc4jiy-6QK92fkm4d8ZgtG1nHw&usqp=CAU',
      baseUrl: process.env.API
    }
  },
  methods: {
    closeTab () {
      this.$router.push('/tpm')
    },
    onSubmitDelete () {
      this.$q
        .dialog({
          title: 'Warning',
          message: 'Do you really want to  Delete?',
          persistent: true,
          cancel: true
        })
        .onOk(() => {
          // eslint-disable-next-line no-undef
          deleteServicesOurSkill(this.$route.params.ourskillId).then(response =>
            alert('delete surcess')
          )
          this.apipercent.forEach((element, index) => {
            // eslint-disable-next-line no-undef
            deleteServicesPercent(this.apipercent[index]).then(response =>
              alert('delete surcess')
            )
          })
          location.reload(this.$router.push('/tpm/services/ourskill'))
        })
    }
  },
  created () {
    // loadAllOurSkill().then(response => {
    //   this.ourskillist = response.data;
    //   for (let i = 0; i < this.ourskillist.length; i++) {
    //     if (this.$route.params.ourskillId === this.ourskillist[i].id) {
    //       this.ourskill = this.ourskillist[i];
    //       if (this.ourskill.img == null) {
    //         this.showPreview = true;
    //       } else {
    //         this.showPreview = false;
    //       }
    //       break;
    //     }
    //   }
    // });
    for (let i = 0; i < this.ourskillist.length; i++) {
      if (this.$route.params.sliderId === this.ourskillist[i].id) {
        this.ourskill = this.ourskillist[i]
        break
      }
    }
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
td,
th {
  border: 1px solid rgb(190, 190, 190);
  padding: 10px;
}

td {
  text-align: center;
}

table {
  border-collapse: collapse;
  border: 2px solid rgb(200, 200, 200);
  letter-spacing: 1px;
  font-family: sans-serif;
  font-size: 0.8rem;
  width: 100%;
}
.my-custom-toggle {
  border: 1px solid #027be3;
}
.boderlist {
  border: 2px solid rgb(200, 200, 200);
  margin-top: 50px;
  height: auto;
}
.border-image {
  border: 2px solid rgb(200, 200, 200);
  width: 60%;
  margin-left: 20px;
}
</style>
