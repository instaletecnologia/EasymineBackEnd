'use strict'

const Equipamento = use('App/Models/Equipamento')
const Parametro = use('App/Models/Parametro')
const FrenteLocal = use('App/Models/FrenteLocal')
const Database = use('Database')
const _ = use('lodash')

class GeoProcessController {
  
  async getCoords({ request }){

    const boundsValue = await Parametro.find(10);
    const coords = JSON.parse(boundsValue.Valor);

    return {
      lat: coords[0],
      lng: coords[1],
      lat2: coords[2],
      lat3: coords[3],
    };

  }
  
  async getPosition({ request }){

    let equipments = await Equipamento.query()
      .with('Tipo')
      .with('Classificacao')
      .with('Modelo.Marca')
      .with('Locatario')
      .with('Proprietario')
      .with('Rastreamento')
      .whereHas('GeomReferencias')
      .where('Ativo', 1)
      .fetch();

    equipments = await Promise.all(
      equipments.rows.map(async row => {
        await row.load('UltimaLocalizacao');
        return row;
      })
    );

    return equipments;

  }

  async getFlux(){

    const weights = [
      {},
      {},
      {},
      {},
      {},
      {},
    ];

    let rows = (await Database.raw(`
      Exec dbo.prQDataDespachoEquipamentosFrente @EquipamentoTipoRastreamentoID=?, @FrenteID=?, @SetorID=?
    `, [-1, -1, -10])).map(row => row)

    let production = {}
    let ho = []
    let hm = []
    
    const hoItems = rows.filter(item => item.ParentID === 14 || item.ParentID === 5 || item.idCategoriasTempo === 14 || item.idCategoriasTempo === 5)
    const hmItems = rows.filter(item => item.ParentID === 3 || item.idCategoriasTempo === 3)

    let iHO = 0
    for(const item of hoItems){
      ho.push(await __parseEquipment(item))
      rows.splice(iHO, 1);
      iHO++
    }

    let iHM = 0
    for(const item of hmItems){
      hm.push(await __parseEquipment(item))
      rows.splice(iHM, 1);
      iHM++
    }

    const grouped = _.groupBy(rows, 'FrenteID');
    for(const frenteID in grouped){
      let MaquinaCarga = _.find(grouped[frenteID], equipment => parseInt(equipment.EquipamentoTipoID) === 7);
      if(MaquinaCarga) MaquinaCarga = await __parseEquipment(MaquinaCarga)

      const originEquipments = grouped[frenteID].filter(equipment => parseInt(equipment.Peso) <= 5);
      const destinityEquipments = grouped[frenteID].filter(equipment => parseInt(equipment.Peso) > 5);
      
      const originEquipmentsParsed = await __parseEquipment(originEquipments);
      const destinityEquipmentsParsed = await __parseEquipment(destinityEquipments, true);

      const originWeights = weights.map((weight, i) => ({
        Nome: i,
        Equipamentos: originEquipments.filter(equipment => equipment.Peso === i).map(equipament => equipament.EquipamentoID),
      }));

      const destinityWeights = weights.map((weight, i) => ({
        Nome: i + 1,
        Equipamentos: destinityEquipments.filter(equipment => (equipment.Peso - (weights.length - 1)) === i).map(equipament => equipament.EquipamentoID),
      }));

      production[frenteID] = {
        Origem: {
          Nome: grouped[frenteID][0].FrenteOrigem,
          Equipamentos: originEquipmentsParsed,
          Pesos: originWeights,
        },
        Destino: {
          Nome: grouped[frenteID][0].FrenteDestino,
          Equipamentos: destinityEquipmentsParsed,
          Pesos: destinityWeights,
        },
        MaquinaCarga,
      };

    }

    return {
      ho,
      hm,
      production: Object.keys(production).map(key => ({
        FrenteID: key,
        ...production[key],
      })),
    };

  }

}

async function __parseEquipment(param, isDestinity){

  let values = _.isArray(param) ? param : [param]
  let data = {}

  let i = 0;
  for(const equipment of values){
    const row = await Equipamento.findOrFail(equipment.EquipamentoID)
    await row.load('UltimaLocalizacao')

    const equipmentData = row.toJSON()
    equipmentData.Peso = equipment.Peso
    equipmentData.Operador = equipment.Operador
    equipmentData.Ocorrencia = equipment.Ocorrencia
    equipmentData.DataHoraInicio = equipment.DataHoraInicio
    equipmentData.DataInicio = equipment.DataInicio
    
    if(equipment.Img){

      equipmentData.Img = {
        src: `data:image/jpg;base64,${(new Buffer(equipment.Img)).toString('base64')}`,
        width: 45,
        style: {
          transform: 'rotate(0)',
        }
      };
  
      if((isDestinity && equipmentData.Peso < 10) || (!isDestinity && equipmentData.Peso === 0)) equipmentData.Img.style.transform += ' scaleX(-1)'

    }

    data[equipmentData.EquipamentoID] = equipmentData
    i++
  }

  if(_.isArray(param)) return data;
  
  for(const key in data) return data[key];
}

module.exports = GeoProcessController