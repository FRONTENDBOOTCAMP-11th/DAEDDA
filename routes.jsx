import { createBrowserRouter, Navigate } from "react-router-dom";
import { lazy } from "react";

const Layout = lazy(() => import("@components/layout"));
const ProtectedRoute = lazy(() => import("@components/layout/ProtectedRoutes"));

const SignIn = lazy(() => import("@pages/user/SignIn"));
const SignUp = lazy(() => import("@pages/user/SignUp"));
const KakaoSignIn = lazy(() => import("@pages/user/KakaoSignIn"));
const Terms = lazy(() => import("@pages/user/Terms"));
const Profile = lazy(() => import("@pages/user/Profile"));

const PostList = lazy(() => import("@/pages/main/PostList"));
const PostDetail = lazy(() => import("@pages/main/post/PostDetail"));
const PostWrite = lazy(() => import("@pages/main/post/PostWrite"));
const PostEdit = lazy(() => import("@pages/main/post/PostEdit"));
const PRWrite = lazy(() => import("@pages/main/post/PRWrite"));

const ReviewList = lazy(() => import("@pages/history/Layout"));
const Worked = lazy(() => import("@pages/history/Worked"));
const Employed = lazy(() => import("@pages/history/Employed"));
const ReviewWrite = lazy(() => import("@pages/history/ReviewWrite"));

const MyPage = lazy(() => import("@pages/myPage/MyPage"));
const Edit = lazy(() => import("@pages/myPage/Edit"));
const Likes = lazy(() => import("@pages/myPage/Likes"));
const MyReviews = lazy(() => import("@pages/myPage/MyReviews"));

const Error = lazy(() => import("@pages/Error"));
const Alarm = lazy(() => import("@pages/alarm/Alarm"));
const Refund = lazy(() => import("@pages/Refund"));

// 접근 막을 페이지: nav 기준 마이페이지, 알바 내역 페이지

const router = createBrowserRouter(
  [
    {
      element: <Layout />,
      children: [
        // 로그인이 필요 없는 페이지
        { path: "/", element: <PostList /> },
        { path: "post/:_id", element: <PostDetail /> },

        {
          path: "user",
          children: [
            { path: "signUp", element: <SignUp /> },
            { path: "terms", element: <Terms /> },
          ],
        },
        {
          // 로그인이 필요한 페이지
          element: <ProtectedRoute />,
          children: [
            { path: "alarm", element: <Alarm /> },
            { path: "post/write", element: <PostWrite /> },
            { path: "post/:_id/edit", element: <PostEdit /> },
            { path: "pr/write", element: <PRWrite /> },
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
            { path: "history/:from/reviewWrite/", element: <ReviewWrite /> },
            {
              path: "myPage",
              children: [
                { index: true, element: <MyPage /> },
                { path: "edit", element: <Edit /> },
                { path: "likeList", element: <Likes /> },
                { path: "myReviews/:_id", element: <MyReviews /> },
              ],
            },
            { path: "user/:_id", element: <Profile /> },
          ],
        },
      ],
    },

    // 레이아웃 필요 없는 페이지
    {
      path: "user",
      children: [{ path: "signIn", element: <SignIn /> }],
    },
    { path: "users/login/kakao", element: <KakaoSignIn /> },
    { path: "refund", element: <Refund /> },
    { path: "*", element: <Error /> },
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
