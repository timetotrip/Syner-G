<template>
  <v-form ref="form" v-model="valid" lazy-validation>
    <h2>オリジナルショップを作ろう</h2>
    {{ this.$props.defbrand }}
    <v-text-field
      ref="bidfield"
      v-model="sid"
      label="ショップID"
      counter="12"
      :rules="[rules.required, rules.maxlength, rules.minlength, rules.textonly]"
      outlined
      @focus="sidValiReset()"
      @change="sidValiStart()"
    />
    <p>{{ checkSidValiState }}</p>
    <p>ショップIDはオンラインショップのURLになるんだ</p>
    <p>他のショップと被らないIDをつけてね</p>
    <v-text-field
      ref="snamefield"
      v-model="sname"
      label="ショップ名"
      counter="12"
      :rules="[rules.required]"
      outlined
    />
    <p>ブランドごとにオンラインショップができるよ</p>
    <p>プロダクトを創ってして販売しちゃおう</p>
    <v-btn
      :disabled="!isAllVali"
      @click="addShop()"
    >
      追加
    </v-btn>
  </v-form>
</template>
<script>
const { mapGetters } = require('vuex')
export default {
  name: 'CcoShopCreate',
  props: {
    defid: {
      type: String,
      default: ''
    },
    defname: {
      type: String,
      default: ''
    },
    defbrand: {
      type: String,
      default: ''
    }
  },
  data: () => ({
    valid: true,
    sname: '',
    sid: '',
    sbrand: '',
    rules: {
      required: v => !!v || '必ず入力してください',
      maxlength: v => (v && v.length <= 12) || '最長12文字までです',
      minlength: v => (v && v.length >= 3) || '3文字以上入力してください',
      textonly: v => /^[a-zA-Z0-9]+$/.test(v) || '英数字のみ使用できます'
      // onlyone: v => this.isBidVali || 'このブランドIDは既に使われています'
    }
  }),
  computed: {
    ...mapGetters('xd/create/xdcshop', ['sidValiState']),
    isSidVali () {
      console.log(this.$store.getters['xd/create/xdcshop/sidValiState'])
      if (this.$store.getters['xd/create/xdcshop/sidValiState'] === 'ng') {
        // this.$refs.bid.error()
        return false
      }
      return true
    },
    checkSidValiState () {
      switch (this.$store.getters['xd/create/xdcshop/sidValiState']) {
        // case 'ok':
        //   return 'このIDは使えます'
        case 'ng':
          return 'このIDは使えません'
        // case '':
        //   return ''
        default:
          return ''
      }
    },
    isAllVali () {
      if (this.$store.getters['xd/create/xdcshop/sidValiState'] !== 'ok') {
        return false
      } else if (!this.valid) {
        return false
      }
      return true
    }
  },
  mounted () {
    console.log('CCO shop mounted')
    // リセット
    this.sidValiReset()
    this.$refs.form.resetValidation()
    if (this.$props.defid !== '') {
      this.sid = this.$props.defid
      this.sidValiStart()
    }
    if (this.$props.defname !== '') {
      this.sname = this.$props.defname
    }
    if (this.$props.defbrand !== '') {
      this.sbrand = this.$props.defbrand
    }
  },
  methods: {
    sidValiStart () {
      console.log('CCO shop bidValiStart ' + this.sid)
      if (this.$refs.bidfield.validate()) {
        this.$store.dispatch('xd/create/xdcshop/sidValiSet', this.sid)
      }
    },
    sidValiReset () {
      console.log('CCO shop bidValiReset')
      this.$store.dispatch('xd/create/xdcshop/sidValiReset')
    },
    addBrand () {
      console.log('CCO shop aAddShop ' + this.sname)
      this.$store.dispatch('xd/create/xdcshop/addShop', {
        bid: this.sid,
        bname: this.sname
      })
      this.$router.push(`/create/shop/${this.sid}`)
    }
  }
}
</script>
<style scoped lang="scss">
</style>
