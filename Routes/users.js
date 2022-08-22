const router = require("express").Router();
const User = require("../Models/Users");
const bcrypt = require("bcrypt");

router.get("/", (req, res) => {
  res.send("welcome to the DB");
});

//register user(POST)
router.post("/add", async (req, res) => {
  const { email } = req.body;
  const userExist = await User.findOne({ email });
  const newUser = new User({
    username: req.body.username,
    email: req.body.email,
    password: req.body.password,
    age: req.body.age,
  });

  try {
    // const encyptPass= await bcrypt.genSalt(10);
    // const hashedPassword= await bcrypt.hash(req.body.password, encyptPass)
    if (userExist) {
      return res.status(400).json({ error: "Email already exists" });
    }
    const user = await newUser.save();
    res.status(200).json({
      success: true,
      data: user,
    });
  } catch {
    res.status(500).json({
      success: false,
      data: "unable to add user",
    });
  }
});

//get user
router.get("/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    res.status(200).json({
      success: true,
      data: user,
    });
  } catch {
    return res.status(500).json({
      success: false,
      data: "unable to find user",
    });
  }
});

//delete
router.delete("/:id", async (req, res) => {
  if (req.body.userId === req.params.id) {
    try {
      const user = await User.findByIdAndDelete(req.params.id);
      res.status(200).json({
        success: true,
        data: "account deleted sucessfully",
      });
    } catch {
      return res.status(500).json({
        success: false,
        data: "unable to delete account",
      });
    }
  } else {
    return res.status(500).json({
      success: false,
      data: "cannot delete this account",
    });
  }
});

//update(PUT)
router.put("/:id", async (req, res) => {
  if (req.body.userId === req.params.id) {
    try {
      const user = await User.findByIdAndUpdate(req.params.id, {
        $set: req.body,
      });
      res.status(200).json({
        success: true,
        data: "account updated sucessfully",
      });
    } catch {
      return res.status(500).json({
        success: false,
        data: "unable to update account",
      });
    }
  } else {
    return res.status(500).json({
      success: false,
      data: "cannot update this account",
    });
  }
});

//register(POST)
router.post("/add", async (req, res) => {});
module.exports = router;
