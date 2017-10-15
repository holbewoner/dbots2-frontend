import Vue from 'vue'
import numeral from 'numeral'

Vue.filter("numeral", function(value, format) {
    return numeral(value).format(format || '0a')
})