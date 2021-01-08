<template>
  <v-form ref="form" v-model="valid" lazy-validation>
    <h2>オリジナルブランドを作ろう</h2>
    <v-text-field
      ref="bidfield"
      v-model="bid"
      label="ブランドID"
      counter="12"
      :rules="[rules.required, rules.maxlength, rules.minlength, rules.textonly]"
      outlined
      @focus="bidValiReset()"
      @change="bidValiStart()"
    />
    <p>{{ checkBidValiState }}</p>
    <p>ブランドIDはオンラインショップのURLになるんだ</p>
    <p>他のブランドと被らないIDをつけてね</p>
    <v-text-field
      ref="bnamefield"
      v-model="bname"
      label="ブランド名"
      counter="12"
      :rules="[rules.required]"
      outlined
    />
    <p>ブランドごとにオンラインショップができるよ</p>
    <p>プロダクトを創ってして販売しちゃおう</p>
    <v-btn
      :disabled="!isAllVali"
      depressed
      @click="addBrand()"
    >
      追加
    </v-btn>
  </v-form>
</template>
<script>
const { mapGetters } = require('vuex')
export default {
  name: 'CcoBrandCreate',
  data () {
    return {
      valid: true,
      bname: '',
      bid: '',
      rules: {
        required: v => !!v || '必ず入力してください',
        maxlength: v => (v && v.length <= 12) || '最長12文字までです',
        minlength: v => (v && v.length >= 3) || '3文字以上入力してください',
        textonly: v => /^[a-zA-Z0-9]+$/.test(v) || '英数字のみ使用できます'
        // onlyone: v => this.isBidVali || 'このブランドIDは既に使われています'
      }
    }
  },
  computed: {
    ...mapGetters('xd/create/xdcbrand', ['bidValiState']),
    isBidVali () {
      console.log(this.$store.getters['xd/create/xdcbrand/bidValiState'])
      if (this.$store.getters['xd/create/xdcbrand/bidValiState'] === 'ng') {
        // this.$refs.bid.error()
        return false
      }
      return true
    },
    checkBidValiState () {
      switch (this.$store.getters['xd/create/xdcbrand/bidValiState']) {
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
      if (this.$store.getters['xd/create/xdcbrand/bidValiState'] !== 'ok') {
        return false
      } else if (!this.valid) {
        return false
      }
      return true
    }
  },
  mounted () {
    console.log('CCO brand mounted')
    // リセット
    this.bidValiReset()
    this.$refs.form.resetValidation()
  },
  methods: {
    bidValiStart () {
      console.log('CCO brand bidValiStart ' + this.bid)
      if (this.$refs.bidfield.validate()) {
        this.$store.dispatch('xd/create/xdcbrand/bidValiSet', this.bid)
      }
    },
    bidValiReset () {
      console.log('CCO brand bidValiReset')
      this.$store.dispatch('xd/create/xdcbrand/bidValiReset')
    },
    addBrand () {
      console.log('CCO brand aAddBrand ' + this.bname)
      this.$store.dispatch('xd/create/xdcbrand/addBrand', {
        bid: this.bid,
        bname: this.bname
      })
      this.$router.push(`/create/brand/${this.bid}`)
    }
  }
}
</script>
<style scoped lang="scss">
</style>
