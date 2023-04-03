import _sequelize from 'sequelize';
const { Model, Sequelize } = _sequelize;

export default class respuestas extends Model {
  static init(sequelize, DataTypes) {
  return super.init({
    id_respuesta: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    escorrecto: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    },
    reactivo_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'reactivos',
        key: 'id_reactivo'
      }
    },
    descripcion: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'respuestas',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "respuestas_pkey",
        unique: true,
        fields: [
          { name: "id_respuesta" },
        ]
      },
    ]
  });
  }
}
