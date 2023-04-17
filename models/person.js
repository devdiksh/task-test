module.exports = (sequelize, DataTypes) => {
  const Person = sequelize.define('Person', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    surname: {
      type: DataTypes.STRING,
      allowNull: false
    },
    age: DataTypes.INTEGER,
    gender: {
      type: DataTypes.ENUM('male', 'female')
    },
    birthday: DataTypes.DATEONLY,
    phone: DataTypes.STRING,
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true
      }
    }
  })

  Person.associate = function (models) {
    Person.belongsToMany(models.Person, {
      as: 'contacts',
      through: 'PersonContacts',
      foreignKey: 'personId'
    })
  }

  return Person
}
