import React, {useEffect} from 'react'
import {Route, Routes} from 'react-router-dom'
import {useAuth} from '../context'
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
import {ROUTES} from './types'
import {MainLayout} from '../layouts'
import {PrivateRoute} from './PrivateRoute'
import {PublicRoute} from './PublicRoute'
import {useAppDispatch, useAppSelector} from '../hooks/useAppDispatch'
import {addUserToDB, getUserInfoByThunk} from '../store/user/userSlice'
import {userReducerTypes} from '../store/user/types'
import gameAudio from '../assets/audio/pirates_of_the_caribbean.mp3'
import {withPlayingAudio} from '../hocs/playAudioToPage/PlayAudioToPage'
import {getLeaderboardByThunk} from '../store/leaderboard/leaderboardSlice'
import {leaderboardDefaultQuery} from '../const'
import {getRedirectURI} from '../utils/getRedirectURI'
import {authorizeWithYaOAuth} from '../api/OAuth'
import {TUserInfo} from '../api'
import {getTopicsWithThreads, getTopicThreads} from "../store/forum/forumSlice";

export const Router = () => {
  const {user} = useAppSelector(state => state.user)
  const {forum} = useAppSelector(state => state.forum)
  const authContext = useAuth()
  const dispatch = useAppDispatch()
  /* оборачиваем страницу с игрой в HOC, чтобы при каждом её открытии циклически воспроизводилось аудио */
  const GameFieldPageWithAudio = withPlayingAudio(GameFieldPage, gameAudio)

  useEffect(() => {
    const OAuthParams = new URLSearchParams(location.search)
    const code = OAuthParams.get('code')?.toString()
    const yandexOAuth = async (code: string) => {
      const redirect_uri = getRedirectURI()
      const res = await authorizeWithYaOAuth({code, redirect_uri})
      if (res === 'OK') {
        return setTimeout(() => {
          checkAuthorization()
        }, 1000)
      }
    }
    const checkAuthorization = async () => {
      const userInfo = await dispatch(getUserInfoByThunk())
      dispatch(getLeaderboardByThunk(leaderboardDefaultQuery))
      if (userInfo.type !== `${userReducerTypes.getUserInfo}/rejected`)
        authContext?.setAuthorization(true)
      else authContext?.setAuthorization(false)
    }

    code ? yandexOAuth(code) : checkAuthorization()
    dispatch(getTopicsWithThreads({quantity: 100, start: 0}))
    const data = {"topic": 1, "quantity": 100, "start": 0}
    console.log(data)
    const threads = getTopicThreads(JSON.stringify(data))
    console.log(threads)
  }, [])

  useEffect(() => {
    if (user) {
      const {id, login, avatar} = user as TUserInfo
      console.log(id, login, avatar)
      addUserToDB({id: id!, login: login, avatarUrl: avatar!})
    }
    console.log(forum)
  }, [user])

  return (
    <Routes>
      <Route element={<PublicRoute/>}>
        <Route
          path={ROUTES.SIGNUP}
          element={
            <MainLayout>
              <SignupPage/>
            </MainLayout>
          }
        />
      </Route>
      <Route element={<PublicRoute/>}>
        <Route
          path={ROUTES.AUTH}
          element={
            <MainLayout>
              <AuthPage/>
            </MainLayout>
          }
        />
      </Route>
      <Route element={<PrivateRoute/>}>
        <Route
          path={ROUTES.MAIN}
          element={
            <MainLayout>
              <MainPage/>
            </MainLayout>
          }
        />
      </Route>
      <Route element={<PrivateRoute/>}>
        <Route
          path={ROUTES.GAME_FIELD}
          element={
            <MainLayout backUrl={ROUTES.MAIN}>
              <GameFieldPageWithAudio/>
            </MainLayout>
          }
        />
      </Route>
      <Route element={<PrivateRoute/>}>
        <Route
          path={ROUTES.LEADERS}
          element={
            <MainLayout backUrl={ROUTES.MAIN}>
              <LeadersPage/>
            </MainLayout>
          }
        />
      </Route>
      <Route element={<PrivateRoute/>}>
        <Route
          path={ROUTES.PROFILE}
          element={
            <MainLayout backUrl={ROUTES.MAIN}>
              <ProfilePage/>
            </MainLayout>
          }
        />
      </Route>
      <Route element={<PrivateRoute/>}>
        <Route
          path={ROUTES.EDIT_PROFILE}
          element={
            <MainLayout backUrl={ROUTES.PROFILE}>
              <EditProfilePage/>
            </MainLayout>
          }
        />
      </Route>
      <Route element={<PrivateRoute/>}>
        <Route
          path={ROUTES.EDIT_PASSWORD}
          element={
            <MainLayout backUrl={ROUTES.PROFILE}>
              <EditPasswordPage/>
            </MainLayout>
          }
        />
      </Route>
      <Route element={<PrivateRoute/>}>
        <Route
          path={ROUTES.FORUM}
          element={
            <MainLayout backUrl={ROUTES.MAIN}>
              <ForumPage/>
            </MainLayout>
          }
        />
      </Route>
      <Route element={<PrivateRoute/>}>
        <Route
          path={`${ROUTES.FORUM}/:id`}
          element={
            <MainLayout backUrl={ROUTES.FORUM}>
              <ForumSubPage/>
            </MainLayout>
          }
        />
      </Route>
      <Route element={<PrivateRoute/>}>
        <Route
          path={ROUTES.RULES}
          element={
            <MainLayout backUrl={ROUTES.MAIN}>
              <RulesPage/>
            </MainLayout>
          }
        />
      </Route>
      <Route
        path="*"
        element={
          <MainLayout backUrl={ROUTES.MAIN}>
            <NotFoundPage/>
          </MainLayout>
        }
      />
    </Routes>
  )
}
