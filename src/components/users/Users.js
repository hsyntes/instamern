import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useMutation, useQueryClient } from "react-query";
import Button from "../ui/Button";
import EmptyPhoto from "../ui/EmptyPhoto";
import Toast from "../ui/Toast";
import follow from "../../utils/follow";

const UserLists = ({ items, toast, setToast, setToastMessage }) => {
  const queryClient = useQueryClient();
  const userState = useSelector((state) => state.currentUser);

  // Follow users
  const mutationFollow = useMutation(follow, {
    onSuccess: (data) => {
      setToast(true);
      setToastMessage(data.message);

      queryClient.refetchQueries("getUsers");
      queryClient.refetchQueries("getCurrentUser");
    },
  });

  const { currentUser } = userState;

  useEffect(() => {
    const identifier = setTimeout(() => {
      if (toast) {
        setToast(false);
        setToastMessage(null);
      }
    }, 2000);

    return () => clearTimeout(identifier);
  }, [toast, setToast, setToastMessage]);

  return items?.map((item, index) => (
    <li key={item._id || index} className="flex items-center mb-4">
      <Link to={`/${item.username}`} className="flex items-center">
        {item?.photo ? (
          <img
            src={item.photo}
            alt="User"
            width={38}
            className="rounded-full"
            loading="lazy"
          />
        ) : (
          <EmptyPhoto username={item.username} size="38px" />
        )}
        <div className="ms-3">
          <p>{item.username}</p>
          <p className="text-sm text-gray-400">
            {item.firstname} {item.lastname}
          </p>
        </div>
      </Link>

      {item.username ===
      currentUser?.username ? null : currentUser?.followings.some(
          (following) => following === item._id
        ) ? (
        <Button
          type="button"
          variant="link"
          className="ms-auto ps-0 pe-0 pt-0 pb-0"
          onClick={() =>
            mutationFollow.mutate({
              type: "unfollow",
              username: item.username,
            })
          }
          disabled={mutationFollow.isLoading}
        >
          Following
        </Button>
      ) : (
        <Button
          type="button"
          variant="link"
          className="text-primary ms-auto ps-0 pe-0 pt-0 pb-0"
          onClick={() =>
            mutationFollow.mutate({ type: "follow", username: item.username })
          }
          disabled={mutationFollow.isLoading}
        >
          Follow
        </Button>
      )}
    </li>
  ));
};

const Users = ({ users, children }) => {
  const [toast, setToast] = useState(false);
  const [toastMessage, setToastMessage] = useState(null);

  return (
    <>
      <ul>
        <UserLists
          items={users}
          toast={toast}
          setToast={setToast}
          setToastMessage={setToastMessage}
        >
          {children}
        </UserLists>
      </ul>
      <Toast show={toast} message={toastMessage}></Toast>
    </>
  );
};

export default Users;
