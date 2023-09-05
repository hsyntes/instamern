import { useMutation, useQueryClient } from "react-query";
import useInput from "../../hooks/useInput";
import makeComment from "../../utils/makeComment";
import Spinner from "../ui/Spinner";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";

const InputComment = ({ item, setErrorDialog, setErrorMessage }) => {
  const queryClient = useQueryClient();

  const {
    state: { value: comment },
    handleOnChange: handleCommentOnChange,
    handleClear: commentClear,
  } = useInput();

  // Add comment to the post
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

  return (
    <>
      <textarea
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
      )}
    </>
  );
};

export default InputComment;
