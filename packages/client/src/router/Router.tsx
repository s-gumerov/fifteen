import React from 'react'
import { Route, Routes } from 'react-router-dom'
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
} from '../pages'
import { ROUTES } from './types'
import { MainLayout } from '../layouts'

export const Router = () => (
    <Routes>
      <Route path={ROUTES.MAIN} element={<MainPage />} />
      <Route path={ROUTES.SIGNUP} element={<MainLayout><SignupPage /></MainLayout>} />
      <Route path={ROUTES.AUTH} element={<MainLayout><AuthPage /></MainLayout>} />
      <Route path={ROUTES.GAME_FIELD} element={<GameFieldPage />} />
      <Route path={ROUTES.LEADERS} element={<LeadersPage />} />
      <Route path={ROUTES.PROFILE} element={<MainLayout><ProfilePage /></MainLayout>} />
      <Route path={ROUTES.EDIT_PROFILE} element={<EditProfilePage />} />
      <Route path={ROUTES.EDIT_PASSWORD} element={<EditPasswordPage />} />
      <Route path={ROUTES.FORUM} element={<ForumPage />} />
      <Route path={`${ROUTES.FORUM}/:id`} element={<ForumSubPage />} />
      <Route path={ROUTES.RULES} element={<RulesPage />} />
      <Route path='*' element={<NotFoundPage />} />
    </Routes>
  )