const User = require("../model/user"); 

exports.userProfile = async (req, res) => {
  try {
    const user = await User.findById(req.params.id) 

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({
      username: user.username,
      email: user.email
    });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};
