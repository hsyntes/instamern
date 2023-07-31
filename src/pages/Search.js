import { useQuery } from "react-query";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import Container from "../components/Container";
import Users from "../components/Users";
import Spinner from "../components/Spinner";
import useInput from "../hooks/useInput";
import searchUsers from "../utils/searchUsers";

const SearchPage = () => {
  const {
    state: { value: search, isValid: isSearchValid },
    handleOnChange: handleSearchOnChange,
  } = useInput();

  const { data: users, isLoading: isUsersLoading } = useQuery(
    ["searchUsers", search],
    {
      queryFn: () => {
        if (isSearchValid) return searchUsers(search);
      },
    }
  );

  return (
    <Container className="lg:!w-3/4">
      <div className="form-group relative">
        <input
          type="text"
          name="search"
          className="form-input w-full rounded dark:bg-dark"
          placeholder="Search"
          value={search}
          onChange={handleSearchOnChange}
        />
        <FontAwesomeIcon
          icon={faSearch}
          className="absolute top-1/2 right-2 -translate-x-1/2 -translate-y-1/2"
        />
      </div>
      <section className="my-12">
        {isUsersLoading ? (
          <center>
            <Spinner />
          </center>
        ) : (
          <Users users={users} />
        )}
      </section>
    </Container>
  );
};

export default SearchPage;
