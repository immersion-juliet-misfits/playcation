import React, { lazy, Suspense, useState } from 'react';
import { Routes, Route } from 'react-router-dom';
const Homepage = lazy(() => import('./Homepage.jsx'));
const Planner = lazy(() => import('./planning/Planner.jsx'));
const Login = lazy(() => import('./Login.jsx'));
const CommunityPage = lazy(() => import('./community/CommunityPage.jsx'));
const Reviews = lazy(() => import('./reviews/Reviews.jsx'));
const Profile = lazy(() => import('./Profile.jsx'));
const LinkBar = lazy(() => import('./LinkBar.jsx'));

const App = () => {
  const [user, setUser] = useState({});

  const add = (data) => {
    setUser(data);
  };
  return (
    <>
      {/* Replace LinkBar with empty div on login */}
      {location.pathname === '/' ? (
        <div>Welcome to Playcation</div>
      ) : (
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <LinkBar />
        </div>
      )}
      <Routes>
        <Route
          path='/home'
          element={
            <Suspense fallback={'Loading...'}>
              <Homepage add={add} />
            </Suspense>
          }
        />
        <Route
          path='/'
          element={
            <Suspense fallback={'Loading...'}>
              <Login />
            </Suspense>
          }
        />
        <Route
          path='/planner'
          element={
            <Suspense fallback={'Loading...'}>
              <Planner user={user} />
            </Suspense>
          }
        />
        <Route
          path='/community'
          element={
            <Suspense fallback={'Loading...'}>
              <CommunityPage user={user} />
            </Suspense>
          }
        />
        <Route
          path='/reviews'
          element={
            <Suspense fallback={'Loading...'}>
              <Reviews user={user} />
            </Suspense>
          }
        />
        {/* <Route path="/watchout" element={<Watchout />} /> */}
        <Route
          path='/profile'
          element={
            <Suspense fallback={'Loading...'}>
              <Profile user={user} />
            </Suspense>
          }
        />
        <Route path='/*' element={<h1>Page Not Found</h1>} />
      </Routes>
    </>
  );
};

export default App;
