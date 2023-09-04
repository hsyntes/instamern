import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { useMutation, useQuery, useQueryClient } from "react-query";
import Container from "../components/ui/Container";
import EmptyPhoto from "../components/ui/EmptyPhoto";
import Spinner from "../components/ui/Spinner";
import ViewPost from "../components/posts/ViewPost";
import Button from "../components/ui/Button";
import Settings from "../components/ui/Settings";
import EditProfile from "../components/profile/EditProfile";
import ErrorDialog from "../components/ui/ErrorDialog";
import Toast from "../components/ui/Toast";
import ViewFollows from "../components/follows/ViewFollows";
import getUserByUsername from "../utils/getUserByUsername";
import logout from "../utils/logout";
import follow from "../utils/follow";
import Cookies from "js-cookie";

const ProfilePage = () => {
  const params = useParams();
  const [viewFollows, setViewFollows] = useState(false);
  const [follows, setFollows] = useState(null);
  const [followType, setFollowType] = useState(null);
  const [viewPost, setViewPost] = useState(false);
  const [selectedPost, setSelectedPost] = useState(null);
  const [settings, setSettings] = useState(false);
  const [editProfile, setEditProfile] = useState(false);
  const [errorDialog, setErrorDialog] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const [toast, setToast] = useState(false);
  const [toastMessage, setToastMessage] = useState(null);
  const userState = useSelector((state) => state.currentUser);
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  // Get the variable on the URL
  const { username } = params;
  const { currentUser } = userState;

  // Get the user by username
  const { data: user, isLoading: isUserLoading } = useQuery(
    ["getUserByUsername", username],
    {
      queryFn: () => getUserByUsername(username),
      refetchOnWindowFocus: false,
    }
  );

  // React-query logout functionality
  const mutationLogout = useMutation(logout, {
    onSuccess: () => {
      Cookies.remove("jsonwebtoken");

      queryClient.invalidateQueries("logout");
      queryClient.refetchQueries("getCurrentUser");

      window.location.reload();

      navigate("/");
    },
  });

  // React-query follow functionality
  const mutationFollow = useMutation(follow, {
    onSuccess: (data) => {
      if (data.status === "fail") {
        setErrorDialog(true);
        setErrorMessage(data.message);
      }

      if (data.status === "success") {
        setToast(true);
        setToastMessage(data.message);

        queryClient.refetchQueries("getUsers");
        queryClient.refetchQueries("getCurrentUser");
        queryClient.refetchQueries("getUserByUsername");
      }
    },
  });

  // handles
  const handleViewFollows = () => setViewFollows(!viewFollows);
  const handleViewPost = () => setViewPost(!viewPost);
  const handleSettings = () => setSettings(!settings);
  const handleEditProfile = () => setEditProfile(!editProfile);

  const handleFollow = (type) =>
    mutationFollow.mutate({ type, username: user.username });

  const handleLogout = () => mutationLogout.mutate({});
  const handleErrorDialog = () => setErrorDialog(!errorDialog);

  // Set toast messages
  useEffect(() => {
    const identifier = setTimeout(() => {
      if (toast) {
        setToast(false);
        setToastMessage(null);
      }
    }, 2000);

    return () => clearTimeout(identifier);
  }, [toast, setToast, setToastMessage]);

  // Return spinner loading
  if (isUserLoading)
    return (
      <center>
        <Spinner />
      </center>
    );

  return (
    <>
      <Container>
        <section className="flex">
          <section>
            {user?.photo ? (
              <img
                src={user.photo}
                className="w-50 lg:w-40 rounded-full"
                alt="User"
              />
            ) : (
              <EmptyPhoto username={user?.username} size={64} fontSize={32} />
            )}
          </section>
          <section className="ms-6 w-full">
            <section>
              <section className="flex items-center lg:text-xl">
                <section>
                  <span className="font-semibold">{user?.posts.length}</span>
                  <span className="ms-1">Posts</span>
                </section>
                <section
                  className="cursor-pointer mx-2 lg:mx-4"
                  onClick={() => {
                    handleViewFollows();
                    setFollowType("Followers");
                    setFollows(user.followers);
                  }}
                >
                  <span className="font-semibold">
                    {user?.followers.length}
                  </span>
                  <span className="ms-1">Followers</span>
                </section>
                <section
                  className="cursor-pointer"
                  onClick={() => {
                    handleViewFollows();
                    setFollowType("Followings");
                    setFollows(user.followings);
                  }}
                >
                  <span className="font-semibold">
                    {user?.followings.length}
                  </span>
                  <span className="ms-1">Following</span>
                </section>
              </section>
              <section className="mt-4">
                <h6 className="text-lg">
                  {user?.firstname} {user?.lastname}
                </h6>
              </section>
              <section>
                <p>{user?.bio}</p>
              </section>
              <section className="mt-8">
                {user?.username === currentUser?.username ? (
                  <Button
                    type="button"
                    variant="primary"
                    className="w-full lg:w-auto py-3 px-6"
                    onClick={handleEditProfile}
                  >
                    Edit Profile
                  </Button>
                ) : currentUser?.followings.some(
                    (following) => following === user?._id
                  ) ? (
                  <Button
                    type="button"
                    variant="primary"
                    className="w-full lg:w-auto py-3 px-6"
                    onClick={() => handleFollow("unfollow")}
                    disabled={mutationFollow.isLoading}
                  >
                    {mutationFollow.isLoading ? (
                      <center>
                        <Spinner size="sm" />
                      </center>
                    ) : (
                      <span>Unfollow</span>
                    )}
                  </Button>
                ) : (
                  <Button
                    type="button"
                    variant="primary"
                    className="w-full lg:w-auto py-3 px-6"
                    onClick={() => handleFollow("follow")}
                    disabled={mutationFollow.isLoading}
                  >
                    {mutationFollow.isLoading ? (
                      <center>
                        <Spinner size="sm" />
                      </center>
                    ) : (
                      <span>Follow</span>
                    )}
                  </Button>
                )}
              </section>
            </section>
          </section>
        </section>
        <section className="grid grid-cols-9 gap-2 my-20">
          {user?.posts.map((post) => (
            <img
              src={post.photo}
              className="col-span-3 cursor-pointer rounded hover:opacity-75 my-2"
              loading="lazy"
              alt="Post"
              onClick={() => {
                handleViewPost();
                setSelectedPost(post._id);
              }}
              key={post._id}
            />
          ))}
        </section>
      </Container>
      <ViewFollows
        show={viewFollows}
        follows={follows}
        handleViewFollows={handleViewFollows}
        setViewFollows={setViewFollows}
        type={followType}
      />
      <ViewPost
        show={viewPost}
        postId={selectedPost}
        handleViewPost={handleViewPost}
        setSelectedPost={setSelectedPost}
      />
      <ErrorDialog
        show={errorDialog}
        handleErrorDialog={handleErrorDialog}
        message={errorMessage}
      />
      <Settings
        show={settings}
        handleSettings={handleSettings}
        handleLogout={handleLogout}
      />
      <Toast show={toast} message={toastMessage} />
      {currentUser && (
        <EditProfile show={editProfile} handleEditProfile={handleEditProfile} />
      )}
    </>
  );
};

export default ProfilePage;
