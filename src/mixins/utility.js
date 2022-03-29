export default {
    methods: {
        commify(_numberString) {
            if (!_numberString) return _numberString;
            if (
                _numberString === "NaN" ||
                Number.isNaN(_numberString) ||
                Number.isNaN(this.unCommafyNumber(_numberString))
            ) {
                return "";
            }
            if (typeof _numberString === "number") {
                return _numberString.toLocaleString();
            }
            return parseFloat(this.unCommafyNumber(_numberString)).toLocaleString();
        },
        unCommafyNumber(_numberString) {
            typeof _numberString === "number"
                ? _numberString
                : parseFloat(_numberString.replace(/,/g, ""));
        }
    },
}