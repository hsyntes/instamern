import { Link } from "react-router-dom";
import { useQuery } from "react-query";
import EmptyPhoto from "../ui/EmptyPhoto";
import getUserById from "../../utils/getUserById";

const CommentLists = ({ comment, handleViewPost }) => {
  // Fetch comments based on the user id
  const { data: user } = useQuery(["getUserById", comment.commentedBy], () =>
    getUserById(comment.commentedBy)
  );

  return (
    <li className="mb-8 last:mb-16 ps-2">
      <Link
        to={`/${user?.username}`}
        className="flex items-center"
        onClick={handleViewPost}
      >
        {user?.photo ? (
          <img
            src={user?.photo}
            alt="User"
            width={28}
            className="rounded-full"
            loading="lazy"
          />
        ) : (
          <EmptyPhoto username={user?.username} size={28} />
        )}
        <span className="font-semibold ms-2">{user?.username}</span>
      </Link>
      <p className="my-2">{comment.comment}</p>
    </li>
  );
};

const Comments = ({ comments, handleViewPost }) => (
  <ul className="my-8">
    {comments.map((comment) => (
      <CommentLists
        comment={comment}
        handleViewPost={handleViewPost}
        key={comment.commentedBy}
      />
    ))}
  </ul>
);

export default Comments;
