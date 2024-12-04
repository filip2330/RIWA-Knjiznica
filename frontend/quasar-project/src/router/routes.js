const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/IndexPage.vue') },
      { path: '/PopisKnjiga', component: () => {
        return import('pages/PopisKnjigaPage.vue')} },
      {path: '/Pretrazivanje', component: () => { return import('pages/PretrazivanjePage.vue')}},
      {path: '/Onama', component: () => { return import('src/pages/OnamaPage.vue')}},
      {path: '/Lokacija', component: () => { return import('pages/LokacijaPage.vue')}},
      {path: '/Login', component: () => { return import('pages/LoginPage.vue')}},
      {path: '/Registracija', component: () => { return import('pages/RegistracijaPage.vue')}}

    ]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue')
  }
]

export default routes
