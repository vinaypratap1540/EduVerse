import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import MainLayout from './layout/MainLayout.jsx';
import HeroSection from './pages/students/HeroSection.jsx';
import Login from './pages/Login.jsx';
import Courses from './pages/students/Courses.jsx';
import MyLearning from './pages/students/MyLearning.jsx';
import Profile from './pages/students/Profile.jsx';
import "./app.css"
import Sidebar from './pages/admin/Sidebar.jsx';
import Dashboard from './pages/admin/Dashboard.jsx';
import CourseTable from './pages/admin/course/CourseTable.jsx';
import AddCourse from './pages/admin/course/AddCourse.jsx';
import EditCourse from './pages/admin/course/EditCourse.jsx';
import CreateLecture from './pages/admin/lecture/CreateLecture.jsx';
import EditLecture from './pages/admin/lecture/EditLecture.jsx';
import CourseDetails from './pages/students/CourseDetails.jsx';
import CourseProgress from './pages/students/CourseProgress.jsx';
import SearchPage from './pages/students/SearchPage.jsx';
import { AdminRoute, AuthenticatedUser, ProtectedRoute } from './pages/admin/ProtectedRoutes.jsx';
import PurchaseCourseProtectedRoute from './pages/admin/PurchaseCourseProtectedRoute.jsx';

const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        path:"/", // Default route for "/"
        element: (
          <>
            <HeroSection />
            <Courses/>
          </>
        ),
      },
      {
        path: "/login",
        element:<AuthenticatedUser><Login /></AuthenticatedUser> ,
      },
      {
       path:"/my-learning",
       element:<ProtectedRoute><MyLearning/></ProtectedRoute>
      },
      {
       path:"/profile",
       element:<ProtectedRoute><Profile/></ProtectedRoute>
      },
      {
       path:"/course/search",
       element:<ProtectedRoute><SearchPage/></ProtectedRoute>
      },
      {
        path:"/course-detail/:courseId",
        element:<ProtectedRoute><CourseDetails/></ProtectedRoute>
      },
      {
        path:"/course-progress/:courseId",
        element:
        <ProtectedRoute>
          <PurchaseCourseProtectedRoute>
          <CourseProgress/>
          </PurchaseCourseProtectedRoute>
        </ProtectedRoute>
      },
      //admin route start
      {
        path:"/admin",
        element:<AdminRoute><Sidebar/></AdminRoute>,
        children:[
          {
            path:"dashboard",
            element:<Dashboard/>
          },
          {
            path:"course",
            element:<CourseTable/>
          },
          {
            path:"course/:courseId",
            element:<EditCourse/>
          },
          {
          path:"course/:courseId/lecture",
          element:<CreateLecture/>
          },
          {
            path:"course/:courseId/lecture/:lectureId",
            element:<EditLecture/>
          },
          {
           path:"course/create",
           element:<AddCourse/>
          },
        ]
      }
    ],
  },
]);

function App() {
  return (
    <div className="App">
      <RouterProvider router={appRouter} />
    </div>
  );
}

export default App;
