import React, { useState } from "react";

const ProfilePage = () => {

  const storedUser =
    JSON.parse(localStorage.getItem("user"));

  const [name, setName] =
    useState(storedUser?.name || "");

  const [bio, setBio] =
    useState(storedUser?.bio || "");

  const [profilePic, setProfilePic] =
    useState(
      storedUser?.profilePic ||
      "https://i.pravatar.cc/150?img=12"
    );

  const handleImage = (e) => {

    const file = e.target.files[0];

    if (!file) return;

    const imageUrl = URL.createObjectURL(file);

    setProfilePic(imageUrl);

  };

  const saveProfile = () => {

    const updatedUser = {
      ...storedUser,
      name,
      bio,
      profilePic
    };

    localStorage.setItem(
      "user",
      JSON.stringify(updatedUser)
    );

    window.location.reload();

  };

  return (

    <div className="max-w-4xl">

      {/* HEADER */}
      <div className="mb-10">

        <h1 className="text-5xl font-bold text-gray-800">
          Profile
        </h1>

        <p className="text-gray-500 mt-2">
          Manage your TeamFlow profile.
        </p>

      </div>

      {/* PROFILE CARD */}
      <div className="bg-white rounded-3xl border border-gray-200 p-10 shadow-sm">

        <div className="flex flex-col items-center mb-10">

          <img
            src={profilePic}
            alt="Profile"
            className="w-40 h-40 rounded-3xl object-cover border-4 border-green-100"
          />

          <label className="mt-5 bg-green-600 text-white px-5 py-3 rounded-2xl cursor-pointer hover:bg-green-700 transition-all">
            Upload Photo

            <input
              type="file"
              accept="image/*"
              onChange={handleImage}
              className="hidden"
            />

          </label>

        </div>

        {/* FORM */}
<div className="grid grid-cols-1 md:grid-cols-2 gap-6">

  {/* FULL NAME */}
  <div>

    <label className="block text-gray-700 font-semibold mb-3">
      Full Name
    </label>

    <input
      type="text"
      value={name}
      onChange={(e) => setName(e.target.value)}
      className="w-full bg-[#f5f7fb] rounded-2xl p-5 outline-none border border-gray-200"
    />

  </div>

  {/* EMAIL */}
  <div>

    <label className="block text-gray-700 font-semibold mb-3">
      Email
    </label>

    <input
      type="email"
      value={storedUser?.email || ""}
      readOnly
      className="w-full bg-[#f5f7fb] rounded-2xl p-5 outline-none border border-gray-200"
    />

  </div>

  {/* PASSWORD */}
  <div>

    <label className="block text-gray-700 font-semibold mb-3">
      Password
    </label>

    <input
      type="password"
      value="••••••••"
      readOnly
      className="w-full bg-[#f5f7fb] rounded-2xl p-5 outline-none border border-gray-200"
    />

  </div>

  {/* ROLE */}
  <div>

    <label className="block text-gray-700 font-semibold mb-3">
      Role
    </label>

    <input
      type="text"
      value={storedUser?.role || ""}
      readOnly
      className="w-full bg-[#f5f7fb] rounded-2xl p-5 outline-none border border-gray-200 capitalize"
    />

  </div>

  {/* BIO */}
  <div className="md:col-span-2">

    <label className="block text-gray-700 font-semibold mb-3">
      Bio
    </label>

    <textarea
      value={bio}
      onChange={(e) => setBio(e.target.value)}
      className="w-full h-40 bg-[#f5f7fb] rounded-2xl p-5 outline-none resize-none border border-gray-200"
    />

  </div>

  {/* BUTTON */}
  <div className="md:col-span-2">

    <button
      onClick={saveProfile}
      className="w-full bg-green-600 text-white py-4 rounded-2xl hover:bg-green-700 transition-all text-lg font-semibold"
    >
      Save Changes
    </button>

  </div>

</div>

      </div>

    </div>

  );

};

export default ProfilePage;