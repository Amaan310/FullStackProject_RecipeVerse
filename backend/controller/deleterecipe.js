const Recipe = require("../model/recipe");
exports.deleteRecipe = async (req, res) => {
  try {
    const { id } = req.params;
    let recipe = await Recipe.findByIdAndDelete(id);
    if (!recipe) {
      return res.status(404).json({
        success: false,
        message: "Recipe not found",
      });
    }
    res.status(200).json({
      success: true,
      Message: "Data Delete Successfully",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
