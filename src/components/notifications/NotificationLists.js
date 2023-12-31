import { useQuery } from "react-query";
import getUserById from "../../utils/getUserById";
import EmptyPhoto from "../ui/EmptyPhoto";

const NotificationLists = ({ item }) => {
  // Get current users's noitifcations
  const { data: userBy } = useQuery(["getUserById", item], () =>
    getUserById(item.notifiedBy)
  );

  return (
    <li className="flex items-start bg-light dark:bg-dark rounded p-4 my-3 last:mb-12">
      {userBy?.photo ? (
        <img
          src={userBy.photo}
          width={28}
          className="rounded-full"
          alt="User"
        />
      ) : (
        <EmptyPhoto username={userBy?.username} size="28px" />
      )}
      <span className="ms-2">
        {userBy?.username} {item.notification}
      </span>
    </li>
  );
};

export default NotificationLists;
