import React from "react";
import { FormProvider, FTextField } from "../../app/components/form";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import {
  Alert,
  Box,
  Button,
  Grid,
  Stack,
  TextField,
  Typography,
  Container,
  Link,
  IconButton,
  InputAdornment,
  Card,
  alpha,
  Avatar,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { useDispatch, useSelector } from "react-redux";
import { createComment } from "./commentSlice";
import useAuth from "../../hooks/useAuth";
import SendIcon from "@mui/icons-material/Send";

const yupSchema = Yup.object().shape({
  content: Yup.string().required("Content is required"),
});

const defaultValues = {
  content: "",
};

function CommentForm({ postId }) {
  const methods = useForm({
    resolver: yupResolver(yupSchema),
    defaultValues,
  });

  const {
    handleSubmit,
    reset,
    setValue,
    formState: { isSubmitting },
  } = methods;

  const dispatch = useDispatch();
  const { user } = useAuth();

  //const { isLoading } = useSelector((state) => state.comment);

  const onSubmit = (data) => {
    data["postId"] = postId;
    console.log(data);
    dispatch(createComment(data)).then(() => reset());
  };

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Stack direction="row" alignItems="center">
        <Avatar src={user.avatarUrl} alt={user.name} />
        <FTextField
          name="content"
          fullWidth
          size="small"
          placeholder="Write a comment…"
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
    </FormProvider>
  );
}

export default CommentForm;
