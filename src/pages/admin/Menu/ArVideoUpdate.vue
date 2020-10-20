<template>
    <div  class="cus-layout">
        <q-tabs
            v-model="tab"
            dense="dense"
            class="text-grey"
            active-color="primary"
            align="left"
            inline-label="inline-label"
            indicator-color="transparent"
            no-caps="no-caps">
            <q-tab name="arvideo" label="AR-VIDEO" icon="camera_roll" class="cus-tab">
                <q-icon
                    name="fas fa-times"
                    size="10px"
                    style="margin: 0px 0px 2px 10px"
                    @click.stop="closeTab"/>
            </q-tab>
        </q-tabs>
        <!-- <q-separator /> -->
        <q-tab-panels v-model="tab" animated="animated" class="cus-tab-section">
            <q-tab-panel name="arvideo">
                <div class="float-right title">
                    <p>
                        <b>Ar video > Update</b>
                    </p>
                </div>
                <div class="cus-title-table">
                   {{name}}
                    - Update
                </div>
                <q-form @submit="onSubmit" class="cus-container">
                    <q-item class="row">
                        <q-item-section class="col-2 line-40">
                            <q-item-label>AR Video*:</q-item-label>
                        </q-item-section>
                        <q-item-section class="col-10">
                            <q-input
                                class="col-sm-10 col-12"
                                outlined="outlined"
                                v-model="arvideo.link"
                                dense="dense"
                                placeholder="Link"/>
                        </q-item-section>
                    </q-item>
                    <q-item class="row q-mb-md">
                        <q-item-section class="col-2 line-40">
                            <q-item-label >Title*:</q-item-label>
                        </q-item-section>
                          <q-item-section class="col-10">
                            <q-input
                                class="col-sm-10 col-12"
                                outlined="outlined"
                                v-model="arvideo.title"
                                dense="dense"
                                placeholder="Title"
                                />
                        </q-item-section>
                    </q-item>
                      <q-item class="row q-mb-md">
                        <q-item-section class="col-2 line-40">
                            <q-item-label >Video Content*:</q-item-label>
                        </q-item-section>
                          <q-item-section class="col-10">
                            <q-editor
                              class="col-sm-10 col-12"
                              v-model="arvideo.content"
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
                        </q-item-section>
                    </q-item>
                    <q-item class="q-pr-sm">
                        <div class="text-right" style="width:100%">
                            <q-btn
                                class="q-mr-sm"
                                outline="outline"
                                color="primary"
                                label="Update"
                                size="md"
                                no-caps="no-caps"
                                type="submit"/>
                            <q-btn
                                outline="outline"
                                color="primary"
                                label="Cancel"
                                size="md"
                                no-caps="no-caps"
                                @click="cancelCreateArvideo"/>
                        </div>
                    </q-item>
                </q-form>
            </q-tab-panel>
        </q-tab-panels>
    </div>
</template>

<script>
import { loadAllArVideo, updateArVideo } from 'src/services/menu/ArVideo'
import { date } from 'quasar'
export default {
  name: 'AdminArvideoPage',
  data () {
    return {
      tab: 'arvideo',
      name: 'Ar Video',
      arvideo: {},
      arvideoList: []
    }
  },
  methods: {
    closeTab () {
      this
        .$router
        .push('/rem')
    },
    onSubmit () {
      const formData = new FormData()
      this.arvideo.createdDate = date.formatDate(
        new Date(),
        'YYYY-MM-DDThh:mm:ss'
      )
      formData.append('data', JSON.stringify(this.arvideo))
      updateArVideo(this.$route.params.arvideoId, formData).then(response => {
        this
          .$q
          .notify(
            { color: 'green-4', textColor: 'white', icon: 'done', timeout: 1000, message: 'Update Successfully' }
          )
        location.reload(this.$router.push('/rem/ar-video'))
      })
    },
    cancelCreateArvideo () {
      this.$q
        .dialog({
          title: 'Warning',
          message: 'Do you really want to cancel?',
          persistent: true,
          cancel: true
        })
        .onOk(() => {
          this.$router.push('/rem/ar-video')
        })
    }
  },
  created () {
    loadAllArVideo().then(response => {
      this.arvideoList = response
        .data
      for (let i = 0; i < this.arvideoList.length; i++) {
        if (this.$route.params.arvideoId === this.arvideoList[i].id) {
          this.arvideo = this.arvideoList[i]
        }
      }
    })
  }
}
</script>
<style scoped="scoped">
    .cus-layout {
        margin: 16px;
    }
    .cus-tab {
        border: 1px solid rgba(0, 0, 0, 0.12);
        border-bottom: none;
        border-radius: 10px 10px 0 0;
    }
    .cus-tab-section {
        /* height: 83vh; */
        border: 1px solid rgba(0, 0, 0, 0.12);
        border-radius: 0 10px 10px 10px;
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
        margin-top: 32px;
        padding-left: 16px;
    }
    .cus-container {
        padding: 16px;
        border: 1px solid rgba(0, 0, 0, 0.12);
        font-size: 14px;
        border-top: none;
    }
    .res-upload {
        max-width: 300px;
        width: 100%;
        height: auto;
    }
    .line-40 {
        height: 40px;
        line-height: 40px;
    }
    @media only screen and (max-width: 700px) {
        }
    .input {
        padding-right: 10px;
    }
</style>
