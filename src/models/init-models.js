import _sequelize from "sequelize";
const DataTypes = _sequelize.DataTypes;
import _areas from  "./areas.js";
import _examenes from  "./examenes.js";
import _reactivos from  "./reactivos.js";
import _respuestas from  "./respuestas.js";
import _respuestas_usuarios from  "./respuestas_usuarios.js";
import _usuarios from  "./usuarios.js";

export default function initModels(sequelize) {
  const areas = _areas.init(sequelize, DataTypes);
  const examenes = _examenes.init(sequelize, DataTypes);
  const reactivos = _reactivos.init(sequelize, DataTypes);
  const respuestas = _respuestas.init(sequelize, DataTypes);
  const respuestas_usuarios = _respuestas_usuarios.init(sequelize, DataTypes);
  const usuarios = _usuarios.init(sequelize, DataTypes);

  examenes.belongsTo(areas, { as: "area", foreignKey: "area_id"});
  areas.hasMany(examenes, { as: "examenes", foreignKey: "area_id"});
  reactivos.belongsTo(areas, { as: "area", foreignKey: "area_id"});
  areas.hasMany(reactivos, { as: "reactivos", foreignKey: "area_id"});
  respuestas_usuarios.belongsTo(examenes, { as: "examen", foreignKey: "examen_id"});
  examenes.hasMany(respuestas_usuarios, { as: "respuestas_usuarios", foreignKey: "examen_id"});
  respuestas.belongsTo(reactivos, { as: "reactivo", foreignKey: "reactivo_id"});
  reactivos.hasMany(respuestas, { as: "respuesta", foreignKey: "reactivo_id"});
  respuestas_usuarios.belongsTo(reactivos, { as: "reactivo", foreignKey: "reactivo_id"});
  reactivos.hasMany(respuestas_usuarios, { as: "respuestas_usuarios", foreignKey: "reactivo_id"});
  examenes.belongsTo(usuarios, { as: "usuario", foreignKey: "usuario_id"});
  usuarios.hasMany(examenes, { as: "examenes", foreignKey: "usuario_id"});
  respuestas_usuarios.belongsTo(usuarios, { as: "usuario", foreignKey: "usuario_id"});
  usuarios.hasMany(respuestas_usuarios, { as: "respuestas_usuarios", foreignKey: "usuario_id"});

  return {
    areas,
    examenes,
    reactivos,
    respuestas,
    respuestas_usuarios,
    usuarios,
  };
}
