import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPaperPlane,
  faHeart as faHeartSolid,
} from "@fortawesome/free-solid-svg-icons";
import {
  faComment,
  faHeart as faHeartRegular,
} from "@fortawesome/free-regular-svg-icons";
import Card from "../ui/Card";
import Button from "../ui/Button";
import ViewPost from "../posts/ViewPost";
import ViewLikes from "../likes/ViewLikes";
import ErrorDialog from "../ui/ErrorDialog";
import Creator from "./Creator";
import getPost from "../../utils/getPost";
import makeComment from "../../utils/makeComment";
import likePost from "../../utils/likePost";
import useInput from "../../hooks/useInput";
import Spinner from "../ui/Spinner";
import Toast from "../ui/Toast";
import InputComment from "../comments/InputComment";

const PostLists = ({ items }) => {
  const [selectedPost, setSelectedPost] = useState(null);
  const [viewPost, setViewPost] = useState(null);
  const [viewLikes, setViewLikes] = useState(false);
  const [errorDialog, setErrorDialog] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const [toast, setToast] = useState(false);
  const [toastMessage, setToastMessage] = useState(null);
  const queryClient = useQueryClient();
  const userState = useSelector((state) => state.currentUser);

  const { currentUser } = userState;

  // const {
  //   state: { value: comment },
  //   handleOnChange: handleCommentOnChange,
  //   handleClear: commentClear,
  // } = useInput();

  const handleViewLikes = () => setViewLikes(!viewLikes);
  const handleViewPost = () => setViewPost(!viewPost);
  const handleErrorDialog = () => setErrorDialog(!errorDialog);

  // Get the post based on the selected
  const { data: post, isLoading: isPostLoading } = useQuery(
    ["getPost", selectedPost],
    () => selectedPost && getPost(selectedPost),
    {
      refetchOnWindowFocus: false,
    }
  );

  // // Add comment to the post
  // const mutationComment = useMutation(makeComment, {
  //   onSuccess: (data) => {
  //     queryClient.invalidateQueries("getPost");

  //     if (data.status === "fail") {
  //       setErrorDialog(true);
  //       setErrorMessage(data.message);
  //     } else {
  //       commentClear();
  //       queryClient.refetchQueries("getPosts");
  //     }
  //   },
  // });

  // Like the photo
  const mutationLike = useMutation(likePost, {
    onSuccess: (data) => {
      queryClient.invalidateQueries("likePost");

      if (data.status === "fail") {
        setErrorDialog(true);
        setErrorMessage(data.message);
      }

      if (data.status === "success") {
        setToast(true);
        setToastMessage(data.message);

        queryClient.refetchQueries("getPosts");
      }
    },
  });

  useEffect(() => {
    const identifier = setTimeout(() => {
      if (toast) {
        setToast(false);
        setToastMessage(null);
      }
    }, 2000);

    return () => clearTimeout(identifier);
  }, [toast, setToast, setToastMessage]);

  return (
    <>
      {items?.map((item) => (
        <Card key={item._id} className="mb-12">
          <Card.Header className="ps-0">
            <Creator postedBy={item.postedBy} />
          </Card.Header>
          <Card.Body className="my-2">
            <img
              src={item.photo}
              alt="Post"
              className="rounded cursor-pointer"
              loading="lazy"
              onClick={() => {
                handleViewPost();
                setSelectedPost(item._id);
              }}
            />
          </Card.Body>
          <Card.Footer className="px-0 py-1">
            <div className="flex items-center my-3">
              {mutationLike.isLoading ? (
                <Spinner size="sm"></Spinner>
              ) : (
                <FontAwesomeIcon
                  size="xl"
                  icon={
                    item.likes?.some((like) => like === currentUser?._id)
                      ? faHeartSolid
                      : faHeartRegular
                  }
                  className="cursor-pointer"
                  onClick={() => {
                    mutationLike.mutate({ postId: item._id });
                  }}
                />
              )}
              <FontAwesomeIcon
                icon={faComment}
                size="xl"
                className="cursor-pointer ms-3"
                onClick={() => {
                  handleViewPost();
                  setSelectedPost(item._id);
                }}
              />
            </div>
            <section>
              <Button
                type="button"
                variant="link"
                className="lg:text-lg ps-0"
                onClick={() => {
                  handleViewLikes();
                  setSelectedPost(item._id);
                }}
              >
                {item.like} likes
              </Button>
            </section>
            <section>
              <p>{item.caption}</p>
            </section>
            <section>
              <Button
                type="button"
                variant="link"
                className="text-gray-400 ps-0 font-normal"
                onClick={() => {
                  handleViewPost();
                  setSelectedPost(item._id);
                }}
              >
                View all {item.comment} comments
              </Button>
            </section>
            <section className="relative">
              <InputComment
                item={item}
                setErrorDialog={setErrorDialog}
                setErrorMessage={setErrorMessage}
              />
              {/* <textarea
                name="comment"
                value={comment}
                onChange={handleCommentOnChange}
                className="form-input block w-full bg-white dark:bg-black border-0 border-b-2 ps-0 focus:ring-0 focus:border-b-secondary transition "
                placeholder="Add a comment"
                style={{ height: "auto", resize: "none" }}
                rows={1}
              />
              {mutationComment.isLoading ? (
                <Spinner
                  size="sm"
                  className="absolute right-10 lg:right-0 bottom-3 cursor-pointer"
                />
              ) : (
                comment && (
                  <FontAwesomeIcon
                    icon={faPaperPlane}
                    size="lg"
                    className="absolute right-10 lg:right-0 bottom-3 cursor-pointer"
                    onClick={() => {
                      mutationComment.mutate({ postId: item?._id, comment });
                    }}
                  />
                )
              )} */}
            </section>
          </Card.Footer>
        </Card>
      ))}
      <ViewPost
        show={viewPost}
        postId={selectedPost}
        handleViewPost={handleViewPost}
        setSelectedPost={setSelectedPost}
      />
      <ViewLikes
        show={viewLikes}
        handleViewLikes={handleViewLikes}
        post={post}
        setSelectedPost={setSelectedPost}
        isPostLoading={isPostLoading}
      />
      <Toast show={toast} message={toastMessage} />
      <ErrorDialog
        show={errorDialog}
        message={errorMessage}
        handleErrorDialog={handleErrorDialog}
      />
    </>
  );
};

const Posts = ({ posts }) => <PostLists items={posts} />;

export default Posts;
