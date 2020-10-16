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
 <q-tab name="arvideo" label="AR-VIDEO" icon="camera_roll" class="cus-tab" >
        <q-icon
          name="fas fa-times"
          size="10px"
          style="margin: 0px 0px 2px 10px"
          @click.stop="closeTab"
        />
      </q-tab>
    </q-tabs>
    <q-tab-panels v-model="tab" animated class="cus-tab-section">
      <q-tab-panel name="arvideo">
        <div class="float-right title">
          <p>
            <b>Arvideo > Detail </b>
          </p>
        </div>
        <!----content-detail-->
        <div class="boderlist">
          <div class="title-list" style="padding:10px;">
            <b>Arvideo - Detail</b>
          </div>
          <q-separator />
          <q-form @submit="onSubmitDelete" class="cus-form" style="margin-top:20px;">
            <div class="row">
              <!----our-skill-->
              <div class="col-xs-3 col-sm-3 col-md-3">
                <p style="margin-top:20px;margin-left:30px;">
                  <b>Title*</b>
                </p>
              </div>
              <div class="col-xs-9 col-sm-9 col-md-9">
                <p style="margin-top:20px;margin-left:30px;">
                  <i>{{arvideo.title}}</i>
                </p>
              </div>
              <!----gerenal-Introduction--->
              <div class="col-xs-3 col-sm-3 col-md-3">
                <p style="margin-left:30px;">
                  <b>AR Video*</b>
                </p>
              </div>
              <div class="col-xs-9 col-sm-9 col-md-9">
                <q-item-label v-html="arvideo.link" style="margin:0px 30px;" />
              </div>
                <div class="col-xs-3 col-sm-3 col-md-3">
                <p style="margin-left:30px;">
                  <b>AR Content*</b>
                </p>
              </div>
              <div class="col-xs-9 col-sm-9 col-md-9">
                <q-item-label v-html="arvideo.content" style="margin:0px 30px;" />
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
                  :to="'/admin/ar-video'"
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
                  :to="'/admin/ar-video/update/' + arvideo.id"
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
export default {
  name: 'AdminArvideoPage',
  data () {
    return {
      tab: 'arvideo',
      searchkey: '',
      current: 1,
      maxPage: 5,
      arvideo: {},
      arvideolist: [
        {
          id: '1',
          title: 'Video demo 1',
          link: 'http://youtube.com/',
          content: 'Video demo 1',
          createdatetime: '2020-10-16'
        },
        {
          id: '2',
          title: 'Video demo 2',
          link: 'http://youtube.com/',
          content: 'Video demo 2',
          createdatetime: '2020-10-16'
        }
      ],
      showPreview: false,
      percent: [],
      apipercent: [],
      imagePreview:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcSy3-WoUO2VRc4jiy-6QK92fkm4d8ZgtG1nHw&usqp=CAU',
      baseUrl: process.env.API
    }
  },
  methods: {
    closeTab () {
      this.$router.push('/admin')
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
          deleteArvideo(this.$route.params.arvideoId).then(response =>
            this
              .$q
              .notify(
                { color: 'green-4', textColor: 'white', icon: 'done', timeout: 1000, message: 'Delete Successfully' }
              )
          )
          this.apipercent.forEach((element, index) => {
            // eslint-disable-next-line no-undef
            deleteArvideo(this.apipercent[index]).then(response =>
              this
                .$q
                .notify(
                  { color: 'green-4', textColor: 'white', icon: 'done', timeout: 1000, message: 'Delete Successfully' }
                )
            )
          })
          location.reload(this.$router.push('/admin/ar-video/detail'))
        })
    }
  },
  created () {
    for (let i = 0; i < this.arvideolist.length; i++) {
      if (this.$route.params.arvideoId === this.arvideolist[i].id) {
        this.arvideo = this.arvideolist[i]
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
