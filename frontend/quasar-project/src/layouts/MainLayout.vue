<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="toggleLeftDrawer"
        />

        <q-toolbar-title class="text-h2">
          Knjiznica
        </q-toolbar-title>

        <div>Quasar v{{ $q.version }}</div>
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      bordered
    >
      <q-list>
        <q-item-label
          header
        >
          Essential Links
        </q-item-label>

        <EssentialLink
          v-for="link in linksList"
          :key="link.title"
          v-bind="link"
        />
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup>
import { ref } from 'vue'
import EssentialLink from 'components/EssentialLink.vue'

defineOptions({
  name: 'MainLayout'
})

const linksList = [
  {
    title: 'Naslovnica',
    caption: 'Pocetna stranica',
    icon: 'home',
    link: '#/'
  },
  {
    title: 'Popis knjiga',
    caption: 'Popis knjiga u knjiznici',
    icon: 'book',
    link: '#/popisKnjiga'
  },
  {
    title: 'Pretrazivanje ',
    caption: 'Pretrazivanje knjiga',
    icon: 'search',
    link: '#/Pretrazivanje'
  },
  {
    title: 'O nama',
    caption: 'o nama',
    icon: 'record_voice_over',
    link: '#/Onama'
  },
  {
    title: 'Lokacija',
    caption: 'Lokacija knjiznice',
    icon: 'map',
    link: '#/Lokacija'
  },
  {
    title: 'Login',
    caption: 'Prijava',
    icon: 'login',
    link: '#/Login'
  },
  {
    title: 'Registracija',
    caption: 'Registracija',
    icon: 'app_registration',
    link: '#/Registracija'
  }
]

const leftDrawerOpen = ref(false)

function toggleLeftDrawer () {
  leftDrawerOpen.value = !leftDrawerOpen.value
}
</script>
