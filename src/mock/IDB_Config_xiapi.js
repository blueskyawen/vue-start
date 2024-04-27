export default {
  dbName: "Product_xiapi",
  version: 1,
  tables: [
    {
      tableName: "doudian_dairly",
      option: { keyPath: "id" },
      indexs: [
        {
          key: "id",
          option: {
            unique: true
          }
        },
        {
          key: "date"
        }
      ]
    },
    {
      tableName: "xiapi_dairly",
      option: { keyPath: "id" },
      indexs: [
        {
          key: "id",
          option: {
            unique: true
          }
        },
        {
          key: "date"
        }
      ]
    }
  ]
};
