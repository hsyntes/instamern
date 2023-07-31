import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Modal from "./Modal";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { useQuery } from "react-query";
import getUserById from "../utils/getUserById";
import { Link } from "react-router-dom";
import EmptyPhoto from "./EmptyPhoto";

const FollowLists = ({ item, handleViewFollows, setViewFollows }) => {
  const { data: user } = useQuery(["getUserById", item], {
    queryFn: () => getUserById(item),
  });


  return (
    <li className="mb-4">
      <Link
        to={`/${user?.username}`}
        className="flex items-center"
        onClick={() => {
          setViewFollows(null);
          handleViewFollows();
        }}
      >
        {user?.photo ? (
          <img
            src={user?.photo}
            width={32}
            className="rounded-full"
            alt="User"
          />
        ) : (
          <EmptyPhoto username={user?.username} size="28px" />
        )}
        <span className="font-semibold ms-2">{user?.username}</span>
      </Link>
    </li>
  );
};

const ViewFollows = ({
  show,
  follows,
  handleViewFollows,
  setViewFollows,
  type,
}) => {
  return (
    <Modal show={show} className="w-3/4 lg:w-1/4">
      <Modal.Header>
        <h6 className="text-lg font-semibold mx-auto">{type}</h6>
        <FontAwesomeIcon
          icon={faTimes}
          className="absolute right-0 cursor-pointer"
          size="xl"
          onClick={() => {
            handleViewFollows();
            setViewFollows(null);
          }}
        />
      </Modal.Header>
      <Modal.Body>
        <ul>
          {follows?.map((follow) => (
            <FollowLists
              item={follow}
              handleViewFollows={handleViewFollows}
              setViewFollows={setViewFollows}
              key={follow}
            />
          ))}
        </ul>
      </Modal.Body>
    </Modal>
  );
};

export default ViewFollows;
