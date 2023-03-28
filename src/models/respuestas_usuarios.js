import _sequelize from 'sequelize';
const { Model, Sequelize } = _sequelize;

export default class respuestas_usuarios extends Model {
  static init(sequelize, DataTypes) {
  return super.init({
    id_respuesta_usuario: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    respuesta: {
      type: DataTypes.STRING(4),
      allowNull: false
    },
    usuario_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'usuarios',
        key: 'id_usuario'
      }
    },
    examen_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'examenes',
        key: 'id_examen'
      }
    },
    reactivo_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'reactivos',
        key: 'id_reactivo'
      }
    }
  }, {
    sequelize,
    tableName: 'respuestas_usuarios',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "respuestas_usuarios_pkey",
        unique: true,
        fields: [
          { name: "id_respuesta_usuario" },
        ]
      },
    ]
  });
  }
}
