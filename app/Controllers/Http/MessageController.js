"use strict";
const socket = use("SocketIOClient");

class MessageController {
  async store({ request }) {
    const {
       EquipamentoID
      ,Descricao
      ,Lida
      ,DataEnvio
      ,Latitude
	    ,Longitude
	    ,Altitude
	    ,KmHora
      ,CreationDate
	    ,LogUserEnvio
      ,LogUserEnvioOrigem
      ,MensagemTipoID
      ,FrenteID
      ,DataExpiracao
      ,DataExclusao
      ,MensagemStatusID
      ,OcorrenciaID
      ,ControleHoraID
    } = request.all();

    socket.emit("MESSAGE_SEND", {
       EquipamentoID
      ,Descricao
      ,Lida
      ,DataEnvio
      ,Latitude
	    ,Longitude
	    ,Altitude
	    ,KmHora
      ,CreationDate
	    ,LogUserEnvio
      ,LogUserEnvioOrigem
      ,MensagemTipoID
      ,FrenteID
      ,DataExpiracao
      ,DataExclusao
      ,MensagemStatusID
      ,OcorrenciaID
      ,ControleHoraID
    });

    return result;
  }
}

module.exports = MessageController;
