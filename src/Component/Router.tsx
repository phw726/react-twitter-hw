import HomePage from 'Pages/Home';
import { Navigate, Route, Routes } from 'react-router-dom';
import PostListPage from 'Pages/Posts';
import PostDetailPage from 'Pages/Posts/detail';
import PostNew from 'Pages/Posts/new';
import PostEdit from 'Pages/Posts/edit';
import ProfilePage from 'Pages/profile';
import ProfileEdit from 'Pages/profile/edit';
import SearchPage from 'Pages/search';
import NotificationsPage from 'Pages/notification';
import LoginPage from 'Pages/users/login';
import SignupPage from 'Pages/users/signup';

interface RouterProps {
  isAuthenticated: boolean;
}

export default function Router({ isAuthenticated }: RouterProps) {
  return (
    <Routes>
      {isAuthenticated ? (
        <>
          <Route path="/" element={<HomePage />} />
          <Route path="/posts" element={<PostListPage />} />
          <Route path="/posts/:id" element={<PostDetailPage />} />
          <Route path="/posts/new" element={<PostNew />} />
          <Route path="/posts/edit/:id" element={<PostEdit />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/profile/edit" element={<ProfileEdit />} />
          <Route path="/notifications" element={<NotificationsPage />} />
          <Route path="/search" element={<SearchPage />} />
          <Route path="*" element={<Navigate replace to={'/'} />} />
        </>
      ) : (
        <>
          <Route path="/user/login" element={<LoginPage />} />
          <Route path="/user/signup" element={<SignupPage />} />
          <Route path="*" element={<Navigate replace to={'/user/login'} />} />
        </>
      )}
    </Routes>
  );
}
