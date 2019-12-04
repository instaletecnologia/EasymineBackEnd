'use strict'


const EquipamentoClassificacaoHook = exports = module.exports = {}

const Equipaments = use('App/Models/Equipamento')


EquipamentoClassificacaoHook.insertNewRecordSyncMobile = async (modelInstance) => {

  const equipments = await Equipaments.findAll()


    equipments.rows.map(async row => {

    })


}
