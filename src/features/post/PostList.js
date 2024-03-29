import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPosts } from "./postSlice";
import PostCard from "./PostCard";
import { LoadingButton } from "@mui/lab";
import { Box, Typography } from "@mui/material";
import PostForm from "./PostForm";

function PostList({ userId }) {
  const [page, setPage] = useState(1);
  const { postsById, currentPagePosts, totalPosts, isLoading, editingPost } =
    useSelector((state) => state.post);
  const posts = currentPagePosts.map((postId) => postsById[postId]);
  const dispatch = useDispatch();

  useEffect(() => {
    if (userId) dispatch(getPosts({ userId, page }));
  }, [userId, page, dispatch]);

  return (
    <div>
      {posts.map((post) =>
        post._id === editingPost ? (
          <PostForm key={post._id} post={post} />
        ) : (
          <PostCard key={post._id} post={post} />
        )
      )}
      <Box sx={{ display: "flex", justifyContent: "center" }}>
        {totalPosts ? (
          <LoadingButton
            variant="outlined"
            size="small"
            loading={isLoading}
            onClick={() => setPage((page) => page + 1)}
            disabled={Boolean(totalPosts) && posts.length >= totalPosts}
          >
            Load more
          </LoadingButton>
        ) : (
          <Typography variant="h6">No posts</Typography>
        )}
      </Box>
    </div>
  );
}

export default PostList;
