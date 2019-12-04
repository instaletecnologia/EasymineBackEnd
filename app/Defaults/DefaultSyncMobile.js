
const Model = use("Model");

const Defaults = use('App/Defaults/Dates')
const NewcurrentDate = Defaults.currentDate()
const Env = use('Env')

const SyncMobile = use('App/Models/SyncMobile')

class DefaultSyncMobile extends Model {

async insertNewRecordSyncMobile ({ EquipamentoID, RegistroID, DescricaoTabela, TipoOperacao, Url }) {

await SyncMobile.create({
  'EquipamentoID' : EquipamentoID,
  'RegistroID': RegistroID,
  'DescricaoTabela': DescricaoTabela,
  'TipoOperacao': TipoOperacao,
  'DataCadastro': NewcurrentDate,
  'Status': 0,
  'DataAlteracaoStatus': null,
  'Url': `${Env.get('SYNC_MOBILE_APP_URL')} \ ${Url}`
})

}

}

module.exports = DefaultSyncMobile;
