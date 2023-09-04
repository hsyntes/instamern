import { useQuery } from "react-query";
import { Link } from "react-router-dom";
import EmptyPhoto from "../ui/EmptyPhoto";
import getUserById from "../../utils/getUserById";

const Creator = ({ postedBy }) => {
  // Fetch the creator that shared the post
  const { data: user } = useQuery(["getUserById", postedBy], () =>
    getUserById(postedBy)
  );

  if (!user) return null;

  return (
    <Link to={`/${user.username}`} className="flex items-center">
      {user.photo ? (
        <img
          src={user.photo}
          alt="User"
          className="w-8 rounded-full"
          loading="lazy"
        />
      ) : (
        <EmptyPhoto username={user.username} />
      )}
      <span className="font-semibold text-lg ms-3">{user.username}</span>
    </Link>
  );
};

export default Creator;
