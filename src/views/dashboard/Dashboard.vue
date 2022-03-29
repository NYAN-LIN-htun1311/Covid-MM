<template>
  <v-container id="dashboard" fluid tag="section">
    <!-- latest date row -->
    <v-row>
      <v-col cols="auto" style="margin-top:-3%;">
        <img src="../../assets/mm-flag.png" alt="Myanmar map" :width="$vuetify.breakpoint.smAndDown ? 100 : 150"/>
      </v-col>
      <v-spacer></v-spacer>
      <v-col cols="auto">

        <v-sheet width="230" height="70" v-if="!isApidone">
          <v-col cols="12">
            <v-skeleton-loader type="sentences"></v-skeleton-loader>
          </v-col>
        </v-sheet>

        <v-alert
          v-else
          dark
          colored-border
          max-height="70"
          type="info"
          border="right"
          icon="mdi-calendar-outline"
        >
          Last updated:
          <br />
          <span class="mr-2 display-1" v-if="todayNews.updated">
            {{ formattedTimeString(todayNews.updated) }}
          </span>
          <span class="mr-2 display-1" v-else-if="backupDate">
            {{ formattedTimeString(backupDate) }}
          </span>
          <span v-else>
            {{todayNews.date}} {{format2DigitTime(todayNews.time)}}
          </span>
        </v-alert>
      </v-col>
    </v-row>

    <!-- news row -->
    <v-row v-if="!isApidone">
      <v-col sm="6"
        :md="drawer? 6: 4"
        :lg="drawer?4:3"
        v-for="item in 6" :key="`news-skeleton-${item}`">
        <v-sheet width="auto" height="120">
          <v-col cols="12">
            <v-skeleton-loader type="list-item-avatar-two-line"></v-skeleton-loader>
          </v-col>
        </v-sheet>
      </v-col>
    </v-row>
    <v-row v-else>
      <v-col
        cols="12"
        sm="6"
        :md="drawer? 6: 4"
        :lg="drawer?4:3"
        v-for="[key, val] in keysMap"
        :key="key"
        v-if="Number(todayNews[key]) > 0 || todayNewsEssentialInfo.includes(key)"
      >
        <base-material-stats-card
          :color="val.color"
          :icon="`mdi-${val.icon}`"
          :title="val.label"
          :value="`${todayNews[key]}`"
          sub-icon="mdi-file-document"
          :sub-text="val.description"
        />
      </v-col>
    </v-row>

    <!-- charts row -->
    <v-row>
      <v-col cols="12" lg="4" :md="drawer?12:4" sm="12">
        <base-material-chart-card
          :data="puiWeeklyChart.data"
          :options="puiWeeklyChart.options"
          :responsive-options="puiWeeklyChart.responsiveOptions"
          color="info"
          hover-reveal
          type="Bar"
        >
          <h4 class="card-title font-weight-light mt-2 ml-2 mm-font">၁ ပတ်တာ</h4>
          <p class="d-inline-flex font-weight-light ml-2 mt-1 mm-font">စောင့်ကြည့်ခံရမှုလူနာ နှုန်းထား</p>
          <template v-slot:actions>
            <v-icon class="mr-1" small>mdi-chart-bar</v-icon>
            <span
              class="caption grey--text font-weight-light"
            >Person Under Investigation Weekly Rate</span>
          </template>
        </base-material-chart-card>
      </v-col>
      <!-- Line Chart --> 
      <v-col cols="12" lg="8" :md="drawer?12:8" sm="12">
        <base-material-chart-card
          :data="infectionChart.data"
          :options="infectionChart.options"
          hover-reveal
          color="accent"
          type="Line"
        >
          <v-row style="margin-bottom:-0.8em;">
            <v-col cols="12" lg="4" md="4" sm="4">
              <h3 class="card-title font-weight-light ml-2 mm-font">၁ ပတ်တာ</h3>
              <p class="d-inline-flex font-weight-light ml-2 mm-font">ကူးစက်မှု နှုန်းထား</p>
            </v-col>
            <v-col cols="12" lg="8" md="8" sm="8">
              <div class="d-flex justify-space-around pt-3 legend">
                <p md="auto" class="mr-5 white--text mm-font">
                  <v-icon color="white" class="mr-1">mdi-square</v-icon>ပိုးတွေ့
                </p>
                <p md="auto" class="mr-5 white--text mm-font">
                  <v-icon color="orange" class="mr-1">mdi-square</v-icon>သေဆုံး
                </p>
                <p md="auto" class="white--text mm-font">
                  <v-icon color="yellow" class="mr-1">mdi-square</v-icon>ပြန်လည်သက်သာ
                </p>
              </div>
            </v-col>
          </v-row>
          <template v-slot:actions>
            <v-icon class="mr-1" small>mdi-chart-line</v-icon>
            <span class="caption grey--text font-weight-light">Infection Weekly Rate</span>
          </template>
        </base-material-chart-card>
      </v-col>
    </v-row>

    <!-- cases by local township & affected countries -->
    <v-row>
      <!-- local hospitals -->
      <v-col cols="12" lg="7" :md="drawer ? 12: 7">
        <base-material-card color="deep-orange" class="px-5 py-3">
          <template v-slot:heading>
            <div class="display-2 font-weight-light">Cases by Township in Myanmar</div>
            <div
              class="subtitle-1 font-weight-light"
            >Latest updated: {{todayNews.date}} {{format2DigitTime(todayNews.time)}}</div>
            <v-row style="height:5em;">
              <v-col cols="12">
                <v-text-field
                  color="deep-orange"
                  flat
                  :label="'Search '+ hospitalList.length +' infecting townships'"
                  solo-inverted
                  prepend-inner-icon="mdi-magnify"
                  v-model="hospitalFinder"
                  clearable
                  @click:clear="clearSearch"
                ></v-text-field>
              </v-col>
            </v-row>
          </template>
          <v-card-text>
            <v-data-table
              :headers="headers"
              :items="hospitalList"
              :search="hospitalFinder"
              loading="false"
              loading-text="Loading... Please wait"
              :page.sync="page"
              :items-per-page="$vuetify.breakpoint.xsOnly ? 5: itemsPerPage"
              hide-default-footer
              @page-count="pageCount = $event"
              @click:row="showDetailHospital"
              :dense="$vuetify.breakpoint.xsOnly ? true : false"
            >
              <!-- <template v-slot:item.more="{ item }">
                {{item.more}}
                <v-icon color="warning">mdi-information-outline</v-icon>
              </template> -->
            </v-data-table>
            <div class="text-center pt-3 mb-2">
              <v-pagination v-model="page" :length="pageCount" color="deep-orange"></v-pagination>
            </div>
            <v-bottom-sheet v-model="sheet" inset>
              <v-sheet height="auto">
                <div class="py-3">
                  <v-list two-line subheader>
                    <v-list-item>
                      <v-list-item-content>
                        <v-list-item-title class="display-1">{{individualHospitalInfo.name}}</v-list-item-title>
                        <v-list-item-subtitle
                          class="text--disabled"
                        >Latest updated: {{todayNews.date}} {{format2DigitTime(todayNews.time)}}</v-list-item-subtitle>
                      </v-list-item-content>
                    </v-list-item>

                    <v-list-item v-for="[key, val] in keysMap" :key="key" v-if="Number(individualHospitalInfo[key]) > 0 || hospitalEssentialInfo.includes(key)">
                      <v-list-item-avatar>
                        <v-icon
                          class="grey lighten-4 white--text"
                          :color="`${val.color}`"
                          v-text="`mdi-${val.icon}`"
                        ></v-icon>
                      </v-list-item-avatar>

                      <v-list-item-content>
                        <v-list-item-title style="line-height:1.6;">
                          <v-badge
                            color="pink"
                            :content="individualHospitalInfo[key] || '0'"
                            class="mm-font"
                          >{{val.label}}</v-badge>
                        </v-list-item-title>
                        <v-list-item-subtitle v-text="val.description"></v-list-item-subtitle>
                      </v-list-item-content>
                    </v-list-item>
                    <v-divider inset></v-divider>
                  </v-list>
                </div>
              </v-sheet>
            </v-bottom-sheet>
          </v-card-text>
        </base-material-card>
      </v-col>
      <!-- infected all countries -->
      <v-col cols="12" lg="5" :md="drawer ? 12: 5">
        <base-material-card color="info">
          <template v-slot:heading>
            <div class="d-flex justify-space-between">
              <div class="display-2 font-weight-light">Infected all countries</div>
            </div>
            <v-row style="height:6.7em;">
              <v-col cols="12">
                <v-text-field
                  color="info"
                  flat
                  :label="`Search infected ${latestCountriesData.length} countries`"
                  solo-inverted
                  prepend-inner-icon="mdi-magnify"
                  v-model="countryFinder"
                  clearable
                  @click:clear="clearSearch"
                ></v-text-field>
              </v-col>
              <v-col style="margin-top:-3em;">
                <v-select
                  v-model="casesSorter"
                  :items="casesSort"
                  item-text="text"
                  item-value="value"
                  label="Sort by"
                  solo
                  dense
                ></v-select>
              </v-col>
            </v-row>
          </template>
          <v-form>
            <v-container class="py-0">
              <v-row>
                <v-col cols="12">
                  <v-skeleton-loader
                    v-if="!isApidone"
                    type="list-item-avatar-two-line"
                    tile
                    class="mx-auto"
                    v-for="item in 7" :key="`list-skeleton-${item}`"
                  ></v-skeleton-loader>
                  <v-list
                    v-if="filteredCountriesList"
                    two-line
                    subheader
                    elevation="2"
                    max-height="500"
                    class="overflow-y-auto"
                  >
                    <v-list-item
                      v-for="country in filteredCountriesList"
                      :key="country.country"
                      style="border-bottom: solid 1px #EEEEEE"
                      :to="{ name: 'Country', params: {name: country.country } }"
                    >
                      <v-list-item-avatar>
                        <country-flag
                          v-if="getCode(country.country)"
                          :country="getCode(country.country)"
                          size="normal"
                          alt="iso"
                        />
                        <v-icon v-else>mdi-flag</v-icon>
                      </v-list-item-avatar>

                      <v-list-item-content>
                        <v-list-item-title v-if="$vuetify.breakpoint.smAndUp">{{country.country || "name"}}</v-list-item-title>
                        <v-list-item-title class="caption" v-else>{{country.country || "name"}}</v-list-item-title>
                        <v-list-item-subtitle class="mt-1">
                          <v-chip color="deep-orange" text-color="white" small>
                            <span class="subtitle-1" v-if="$vuetify.breakpoint.smAndUp">{{commify(country.cases)}} Cases</span>
                            <span v-else>{{commify(country.cases)}} Cases</span>
                          </v-chip>
                        </v-list-item-subtitle>
                      </v-list-item-content>

                      <v-list-item-action>
                        <v-list-item-action-text class="pink--text">
                          <span
                            class="subtitle-2 font-weight-light"
                            v-if="$vuetify.breakpoint.smAndUp"
                          >{{commify(country.deaths)}} Deaths</span>
                          <span v-else>{{commify(country.deaths)}} Deaths</span>
                        </v-list-item-action-text>
                        <v-list-item-action-text class="success--text">
                          <span
                            class="subtitle-2 font-weight-light"
                             v-if="$vuetify.breakpoint.smAndUp"
                          >{{ commify(country.recovered) }} Recovered</span>
                          <span v-else>{{ commify(country.recovered) }} Recovered</span>
                        </v-list-item-action-text>
                      </v-list-item-action>
                    </v-list-item>
                  </v-list>
                  <span v-else>No country found</span>
                  <p
                    class="text-center subtitle-2 font-weight-light mt-4"
                  >Updated {{this.latestCountriesData[0] ? ((this.latestCountriesData[0].updated) ? new Date(this.latestCountriesData[0].updated) : new Date(this.backupDate)) : 'Finding...'}}
                  </p>
                </v-col>
              </v-row>
            </v-container>
          </v-form>
        </base-material-card>
      </v-col>
    </v-row>
    <!-- latest status row -->
    <v-row>
      <v-col cols="12">
        <h3 class="mt-5 mb-2 headline">Latest Status</h3>
        <v-alert
          border="top"
          colored-border
          type="info"
          color="warning"
          elevation="2"
        >
        <v-skeleton-loader
          v-if="!latestStatus"
          type="sentences"
          class="mx-auto"
        ></v-skeleton-loader>
        <p v-else class="mm-font">{{latestStatus}}</p>
        </v-alert>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import firebase from "../../backend/firebase";
import Constants from "./constants";
import formattedMixin from '../../mixins/formatted';
import utilityMixin from '../../mixins/utility';
import axios from "axios";
import countries from "i18n-iso-countries";
import { getCode, overwrite } from "country-list";

export default {
  name: "DashboardDashboard",
  inject: ["theme"],
  mixins: [formattedMixin, utilityMixin],
  data() {
    return {
      ref: firebase.firestore().collection("news"),
      statusRef: firebase.firestore().collection("status"),
      hospitalRef: firebase.firestore().collection("townships"),
      todayNews: {},
      latestStatus: "",
      keysMap: Constants.KEYS_MAP,
      isApidone: false,
      backupDate: '',
      infectionChart: {
        data: {
          labels: [],
          series: []
        },
        options: {
          lineSmooth: this.$chartist.Interpolation.cardinal({
            tension: 10
          }),
          low: 0,
          high: 30,
          showPoint: false,
          chartPadding: {
            top: 0,
            right: 0,
            bottom: 0,
            left: 0
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
      puiWeeklyChart: {
        data: {
          labels: [],
          series: []
        },
        options: {
          axisX: {
            showGrid: false
          },
          low: 0,
          high: 0,
          chartPadding: {
            top: 0,
            right: 5,
            bottom: 0,
            left: 0
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
      hospitalList: [],
      todayNewsEssentialInfo: Constants.TODAY_NEWS_ESSENTIAL_INFO,
      hospitalEssentialInfo: Constants.HOSPITAL_ESSENTIAL_INFO,
      individualHospitalInfo: {},
      page: 1,
      itemsPerPage: 9,
      pageCount: 0,
      latestCountriesData: [],
      hospitalFinder: "",
      sheet: false,
      countryFinder: "",
      casesSort: Constants.CASES_SORT,
      casesSorter: "",
      headers: Constants.LOCAL_TABLE_HEADERS,
      getCode: getCode
    };
  },

  created() {
    overwrite(Constants.OVERWRITE_COUNTRIES_CODES);
    countries.registerLocale(require("i18n-iso-countries/langs/en.json"));
    // get countries data
    this.$store.dispatch('loadCountryList');
    // get latest 7 days news list
    this.ref
      .orderBy("date", "desc")
      .limit(7)
      .onSnapshot(querySnapshot => {
        let newsList = [];
        querySnapshot.forEach(doc => {
          newsList.unshift(doc.data());
        });

        this.todayNews = newsList.slice(-1).pop();
        this.isApidone = true;
        // store weekly pui chart data
        this.puiWeeklyChart.data.labels = newsList.map(item =>
          this.clarifyDate(item.date)
        );
        this.puiWeeklyChart.data.series[0] = newsList.map(item =>
          Number(item.pui)
        );
        this.puiWeeklyChart.options.high = Math.max(
          ...newsList.map(item => Number(item.pui))
        );

        // store weekly infection chart data
        this.infectionChart.data.labels = newsList.map(item =>
          this.clarifyDate(item.date)
        );
        const confirmList = newsList.map(item => Number(item.confirm));
        const deathList = newsList.map(item => Number(item.death));
        const recoverList = newsList.map(item => Number(item.recover));
        const roofHigh = 1.05;
        this.infectionChart.data.series[0] = confirmList;
        this.infectionChart.data.series[1] = deathList;
        this.infectionChart.data.series[2] = recoverList;
        this.infectionChart.options.high = Math.max(
          ...confirmList,
          ...deathList,
          ...recoverList
        ) * roofHigh;

        // waiting api 5 sec, if not, use firebase value
        setTimeout(() => {
          this.isApidone = true;
        }, 5000);
        // fetch latest date
        // fetch global count
        axios
          .get(`https://api.coronastatistics.live/all`)
          .then(response => {
            if(response.status == 200){
              this.backupDate = response.data.updated;
            }
          });
        // fetch latest all countries from store
        this.latestCountriesData = [];
        this.latestCountriesData = this.$store.state.countryList;
        const myanmar = this.latestCountriesData.find(item => item.country == 'Myanmar');
        if(myanmar) {
          // check latest firebase or api
          if(Number(this.todayNews.confirm || 0) < myanmar.cases) {
            Object.assign(this.todayNews, {confirm: myanmar.cases});
          }
          if(Number(this.todayNews.death || 0) < myanmar.deaths){
            Object.assign(this.todayNews, {death: myanmar.deaths});
          }
          if(Number(this.todayNews.recover || 0) < myanmar.recovered){
            Object.assign(this.todayNews, {recover: myanmar.recovered});
          }
          Object.assign(this.todayNews, {todayCases: myanmar.todayCases});
          Object.assign(this.todayNews, {todayDeaths: myanmar.todayDeaths});
          Object.assign(this.todayNews, {updated: myanmar.updated});
        }    
      });

    //  get hospital data
    this.hospitalRef
      .orderBy("confirm", "desc")
      .onSnapshot(querySnapshot => {
      this.hospitalList = [];
      querySnapshot.forEach(doc => {
        this.hospitalList.push(doc.data());
      });
    });

    // get latest status
    this.statusRef.limit(1).onSnapshot(querySnapshot => {
      this.latestStatus = "";
      querySnapshot.forEach(doc => {
        this.latestStatus = doc.data().value;
      });
    });
  },

  computed: {
    drawer() {
      return this.$store.state.drawer;
    },
    filteredCountriesList() {
      if (this.casesSorter) {
          this.countryFinder = "";
          return this.sortBy(this.casesSorter);
      }
      if(!this.countryFinder) {
        return this.latestCountriesData
      }
      return this.latestCountriesData.filter(item => {
          return (
            item.country &&
            item.country.toLowerCase().match(this.countryFinder.toLowerCase())
          );
      });
    }
  },

  methods: {
    
    getCountryName(_isoCode) {
      return countries.getName(_isoCode, "en");
    },
    clearSearch() {
      this.countryFinder = "";
    },
    showDetailHospital(_info) {
      this.sheet = !this.sheet;
      this.individualHospitalInfo = {};
      if (!this.sheet) return;
      this.individualHospitalInfo = _info;
    },
    sortBy(_flag) {
      switch (_flag) {
        case "cases":
          return this.latestCountriesData.sort((a, b) =>
            a.cases < b.cases ? 1 : -1
          );
        case "deaths":
          return this.latestCountriesData.sort((a, b) =>
            a.deaths < b.deaths ? 1 : -1
          );
        default:
          return this.latestCountriesData.sort((a, b) =>
            a.recovered < b.recovered ? 1 : -1
          );
      }
    },
    format2DigitTime(_time) {
      if (!_time) return;
      let hours = Number(_time.split(":")[0]);
      let minutes = Number(_time.split(":")[1]);
      const part = hours >= 12 ? "PM" : "AM";
      hours = hours % 12;
      const hour = hours ? hours.toString().slice(-2) : 12;
      const minute = minutes < 10 ? "0" + minutes : minutes;
      return `${hour}:${minute} ${part}`;
    },

    formattedTimeString(_timeInstamp) {
      const date = new Date(_timeInstamp);
      const year = date.getFullYear();
      const month = ('0' + (date.getMonth() + 1)).slice(-2);
      const date_str = date.getDate().toString().slice(-2);
      const time = this.format2DigitTime(date.getHours().toString() +':' + date.getMinutes().toString());
      return `${year}-${month}-${date_str} ${time}`;
    }
  },
  watch: {
    countryFinder() {
      this.casesSorter = "";
    }
  },
};
</script>

<style lang="css" scoped>
.legend {
  background-color: #363636;
  border-radius: 4px;
  color: #fff;
}
</style>