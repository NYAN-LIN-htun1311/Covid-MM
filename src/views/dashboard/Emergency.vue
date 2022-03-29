<template>
  <v-container id="about-us" fluid tag="section">
    <v-row justify="center">
      <h1
        :class="[$vuetify.breakpoint.smAndDown ? 'caption' : 'display-1' , 'mb-5']"
      >ပြည်နယ်နှင့်တိုင်းဒေသအလိုက် အရေးပေါ်ဆက်သွယ်ရန်ဖုန်းနံပါတ်များ</h1>
      <v-expansion-panels class="city" flat popout accordion focusable>
        <v-expansion-panel
          v-for="[key,val] in contactsMap"
          :key="key"
          class="mb-1"
          @click="townshipFinder = ''"
        >
          <v-expansion-panel-header disable-icon-rotate>
            {{cities.get(key)}}
            <template v-slot:actions>
              <v-icon color="pink">mdi-phone-classic</v-icon>
            </template>
          </v-expansion-panel-header>
          <v-expansion-panel-content>
            <v-text-field
              color="accent"
              flat
              label="Find township"
              solo-inverted
              prepend-inner-icon="mdi-magnify"
              v-model="townshipFinder"
              clearable
              @click:clear="townshipFinder = ''"
              class="mt-3"
              :autofocus="$vuetify.breakpoint.mdAndUp"
            ></v-text-field>
            <v-chip
              class="ma-2"
              color="deep-purple accent-4"
              outlined
              v-for="town in filterTownshipList(val.township)"
              :key="town"
              @click.stop="callContactList(town, val.record)"
            >
              <v-icon left>mdi-city</v-icon>
              {{town}}
            </v-chip>
          </v-expansion-panel-content>
        </v-expansion-panel>
      </v-expansion-panels>
      <v-dialog v-model="contactDialog" scrollable>
        <v-card>
          <v-card-title class="mb-3 mm-font">{{selectedTownship}}</v-card-title>
          <v-divider></v-divider>
          <v-card-text>
            <v-list two-line>
              <v-list-item v-for="rec in phoneList" :key="rec.name">
                <v-list-item-content>
                  <v-list-item-title v-text="rec.name" class="pa-1 mm-font"></v-list-item-title>
                  <v-list-item-subtitle v-text="rec.role" class="pa-1 mm-font"></v-list-item-subtitle>
                </v-list-item-content>
                <v-list-item-action>
                  <a :href="`tel:${ rec.phone }`" style="text-decoration:none;">
                    <v-btn icon :large="!$vuetify.breakpoint.smAndDown" color="accent">
                      <v-icon>mdi-phone</v-icon>
                    </v-btn>
                  </a>
                </v-list-item-action>
              </v-list-item>
            </v-list>
          </v-card-text>
          <v-divider></v-divider>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" text @click="contactDialog = false">Close</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-row>
  </v-container>
</template>

<script>
import covid from "../../backend/contacts.json";
import Constants from "./constants";
import { mapState, mapMutations } from "vuex";
export default {
  name: "Emergency",
  data() {
    return {
      contactDialog: false,
      phoneList: [],
      selectedTownship: "",
      cities: Constants.MYANMAR_CITIES,
      contactsMap: {},
      townshipFinder: ""
    };
  },
  computed: {
    ...mapState(["fab"])
  },

  methods: {
    ...mapMutations({
      setFab: "SET_FAB"
    }),
    callContactList(_township, _contactList) {
      this.contactDialog = true;
      this.selectedTownship = _township;
      this.phoneList.length = 0;
      this.phoneList = _contactList.filter(item => item.township === _township);
    },
    filterTownshipList(list) {
      if (!this.townshipFinder) {
        return list;
      }
      return Array.from(list).filter(item =>
        item.toLowerCase().match(this.townshipFinder.toLowerCase())
      );
    }
  },

  created() {
    // hide floating button
    this.setFab(false);

    this.contactsMap = new Map();
    this.cities.forEach((val, key) => {
      const city = covid.data.filter(item => {
        return item[9] === key;
      });
      let arr = [];
      let uniqueTownship = new Set(); //unique
      city.forEach(item => {
        const record = {};
        record.name = item[1];
        record.role = item[2];
        record.township = item[3];
        record.phone =
          item[4] !== "-" ? item[4] : item[5] !== "-" ? item[5] : item[6];
        arr.push(record);
        uniqueTownship.add(item[3]);
      });
      this.contactsMap.set(key, { record: arr, township: uniqueTownship });
    });
  },

  beforeDestroy() {
    this.setFab(true);
  }
};
</script>

<style lang="css" scoped>
.city,
.caption,
.display-1 {
  font-family: Pyidaungsu !important;
}
</style>


