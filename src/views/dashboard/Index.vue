<template>
  <v-app>
    <dashboard-core-app-bar />

    <dashboard-core-drawer />

    <dashboard-core-view />
    <v-fab-transition>
      <v-btn color="pink" fixed bottom right fab to="/emergency" v-show="this.$store.state.fab">
        <v-icon>mdi-phone-classic</v-icon>
      </v-btn>
    </v-fab-transition>
  </v-app>
</template>

<script>
export default {
  name: "DashboardIndex",

  components: {
    DashboardCoreAppBar: () => import("./components/core/AppBar"),
    DashboardCoreDrawer: () => import("./components/core/Drawer"),
    DashboardCoreView: () => import("./components/core/View")
  },

  data: () => ({
    expandOnHover: false
  })
};
</script>
