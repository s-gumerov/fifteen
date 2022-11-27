import React, { useEffect } from 'react'
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
import { useAppDispatch } from '../hooks/useAppDispatch'
import gameAudio from '../assets/audio/pirates_of_the_caribbean.mp3'
import { withPlayingAudio } from '../hocs/playAudioToPage/PlayAudioToPage'
import { authorizeWithYaOAuth } from '../api/OAuth'
import { getLocationOrigin } from "../utils";

export const Router = () => {
  const dispatch = useAppDispatch()
  /* оборачиваем страницу с игрой в HOC, чтобы при каждом её открытии циклически воспроизводилось аудио */
  const GameFieldPageWithAudio = withPlayingAudio(GameFieldPage, gameAudio)

  useEffect(() => {
    const OAuthParams = new URLSearchParams(location.search)
    const code = OAuthParams.get('code')?.toString()
    const yandexOAuth = async (code: string) => {
      const redirect_uri = getLocationOrigin()
      const res = await authorizeWithYaOAuth({ code, redirect_uri })
    }
    if(code) yandexOAuth(code)
  }, [])

  return (
    <Routes>
      <Route
        path={ROUTES.SIGNUP}
        element={
          <MainLayout>
            <SignupPage />
          </MainLayout>
        }
      />
      <Route
        path={ROUTES.AUTH}
        element={
          <MainLayout>
            <AuthPage />
          </MainLayout>
        }
      />
      <Route
        path={ROUTES.MAIN}
        element={
          <MainLayout>
            <MainPage />
          </MainLayout>
        }
      />
      <Route
        path={ROUTES.GAME_FIELD}
        element={
          <MainLayout backUrl={ROUTES.MAIN}>
            <GameFieldPageWithAudio />
          </MainLayout>
        }
      />
      <Route
        path={ROUTES.LEADERS}
        element={
          <MainLayout backUrl={ROUTES.MAIN}>
            <LeadersPage />
          </MainLayout>
        }
      />
      <Route
        path={ROUTES.PROFILE}
        element={
          <MainLayout backUrl={ROUTES.MAIN}>
            <ProfilePage />
          </MainLayout>
        }
      />
      <Route
        path={ROUTES.EDIT_PROFILE}
        element={
          <MainLayout backUrl={ROUTES.PROFILE}>
            <EditProfilePage />
          </MainLayout>
        }
      />
      <Route
        path={ROUTES.EDIT_PASSWORD}
        element={
          <MainLayout backUrl={ROUTES.PROFILE}>
            <EditPasswordPage />
          </MainLayout>
        }
      />
      <Route
        path={ROUTES.FORUM}
        element={
          <MainLayout backUrl={ROUTES.MAIN}>
            <ForumPage />
          </MainLayout>
        }
      />
      <Route
        path={`${ROUTES.FORUM}/:id`}
        element={
          <MainLayout backUrl={ROUTES.FORUM}>
            <ForumSubPage />
          </MainLayout>
        }
      />
      <Route
        path={ROUTES.RULES}
        element={
          <MainLayout backUrl={ROUTES.MAIN}>
            <RulesPage />
          </MainLayout>
        }
      />
      <Route
        path="*"
        element={
          <MainLayout backUrl={ROUTES.MAIN}>
            <NotFoundPage />
          </MainLayout>
        }
      />
    </Routes>
  )
}
