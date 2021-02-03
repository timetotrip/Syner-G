<template>
  <div class="CgmFam">
    <slot :name="appeared" />
    <div :class="['CgmFam--menu',{'CgmFam--active': fabActive}]">
      <v-speed-dial
        v-model="fabActive"
        class="CgmFam--menu--dial"
        :right="true"
        :bottom="true"
        :align-items="'flex-end'"
      >
        <template #activator>
          <v-btn
            color="red darken-2"
            dark
            fab
          >
            <font-awesome-icon
              :class="['CgmFam--menu--toggle',{'CgmFam--active': fabActive}]"
              :icon="['fas', 'location-arrow']"
            />
          </v-btn>
        </template>
        <div
          v-for="menu in menus"
          :key="menu.key"
          class="CgmFam--menu--item"
          @click="setAppeared(menu.key)"
        >
          <p class="CgmFam--menu--title">
            {{ menu.title }}
          </p>
          <v-btn
            class="CgmFam--menu--btn"
            fab
            dark
            small
            color="red"
          >
            <font-awesome-icon
              class="CgmFam--menu--icon"
              :icon="menu.icon"
            />
          </v-btn>
        </div>
      </v-speed-dial>
    </div>
  </div>
</template>
<script>
export default {
  name: 'CgmFloatActMenu',
  props: {
    defaultkey: {
      type: String,
      default: 'base'
    },
    menus: {
      type: Array,
      default: () => [{
        key: 'basic',
        title: '基本',
        icon: ''
      }]
    }
  },
  data () {
    return {
      fabActive: false,
      appeared: ''
    }
  },
  mounted () {
    this.appeared = this.$props.defaultkey
  },
  methods: {
    setAppeared (key) {
      this.appeared = key
    }
  }
}
</script>
<style scoped lang="scss">
.v-speed-dial__list{
  align-items:flex-end!important;
}
.CgmFam{
  .CgmFam--menu{
    position:absolute;
    right:0rem;
    bottom:0%;
    padding: 1rem;
    display: flex;
    flex-direction: column-reverse;
    align-items: flex-end;
    background-color: rgba(0,0,0,0);
    &.CgmFam--active{
      left:0;
      top:0;
    background-color: rgba(0,0,0,0.5);
      //background-color:black;
    }
    .CgmFam--menu--dial{
      .CgmFam--menu--toggle{
        font-size: 1.6rem;
        transform: rotate(-90deg);
        transition: 0.5s;
        &.CgmFam--active{
          transform: rotate(90deg);
        }
      }
      .CgmFam--menu--item{
        display: flex;
        align-items: center;
        flex-direction: column-reverse;
        .CgmFam--menu--title{
          font-size:0.6em;
          white-space: nowrap;
          margin:0;
        }
        .CgmFam--menu--btn{
          .CgmFam--menu--icon{
            font-size: 1.2rem;
          }
        }
      }
    }
  }
}
</style>
