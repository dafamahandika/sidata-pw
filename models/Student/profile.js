import mongoose from "mongoose";

const ProfileImage = new model.Schema({
  imageProfile: [
    {
      type: String,
    },
  ],
});

const Profile = mongoose.model("Profile", ProfileImage);
export default Profile;
