import _sequelize from 'sequelize';
const { Model, Sequelize } = _sequelize;

export default class examenes extends Model {
  static init(sequelize, DataTypes) {
  return super.init({
    id_examen: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    noreactivos: {
      type: DataTypes.SMALLINT,
      allowNull: false
    },
    aciertos: {
      type: DataTypes.SMALLINT,
      allowNull: false
    },
    fecha_examen: {
      type: DataTypes.DATEONLY,
      allowNull: false
    },
    tiempo: {
      type: DataTypes.SMALLINT,
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
    tableName: 'examenes',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "examenes_pkey",
        unique: true,
        fields: [
          { name: "id_examen" },
        ]
      },
    ]
  });
  }
}
