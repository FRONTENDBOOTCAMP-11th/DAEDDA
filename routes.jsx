import MyPage from "@pages/myPage/MyPage";
import Edit from "@pages/myPage/Edit";
import Likes from "@pages/myPage/Likes";
import PRDetail from "@pages/pr/PRDetail";
import PREdit from "@pages/pr/PREdit";
import PRWrite from "@pages/pr/PRWrite";
import SignIn from "@pages/user/SignIn";
import SignUp from "@pages/user/SignUp";
import Terms from "@pages/user/Terms";
import { createBrowserRouter, Navigate } from "react-router-dom";
import MyReviews from "@pages/myPage/MyReviews";
import Layout from "@components/layout";
import MainDetail from "@pages/main/MainDetail";
import MainList from "@pages/main/MainList";
import MainWrite from "@pages/main/MainWrite";
import MainEdit from "@pages/main/MainEdit";
import ReviewList from "@pages/history/ReviewList";
import ReviewWrite from "@pages/history/ReviewWrite";
import Profile from "@pages/user/Profile";
import Error from "@pages/Error";
import Worked from "@pages/history/Worked";
import Employed from "@pages/history/Employed";

const router = createBrowserRouter(
  [
    {
      path: "/",
      element: <Layout />,
      children: [
        { index: true, element: <MainList /> },

        { path: "main/write", element: <MainWrite /> },
        { path: "main/:_id", element: <MainDetail /> },
        { path: "main/:_id/edit", element: <MainEdit /> },

        {
          path: "history",
          element: <ReviewList />,
          children: [
            {
              index: true,
              element: <Navigate to="worked" replace />,
            },
            { path: "worked", element: <Worked /> },
            { path: "hired", element: <Employed /> },
          ],
        },
        { path: "history/:_id/write", element: <ReviewWrite /> },

        { path: "pr/write", element: <PRWrite /> },
        { path: "pr/:_id", element: <PRDetail /> },
        { path: "pr/:_id/edit", element: <PREdit /> },

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
