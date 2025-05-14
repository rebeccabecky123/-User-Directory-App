import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import type { User } from "../types/user";

const UserProfile = () => {
  const { id } = useParams<{ id: string }>();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    fetch(`https://jsonplaceholder.typicode.com/users/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setUser(data);
        setLoading(false);
      })
      .catch(() => setError(true));
  }, [id]);

  if (loading) return <p>Loading...</p>;
  if (error || !user) return <p>User not found.</p>;

  return (
    <div>
      <h2>{user.name}</h2>
      <p>Email: {user.email}</p>
      
    </div>
  );
};

export default UserProfile;
