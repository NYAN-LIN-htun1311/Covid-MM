<template>
  <v-container id="world-stats" fluid tag="section">
    <v-row dense>
      <v-col
        v-for="[key, val] in worldKeysMap"
        :key="key"
        cols="12"
        sm="6"
        :md="drawer? 6: 4"
        :lg="12 / worldKeysMap.size"
      >
        <base-material-testimony
          :title="val.label"
          :count="commify(globalLatestCount[key])"
          :avatar="`mdi-${val.icon}`"
          :avatarColor="val.color"
          class="mx-3"
        />
      </v-col>
    </v-row>

    <!-- chart -->

    <v-row>
      <v-col cols="12">
        <p class="display-1 font-weight-light">Global Infection Rate</p>
        <base-material-chart-card
          :data="worldChart.data"
          :options="worldChart.options"
          hover-reveal
          color="accent"
          type="Line"
        >
          <v-row style="margin-bottom:-0.8em;">
            <v-col cols="12" lg="4" md="4" sm="4">
              <h3 class="card-title font-weight-light ml-2">10 Days</h3>
              <p class="d-inline-flex font-weight-light ml-2">Infection Rate</p>
            </v-col>
            <v-col cols="12" lg="8" md="8" sm="8">
              <div class="d-flex justify-space-around pt-3 legend elevation-4">
                <p md="auto" class="mr-5 white--text">
                  <v-icon color="white" class="mr-1">mdi-square</v-icon>Cases
                </p>
                <p md="auto" class="mr-5 white--text">
                  <v-icon color="orange" class="mr-1">mdi-square</v-icon>Deaths
                </p>
                <p md="auto" class="white--text">
                  <v-icon color="yellow" class="mr-1">mdi-square</v-icon>Recovered
                </p>
              </div>
            </v-col>
          </v-row>
          <template v-slot:actions>
            <v-icon class="mr-1" small>mdi-chart-line</v-icon>
            <span class="caption grey--text font-weight-light">Infection Rate within 10 days</span>
          </template>
        </base-material-chart-card>
      </v-col>
    </v-row>

    <v-row>
      <v-col cols="12">
        <h2 class="mt-5">Global Timeline Statistics</h2>
        <base-material-card class="px-5 py-3 py-0" color="deep-orange">
          <template v-slot:heading>
            <div class="display-2 font-weight-light">Global Timeseries Data</div>
            <v-row style="height:5em;">
              <v-col cols="12">
                <v-dialog v-model="dateModel" width="300px">
                  <template v-slot:activator="{ on }">
                    <v-text-field
                      v-model="date"
                      label="Search by date"
                      prepend-icon="mdi-calendar"
                      readonly
                      v-on="on"
                      clearable
                      @click:clear="dateFinder = ''"
                    ></v-text-field>
                  </template>
                  <v-date-picker v-model="date" scrollable>
                    <v-spacer></v-spacer>
                    <v-btn text color="primary" @click="dateModel = false">Cancel</v-btn>
                    <v-btn text color="primary" @click="dateFinder = date; dateModel = false">OK</v-btn>
                  </v-date-picker>
                </v-dialog>
              </v-col>
            </v-row>
          </template>
          <v-card-text>
            <v-data-table
              :headers="tableHeaders"
              :items="globalTimelines"
              :search="dateFinder"
              loading-text="Loading... Please wait"
              :page.sync="page"
              :items-per-page="$vuetify.breakpoint.xsOnly ? 3: itemsPerPage"
              hide-default-footer
              @page-count="pageCount = $event"
              :dense="$vuetify.breakpoint.xsOnly ? true : false"
            >
              <template v-slot:item.cases="{ item }">{{commify(item.cases)}}</template>
              <template v-slot:item.deaths="{ item }">{{commify(item.deaths)}}</template>
              <template v-slot:item.recovered="{ item }">{{commify(item.recovered)}}</template>
            </v-data-table>
            <div class="text-center pt-3 mb-2">
              <v-pagination v-model="page" :length="pageCount" color="deep-orange"></v-pagination>
            </div>
          </v-card-text>
        </base-material-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import axios from "axios";
import Constants from "./constants";
import formattedMixin from "../../mixins/formatted";
import utilityMixin from "../../mixins/utility";

export default {
  name: "WorldStats",
  mixins: [formattedMixin, utilityMixin],
  data() {
    return {
      worldKeysMap: Constants.WORLD_DATA_KEYS_MAP,
      globalTimelines: [],
      worldChart: {
        data: {
          labels: [],
          series: []
        },
        options: {
          lineSmooth: this.$chartist.Interpolation.cardinal({
            tension: 10
          }),
          low: 0,
          high: 1000,
          chartPadding: {
            top: 0,
            right: 0,
            bottom: 0,
            left: 0
          },
          axisY: {
            offset: 50,
            labelInterpolationFnc: value => {
              return value / 1000 + "k";
            }
          }
        },
        responsiveOptions: [
          [
            "screen and (max-width: 640px)",
            {
              seriesBarDistance: 5,
              axisX: {
                labelInterpolationFnc: value => {
                  return `${value.split(" ")[0]}\n${value.split(" ")[1]}`;
                }
              }
            }
          ]
        ]
      },
      tabs: 0,
      globalStatisticsList: [],
      globalLatestCount: {},
      tableHeaders: Constants.GLOBAL_STATISTIS_HEADERS,
      dateFinder: "",
      page: 1,
      itemsPerPage: 10,
      pageCount: 0,
      dateModel: false,
      date: "",
      loading: true
    };
  },
  created() {
    // fetch global count
    axios.get(`https://api.coronastatistics.live/all`).then(response => {
      if (response.status == 200) {
        this.globalLatestCount = response.data;
      }
    });

    // fetch global history
    axios
      .get(`https://api.coronastatistics.live/timeline/global`)
      .then(response => {
        if (response.status == 200) {
          const data = response.data;
          const keys = Object.keys(data);

          let latestGlobalList = keys.slice(Math.max(keys.length - 10, 0));
          // this.globalLatestCount = data[latestGlobalList.slice(-1).pop()];

          // save 10 days labels
          this.worldChart.data.labels = latestGlobalList.map(item =>
            this.clarifyDate(item)
          );
          // save 10 days data
          const cases = latestGlobalList.map(key => Number(data[key].cases));
          const deaths = latestGlobalList.map(key => Number(data[key].deaths));
          const recovered = latestGlobalList.map(key =>
            Number(data[key].recovered)
          );
          this.worldChart.data.series[0] = cases;
          this.worldChart.data.series[1] = deaths;
          this.worldChart.data.series[2] = recovered;
          this.worldChart.options.high = Math.max(
            ...cases,
            ...deaths,
            ...recovered
          );

          // save timeline data
          const sortedKeys = keys.reverse();
          const historyCases = sortedKeys.map(key =>
            Object.assign({
              date: key,
              value: this.commify(Number(data[key].cases))
            })
          );
          const historyDeaths = sortedKeys.map(key =>
            Object.assign({
              date: key,
              value: this.commify(Number(data[key].deaths))
            })
          );
          const historyRecovered = sortedKeys.map(key =>
            Object.assign({
              date: key,
              value: this.commify(Number(data[key].recovered))
            })
          );

          // save historic data
          this.globalTimelines = sortedKeys.map(key => {
            return {
              date: this.formatDate(key),
              cases: data[key].cases,
              deaths: data[key].deaths,
              recovered: data[key].recovered
            };
          });

          this.loading = false;
        }
      });
  },
  beforeDestroy() {
    if (this.chart) {
      this.chart.dispose();
    }
  },
  computed: {
    drawer() {
      return this.$store.state.drawer;
    }
  },
  methods: {
    formatDate(_dateString) {
      const yr = _dateString.split("-")[0];
      const mon = ("0" + _dateString.split("-")[1]).slice(-2);
      const date = ("0" + _dateString.split("-")[2]).slice(-2);
      return `${yr}-${mon}-${date}`;
    }
  }
};
</script>

<style scoped>
.legend {
  background-color: #363636;
  border-radius: 4px;
  color: #fff;
}

#worldmap {
  width: 100%;
  height: 300%;
  overflow: hidden;
}
</style>