export default function bugModel(sequelize, DataTypes) {
  return sequelize.define('bug', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    problem: {
      type: DataTypes.STRING,
    },
    errorText: {
      type: DataTypes.STRING,
    },
     commit: {
      type: DataTypes.STRING,
    },
    createdAt: {
      allowNull: false,
      type: DataTypes.DATE,
    },
    updatedAt: {
      allowNull: false,
      type: DataTypes.DATE,
    },
    featureId:{
      allowNull:false, 
      type: DataTypes.INTEGER, 
      references:{
        model:'features', 
        key:'id'
      }, 
      userId:{
        allowNull:false,
        type: DataTypes.INTEGER,
        references:{
          model:'users', 
          key:'id'
        }
      }
    }
  }, { underscored: true });
}
