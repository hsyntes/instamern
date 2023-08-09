import { useQuery } from "react-query";
import Container from "../components/ui/Container";
import Users from "../components/users/Users";
import Posts from "../components/posts/Posts";
import Spinner from "../components/ui/Spinner";
import getPosts from "../utils/getPosts";
import getUsers from "../utils/getUsers";
import Splash from "../components/ui/Splash";
import getStories from "../utils/getStories";
import Stories from "../components/stories/Stories";
import AddStory from "../components/stories/AddStory";

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
      <section className="flex items-center mb-8">
        <section>
          <AddStory />
        </section>
        <section className="overflow-x-scroll">
          {stories && <Stories stories={stories} />}
        </section>
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
