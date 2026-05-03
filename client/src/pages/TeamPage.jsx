import React, {
  useEffect,
  useState
} from "react";

import axios from "axios";

const TeamPage = () => {

  const [members, setMembers] =
    useState([]);

  useEffect(() => {

    fetchMembers();

  }, []);

  const fetchMembers = async () => {

    try {

      const token =
        localStorage.getItem("token");

      const res = await axios.get(
        "http://localhost:5000/team",
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      setMembers(res.data.members);

    } catch (error) {

      console.log(error);

    }

  };

  return (

    <div>

      {/* HEADER */}
      <div className="mb-10">

        <h1 className="text-5xl font-bold text-gray-800">
          Team
        </h1>

        <p className="text-gray-500 mt-2">
          Meet your TeamFlow collaborators.
        </p>

      </div>

      {/* MEMBERS */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">

        {members.map((member) => (

          <div
            key={member.id}
            className="bg-white rounded-3xl border border-gray-200 p-6"
          >

            <div className="flex flex-col items-center text-center">

              <img
                src={`https://ui-avatars.com/api/?name=${member.name}`}
                alt={member.name}
                className="w-24 h-24 rounded-3xl mb-5"
              />

              <h2 className="text-2xl font-bold text-gray-800">
                {member.name}
              </h2>

              <p className="text-gray-500 mt-2">
                {member.role}
              </p>

              <p className="text-sm text-gray-400 mt-2">
                {member.email}
              </p>

            </div>

          </div>

        ))}

      </div>

    </div>

  );

};

export default TeamPage;