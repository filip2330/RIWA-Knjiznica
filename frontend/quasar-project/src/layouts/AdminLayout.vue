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

        <q-toolbar-title class="text-h4">
          Knjižnica <span class="highlight">(admin)</span></q-toolbar-title
        >

        <div>Quasar v{{ $q.version }}</div>
      </q-toolbar>
    </q-header>

    <q-drawer v-model="leftDrawerOpen" show-if-above bordered>
      <q-list>
        <q-item-label header class="stil"> Meni </q-item-label>

        <EssentialLink
          class="meni"
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
import { computed, ref } from "vue";
import EssentialLink from "components/EssentialLink.vue";

defineOptions({
  name: "AdminLayout",
});

let title = computed(() => {
  return "Knjižnica (admin)";
});
const linksList = [
  {
    title: "Popis svih knjiga",
    caption: "Popis svih knjiga",
    icon: "list",
    link: "#/admin/popis_knjiga",
  },
  {
    title: "Pretraživanje",
    caption: "Pretraživanje knjiga",
    icon: "search",
    link: "#/admin/pretrazivanje",
  },
  {
    title: "Popis korisnika",
    caption: "Popis svih korisnika",
    icon: "group",
    link: "#/admin/popis_korisnika",
  },
  {
    title: "Unos knjiga",
    caption: "Unos željenih knjiga",
    icon: "add",
    link: "#/admin/unos_knjiga",
  },
  {
    title: "Logout",
    caption: "Odjavi se",
    icon: "logout",
    link: "#/admin/logout",
  },
];

const leftDrawerOpen = ref(false);

function toggleLeftDrawer() {
  leftDrawerOpen.value = !leftDrawerOpen.value;
}
</script>

<style>
.text-h4 {
  font-weight: bold;
}
.meni {
  margin-left: 15px;
  user-select: none;
}
.stil {
  margin-left: 20px;
  font-size: 15px;
  font-weight: bold;
}
.highlight {
  font-weight: 400;
  font-size: large;
}
.stil {
  user-select: none;
}
</style>
