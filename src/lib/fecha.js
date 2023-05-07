const { format } = require('timeago.js');
const moment = require('moment');

const helpers = {};

helpers.timeago = (timestamp) => {
    return format(timestamp);
};
helpers.tiempoAtras = (timestamp) => {
    return moment(timestamp).startOf('minute').fromNow()
}

module.exports = helpers;