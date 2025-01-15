import MyPage from "@pages/myPage/MyPage";
import Edit from "@pages/myPage/Edit";
import Likes from "@pages/myPage/Likes";
import PRWrite from "@pages/main/post/PRWrite";
import SignIn from "@pages/user/SignIn";
import SignUp from "@pages/user/SignUp";
import Terms from "@pages/user/Terms";
import { createBrowserRouter, Navigate } from "react-router-dom";
import MyReviews from "@pages/myPage/MyReviews";
import Layout from "@components/layout";
import PostDetail from "@pages/main/post/PostDetail";
import PostList from "@pages/main/PostList";
import PostWrite from "@pages/main/post/PostWrite";
import PostEdit from "@pages/main/post/PostEdit";
import ReviewList from "@pages/history/Layout";
import Profile from "@pages/user/Profile";
import Error from "@pages/Error";
import Worked from "@pages/history/Worked";
import Employed from "@pages/history/Employed";
import ReviewWrite from "@pages/history/ReviewWrite";
import KakaoSignIn from "@pages/user/KakaoSignIn";

const router = createBrowserRouter(
  [
    {
      path: "/",
      element: <Layout />,
      children: [
        { index: true, element: <PostList /> },

        { path: "post/write", element: <PostWrite /> },
        { path: "post/:_id", element: <PostDetail /> },
        { path: "post/:_id/edit", element: <PostEdit /> },

        {
          path: "history",
          element: <ReviewList />,
          children: [
            {
              index: true,
              element: <Navigate to="worked" replace />,
            },
            { path: "worked", element: <Worked /> },
            { path: "employed", element: <Employed /> },
          ],
        },
        { path: "history/:from/reviewWrite/:id", element: <ReviewWrite /> },

        { path: "pr/write", element: <PRWrite /> },

        { path: "myPage", element: <MyPage /> },
        { path: "myPage/edit", element: <Edit /> },
        { path: "myPage/likeList", element: <Likes /> },
        { path: "myPage/myReviews/:_id", element: <MyReviews /> },

        { path: "user/signUp", element: <SignUp /> },
        { path: "user/terms", element: <Terms /> },
        { path: "user/:_id", element: <Profile /> },
        { path: "error", element: <Error /> },
      ],
    },

    {
      path: "user/signIn",
      element: <SignIn />,
    },
    {
      path: "user/signin/kakao",
      element: <KakaoSignIn />,
    },
  ],
  {
    future: {
      // 없으면 콘솔에 경고 표시
      v7_fetcherPersist: true,
      v7_normalizeFormMethod: true,
      v7_partialHydration: true,
      v7_relativeSplatPath: true,
      v7_skipActionErrorRevalidation: true,
    },
  },
);

export default router;
