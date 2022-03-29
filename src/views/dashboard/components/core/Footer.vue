<template>
  <v-footer id="dashboard-core-footer" default>
    <v-container>
      <v-row no-gutters>
        <v-spacer class="hidden-sm-and-down" />
        <v-col cols="12" class="text-center">
          <div class="body-1 font-weight-light pt-6 pt-md-0">
            <v-icon size="18">
              mdi-xml
            </v-icon>
            Vue JS Project Training by <a href="https://www.facebook.com/btttraining">BTT Programming Training Center</a>
          </div>
        </v-col>
      </v-row>
    </v-container>
  </v-footer>
</template>

<script>
export default {
  name: "DashboardCoreFooter",

};
</script>

<style lang="sass">
#dashboard-core-footer
  background-color: #F5F5F5
  a
    font-size: .825rem
    font-weight: 500
    text-decoration: none
    text-transform: uppercase
</style>
