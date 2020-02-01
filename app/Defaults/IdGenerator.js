const Model = use("Model");
const moment = require("moment");
const Formats = use('Antl/Formats')

class IdGenerator extends Model {

static controlHour(equipamentID) {

 // const formattedDare = format('YYYY-MM-DD')
//CLng((dataHora.ToString("yyMMddHHmmss") & DadosEquipamento.First.EquipamentoID.ToString.PadLeft(5, "0"c)))
const equipamentIDpadleft =  equipamentID.toString().padStart(5, '0').toString()

const date = moment(Date.now()).format('YYYY')
  + moment(Date.now()).format('MM')
  + moment(Date.now()).format('DD')
  + moment(Date.now()).format('HH')
  + moment(Date.now()).format('mm')
  + moment(Date.now()).format('ss')

  const id = (`${date}${equipamentIDpadleft}`)
  return id
}

static operation(equipamentID) {

  // const formattedDare = format('YYYY-MM-DD')
 //CLng((dataHora.ToString("yyMMddHHmmss") & DadosEquipamento.First.EquipamentoID.ToString.PadLeft(5, "0"c)))
 const equipamentIDpadleft =  equipamentID.toString().padStart(5, '0').toString()

 const date = moment(Date.now()).format('YYYY')
   + moment(Date.now()).format('MM')
   + moment(Date.now()).format('DD')
   + moment(Date.now()).format('HH')
   + moment(Date.now()).format('mm')
   + moment(Date.now()).format('ss')

   const id = (`${date}${equipamentIDpadleft}`)
   return id
 }

}

module.exports = IdGenerator;
