const Model = use("Model");

const Database = use('Database')
const _ = require("lodash");

class RulesBusinessMessage {

  // função para inserir uma nova operação
  static async MessageInsert(equipmentID, description, dateShipping, userID, messageTypeID, frontID, dateExpiration, dateExclusion, messageStatusID, ocorrenceID, controlTimeID) {

    const user  = await Database
      .select('dbo.Usuarios.Nome')
      .from('dbo.Usuarios')
      .where({'dbo.Usuarios.UsuarioID': userID})

    const messageId = await Database
    .insert({
       EquipamentoID: equipmentID
      ,Descricao: description
      ,Lida: false
      ,DataEnvio: dateShipping
      ,Latitude: 0
	    ,Longitude: 0
	    ,Altitude: 0
	    ,KmHora: 0
      ,CreationDate: dateShipping
	    ,LogUserEnvio: _.get(_.first(user), 'Nome')
      ,MensagemTipoID: messageTypeID
      ,FrenteID: frontID
      ,DataExpiracao: dateExpiration
      ,DataExclusao: dateExclusion
      ,MensagemStatusID: messageStatusID
      ,OcorrenciaID: ocorrenceID
      ,ControleHoraID: controlTimeID
      })
    .into('dbo.Mensagens')

   return messageId
  }

}

module.exports = RulesBusinessMessage;
