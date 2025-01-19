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
import Alarm from "@pages/alarm/Alarm";
import ProtectedRoute from "./protectedRoutes";

// 접근 막을 페이지: nav 기준 마이페이지, 알바 내역 페이지

const router = createBrowserRouter(
  [
    {
      path: "/",
      element: <Layout />,
      children: [
        { index: true, element: <PostList /> },

        {
          element: <ProtectedRoute />,
          children: [
            { path: "alarm", element: <Alarm /> },
            { path: "post/write", element: <PostWrite /> },
            { path: "post/:_id/edit", element: <PostEdit /> },
            { path: "pr/write", element: <PRWrite /> },
          ],
        },

        { path: "post/:_id", element: <PostDetail /> },

        {
          path: "history",
          element: <ProtectedRoute />,
          // element: <ReviewList />,
          children: [
            {
              element: <ReviewList />,
              children: [
                { path: "worked", element: <Worked /> },
                { path: "employed", element: <Employed /> },
                {
                  path: ":from/reviewWrite/:id",
                  element: <ReviewWrite />,
                },
              ],
            },
            {
              index: true,
              element: <Navigate to="worked" replace />,
            },
          ],
        },
        // { path: "history/:from/reviewWrite/:id", element: <ReviewWrite /> },
        // { path: "pr/write", element: <PRWrite /> },

        {
          path: "myPage",
          children: [
            {
              element: <ProtectedRoute />,
              children: [
                { index: true, element: <MyPage /> },
                { path: "myPage/edit", element: <Edit /> },
                { path: "myPage/likeList", element: <Likes /> },
                { path: "myPage/myReviews/:_id", element: <MyReviews /> },
              ],
            },
          ],
        },

        {
          path: "user/:_id",
          element: <ProtectedRoute />,
          children: [{ index: true, element: <Profile /> }],
        },

        { path: "error", element: <Error /> },
        { path: "user/signUp", element: <SignUp /> },
        { path: "user/terms", element: <Terms /> },
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
