import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BASE_URL } from "../utils/constants";
import { addUser } from "../utils/store/userSlice";

const Profile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [updatedUser, setUpdatedUser] = useState(null);
  const [error, setError] = useState("");

  const dispatch = useDispatch();
  const user = useSelector((store) => store.user);

  const handleEditProfile = () => {
    setIsEditing(true);
  };
  const handleUpdateProfile = async () => {
    setIsEditing(false);
    setError("");
    try {
      const response = await axios.patch(
        BASE_URL + "/profile/edit",
        updatedUser,
        { withCredentials: true },
      );
      const userData = response?.data?.data;
      dispatch(addUser(userData));
    } catch (err) {
      setError(err.response.data.error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    if (name === "skills") {
      setUpdatedUser((prev) => ({
        ...prev,
        [name]: value,
      }));
    } else {
      setUpdatedUser((prev) => ({ ...prev, [name]: value }));
    }
  };

  useEffect(() => {
    if (user)
      setUpdatedUser({
        firstName: user.firstName,
        lastName: user.lastName,
        skills: user.skills,
        age: user.age,
        gender: user.gender,
        photoUrl: user.photoUrl,
        about: user.about,
      });
  }, [user]);

  return updatedUser ? (
    <div className="card card-side bg-base-300 shadow-sm gap-8 p-6 max-w-5xl mx-auto my-8 border border-base-200">
      <figure className="w-1/3 min-w-70 shrink-0 items-start pt-2 relative">
        <div className="w-full aspect-square rounded-xl overflow-hidden ring ring-primary ring-offset-base-100 ring-offset-4 shadow-lg">
          <img
            src={
              user.photoUrl
                ? user.photoUrl
                : "https://i.pinimg.com/736x/fb/7a/17/fb7a17e227af3cf2e63c756120842209.jpg"
            }
            alt="Movie"
            className="w-full h-full object-cover"
          />
        </div>
        <button
          type="button"
          className="absolute top-6 right-4 p-3 btn btn-circle btn-primary btn-md scale-95 hover:scale-105 shadow-lg border-4 border-base-100"
        >
          <svg
            xmlns="http://w3.org"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2.5}
            stroke="currentColor"
            className="w-5 h-5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6.827 6.175A2.31 2.31 0 0110 5.614h4a2.31 2.31 0 013.173.561l.482.643a1.155 1.155 0 00.916.463H20.25a2.25 2.25 0 012.25 2.25v9a2.25 2.25 0 01-2.25 2.25H3.75a2.25 2.25 0 01-2.25-2.25v-9a2.25 2.25 0 012.25-2.25h1.68c.348 0 .674-.158.916-.463l.482-.642z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15 12.75a3 3 0 11-6 0 3 3 0 016 0z"
            />
          </svg>
        </button>
      </figure>

      <form
        className="w-2/3 form-control gap-5 text-left"
        onSubmit={(e) => e.preventDefault()}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div>
            <label className="label font-semibold text-xs text-base-content/70 tracking-wide uppercase">
              First Name
            </label>
            <input
              type="text"
              name="firstName"
              onInput={(e) => handleInputChange(e)}
              className={`input input-bordered w-full bg-base-100 ${!isEditing && "cursor-not-allowed"}`}
              placeholder="First name"
              value={updatedUser.firstName}
              disabled={!isEditing}
            />
          </div>

          <div>
            <label className="label font-semibold text-xs text-base-content/70 tracking-wide uppercase">
              Last Name
            </label>
            <input
              type="text"
              name="lastName"
              onInput={(e) => handleInputChange(e)}
              className={`input input-bordered w-full bg-base-100 ${!isEditing && "cursor-not-allowed"}`}
              placeholder="Last name"
              value={updatedUser.lastName}
              disabled={!isEditing}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div>
            <label className="label font-semibold text-xs text-base-content/70 tracking-wide uppercase">
              Age
            </label>
            <input
              type="text"
              name="age"
              onInput={(e) => handleInputChange(e)}
              className="input input-bordered w-full bg-base-100 cursor-not-allowed"
              placeholder="Age"
              defaultValue={user.age}
              disabled={!isEditing}
            />
          </div>

          <div>
            <label className="label font-semibold text-xs text-base-content/70 tracking-wide uppercase">
              Gender
            </label>
            <input
              type="text"
              name="gender"
              onInput={(e) => handleInputChange(e)}
              className="input input-bordered w-full bg-base-100 cursor-not-allowed"
              placeholder="Gender"
              defaultValue={user.gender}
              disabled={!isEditing}
            />
          </div>
        </div>

        <div>
          <label className="label font-semibold text-xs text-base-content/70 tracking-wide uppercase">
            Email Address
          </label>
          <input
            type="email"
            name="email"
            onInput={(e) => handleInputChange(e)}
            className="input input-bordered w-full bg-base-100 cursor-not-allowed"
            placeholder="name@example.com"
            value={user.email}
            disabled
            // disabled={!isEditing}
          />
        </div>

        <div>
          <label className="label font-semibold text-xs text-base-content/70 tracking-wide uppercase">
            Skills
          </label>
          <input
            type="text"
            name="skills"
            onInput={(e) => handleInputChange(e)}
            className="input input-bordered w-full bg-base-100 cursor-not-allowed"
            placeholder="Comma separated skills (e.g. React, Node, CSS)"
            value={updatedUser.skills}
            disabled={!isEditing}
          />
        </div>

        <div>
          <label className="label font-semibold text-xs text-base-content/70 tracking-wide uppercase">
            Photo URL
          </label>
          <input
            type="text"
            name="photoUrl"
            onInput={(e) => handleInputChange(e)}
            className="input input-bordered w-full bg-base-100 cursor-not-allowed"
            placeholder="https://example.com"
            value={updatedUser.photoUrl}
            disabled={!isEditing}
          />
        </div>

        <div>
          <label className="label font-semibold text-xs text-base-content/70 tracking-wide uppercase">
            About
          </label>
          <textarea
            name="about"
            onInput={(e) => handleInputChange(e)}
            className="textarea textarea-bordered w-full bg-base-100 cursor-not-allowed h-28"
            placeholder="Tell us about yourself..."
            value={updatedUser.about}
            disabled={!isEditing}
          />
        </div>
        <div>
          {error && (
            <label className="label font-semibold text-xs text-base-content/70 tracking-wide uppercase">
              {error}
            </label>
          )}
        </div>

        <div className="card-actions justify-end mt-4">
          {isEditing ? (
            <button
              onClick={handleUpdateProfile}
              className="btn btn-outline btn-secondary px-8 shadow-sm transition-all"
            >
              <svg
                xmlns="http://www.w3.org"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                className="w-4 h-4 mr-2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125"
                />
              </svg>
              Update Profile
            </button>
          ) : (
            <button
              onClick={handleEditProfile}
              className="btn btn-outline btn-secondary px-8 shadow-sm transition-all"
            >
              <svg
                xmlns="http://www.w3.org"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                className="w-4 h-4 mr-2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125"
                />
              </svg>
              Edit Profile
            </button>
          )}
        </div>
      </form>
    </div>
  ) : (
    <div></div>
  );
};

export default Profile;
