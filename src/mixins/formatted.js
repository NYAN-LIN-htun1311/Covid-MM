export default {
    data() {
        return {
            MONTH_NAMES_SHORT: [
                'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dev'
            ]
        }
    },
    methods: {
        clarifyDate(_date) {
            const month = Number(_date.split("-")[1]) - 1;
            let date = Number(_date.split("-")[2]);
            return `${this.MONTH_NAMES_SHORT[month]} ${date}`;
        }
    },
}