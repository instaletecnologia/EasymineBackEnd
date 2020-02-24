const Model = use("Model");

const Database = use('Database')

class RulesBusinessUser {

  // retorna todos os usuario ativos no sistema:
  static async UsersActive() {
    const query = await Database
    .select('*')
    .from('dbo.Usuarios')
    .where({ 'dbo.Usuarios.Ativo': true })
    .orderBy('dbo.Usuarios.Nome')
    return query
  }

  // retorna todos os usuario com as seguintes permissoes:
  //2	  SUPER. MANUTENÇÃO
  //3	  ADMINISTRADORES DO SISTEMA
  //15	OPERADORES-MECANICOS
  //16	OPERADORES EQUIPAMENTOS
  //25	MANUTENÇÃO
  static async UsersWithMaintenancePermission() {
    const query = await Database
    .select('dbo.Usuarios.UsuarioID', 'dbo.Usuarios.Nome', 'dbo.Usuarios.Chapa')
    .from('dbo.Usuarios')
    .where({ 'dbo.Usuarios.Ativo': true })
    .whereIn('UsuarioPermissaoID', [2,3,15,16,25])
    .orderBy('dbo.Usuarios.Nome')
    return query
  }

    // retorna todos os usuario com as seguintes permissoes:
  //15	OPERADORES-MECANICOS
  //25	MANUTENÇÃO
  static async UsersWithMaintenancePermissionMecanical() {
    const query = await Database
    .select('dbo.Usuarios.UsuarioID', 'dbo.Usuarios.Nome','dbo.Usuarios.Chapa')
    .from('dbo.Usuarios')
    .where({ 'dbo.Usuarios.Ativo': true })
    .whereIn('UsuarioPermissaoID', [15, 25])
    .orderBy('dbo.Usuarios.Nome')
    return query
  }
}

module.exports = RulesBusinessUser;
