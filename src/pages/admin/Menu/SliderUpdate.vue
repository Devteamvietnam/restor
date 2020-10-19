<template>
  <div v-if="Object.entries(slider).length > 0" class="cus-layout">
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
            <b>Slider - Update</b>
          </div>
          <q-separator />
          <q-form @submit="onSubmit" class="cus-form" style="margin-top:20px;">
            <div class="row">
              <div class="offset-sm-1 col-sm-8 col-12 offset-0 row">
                <!---oursskill-->
                <p class="col-sm-2 col-12 cus-text">Title</p>
                <q-input
                  class="col-sm-10 col-12"
                  outlined
                  dense
                  v-model="slider.title"
                  lazy-rules
                  placeholder="Our Skill"
                  :rules="[ val =>  val !== null && val !== '' || 'Please type a name']"
                />
                <!----general-introduction-->
                <p class="col-sm-2 col-12 cus-text">Content</p>
                <q-editor
                  class="col-sm-10 col-12"
                  v-model="slider.content"
                  placeholder="Enter Introduction"
                  :toolbar="[
                  [
                    {
                      icon: $q.iconSet.editor.align,
                      fixedLabel: true,
                      list: 'only-icons',
                      options: ['left', 'center', 'right', 'justify']
                    }
                  ],
                  ['bold', 'italic', 'strike', 'underline', 'subscript', 'superscript'],
                  ['token', 'hr', 'link', 'custom_btn'],
                  ['print', 'fullscreen'],
                  [
                    {
                      icon: $q.iconSet.editor.formatting,
                      list: 'no-icons',
                      options: ['p','h1','h2','h3','h4','h5','h6','code']
                    },
                    {
                      icon: $q.iconSet.editor.fontSize,
                      fixedLabel: true,
                      fixedIcon: true,
                      list: 'no-icons',
                      options: ['size-1','size-2','size-3','size-4','size-5','size-6','size-7']
                    },
                    {
                      icon: $q.iconSet.editor.font,
                      fixedIcon: true,
                      list: 'no-icons',
                      options: ['default_font','arial','arial_black','comic_sans','courier_new','impact','lucida_grande','times_new_roman','verdana']
                    },
                    'removeFormat'
                  ],
                  ['quote', 'unordered', 'ordered', 'outdent', 'indent'],
                  ['undo', 'redo'],
                  ['viewsource']
                ]"
                  :fonts="{
                  arial: 'Arial',
                  arial_black: 'Arial Black',
                  comic_sans: 'Comic Sans MS',
                  courier_new: 'Courier New',
                  impact: 'Impact',
                  lucida_grande: 'Lucida Grande',
                  times_new_roman: 'Times New Roman',
                  verdana: 'Verdana'
                }"
                />
                <!----image-->
                <p class="col-sm-2 col-12 cus-text" style="margin-top:20px;">Image</p>
                <div  style="margin-top:20px;">
                  <q-list class="col-sm-10 col-12">
                    <q-item>
                      <q-item-section>
                        <q-item>
                          <q-item-section top>
                            <div v-if="!showPreview" class="text-grey-8 q-gutter-xs">
                              <q-img
                                :src="baseUrl + '/api/v1/menu/view' + slider.img.fileType.split('/').pop().toUpperCase() + '/' + slider.img.id"
                                style="height: auto; max-width: 100%"
                              />
                              <br />
                              <input type="file" accept="image/*" @change="uploadImage($event)" />
                            </div>
                            <div v-if="showPreview"  class="text-grey-8 q-gutter-xs">
                              <q-img
                                :src="imagePreview"
                                spinner-color="white"
                                style="height: auto; max-width: 100%"
                              />
                              <br />
                              <br />
                              <input type="file" accept="image/*" @change="uploadImage($event)" />
                            </div>
                          </q-item-section>
                        </q-item>
                      </q-item-section>
                    </q-item>
                  </q-list>
                </div>
              </div>
            </div>

            <!--button save---->
            <div class="text-right" style="margin:20px; width: 75%;">
              <q-btn
                class="my-custom-toggle"
                v-if="dirty == true"
                disable
                spread
                no-caps
                unelevated
                toggle-color="primary"
                color="white"
                text-color="primary"
                label="Update"
                type="submit"
                style="margin-right: 5px;"
              />
               <q-btn
                class="my-custom-toggle"
                v-else
                spread
                no-caps
                unelevated
                toggle-color="primary"
                color="white"
                text-color="primary"
                label="Update"
                type="submit"
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
                label="Canel"
                @click="cancelCreateSlider()"
              />
            </div>
          </q-form>
        </div>
      </q-tab-panel>
    </q-tab-panels>
  </div>
</template>

<script>
import {
  loadAllSlider,updateSlider
} from "src/services/menu/slider";
// eslint-disable-next-line no-unused-vars
import { format } from 'quasar';
import { date } from "quasar";
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
      // image
      showPreview: false,
      imagePreview:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcSy3-WoUO2VRc4jiy-6QK92fkm4d8ZgtG1nHw&usqp=CAU',
      uploadPic: null,
      deleteimage: false,
      dirty: true,
      chekUpdateSubmitSlider: {
        title: '',
        content: '',
      },
      sliderlist: [
      ],
      objslider: {
      },
      baseUrl: 'http://localhost:8080'
    }
  },
    watch: {
      slider: {
        handler(newVal, oldVal) {
          if (
            this.objslider.title == this.chekUpdateSubmitSlider.title &&
            this.objslider.content ==
              this.chekUpdateSubmitSlider.content
          ) {
            this.dirty = true;
          } else {
            this.dirty = false;
          }
        },
        deep: true
      },
    },
  computed: {
    slider () {
      return this.objslider
    }
  },
  methods: {
    closeTab () {
      this.$router.push('/rem')
    },
    deleimgae () {
      this.showPreview = false
      this.imagePreview = ''
      this.uploadPic = null
      this.dirty = true
    },
    uploadImage (event) {
      this.uploadPic = event.target.files[0]
      const reader = new FileReader()
      reader.addEventListener(
        'load',
        function () {
          this.showPreview = true
          this.imagePreview = reader.result
        }.bind(this),
        false
      )
      if (this.uploadPic) {
        if (/\.(jpe?g|png|gif)$/i.test(this.uploadPic.name)) {
          reader.readAsDataURL(this.uploadPic)
        }
      }
      this.showPreview = true
      this.deleteimage = true
      this.dirty = false
    },
    onSubmit () {
      // update ourskill
      const formData = new FormData()
      this.objslider.createdatetime = date.formatDate(
        new Date(),
        "YYYY-MM-DDThh:mm:ss"
      );
      formData.append('data', JSON.stringify(this.objslider))
      formData.append('file', this.uploadPic)
      // eslint-disable-next-line no-undef
      updateSlider(
        this.$route.params.sliderId,
        formData
      ).then(response => {
          this.$q.notify({
        color: "green-4",
        textColor: "white",
        icon: "done",
        timeout: 2000,
        message: "update  Successfully",
       
      });
       this.dirty = true
      })
    },
    deletepercenr (index) {
      this.$q
        .dialog({
          title: 'Warning',
          message: 'Do you really want to Delete?',
          persistent: true,
          cancel: true
        })
        .onOk(() => {
          this.percent.forEach((element, index1) => {
            if (index === index1) {
              // eslint-disable-next-line no-undef
              deleteServicesPercent(element.id)
              this.percent.splice(index, 1)
            }
          })
          location.reload()
        })
    },
    cancelCreateSlider () {
      this.$q
        .dialog({
          title: 'Warning',
          message: 'Do you really want to cancel?',
          persistent: true,
          cancel: true
        })
        .onOk(() => {
          this.$router.push('/rem/slider')
        })
    }
  },
  created () {
    loadAllSlider().then(response => {
      this.sliderlist = response.data;
      for (let i = 0; i < this.sliderlist.length; i++) {
        if (this.$route.params.sliderId === this.sliderlist[i].id) {
          this.objslider = this.sliderlist[i];
          this.chekUpdateSubmitSlider.title = response.data[i].title;
          this.chekUpdateSubmitSlider.content = response.data[i].content;
          if (this.objslider.img == null) {
            this.showPreview = true;
          } else {
            this.showPreview = false;
          }
          break;
        }
      }
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
  width: 83%;
}
</style>
