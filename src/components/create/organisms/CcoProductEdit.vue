<template>
  <div
    v-if="product!==null"
  >
    <div
      class="CooPedBtn"
      @click="openProduct()"
    >
      <h3>
        {{ product.name }} 編集
      </h3>
    </div>
    <v-dialog
      v-model="dialog"
      class="CooPedDil"
      fullscreen
      hide-overlay
      transition="dialog-bottom-transition"
    >
      <v-card
        class="CooPedDil--base"
      >
        <v-form>
          <h2>
            {{ product.name }}  testes
          </h2>
          <v-text-field
            v-model="pe_name"
            label="プロダクト名"
            outlined
          />
          <v-text-field
            v-model="pe_type"
            label="タイプ"
            outlined
          />
          <v-text-field
            v-model="pe_price"
            type="number"
            label="価格"
          />
          <div
            class="CooPedDil--creatives--garalley"
          >
            <v-img
              v-for="(cObj, key) in pe_creatives"
              :key="key"
              class="CooPedDil--creatives--images"
              :src="cObj.getPath()"
            />
          </div>
          <v-file-input
            accept="image/*"
            label="画像をアップロード"
            @change="onFileSelect"
          />
          <v-btn
            @click="closeProduct()"
          >
            キャンセル
          </v-btn>
          <v-btn
            :disabled="!isEdited"
            @click="updateProduct()"
          >
            更新
          </v-btn>
          <CgmOkCancelDialog
            :isopen="okcancelDialog"
            :okfunc="dialogCloseOk"
            :cancelfunc="dialogCloseCancel"
          >
            <p>
              編集した内容が破棄されます。宜しいですか？
            </p>
          </CgmOkCancelDialog>
        </v-form>
      </v-card>
    </v-dialog>
  </div>
</template>
<script>
import CgmOkCancelDialog from '@/components/general/molecules/CgmOkCancelDialog.vue'
const cfBrands = require('~/classes/cfBrands.js')
export default {
  name: 'CcoProductEdit',
  components: {
    CgmOkCancelDialog
  },
  props: {
    product: {
      type: Object,
      default: null
    },
    openfunc: {
      type: Function,
      default: null
    },
    closefunc: {
      type: Function,
      default: null
    },
    isopen: {
      type: Boolean,
      default: false
    }
  },
  data: () => ({
    pe_name: '',
    pe_price: 0,
    pe_type: '',
    pe_status: '',
    pe_topimage: '',
    /*
    pe_creater: '',
    pe_dateCreate: '',
    pe_dateUpdate: '',
    pe_dateRelease: '',
    pe_dateEnd: '',
    pe_brand: '',
    */
    pe_attention: {},
    pe_purchase: {},
    pe_creatives: {},
    okcancelDialog: false
  }),
  computed: {
    dialog: {
      get () {
        return this.$props.isopen
      },
      set (value) {
        if (value === false) {
          this.closeProduct()
        }
      }
    },
    isEdited () {
      if (this.pe_name !== this.$props.product.name) {
        return true
      } else if (this.pe_price !== this.$props.product.price) {
        return true
      } else if (this.pe_type !== this.$props.product.type) {
        return true
      } else if (this.pe_status !== this.$props.product.status) {
        return true
      } else if (this.pe_topimage !== this.$props.product.topimage) {
        return true
      } else if (!this.$props.product.isEqualAttention(this.pe_attention)) {
        return true
      } else if (!this.$props.product.isEqualPurchase(this.pe_purchase)) {
        return true
      } else if (!this.$props.product.isEqualCreatives(this.pe_creatives)) {
        return true
      }
      return false
    }
  },
  mounted () {
    if (typeof this.$props.product === 'undefined') {
      //
    } else if (this.$props.product === null) {
      //
    } else {
      this.pe_name = this.$props.product.name
      this.pe_price = this.$props.product.price
      this.pe_type = this.$props.product.type
      this.pe_status = this.$props.product.status
      this.pe_topimage = this.$props.product.topimage
      /*
      this.pe_creater = this.$props.product.creater
      this.pe_dateCreate = this.$props.product.dateCreate
      this.pe_dateUpdate = this.$props.product.dateUpdate
      this.pe_dateRelease = this.$props.product.dateRelease
      this.pe_dateEnd = this.$props.product.dateEnd
      this.pe_brand = this.$props.product.brand
      */
      this.pe_attention = Object.assign({}, this.$props.product.attention)
      this.pe_purchase = Object.assign({}, this.$props.product.purchase)
      this.pe_creatives = Object.assign({}, this.$props.product.creatives)
    }
  },
  methods: {
    openProduct () {
      console.log('CCO product edit open ' + this.$props.product.id)
      if (typeof this.$props.openfunc === 'undefined') {
        //
      } else if (this.$props.openfunc === null) {
        //
      } else {
        this.$props.openfunc(this.$props.product.id)
      }
    },
    closeProduct () {
      console.log('CCO product edit close ' + this.$props.product.id)
      if (typeof this.$props.closefunc === 'undefined') {
        //
      } else if (this.$props.closefunc === null) {
        //
      } else if (this.isEdited) {
        this.okcancelDialog = true
      } else {
        this.$props.closefunc()
      }
    },
    dialogCloseOk () {
      this.okcancelDialog = false
      this.$props.closefunc()
    },
    dialogCloseCancel () {
      this.okcancelDialog = false
    },
    onFileSelect (file) {
      console.log('CCO product edit select file')
      if (typeof file === 'undefined') {
        //
      } if (file === null) {
        //
      } else {
        const creative = new cfBrands.CCreative()
        creative.setFromFile(file)
        this.$set(this.pe_creatives, creative.id, creative)
        // this.$set(this.pe_creatives, `FILE_${Math.random().toString(32).substring(2)}`, window.URL.createObjectURL(file))
      }
    },
    updateProduct () {
      console.log('CCO product edit update ' + this.$props.product.id)
      if (this.isEdited) {
        const pAfter = Object.assign({}, this.$props.product)
        pAfter.price = this.pe_price
        pAfter.type = this.pe_type
        pAfter.status = this.pe_status
        pAfter.topimage = this.pe_topimage
        pAfter.attention = Object.assign({}, this.pe_attention)
        pAfter.purchase = Object.assign({}, this.pe_purchase)
        pAfter.creatives = Object.assign({}, this.pe_creatives)
        this.$store.dispatch('xd/create/xdcproducts/updateProduct', pAfter)
      }
      this.$props.closefunc()
    }
  }
}
</script>
<style scoped lang="scss">
.CooPedDil--base{
  padding: 1rem;
  .CooPedDil--creatives--garalley{
    display: flex;
    flex-wrap: wrap;
    padding: 1rem!important;
    justify-content: space-around;
    .CooPedDil--creatives--images{
      width: 40%;
      flex-grow: 0;
    }
  }
}
</style>
