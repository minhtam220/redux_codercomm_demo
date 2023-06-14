import React, { useState } from "react";
import useAuth from "../../hooks/useAuth";

import { Stack, Avatar, TextField, IconButton } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import { useDispatch } from "react-redux";
import createComment from "./commentSlice";

function CommentForm({ postId }) {
  const [content, setContent] = useState("");
  const { user } = useAuth();
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(content, postId);

    dispatch(createComment({ content, postId }));

    //alert(postId, content);

    setContent("");
  };
  return (
    <form onSubmit={handleSubmit}>
      <Stack direction="row" alignItems="center">
        <Avatar src={user.avatarUrl} alt={user.name} />
        <TextField
          fullwidth
          size="small"
          value={content}
          placeholder="Write a comment..."
          onChange={(event) => setContent(event.target.value)}
          sx={{
            ml: 2,
            mr: 1,
            "S fieldset": {
              borderWidth: "1px ! important",
              borderColor: (theme) =>
                `$(theme. palette. grey (500 _32]} !important`,
            },
          }}
        />
        <IconButton type="submit">
          <SendIcon sx={{ fontSize: 30 }} />
        </IconButton>
      </Stack>
    </form>
  );
}

export default CommentForm;
