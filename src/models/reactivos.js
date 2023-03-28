import _sequelize from 'sequelize';
const { Model, Sequelize } = _sequelize;

export default class reactivos extends Model {
  static init(sequelize, DataTypes) {
  return super.init({
    id_reactivo: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    descripcion: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    nombre_examen: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    area_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'areas',
        key: 'id_area'
      }
    }
  }, {
    sequelize,
    tableName: 'reactivos',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "reactivos_pkey",
        unique: true,
        fields: [
          { name: "id_reactivo" },
        ]
      },
    ]
  });
  }
}
