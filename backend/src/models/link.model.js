const mongoose = require("mongoose");
const shortid = require("shortid");
const moment = require("moment");

const LinkSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },
  original: {
    type: String,
    required: true,
  },
  slug: {
    type: String,
    default: shortid.generate,
    unique: true,
  },
  clicks: {
    type: Number,
    default: 0,
  },
  expiresAt: {
    type: Date,
    default: moment().add(30, "days").startOf("day")
  },
}, {
  timestamps: true
});

LinkSchema.index({ "expiresAt": 1 }, { expireAfterSeconds: 0 });

module.exports = mongoose.model("Link", LinkSchema);
