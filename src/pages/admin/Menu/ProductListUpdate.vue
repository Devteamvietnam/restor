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
 <q-tab name="productlist" label="PRODUCT LIST" icon="restaurant" class="cus-tab">
        <q-icon
          name="fas fa-times"
          size="10px"
          style="margin: 0px 0px 2px 10px"
          @click.stop="closeTab"
        />
      </q-tab>
    </q-tabs>

    <q-tab-panels v-model="tab" animated class="cus-tab-section">
      <q-tab-panel name="productlist">
        <div class="float-right title">
          <p>
            <b>Product > Update</b>
          </p>
        </div>
        <!----conten-detail-->
        <div class="boderlist">
          <div class="title-list" style="padding:10px;">
            <b>Product - Update</b>
          </div>
          <q-separator />
          <q-form @submit="onSubmit" class="cus-form" style="margin-top:20px;">
            <div class="row">
              <div class="offset-sm-1 col-sm-8 col-12 offset-0 row">
                <!---oursskill-->
                <p class="col-sm-2 col-12 cus-text">Title*</p>
                <q-input
                  class="col-sm-10 col-12"
                  outlined
                  dense
                  v-model="product.title"
                  lazy-rules
                  placeholder="Our Skill"
                  :rules="[ val =>  val !== null && val !== '' || 'Please type a name']"
                />
                <p class="col-sm-2 col-12 cus-text">Category*</p>
                <q-input
                  class="col-sm-10 col-12"
                  outlined
                  dense
                  v-model="product.category"
                  lazy-rules
                  placeholder="Our Skill"
                  :rules="[ val =>  val !== null && val !== '' || 'Please type a name']"
                />
                <!----general-introduction-->
                <p class="col-sm-2 col-12 cus-text">Content</p>
                <q-editor
                  class="col-sm-10 col-12"
                  v-model="product.content"
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
                <p class="col-sm-2 col-12 cus-text">Title*</p>
                <q-input
                  class="col-sm-10 col-12"
                  outlined
                  dense
                  v-model="product.price"
                  lazy-rules
                  placeholder="Our Skill"
                  :rules="[ val =>  val !== null && val !== '' || 'Please type a name']"
                />
                <!----image-->
                <p class="col-sm-2 col-12 cus-text" style="margin-top:20px;">Image</p>
                <div  style="margin-top:20px;">
                  <q-list class="col-sm-10 col-12">
                    <q-item>
                      <q-item-section>
                        <q-item>
                          <q-item-section top>
                            <!-- <div v-if="!showPreview" class="text-grey-8 q-gutter-xs">
                              <q-img
                                :src="baseUrl + '/api/v1/blog/view' + ourskill.img.fileType.split('/').pop().toUpperCase() + '/' + ourskill.img.id"
                                style="height: auto; max-width: 100px"
                              />
                              <br />
                              <input type="file" accept="image/*" @change="uploadImage($event)" />
                            </div> -->
                            <div  class="text-grey-8 q-gutter-xs">
                              <q-img
                                :src="imagePreview"
                                spinner-color="white"
                                style="height: auto; max-width: 200px"
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
                @click="cancelCreateProductList()"
              />
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
//   updateServicesOurSkill,
//   updateServicesPercent,
//   deleteServicesPercent
// } from "src/service/servi/serviceslist";
// eslint-disable-next-line no-unused-vars
import { format } from 'quasar'
export default {
  name: 'AdminProductPage',
  data () {
    return {
      separator: 'cell',
      tab: 'productlist',
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
      chekUpdateSubmitOurSkill: {
        ourskill: '',
        generalintroduction: '',
        title: '',
        shortintroduction: ''
      },
      chekUpdateSubmitPercent: [],
      productlist: [
        {
          id: '1',
          title: 'Food 1',
          category: 'Drink',
          content: 'this is content',
          price: '100',
          createdatetime: '2020-10-15'
        },
        {
          id: '2',
          title: 'Food 2',
          category: 'Meet',
          content: 'this is content',
          price: '100',
          createdatetime: '2020-10-15'
        }
      ],
      product: {},
      apipercent: [],
      idupdatepercent: [],
      baseUrl: process.env.API
    }
  },
  //   watch: {
  //     ourskill: {
  //       handler(newVal, oldVal) {
  //         if (
  //           this.objourskill.ourskill == this.chekUpdateSubmitOurSkill.ourskill &&
  //           this.objourskill.generalintroduction ==
  //             this.chekUpdateSubmitOurSkill.generalintroduction &&
  //           this.objourskill.title == this.chekUpdateSubmitOurSkill.title &&
  //           this.objourskill.shortintroduction ==
  //             this.chekUpdateSubmitOurSkill.shortintroduction
  //         ) {
  //           this.dirty = true;
  //         } else {
  //           this.dirty = false;
  //         }
  //       },
  //       deep: true
  //     },
  //   },
  computed: {
    // ourskill () {
    //   return this.product
    // }
    // percent() {
    //   return this.apipercent;
    // }
  },
  methods: {
    closeTab () {
      this.$router.push('/admin')
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
      formData.append('data', JSON.stringify(this.objourskill))
      formData.append('file', this.uploadPic)
      // eslint-disable-next-line no-undef
      updateServicesOurSkill(
        this.$route.params.ourskillId,
        formData
      ).then(response => alert('update surcess'))

      // update percent
      this.percent.forEach((element, index) => {
        const formDatapercent = new FormData()
        formDatapercent.append('data', JSON.stringify(this.percent[index]))
        // eslint-disable-next-line no-undef
        updateServicesPercent(element.id, formDatapercent)
      })
      this.dirty = true
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
    cancelCreateProductList () {
      this.$q
        .dialog({
          title: 'Warning',
          message: 'Do you really want to cancel?',
          persistent: true,
          cancel: true
        })
        .onOk(() => {
          this.$router.push('/admin/product-list')
        })
    }
  },
  created () {
    // loadAllOurSkill().then(response => {
    //   this.ourskillist = response.data;
    //   for (let i = 0; i < this.ourskillist.length; i++) {
    //     if (this.$route.params.ourskillId === this.ourskillist[i].id) {
    //       this.objourskill = this.ourskillist[i];
    //       this.chekUpdateSubmitOurSkill.ourskill = response.data[i].ourskill;
    //       this.chekUpdateSubmitOurSkill.generalintroduction =
    //         response.data[i].generalintroduction;
    //       this.chekUpdateSubmitOurSkill.title = response.data[i].title;
    //       this.chekUpdateSubmitOurSkill.shortintroduction =
    //         response.data[i].shortintroduction;
    //       if (this.objourskill.img == null) {
    //         this.showPreview = true;
    //       } else {
    //         this.showPreview = false;
    //       }
    //       break;
    //     }
    //   }
    // });
    // console.log(this.$route.params);
    // console.log(this.ourskillist[0].id)
    // if(this.$route.params.sliderId == "1"){
    //     alert("sdjhg")
    // }
    for (let i = 0; i < this.productlist.length; i++) {
      if (this.$route.params.productId === this.productlist[i].id) {
        this.product = this.productlist[i]
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
  width: 83%;
}
</style>
