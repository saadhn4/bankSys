import express from "express";

const router = express.Router();

router.get("/get", (req, res) => {
  try {
    res.status(200).json({ msg: "get specific user" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: error });
  }
});

router.get("/getall", (req, res) => {
  try {
    res.status(200).json({ msg: "get all user" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: error });
  }
});

router.put("/update", (req, res) => {
  try {
    res.status(200).json({ msg: "update specific user" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: error });
  }
});

router.delete("/delete", (req, res) => {
  try {
    res.status(200).json({ msg: "delete specific user" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: error });
  }
});

router.delete("/deleteall", (req, res) => {
  try {
    res.status(200).json({ msg: "delete all user" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: error });
  }
});

export default router;
