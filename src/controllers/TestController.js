const paginate = require("../utlis/pagination");
const db = require("../models/db");
const Test = db.Test;

exports.createTest = async (req, res) => {
  try {
    const testData = req.body;
    const newTest = await Test.create(testData);
    return res.status(201).json({ success: true, data: newTest });
  } catch (error) {
    console.error("Error creating Test:", error);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};

exports.testList = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const pageSize = parseInt(req.query.pageSize) || 10;
    const conditions = {}; // add any filtering logic here if needed

    const result = await paginate(Test, conditions, page, pageSize, [
      ["created_at", "DESC"],
    ]);

    return res.status(200).json({ success: true, ...result });
  } catch (error) {
    console.error("Error fetching test list:", error);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};

exports.getTestById = async (req, res) => {
  try {
    const { uuid } = req.params;
    const test = await Test.findByPk(uuid);
    if (!test) {
      return res
        .status(404)
        .json({ success: false, message: "Test not found" });
    }
    return res.status(200).json({ success: true, data: test });
  } catch (error) {
    console.error("Error fetching Test:", error);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};

exports.updateTest = async (req, res) => {
  try {
    const { uuid } = req.params;
    const test = await Test.findByPk(uuid);
    if (!test) {
      return res
        .status(404)
        .json({ success: false, message: "Test not found" });
    }
    await test.update(req.body);
    return res.status(200).json({ success: true, data: test });
  } catch (error) {
    console.error("Error updating Test:", error);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};

exports.deleteTest = async (req, res) => {
  try {
    const { uuid } = req.params;
    const test = await Test.findByPk(uuid);
    if (!test) {
      return res
        .status(404)
        .json({ success: false, message: "Test not found" });
    }
    await test.destroy();
    return res
      .status(200)
      .json({ success: true, message: "Test deleted successfully" });
  } catch (error) {
    console.error("Error deleting Test:", error);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};
