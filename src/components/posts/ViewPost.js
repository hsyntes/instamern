import { useMutation, useQuery, useQueryClient } from "react-query";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft, faTimes } from "@fortawesome/free-solid-svg-icons";
import Modal from "../ui/Modal";
import Comments from "../comments/Comments";
import getPost from "../../utils/getPost";
import Spinner from "../ui/Spinner";
import Creator from "./Creator";
import useInput from "../../hooks/useInput";
import { faPaperPlane } from "@fortawesome/free-regular-svg-icons";
import makeComment from "../../utils/makeComment";
import { useState } from "react";
import ErrorDialog from "../ui/ErrorDialog";

const ViewPost = ({ show, postId, handleViewPost, setSelectedPost }) => {
  const queryClient = useQueryClient();
  const [errorDialog, setErrorDialog] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);

  const { data: post, isLoading: isPostLoading } = useQuery(
    ["getPost", postId],
    {
      queryFn: () => getPost(postId),
    }
  );

  const {
    state: { value: comment },
    handleOnChange: handleCommentOnChange,
    handleClear: commentClear,
  } = useInput();

  const mutationComment = useMutation(makeComment, {
    onSuccess: (data) => {
      queryClient.invalidateQueries("getPost");

      if (data.status === "fail") {
        setErrorDialog(true);
        setErrorMessage(data.message);
      } else {
        commentClear();
        queryClient.refetchQueries("getPosts");
      }
    },
  });

  const handleErrorDialog = () => setErrorDialog(!errorDialog);

  let content;
  if (isPostLoading)
    content = (
      <center>
        <Spinner className="absolute inset-y-1/2 inset-x-1/2 -translate-y-1/2 -translate-x-1/2" />
      </center>
    );
  else
    content = (
      <>
        <Modal.Header className="lg:col-span-8 flex-col overflow-hidden mb-4">
          <div
            className="flex items-center self-start lg:hidden mb-4"
            onClick={() => {
              handleViewPost();
              setSelectedPost(null);
            }}
          >
            <FontAwesomeIcon
              icon={faAngleLeft}
              className="block text-gray-500 hover:text-dark hover:dark:text-white transition"
              size="xl"
            />
            <span className="text-xl font-semibold ms-2">Posts</span>
          </div>
          {post && (
            <img
              src={post.photo}
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                objectPosition: "center",
              }}
              className="rounded"
              alt="Post"
            />
          )}
        </Modal.Header>
        <div className="lg:col-span-4 lg:relative">
          <Modal.Body>
            <section>
              <FontAwesomeIcon
                icon={faTimes}
                className="absolute top-0 right-3 cursor-pointer hidden lg:block text-gray-500 hover:text-dark hover:dark:text-white transition"
                size="2xl"
                onClick={() => {
                  handleViewPost();
                  setSelectedPost(null);
                }}
              />
            </section>
            <section>
              {post && <Creator postedBy={post?.postedBy} />}
              <p className="my-2">{post?.caption}</p>
              {post && (
                <Comments
                  comments={post?.comments}
                  handleViewPost={handleViewPost}
                />
              )}
            </section>
          </Modal.Body>
          <Modal.Footer className="fixed lg:absolute w-full bottom-0">
            <textarea
              name="comment"
              value={comment}
              onChange={handleCommentOnChange}
              className="form-input block w-full bg-white dark:bg-dark border-0 border-b-2 ps-0 focus:ring-0 focus:border-b-secondary transition "
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
                    mutationComment.mutate({ postId: post?.id, comment });
                  }}
                />
              )
            )}
          </Modal.Footer>
        </div>
        <ErrorDialog
          show={errorDialog}
          handleErrorDialog={handleErrorDialog}
          message={errorMessage}
        />
      </>
    );

  return (
    <Modal
      show={show}
      className="lg:w-11/12 lg:h-5/6 lg:grid lg:grid-cols-12 lg:gap-8 w-screen h-screen relative overflow-x-hidden overflow-y-scroll rounded-none lg:rounded"
    >
      {content}
    </Modal>
  );
};

export default ViewPost;
