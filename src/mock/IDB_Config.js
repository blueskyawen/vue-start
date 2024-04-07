export default {
  dbName: "Product_Price_DB",
  version: 1,
  tables: [
    {
      tableName: "fuli_product",
      option: { keyPath: "id" },
      indexs: [
        {
          key: "id",
          option: {
            unique: true
          }
        },
        {
          key: "name"
        },
        {
          key: "lirun"
        }
      ]
    },
    {
      tableName: "jichu_product",
      option: { keyPath: "id" },
      indexs: [
        {
          key: "id",
          option: {
            unique: true
          }
        },
        {
          key: "name"
        },
        {
          key: "lirun"
        }
      ]
    },
    {
      tableName: "lirun_product",
      option: { keyPath: "id" },
      indexs: [
        {
          key: "id",
          option: {
            unique: true
          }
        },
        {
          key: "name"
        },
        {
          key: "lirun"
        }
      ]
    },
    {
      tableName: "xingxiang_product",
      option: { keyPath: "id" },
      indexs: [
        {
          key: "id",
          option: {
            unique: true
          }
        },
        {
          key: "name"
        },
        {
          key: "lirun"
        }
      ]
    }
  ]
};
