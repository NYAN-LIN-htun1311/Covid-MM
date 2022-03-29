<template>
  <v-card class="text-center v-card--testimony">
    <div class="pt-6">
      <v-icon
        color="info"
        x-large
      >
      {{icon}}
      </v-icon>
    </div>

    <v-card-text
      class="display-2 font-weight-bold mb-3"
      v-text="title"
    />

    <v-skeleton-loader
      v-if="!count"
      type="text"
      class="mx-10"
    ></v-skeleton-loader>
    <div
      class="display-3 font-weight-bold font-italic mb-2"
      v-text="count"
    />

    <div
      class="body-2 text-uppercase grey--text"
      v-text="handle"
    />

    <v-avatar
      class="elevation-12"
      color="grey lighten-4"
      size="100"
    >
      <v-icon
        :color="avatarColor"
        x-large
      >
      {{avatar}}
      </v-icon>
    </v-avatar>

    <div />
  </v-card>
</template>

<script>
  export default {
    name: 'BaseMaterialTestimony',

    props: {
      icon: {
        type: String,
        default: 'mdi-web'
      },
      count: {
        type: String,
        default: '',
      },
      avatar: {
        type: String,
        default: 'mdi-account-cancel',
      },
      avatarColor: {
        type: String,
        default: 'deep-orange'
      },
      title: {
        type: String,
        default: '',
      },
      handle: {
        type: String,
        default: '',
      },
    },
  }
</script>

<style lang="sass">
  .v-card--testimony
    padding-bottom: 72px
    margin-bottom: 64px

    .v-avatar
      position: absolute
      left: calc(50% - 64px)
      top: calc(100% - 64px)
</style>
