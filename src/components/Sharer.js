import { useQuery } from "react-query";
import getUserById from "../utils/getUserById";
import Button from "./Button";
import EmptyPhoto from "./EmptyPhoto";

const Sharer = ({ storiedBy, onClick }) => {
  const { data: user } = useQuery(["getUserById", storiedBy], () =>
    getUserById(storiedBy)
  );

  if (!user) return null;

  return (
    <Button
      className="flex flex-col items-center justify-center ps-0 pe-0"
      onClick={onClick}
    >
      {user.photo ? (
        <div style={{
          width: '64px',
          height: '64px'
        }}>
                  <img
          src={user.photo}
          alt="User"
          className="w-full rounded-full border-4 border-secondary"
          loading="lazy"
        />
        </div>
      ) : (
        <EmptyPhoto username={user.username} size='64px' className='border-4 border-secondary' />
      )}
      <span className="font-normal">{user.username}</span>
    </Button>
  );
};

export default Sharer;
