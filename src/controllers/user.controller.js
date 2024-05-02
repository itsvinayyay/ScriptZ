import asyncHandler from "../utils/asyncHandler.js";
import ApiError from "../utils/ApiError.js";

import { User } from "../models/user.model.js";
import uploadOnCloudinary from "../utils/cloudinary.js";
import ApiResponse from "../utils/ApiResponse.js";

const registerUser = asyncHandler(async (req, res) => {
  // *Get data
  // *Validate data
  // *check if user already exists
  // *check for images: avatar
  // *upload it to Cloudinary
  // *create User Object in DB
  // *check for user creation - response
  // * remove password, refresh Token from response
  // * return response

  const { email, userName, fullName, password } = req.body;

  console.log("email: ", email);

  if (
    [email, userName, fullName, password].some((field) => field?.trim() === "")
  ) {
    throw new ApiError(400, "All Fields are compulsory");
  }

  const userExists = User.findOne({
    $or: [{ email }, { userName }],
  });

  if (userExists) {
    throw new ApiError(409, "User already exists!");
  }

  const avatarLocalPath = req.files?.avatar[0]?.path;
  const coverImageLocalPath = req.files?.coverImage[0]?.path;

  if (!avatarLocalPath) {
    throw new ApiError(400, "Avatar is required!");
  }

  const isAvatarUploaded = await uploadOnCloudinary(avatarLocalPath);
  const isCoverImageUploaded = await uploadOnCloudinary(coverImageLocalPath);

  if (!isAvatarUploaded) {
    throw new ApiError(400, "Error uploading Avatar on Cloudinary");
  }

  const user = await User.create({
    fullName,
    avatar: isAvatarUploaded.url,
    coverImage: isCoverImageUploaded?.url || "",
    email,
    password,
    username: userName.toLowerCase(),
  });

  const createdUser = await User.findById(user._id).select(
    "-password -refreshToken"
  );

  if (!createdUser) {
    throw new ApiError(500, "Something went wrong while uploading the User");
  }

  return res
    .status(201)
    .json(
      new ApiResponse(200, createdUser, "User has been successfully created!")
    );
});

export default registerUser;
