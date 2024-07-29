// components/UserProfile.tsx
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../app/store";
import { updateUser, uploadProfilePicture } from "../features/auth/authSlice";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

function UserProfile() {
  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state: RootState) => state.auth
  );
  const [name, setName] = useState(user?.name || "");
  const dispatch = useDispatch<AppDispatch>();
  const n = useNavigate();

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(updateUser({ name }));
  };

  useEffect(() => {
    if (isSuccess) {
      toast.success("User updated successfully!");
    }
    if (isError) {
      toast.error(`Error: ${message}`);
    }

    if (!user) {
      n("/login");
    }
  }, [isSuccess, isError, message, user, n]);

  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      dispatch(uploadProfilePicture(file));
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="max-w-md w-full bg-base-200 shadow-md rounded-lg p-6">
        <h2 className="text-2xl font-semibold mb-4">User Profile</h2>
        {user?.profilePicture ? (
          <div className="avatar flex items-center justify-center mb-6">
            <div className="w-24 rounded-full ring ring-base-200 ring-offset-base-100">
              <img src={`/${user.profilePicture}`} alt="Profile" />
            </div>
          </div>
        ) : (
          <div className="flex items-center justify-center mb-6">
            <div className="size-24 text-5xl bg-base-300 font-medium flex items-center justify-center rounded-full ring-4 ring-base-200 ring-offset-base-100 ">
              {user?.name ? user.name[0] : "?"}
            </div>
          </div>
        )}

        <input
          type="file"
          onChange={onFileChange}
          className="file-input w-full mb-4"
          accept="image/*"
        />
        <table className="w-full table-auto mb-4">
          <tbody>
            <tr className="border-b">
              <td className="py-2 font-medium">Name</td>
              <td className="py-2">{user?.name}</td>
            </tr>
            <tr className="border-b">
              <td className="py-2 font-medium">Email</td>
              <td className="py-2">{user?.email}</td>
            </tr>
          </tbody>
        </table>
        <form onSubmit={onSubmit}>
          <h3 className="text-xl font-semibold mb-4">Update Your Profile</h3>
          <div className="mb-4 w-full">
            <label className="block text-sm font-medium mb-1">New Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="input input-bordered w-full"
            />
          </div>
          <button
            type="submit"
            className="btn btn-primary w-full"
            disabled={isLoading || name === user?.name || name.length < 3}
          >
            {isLoading ? "Updating..." : "Update Your Profile"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default UserProfile;
