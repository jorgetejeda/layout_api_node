const DataTypes = require("sequelize");
const {
  MESSAGE,
  NOT_EMPTY,
  NOT_NULL,
  IS_EMAIL,
  IS_STRING,
  IS_NUMBER,
} = require("../src/utils/validator-generator");

const addTableAlias = (model) => model.name.toLowerCase();
const RegularExpression = {
  onlyText: ["^[a-z_ ]+$", "i"],
  onlyNumber: ["^[0-9]+$", "i"],
};

module.exports = {
  addTableAlias,
  idStatus: {
    idStatus: {
      type: DataTypes.INTEGER,
    },
  },
  name: {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        is: MESSAGE(IS_STRING("nombre"), RegularExpression.onlyText),
        notEmpty: MESSAGE(NOT_EMPTY.NAME),
        notNull: MESSAGE(NOT_NULL.NAME),
      },
    },
  },
  lastName: {
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        is: MESSAGE(IS_STRING("apellido"), RegularExpression.onlyText),
        notEmpty: MESSAGE(NOT_EMPTY.LAST_NAME),
        notNull: MESSAGE(NOT_NULL.LAST_NAME),
      },
    },
  },
  phone: {
    phone: {
      type: DataTypes.STRING,
      validate: {
        is: MESSAGE(IS_NUMBER("telefono"), RegularExpression.onlyNumber),
      },
    },
  },
  identification: {
    identification: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        is: MESSAGE(IS_NUMBER("identificacion"), RegularExpression.onlyNumber),
        notEmpty: MESSAGE(NOT_EMPTY.IDENTIFICATION),
        notNull: MESSAGE(NOT_NULL.IDENTIFICATION),
      },
    },
  },
  email: {
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isEmail: MESSAGE(IS_EMAIL),
        notEmpty: MESSAGE(NOT_EMPTY.EMAIL),
        notNull: MESSAGE(NOT_NULL.EMAIL),
      },
    },
  },
  password: {
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: MESSAGE(NOT_EMPTY.PASSWORD),
        notNull: MESSAGE(NOT_NULL.PASSWORD),
      },
    },
  },
  description: {
    description: {
      type: DataTypes.STRING,
      validate: {
        // is: MESSAGE(IS_STRING("descripcion"), ["([a-z][A-Z])w+"]),
      },
    },
  },
  idUser: {
    idUser: DataTypes.INTEGER,
  },
  amount: {
    amount: DataTypes.DOUBLE,
  },
  idBill: {
    idBill: DataTypes.INTEGER,
  },
  percent: { percent: DataTypes.INTEGER },
  idSupport: {
    idSupport: DataTypes.INTEGER,
  },
  options: {
    freezeTableName: { freezeTableName: true },
    noTimestamps: { timestamps: false },
    paranoId: { paranoid: true },
  },
};
