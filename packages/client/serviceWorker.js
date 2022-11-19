const CACHE_NAME = 'cache-v1'

const URLS = [
  '/src/Controllers/CanvasController.tsx',
  '/src/App.tsx',
  '/src/Controllers/types.ts',
  '/src/api/auth/Leaderbord.ts',
  '/src/api/auth/index.ts',
  '/src/api/auth/types.ts',
  '/src/api/axios.ts',
  '/src/api/const.ts',
  '/src/api/index.ts',
  '/src/assets/.keep',
  '/src/assets/backArrow.svg',
  '/src/assets/bgPuzzle.svg',
  '/src/assets/colors.scss',
  '/src/assets/icons/comment.svg',
  '/src/assets/mixin.scss',
  '/src/assets/styles.scss',
  '/src/client.d.ts',
  '/src/components/ui/Logo/Logo.tsx',
  '/src/components/ui/Logo/index.ts',
  '/src/components/ui/Logo/styles.scss',
  '/src/components/ui/Logo/types.ts',
  '/src/components/ui/TextFieldAuth/TextFieldAuth.tsx',
  '/src/components/ui/TextFieldAuth/const.ts',
  '/src/components/ui/TextFieldAuth/index.ts',
  '/src/components/ui/TextFieldMultiline/TextFieldMultiline.tsx',
  '/src/components/ui/TextFieldMultiline/const.ts',
  '/src/components/ui/TextFieldMultiline/index.ts',
  '/src/components/ui/TextFieldMultiline/types.ts',
  '/src/components/ui/TextFieldProfile/TextFieldProfile.tsx',
  '/src/components/ui/TextFieldProfile/const.ts',
  '/src/components/ui/TextFieldProfile/index.ts',
  '/src/components/ui/Triangles/Triangles.tsx',
  '/src/components/ui/Triangles/index.ts',
  '/src/components/ui/Triangles/styles.scss',
  '/src/components/ui/index.ts',
  '/src/const.ts',
  '/src/context/AuthProvider.tsx',
  '/src/context/index.ts',
  '/src/context/types.ts',
  '/src/hooks/useTimer.tsx',
  '/src/layouts/MainLayout/MainLayout.tsx',
  '/src/layouts/MainLayout/index.ts',
  '/src/layouts/MainLayout/styles.scss',
  '/src/layouts/MainLayout/types.ts',
  '/src/layouts/index.ts',
  '/src/main.tsx',
  '/src/pages/AuthPage/AuthPage.tsx',
  '/src/pages/AuthPage/index.ts',
  '/src/pages/AuthPage/validation-schema.ts',
  '/src/pages/EditPasswordPage/EditPasswordPage.tsx',
  '/src/pages/EditPasswordPage/index.ts',
  '/src/pages/EditPasswordPage/validation-schema.ts',
  '/src/pages/EditProfilePage/EditProfilePage.tsx',
  '/src/pages/EditProfilePage/index.ts',
  '/src/pages/EditProfilePage/validation-schema.ts',
  '/src/pages/ForumPage/ForumPage.tsx',
  '/src/pages/ForumPage/ForumSubPage.tsx',
  '/src/pages/ForumPage/components/AddTopicForm/AddTopicForm.tsx',
  '/src/pages/ForumPage/components/AddTopicForm/styles.module.scss',
  '/src/pages/ForumPage/components/AddTopicForm/types.ts',
  '/src/pages/ForumPage/components/Comment/Comment.tsx',
  '/src/pages/ForumPage/components/Comment/styles.module.scss',
  '/src/pages/ForumPage/components/Comment/types.ts',
  '/src/pages/ForumPage/components/Topic/Topic.tsx',
  '/src/pages/ForumPage/components/Topic/styles.module.scss',
  '/src/pages/ForumPage/components/Topic/types.ts',
  '/src/pages/ForumPage/index.ts',
  '/src/pages/ForumPage/styles.module.scss',
  '/src/pages/GameFieldPage/GameFieldPage.tsx',
  '/src/pages/GameFieldPage/index.ts',
  '/src/pages/GameFieldPage/style.scss',
  '/src/pages/LeadersPage/LeadersPage.tsx',
  '/src/pages/LeadersPage/index.ts',
  '/src/pages/LeadersPage/styles.scss',
  '/src/pages/MainPage/MainPage.tsx',
  '/src/pages/MainPage/index.ts',
  '/src/pages/MainPage/styles.scss',
  '/src/pages/NotFoundPage/NotFoundPage.tsx',
  '/src/pages/NotFoundPage/index.ts',
  '/src/pages/NotFoundPage/styles.module.scss',
  '/src/pages/ProfilePage/ProfilePage.tsx',
  '/src/pages/ProfilePage/index.ts',
  '/src/pages/ProfilePage/styles.scss',
  '/src/pages/RulesPage/RulesPage.tsx',
  '/src/pages/RulesPage/index.ts',
  '/src/pages/RulesPage/style.scss',
  '/src/pages/SignupPage/SignupPage.tsx',
  '/src/pages/SignupPage/index.ts',
  '/src/pages/SignupPage/styles.scss',
  '/src/pages/SignupPage/validation-schema.ts',
  '/src/pages/index.ts',
  '/src/router/PrivateRoute.tsx',
  '/src/router/PublicRoute.tsx',
  '/src/router/Router.tsx',
  '/src/router/types.ts',
  '/src/services/errorBoundary/ErrorFallback.tsx',
  '/src/services/errorBoundary/styles.module.scss',
  '/src/services/errorBoundary/types.ts',
  '/src/styles.scss',
]

this.addEventListener('install', event => {
  event.waitUntil(
    caches
      .open(CACHE_NAME)
      .then(cache => {
        console.log('Opened cache')
        return cache.addAll(URLS)
      })
      .catch(err => {
        console.log(err)
        throw err
      })
  )
})

this.addEventListener('activate', async () => {
  console.log('activate')
  const cacheNames = await caches.keys()
  await Promise.all(
    cacheNames
      .filter(name => name !== CACHE_NAME)
      .map(name => caches.delete(name))
  )
})

this.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      if (response) {
        return response
      }
      const fetchRequest = event.request.clone()
      return fetch(fetchRequest).then(response => {
        if (!response || response.status !== 200 || response.type !== 'basic') {
          return response
        }
        const responseToCache = response.clone()
        caches.open(CACHE_NAME).then(cache => {
          cache.put(event.request, responseToCache)
        })
        return response
      })
    })
  )
})
