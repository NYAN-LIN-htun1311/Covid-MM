<template>
  <v-container id="about-us" fluid tag="section">
    <v-row>
      <v-col cols="12">
        <div class="d-flex justify-end">
          <paragraph-heading>Coronavirus Disease 2019 (COVID-19) Surveillance Dashboard</paragraph-heading>
          <v-img
            alt="Covid Logo"
            class="shrink mx-5"
            contain
            src="../../assets/corona-virus-icon.png"
            transition="scale-transition"
            width="50"
          />
        </div>
        <v-card-text
          class="font-weight-light"
        >We intend that people from our country can check updates news on this Coronavirus and get informations not only for Myanmar but also for worldwide situations. Desire the details of case by place names and update news can search easily in this website.</v-card-text>
      </v-col>
    </v-row>

    <v-divider></v-divider>
    <section class="text-center my-10">
      <img
        src="../../assets/btt-logo.png"
        transition="scale-transition"
        width="150"
        class="shrink my-5"
      />
      <h1 class="font-weight-light mb-2 headline" v-text="`Developed By BTT Group`" />
    </section>
    <v-row>
      <v-col>
        <v-timeline
          :dense="$vuetify.breakpoint.smAndDown"
          :align-top="$vuetify.breakpoint.smAndDown"
        >
          <v-timeline-item v-for="(timeline, i) in timelines" :key="i" large>
            <template v-slot:opposite>
              <span>{{timeline.name}}</span>
            </template>
            <template v-slot:icon>
              <v-avatar>
                <img :src="require(`../../assets/${timeline.icon}`)" />
              </v-avatar>
            </template>

            <v-card class="pa-6">
              <v-chip :color="timeline.color" class="overline mb-3">{{ timeline.chip }}</v-chip>
              <p class="subtitle-1 font-weight-light" v-text="timeline.text" />
              <span class="caption font-weight-light hidden-md-and-up" v-text="timeline.name"></span>
            </v-card>
          </v-timeline-item>
        </v-timeline>
      </v-col>
    </v-row>

    <v-divider></v-divider>
    <v-row>
      <v-col cols="12" lg="6" md="6" sm="12">
        <v-card>
          <v-card-title>Technology and Theme</v-card-title>
          <v-card-text class="mt-5">
            <p class="font-weight-normal">Technology : Vue JS 3</p>
            <p class="font-weight-normal">Theme : Vuetify material dashboard</p>
            <p class="font-weight-normal">
              Credit
              <a href="https://mmwebfonts.comquas.com/" class="link">MMWebFonts</a> for Pyidaungsu font
            </p>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col cols="12" lg="6" md="6" sm="12">
        <v-card>
          <v-card-title>News resources</v-card-title>
          <v-card-text class="mt-5">
            <p class="font-weight-normal">
              <a
                href="https://www.facebook.com/MinistryOfHealthAndSportsMyanmar/"
                class="link"
              >Ministry Of Health and Sport Myanmar</a>
            </p>
            <p class="font-weight-normal">
              <a href="https://www.facebook.com/MyanmarCDC/" class="link">Myanmar CDC</a>
            </p>
            <p class="font-weight-normal">
              <a href="https://mohs.gov.mm/" class="link">MOHS</a>
            </p>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>

    <v-row>
      <v-col cols="12">
        <v-card>
          <v-card-text>
            <base-subheading subheading="Used API Backends" />
            <base-material-alert color="info" dark icon="mdi-wan">
              <p class="display-1">
                We use
                <v-chip color="primary" class="mr-2">https://api.coronastatistics.live</v-chip>for global informations.
              </p>
              <p class="display-1">
                <v-chip color="blue" class="mr-2">Google firebase</v-chip>for local informations.
              </p>
            </base-material-alert>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>

    <v-row>
      <v-col cols="12">
        <sup class="team-section text-center my-5">
          <h4 class="display-1 font-weight-light">
            <v-icon small>mdi-copyright</v-icon>2020 Covid-19 Data Dashboard &lt;BTT Vue JS 1
            <sup>st</sup> Batch Training /&gt;
          </h4>
          <h4 class="text-center font-weight-light mt-5">{{currentVersion}}</h4>
        </sup>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: "About-Us",
  components: {
    ParagraphHeading: {
      render(h) {
        return h(
          "div",
          {
            class: "headline font-weight-light col cols-12"
          },
          this.$slots.default
        );
      }
    }
  },
  data() {
    return {
      timelines: [
        {
          name: "Nyan Lin Htun",
          chip: "Local Myanmar Client Site",
          color: "accent",
          icon: "nlh.png",
          text:
            "I have studied fourth year in University of Computer Studies (UCSY).I deeply love to make developing web designs."
        },
        {
          name: "Ye Lin Htet",
          chip: "Global Data Statistics",
          color: "success",
          icon: "ylh.png",
          text:
            "Although I am a final year CT student in UCSY, but I love web applications development."
        },
        {
          name: "Phyo Wai Nyunt",
          chip: "Admin Control for local info",
          color: "info",
          icon: "pwn.png",
          text:
            "I have studied on third year in UCSY. And I'm also a student learning both frontend and backend web technologies to be fullstack developer."
        },
        {
          name: "Thu Wai Naing",
          chip: "Global Data Query",
          color: "warning",
          icon: "twn.jpg",
          text:
            "I'm also a third year student in UCSY. I used to read everything about WEB developing. Now there is the way how we applied."
        }
      ]
    };
  },
  computed: {
    currentVersion() {
      return this.$store.state.version;
    }
  }
};
</script>

<style scoped>
.link {
  text-decoration: none;
}
</style>