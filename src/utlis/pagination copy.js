const { format } = require("mysql2");

const paginate = async (model, conditions = {}, page = 1, pageSize = 10, order = [['created_at', 'DESC']], include = [], formatter = data => data) => {
    const offset = (page - 1) * pageSize;
    const limit = pageSize;
  
    const data = await model.findAll({
      where: conditions,
      include: include,
      order,
      limit,
      offset
    });
  
    const totalRecords = await model.count({
      where: conditions,
      include: include,
      distinct: true
    });
  
    const totalPages = Math.ceil(totalRecords / pageSize);

    const formattedData = await formatter(data);
  
    return {
      data: formattedData,
      meta: {
        page,
        pageSize,
        totalPages,
        totalRecords
      }
    };
  };
  
module.exports = paginate;
  