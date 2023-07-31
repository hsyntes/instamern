import { useQuery } from "react-query";
import Container from "../components/Container";
import Users from "../components/Users";
import Posts from "../components/Posts";
import Spinner from "../components/Spinner";
import getPosts from "../utils/getPosts";
import getUsers from "../utils/getUsers";
import Splash from "../components/Splash";
import getStories from "../utils/getStories";
import Stories from "../components/Stories";
import AddStory from "../components/AddStory";

const HomePage = () => {
  const { data: users, isLoading: isUsersLoading } = useQuery({
    queryKey: "getUsers",
    queryFn: getUsers,
    // refetchOnWindowFocus: false,
  });

  const { data: stories } = useQuery({
    queryKey: "getStories",
    queryFn: getStories,
  });

  const { data: posts, isLoading: isPostsLoading } = useQuery({
    queryKey: "getPosts",
    queryFn: getPosts,
    refetchOnWindowFocus: false,
  });

  if (isUsersLoading && isPostsLoading) return <Splash />;

  return (
    <Container>
      <section className="flex items-center">
        <section>
          <AddStory />
        </section>
        <section className="overflow-x-scroll">{stories && <Stories stories={stories} />}</section>
      </section>
      <section className="lg:grid lg:grid-cols-12">
        <section className="col-span-8 lg:col-span-9 grid grid-cols-12">
          <section className="col-span-12 lg:col-span-6 xl:col-span-5">
            {isPostsLoading ? (
              <center>
                <Spinner />
              </center>
            ) : (
              <Posts posts={posts} />
            )}
          </section>
        </section>
        <section className="hidden lg:block col-span-4 lg:col-span-3">
          <h6 className="font-semibold mb-4">Suggested for you</h6>
          {isUsersLoading ? (
            <center>
              <Spinner />
            </center>
          ) : (
            <Users users={users} />
          )}
        </section>
      </section>
    </Container>
  );
};

export default HomePage;
