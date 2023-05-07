const { format } = require('timeago.js');

const helpers = {};



helpers.timeago = (timestamp) => {
    const minutos = Math.floor(timestamp / 60);
    const segundosRestantes = timestamp % 60;
    var resultado = minutos + " minutos y " + segundosRestantes + " segundos"
    return resultado;
};

module.exports = helpers;