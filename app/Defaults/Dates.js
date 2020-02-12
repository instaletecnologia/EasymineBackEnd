const Model = use("Model");
const moment = require("moment");

class Dates extends Model {

static get dates() {
return super.dates.concat(["end_date"]);
}

static castDates(field, value) {
if (field == "end_date") return value ? value.format("DD/MM/YYYY") : value;
else return value ? value.format("DD/MM/YYYY hh:mm a") : value;
}

static formatDates( value) {
retur nmoment(value).format('YYYYMMDD HH:mm:ss.SSS')
}

static currentDate() {

 // const formattedDare = format('YYYY-MM-DD')

  return moment(Date.now()).format('YYYYMMDD HH:mm:ss.SSS')
}

}

module.exports = Dates;
