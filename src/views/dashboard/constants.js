const KeysMap = new Map();
KeysMap.set('pui', { icon: 'account-clock', label: 'စောင့်ကြည့်လူနာ', description: 'Person Under Investigation', color: 'teal lighten-1' })
KeysMap.set('suspect', { icon: 'account-alert', label: 'သံသယလူနာ', description: 'Supected Case', color: 'yellow darken-4' })
KeysMap.set('confirm', { icon: 'bug-outline', label: 'ပိုးတွေ့လူနာ', description: 'Laboratory Confirmed Cases', color: 'deep-orange' })
KeysMap.set('negative', { icon: 'account-heart', label: 'ပိုးမရှိလူနာ', description: 'Laboratory Result Negative', color: 'pink accent-4' })
KeysMap.set('pending', { icon: 'account-question', label: 'အဖြေစောင့်ဆိုင်းဆဲလူနာ', description: 'Laboratory Result Pending', color: 'info' })
KeysMap.set('death', { icon: 'account-cancel', label: 'သေဆုံးလူနာ', description: 'Death among Laboratory Confirmed Cases', color: 'red accent-4' })
KeysMap.set('recover', { icon: 'account-hard-hat', label: 'ပြန်လည်သက်သာပြီးလူနာ', description: 'Recovered from COVID-19 (Recovered)', color: 'success' })
KeysMap.set('todayCases', { icon: 'bug-check', label: 'ယနေ့ပိုးတွေ့လူနာ', description: 'Today Laboratory Confirmed Cases', color: 'warning' })
KeysMap.set('todayDeaths', { icon: 'account-cancel', label: 'ယနေ့သေဆုံးလူနာ', description: 'Today Death among Laboratory Confirmed Cases', color: 'red darken-4' })

const worldDataKeysMap = new Map();
worldDataKeysMap.set('cases', { icon: 'bug-check', label: 'Infections', color: 'deep-orange' })
worldDataKeysMap.set('deaths', { icon: 'account-cancel', label: 'Deaths', color: 'red accent-4' })
worldDataKeysMap.set('recovered', { icon: 'account-heart', label: 'Recoveries', color: 'success' })

const countryKeysMap = new Map();
countryKeysMap.set('cases', { icon: 'bug-outline', label: 'Infections', color: 'deep-orange', description: 'Laboratory Confirmed Cases' })
countryKeysMap.set('deaths', { icon: 'account-cancel', label: 'Deaths', color: 'red accent-4', description: 'Death among Laboratory Confirmed Cases' })
countryKeysMap.set('recovered', { icon: 'account-hard-hat', label: 'Recovered', color: 'success', description: 'Recovered from COVID-19 (Recovered)' })
countryKeysMap.set('active', { icon: 'bug-check', label: 'Active', color: 'yellow darken-2', description: 'Active People among COVID-19' })
countryKeysMap.set('critical', { icon: 'bug-outline', label: 'Critical', color: 'teal lighten-1', description: 'Critical Case' })
countryKeysMap.set('todayCases', { icon: 'bug-check', label: 'Today Cases', color: 'warning', description: 'Today Loboratory Confirmed Cases' })
countryKeysMap.set('todayDeaths', { icon: 'account-cancel', label: 'Today Deaths', color: 'red darken-4', description: 'Today Death Laboratory Confirmed Cases' })

const countryMappings = new Map();
countryMappings.set("USA", "United States");
countryMappings.set("UK", "United Kingdom");
countryMappings.set("S. Korea", "South Korea");
countryMappings.set("Congo", "Democratic Republic of Congo");
countryMappings.set("Eswatini", "eSwatini");
countryMappings.set("Palestine", "Palestinian Territories");
countryMappings.set("UAE", "United Arab Emirates");
countryMappings.set("Laos", "Lao People's Democratic Republic");

const countryDistribution = new Map();
countryDistribution.set("cases", { label: 'Infections' });
countryDistribution.set("deaths", { label: 'Deaths' });
countryDistribution.set("recovered", { label: 'Recovered' });

const myanmarCities = new Map();
myanmarCities.set("Yangon", "ရန်ကုန်တိုင်းဒေသကြီး");
myanmarCities.set("Naypyitaw", "နေပြည်တော်");
myanmarCities.set("Bago", "ပဲခူးတိုင်းဒေသကြီး");
myanmarCities.set("Mandalay", "မန္တလေးတိုင်းဒေသကြီး");
myanmarCities.set("Sagaing", "စစ်ကိုင်းတိုင်းဒေသကြီး");
myanmarCities.set("Tanintharyi", "တနင်္သာရီတိုင်းဒေသကြီး");
myanmarCities.set("Magway", "မကွေးတိုင်းဒေသကြီး");
myanmarCities.set("Ayeyarwaddy", "ဧရာဝတီတိုင်းဒေသကြီး");
myanmarCities.set("Kachin", "ကချင်ပြည်နယ်");
myanmarCities.set("Kayah", "ကယားပြည်နယ်");
myanmarCities.set("Kayin", "ကရင်ပြည်နယ်");
myanmarCities.set("Chin", "ချင်းပြည်နယ်");
myanmarCities.set("Mon", "မွန်ပြည်နယ်");
myanmarCities.set("Rakhine", "ရခိုင်ပြည်နယ်");
myanmarCities.set("Shan East", "ရှမ်းပြည်နယ်အရှေ့ပိုင်း");
myanmarCities.set("Shan South", "ရှမ်းပြည်နယ်တောင်ပိုင်း");
myanmarCities.set("Shan North", "ရှမ်းပြည်နယ်မြောက်ပိုင်း");
myanmarCities.set("Central", "ရုံးချုပ်");

const casesSort = [
    { text: "By Total Cases", value: "cases" },
    { text: "By Total Deaths", value: "deaths" },
    { text: "By Total Recovered", value: "recovered" }
];

const localTableHeaders = [
    { text: "Township", value: "name", sortable: false },
    { text: "Cases", value: "confirm", align: "center", sortable: true }
];

const globalStatistisHeaders = [
    { text: "Date", value: "date", sortable: true },
    { text: "Cases", value: "cases", sortable: false, align: "right" },
    { text: "Deaths", value: "deaths", sortable: false, align: "right" },
    { text: "Recoveries", value: "recovered", sortable: false, align: "right" },
];

const todayNewsEssentialInfo = ['pui', 'confirm', 'death', 'recover', 'todayCases', 'todayDeaths'];
const hospitalEssentialInfo = ['confirm', 'death', 'recover'];

const overwiteCountriesCodes = [
    { code: "vnm", name: "Vietnam" },
    { code: "ven", name: "Venezuela" },
    { code: "vat", name: "Vatican City" },
    { code: "usa", name: "USA" },
    { code: "gbr", name: "UK" },
    { code: "are", name: "UAE" },
    { code: "tca", name: "Turks and Caicos" },
    { code: "tza", name: "Tanzania" },
    { code: "twn", name: "Taiwan" },
    { code: "syr", name: "Syria" },
    { code: "vct", name: "St. Vincent Grenadines" },
    { code: "blm", name: "St. Barth" },
    { code: "sxm", name: "Sint Maarten" },
    { code: "spm", name: "Saint Pierre Miquelon" },
    { code: "maf", name: "Saint Martin" },
    { code: "kor", name: "S. Korea" },
    { code: "reu", name: "Réunion" },
    { code: "rus", name: "Russia" },
    { code: "pse", name: "Palestine" },
    { code: "mda", name: "Moldova" },
    { code: "msr", name: "MS Zaandam" },
    { code: "lao", name: "Laos" },
    { code: "bol", name: "Bolivia" },
    { code: "vgb", name: "British Virgin Islands" },
    { code: "brn", name: "Brunei" },
    { code: "nld", name: "Caribbean Netherlands" },
    { code: "fro", name: "Faeroe Islands" },
    { code: "flk", name: "Falkland Islands" },
    { code: "irn", name: "Iran" },
];

export default Object.freeze({
    KEYS_MAP: KeysMap,
    CASES_SORT: casesSort,
    LOCAL_TABLE_HEADERS: localTableHeaders,
    OVERWRITE_COUNTRIES_CODES: overwiteCountriesCodes,
    TODAY_NEWS_ESSENTIAL_INFO: todayNewsEssentialInfo,
    HOSPITAL_ESSENTIAL_INFO: hospitalEssentialInfo,
    WORLD_DATA_KEYS_MAP: worldDataKeysMap,
    GLOBAL_STATISTIS_HEADERS: globalStatistisHeaders,
    COUNTRY_KEYS_MAP: countryKeysMap,
    COUNTRY_MAPPINGS: countryMappings,
    COUNTRY_DISTRIBUTION: countryDistribution,
    MYANMAR_CITIES: myanmarCities
});