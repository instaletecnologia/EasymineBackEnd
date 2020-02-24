const Model = use("Model");

const Database = use('Database')

class RulesBusinessEquipmentTimeCategory {

  // retorna a categoria de tempo de acordo com a idCategoriasTempo
  static async EquipmentTimeCategoryByID(id) {
    const equipmentTimeCategory = await Database
      .select('*')
      .from('dbo.CategoriasTempo')
      .where({'dbo.CategoriasTempo.idCategoriasTempo': id})
    return  equipmentTimeCategory
  }

}

module.exports = RulesBusinessEquipmentTimeCategory;
