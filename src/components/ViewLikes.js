import { Link } from "react-router-dom";
import { useQuery } from "react-query";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import Modal from "./Modal";
import Spinner from "./Spinner";
import EmptyPhoto from "./EmptyPhoto";
import getUserById from "../utils/getUserById";

const LikeLists = ({ item }) => {

  const { data: user } = useQuery(["getUserById", item], () =>
    getUserById(item)
  );

  return (
    <li className="flex items-center mb-4">
      <Link to={user?.username} className="flex items-center">
        {user?.photo ? (
          <img
            src={user.photo}
            alt="User"
            width={32}
            className="rounded-full"
            loading="lazy"
          />
        ) : (
          <EmptyPhoto username={user?.username} />
        )}
        <span className="font-semibold ms-3">{user?.username}</span>
      </Link>
    </li>
  );
};

const ViewLikes = ({
  show,
  handleViewLikes,
  post,
  setSelectedPost,
  isPostLoading,
}) => {
  return (
    <Modal show={show} className="w-3/4 lg:w-1/4">
      <Modal.Header>
        <h6 className="text-lg font-semibold mx-auto">Likes</h6>
        <FontAwesomeIcon
          icon={faTimes}
          className="absolute right-0 cursor-pointer"
          size="xl"
          onClick={() => {
            handleViewLikes();
            setSelectedPost(null);
          }}
        />
      </Modal.Header>
      <Modal.Body>
        {isPostLoading ? (
          <center>
            <Spinner />
          </center>
        ) : (
          post?.likes.map((like) => <LikeLists item={like} key={like} />)
        )}
      </Modal.Body>
    </Modal>
  );
};

export default ViewLikes;
