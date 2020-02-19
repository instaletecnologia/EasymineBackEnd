const Model = use("Model");
const moment = require("moment");
const _ = use('lodash');
const Database = use('Database')

class Dates extends Model {

static get dates() {
return super.dates.concat(["end_date"]);
}

static castDates(field, value) {
if (field == "end_date") return value ? value.format("DD/MM/YYYY") : value;
else return value ? value.format("DD/MM/YYYY hh:mm a") : value;
}

static formatDates( value) {
  const dateReplace = value.replace('"', '').replace('"','')
  return moment.utc(dateReplace).format('YYYYMMDD HH:mm:ss.SSS')
}

static async currentDate() {

  // função pega a data do servidor para realizar operacoes com datas.
  const dateServer = await Database.raw(` SELECT GETDATE() as Date`)
  const date = _.get(_.first(dateServer), 'Date')
  const result =  moment.utc(date, "pt")
  return moment(result).format('YYYYMMDD HH:mm:ss.SSS')
}

}

module.exports = Dates;
