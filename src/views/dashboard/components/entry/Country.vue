<template>
  <v-container id="dashboard" fluid tag="section">
      <section class="text-center">
          <v-row>
            <v-col>
                <country-flag
                v-if="getCode(country.country || '')"
                :country="getCode(country.country)"
                size="big"
                alt="iso"
                />
                <v-icon v-else>mdi-flag</v-icon>
                <h3 class="display-3">{{country.country}}</h3>
            </v-col>
            
                
          </v-row>
           </section>
      
      <v-row>
            <v-col
            cols="12"
            sm="6"
            :md="drawer? 6: 4"
            :lg="drawer?4:3"
            v-for="[key, val] in countryKeysMap"
            :key="key"
            >
            <base-material-stats-card
            :color="val.color"
            :icon="`mdi-${val.icon}`"
            :title="val.label"
            :value="commify(country[key]) + ''"
            sub-icon="mdi-file-document"
            :sub-text="val.description"
            />
          </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" lg="4" :md="drawer?12:4" sm="12">
            <p class="display-1 font-weight-light">Rate Distribution of {{country.country}}</p>
            <base-material-chart-card
                class="pb-5"
                :data="pieChart.data"
                :options="pieChart.options"
                :responsive-options="pieChart.responsiveOptions"
                color="cyan darken-1"
                hover-reveal
                type="Pie"
            >
                <h4 class="card-title font-weight-light mt-2 ml-2 mm-font">Rate Distribution</h4>
                <p class="d-inline-flex font-weight-light ml-2 mt-1 mm-font">ဖြစ်ပွားမှုနှိုင်းယှဥ်ချက်</p>
                <template v-slot:actions>
                    <v-icon class="mr-1" small>mdi-chart-pie</v-icon>
                    <span
                    class="caption grey--text font-weight-light"
                    >Rate Distribution</span>
                </template>
            </base-material-chart-card>
        </v-col>
        <v-col cols="12" lg="8" :md="drawer?12:8" sm="12">
            <p class="display-1 font-weight-light">Infection Rate of {{country.country}}</p>
            <base-material-chart-card
            :data="infectionCountryChart.data"
            :options="infectionCountryChart.options"
            hover-reveal
            color="teal lighten"
            type="Line"
            :show="isWeeklyChartAvailable"
            >
            <v-row style="margin-bottom:-0.4em;">
                <v-col cols="12" lg="4" md="4" sm="4">
                <h3 class="card-title font-weight-light ml-2 mm-font">7 Days</h3>
                <p class="d-inline-flex font-weight-light ml-2 mm-font">Infection Rate</p>
                </v-col>
                <v-col cols="12" lg="8" md="8" sm="8">
                <div class="d-flex justify-space-around pt-4 legend">
                    <p md="auto" class="mr-5 white--text mm-font">
                    <v-icon color="white" class="mr-1">mdi-circle</v-icon>Cases
                    </p>
                    <p md="auto" class="mr-5 white--text mm-font">
                    <v-icon color="red" class="mr-1">mdi-circle</v-icon>Deaths
                    </p>
                    <p md="auto" class="white--text mm-font">
                    <v-icon color="yellow" class="mr-1">mdi-circle</v-icon>Recovered
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
      <v-btn @click="BackToHome()" small outlined color="primary">Back Home Page</v-btn>
  </v-container>
</template>

<script>
import Constants from "../../constants";
import utilityMixin from '../../../../mixins/utility';
import formattedMixin from '../../../../mixins/formatted';
import axios from "axios";
import { getCode, overwrite } from "country-list";

export default {
    name: 'Country',
    mixins: [utilityMixin, formattedMixin],
    data() {
        return {
            country: {},
            getCode: getCode,
            countryKeysMap: Constants.COUNTRY_KEYS_MAP,
            monthShortName: Constants.MONTH_NAMES_SHORT,
            countryKeysMap: Constants.COUNTRY_KEYS_MAP,
            countryDistribution: Constants.COUNTRY_DISTRIBUTION,
            isWeeklyChartAvailable : true,
            infectionCountryChart: {
                data: {
                    labels: [],
                    series: []
                 },
                 options: {
                    lineSmooth: this.$chartist.Interpolation.cardinal({
                    tension: 10
                    }),
                    low: 0,
                    high: 10,
                    chartPadding: {
                        top: 0,
                        right: 0,
                        bottom: 0,
                        left: 0
                    },
                    axisY: {
                        offset: 50,
                        labelInterpolationFnc: value => {
                            return (value > 1000) ? value / 1000 + "k" : value;
                        }
                    }
                },
                responsiveOptions: [
                    [
                    "screen and (max-width: 640px)", {
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
            pieChart: {
                data: {
                    series: [],
                    labels: [],
                },
                
                options: {
                   labelInterpolationFnc: function(value) {
                        return value
                    },
                },
                responsiveOptions: [
                    ["screen and (min-width: 370px)",
                        {
                            chartPadding: 20,
                            labelOffset: 40,
                            labelInterpolationFnc: function(value) {
                                return value;
                            }
                        }
                    ],
                    ["screen and (min-width: 760px)",
                        {
                            chartPadding: 15,
                            labelOffset: 40,
                            labelInterpolationFnc: function(value) {
                                return value;
                            }
                        }
                    ],
                    ['screen and (min-width: 1024px)', 
                        {
                            labelOffset: 42,
                            chartPadding: 20
                        }
                    ]
                ]
            }
        }
    },

    methods: {
        BackToHome(){
            this.$router.back();
        }
    },
        
    computed: {
        drawer() {
            return this.$store.state.drawer;
        }
        
    },

    created () {
        overwrite(Constants.OVERWRITE_COUNTRIES_CODES);
        // fetch the country data
        axios
        .get(`https://api.coronastatistics.live/countries/${this.$route.params.name}`)
        .then(response => {
            if(response.status == 200) {
            this.country = response.data;
            const pieLabels = [], pieSeries = [];
            this.countryDistribution.forEach((val, key) => {
                if(this.country[key]){
                    pieLabels.push(val.label);
                    pieSeries.push(this.country[key])
                }
            })
            this.pieChart.data.series = pieSeries;
            this.pieChart.data.labels = pieLabels;
            }
        });
        // fetch country timeseries data
        axios
        .get(`https://api.coronastatistics.live/timeline/${this.$route.params.name.split(' ').join('%20')}`)
        .then(response => {
            if(response.status == 200) {
                if(!response.data) {
                    this.isWeeklyChartAvailable = false;
                return;
                }
                const recordLength = response.data.data.timeline.length;
                let weeklyData = response.data.data.timeline.slice(Math.max(recordLength - 7, 0))
                const cases = weeklyData.map(item => item.cases);
                const deaths = weeklyData.map(item => item.deaths);
                const recovered = weeklyData.map(item => item.recovered);
                const dates = weeklyData.map(item => this.clarifyDate(item.date));
                const roofHigh = 1.05;
                this.infectionCountryChart.data.series[0] = cases;
                this.infectionCountryChart.data.series[1] = deaths;
                this.infectionCountryChart.data.series[2] = recovered;
                this.infectionCountryChart.options.high = Math.max(
                ...cases,
                ...deaths,
                ...recovered
                ) * roofHigh;
                
                this.infectionCountryChart.data.labels = dates;
            }
        });
    },
}
</script>

<style scoped>
.legend {
  background-color: #363636;
  border-radius: 4px;
  color: #fff;
}
</style>