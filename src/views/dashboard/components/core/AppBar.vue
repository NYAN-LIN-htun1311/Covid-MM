<template>
  <v-app-bar id="app-bar" absolute app color="transparent" flat height="75">
    <v-toolbar-title class="hidden-sm-and-down font-weight-light headline" v-text="$route.name" />
    <v-toolbar-title v-if="$vuetify.breakpoint.smOnly" class="font-weight-light headline" v-text="$route.name" />
    <p v-if="$vuetify.breakpoint.xsOnly" v-text="$route.name" ></p>

    <v-spacer />
    <v-btn class="mr-3" elevation="1" fab small @click="setDrawer(!drawer)">
      <v-icon v-if="drawer">mdi-forwardburger</v-icon>
      <v-icon v-else>mdi-backburger</v-icon>
    </v-btn>
  </v-app-bar>
</template>

<script>
// Components
import { VHover, VListItem } from "vuetify/lib";

// Utilities
import { mapState, mapMutations } from "vuex";

export default {
  name: "DashboardCoreAppBar",

  components: {
    AppBarItem: {
      render(h) {
        return h(VHover, {
          scopedSlots: {
            default: ({ hover }) => {
              return h(
                VListItem,
                {
                  attrs: this.$attrs,
                  class: {
                    "black--text": !hover,
                    "white--text secondary elevation-12": hover
                  },
                  props: {
                    activeClass: "",
                    dark: hover,
                    link: true,
                    ...this.$attrs
                  }
                },
                this.$slots.default
              );
            }
          }
        });
      }
    }
  },

  props: {
    value: {
      type: Boolean,
      default: false
    }
  },

  computed: {
    ...mapState(["drawer"])
  },

  methods: {
    ...mapMutations({
      setDrawer: "SET_DRAWER"
    })
  }
};
</script>
