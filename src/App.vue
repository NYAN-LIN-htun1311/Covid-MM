<template>
  <router-view />
</template>

<script>
  export default {
    name: 'App',
    data() {
      return {
        showUpgradeUI: false
      }
    },
    created() {
    if (this.$workbox) {
      this.$workbox.addEventListener("waiting", () => {
        this.showUpgradeUI = true;
      });
    }
  },
  
  methods: {
    async accept() {
      this.showUpgradeUI = false
      await this.$workbox.messageSW({ type: "SKIP_WAITING" });
    }
  }
  }
</script>


<style lang="css">
@import url("https://mmwebfonts.comquas.com/fonts/?font=pyidaungsu");

body {
  font-family: Pyidaungsu;
}

</style>