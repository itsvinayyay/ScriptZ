import Mongoose from "mongoose";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";
const videoSchema = new Mongoose.Schema(
  {
    videoFile: {
      type: String, // * URL
      require: true,
    },
    thumbnail: {
      type: String, //* URL,
      required: true,
    },
    owner: {
      type: Mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
    },

    duration: {
      type: Number,
      required: true,
    },
    views: {
      type: Number,
      required: true,
    },
    isPublished: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

videoSchema.plugin(mongooseAggregatePaginate);
export const Video = Mongoose.model("Video", videoSchema);
