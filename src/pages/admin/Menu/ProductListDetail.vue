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
            <b>ProductList > Detail </b>
          </p>
        </div>
        <!----content-detail-->
        <div class="boderlist">
          <div class="title-list" style="padding:10px;">
            <b>ProductList - Detail</b>
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
                  <i>{{product.title}}</i>
                </p>
              </div>
              <!----gerenal-Introduction--->
              <div class="col-xs-3 col-sm-3 col-md-3">
                <p style="margin-left:30px;">
                  <b>Category*</b>
                </p>
              </div>
              <div class="col-xs-9 col-sm-9 col-md-9">
                <q-item-label v-html="product.category" style="margin:0px 30px;" />
              </div>
                <div class="col-xs-3 col-sm-3 col-md-3">
                <p style="margin-left:30px;">
                  <b>Content*</b>
                </p>
              </div>
              <div class="col-xs-9 col-sm-9 col-md-9">
                <q-item-label v-html="product.content" style="margin:0px 30px;" />
              </div>
                <div class="col-xs-3 col-sm-3 col-md-3">
                <p style="margin-left:30px;">
                  <b>Price*</b>
                </p>
              </div>
              <div class="col-xs-9 col-sm-9 col-md-9">
                <q-item-label v-html="product.price" style="margin:0px 30px;" />
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
                    style="margin:0px 0px;margin-left:30px;"
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
                  :to="'/admin/product-list'"
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
                  :to="'/admin/product-list/update/' + product.id"
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
      product: {},
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
          deleteServicesOurSkill(this.$route.params.ourskillId).then(response =>
            alert('delete surcess')
          )
          this.apipercent.forEach((element, index) => {
            // eslint-disable-next-line no-undef
            deleteServicesPercent(this.apipercent[index]).then(response =>
              alert('delete surcess')
            )
          })
          location.reload(this.$router.push('/admin/product-list/detail'))
        })
    }
  },
  created () {
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
  width: 60%;
  margin-left: 20px;
}
</style>
