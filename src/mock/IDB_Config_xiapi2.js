export default {
  dbName: "ProductTable_xiapi",
  version: 1,
  tables: [
    {
      tableName: "xiapi_products",
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
        }
      ]
    }
  ]
};
