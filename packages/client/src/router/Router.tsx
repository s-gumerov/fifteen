import React, { useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import { useAuth } from '../context';
import {
  MainPage,
  SignupPage,
  AuthPage,
  GameFieldPage,
  LeadersPage,
  ProfilePage,
  EditProfilePage,
  EditPasswordPage,
  ForumPage,
  ForumSubPage,
  RulesPage,
  NotFoundPage,
} from '../pages';
import { ROUTES } from './types';
import { MainLayout } from '../layouts';
import { PrivateRoute } from './PrivateRoute';
import { PublicRoute } from './PublicRoute';
import { getUserInfo, STORE_NAME } from '../api';

export const Router = () => {
  const authContext = useAuth();

  useEffect(() => {
    const checkAuthorization = async () => {
      const userInfo = await getUserInfo();
      if(userInfo) authContext?.setAuthorization(true);
    }
    checkAuthorization();
  },[]);

  return (
    <Routes>
      <Route element={<PublicRoute />}>
        <Route path={ROUTES.SIGNUP} element={<MainLayout><SignupPage /></MainLayout>} />
      </Route>
      <Route element={<PublicRoute />}>
        <Route path={ROUTES.AUTH} element={<MainLayout><AuthPage /></MainLayout>} />
      </Route>
      <Route element={<PrivateRoute />}>
        <Route path={ROUTES.MAIN} element={<MainLayout><MainPage /></MainLayout>} />
      </Route>
      <Route element={<PrivateRoute />}>
        <Route path={ROUTES.GAME_FIELD} element={<MainLayout backUrl={ROUTES.MAIN}><GameFieldPage /></MainLayout>} />
      </Route>
      <Route element={<PrivateRoute />}>
        <Route path={ROUTES.LEADERS} element={<MainLayout backUrl={ROUTES.MAIN}><LeadersPage/></MainLayout>}/>
      </Route>
      <Route element={<PrivateRoute />}>
        <Route path={ROUTES.PROFILE} element={<MainLayout  backUrl={ROUTES.MAIN}><ProfilePage /></MainLayout>} />
      </Route>
      <Route element={<PrivateRoute />}>
        <Route path={ROUTES.EDIT_PROFILE} element={<MainLayout backUrl={ROUTES.PROFILE}><EditProfilePage /></MainLayout>} />
      </Route>
      <Route element={<PrivateRoute />}>
        <Route path={ROUTES.EDIT_PASSWORD} element={<MainLayout backUrl={ROUTES.PROFILE}><EditPasswordPage /></MainLayout>} />
      </Route>
      <Route element={<PrivateRoute />}>
        <Route path={ROUTES.FORUM} element={<MainLayout backUrl={ROUTES.MAIN}><ForumPage /></MainLayout>} />
      </Route>
      <Route element={<PrivateRoute />}>
        <Route path={`${ROUTES.FORUM}/:id`} element={<MainLayout backUrl={ROUTES.FORUM}><ForumSubPage /></MainLayout>} />
      </Route>
      <Route element={<PrivateRoute />}>
        <Route path={ROUTES.RULES} element={<MainLayout backUrl={ROUTES.MAIN}><RulesPage /></MainLayout>} />
      </Route>
      <Route path='*' element={<MainLayout backUrl={ROUTES.MAIN}><NotFoundPage /></MainLayout>} />
    </Routes>
  )
}