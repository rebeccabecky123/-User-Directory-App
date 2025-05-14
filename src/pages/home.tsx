import React, { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import type { User } from "../types/user";
import { UserContext } from "../context/usercontext";

const Home = () => {
  const [apiUsers, setApiUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const { state } = useContext(UserContext);

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((res) => res.json())
      .then((data) => {
        setApiUsers(data);
        setLoading(false);
      })
      .catch(() => setError(true));
  }, []);

  if (loading) return <p>Loading users...</p>;
  if (error) return <p>Error fetching users</p>;

  const users = [...apiUsers, ...state.users];

  return (
    <div>
      <h1 className="mb-4 flex flex-col justify-center items-center text-2xl text-flont ">Users</h1>
      <ul>
        {users.map((user) => (
          <li key={user.id} className="mb-4 flex flex-col justify-center items-center">
            <p><strong>{user.name}</strong></p>
            <p>{user.email}</p>
            <Link to={`/users/${user.id}`} className="text-blue-600 flex flex-col justify-center items-center">View Profile</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Home;
