import React, { useEffect } from "react";
import { useDispatch, useSelector, shallowEqual } from "react-redux";
import { getComments } from "./commentSlice";
import { COMMENT_PER_POST } from "../../app/config";
import { Stack, Typography, Pagination } from "@mui/material";
import CommentCard from "./CommentCard";
import LoadingScreen from "../../app/components/LoadingScreen";

function CommentList({ postId }) {
  const {
    commentsByPost,
    commentsById,
    totalComments,
    isLoading,
    currentPage,
  } = useSelector(
    (state) => ({
      commentsByPost: state.comment.commentsByPost[postId],
      totalComments: state.comment.totalCommentsByPost[postId],
      currentPage: state.comment.currentPageByPost[postId] || 1,
      commentsById: state.comment.commentsByld,
      isLoading: state.comment.isLoading,
    }),
    shallowEqual
  );

  const totalPages = Math.ceil(totalComments / COMMENT_PER_POST);

  const dispatch = useDispatch();
  useEffect(() => {
    if (postId) dispatch(getComments({ postId }));
  }, [postId, dispatch]);

  let renderComments;

  /*
  if (commentsByPost) {
    const comments = commentsByPost.map((commentId) => commentsById[commentId]);
    renderComments = (
      <Stack spacing={1.5}>
        {comments.map((comment) => (
          <CommentCard key={comment._id} comment={comment} />
        ))}
      </Stack>
    );
  } else if (isLoading) {
    renderComments = <LoadingScreen />;
  }
  */

  return (
    <Stack spacing={1.5}>
      <Stack direction="row" justifyContent="space-between">
        <Typography variant="subtitle" sx={{ color: "text.secondary" }}>
          {totalComments > 1
            ? `${totalComments} comments`
            : totalComments === 1
            ? `${totalComments} comment`
            : "No comment"}
        </Typography>
        {totalComments > COMMENT_PER_POST && (
          <Pagination
            count={totalPages}
            page={currentPage}
            onChange={(e, page) => dispatch(getComments({ postId, page }))}
          />
        )}
      </Stack>
    </Stack>
  );
}

export default CommentList;
