import sharp from "sharp";

const imageOptimizer = async (req, res) => {
  try {
    return res.status(200).json({
      success: true,
      message: "Image optimizer working",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Image optimizer failed",
      error: error.message,
    });
  }
};

export default imageOptimizer;