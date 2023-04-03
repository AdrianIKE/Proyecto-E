import _sequelize from 'sequelize';
const { Model, Sequelize } = _sequelize;

export default class areas extends Model {
  static init(sequelize, DataTypes) {
  return super.init({
    id_area: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    nombre: {
      type: DataTypes.STRING(50),
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'areas',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "areas_pkey",
        unique: true,
        fields: [
          { name: "id_area" },
        ]
      },
    ]
  });
  }
}
