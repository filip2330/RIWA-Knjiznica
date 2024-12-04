<template>
  <q-page padding>
    <div class="login-container">
      <h2 class="text-center text-primary">Prijava</h2>
      <p class="text-center">Unesite podatke za prijavu.</p>

      <q-card class="q-pa-md">
        <q-card-section>
          <q-input
            v-model="username"
            label="Korisničko ime"
            filled
            dense
            class="q-mb-md"
          />
          <q-input
            v-model="password"
            label="Lozinka"
            type="password"
            filled
            dense
            class="q-mb-md"
          />
          <q-btn
            label="Prijava"
            color="blue"
            class="full-width"
            @click="loginUser"
          />
        </q-card-section>
      </q-card>
    </div>
  </q-page>
</template>

<script>
export default {
  data() {
    return {
      username: '',
      password: ''
    };
  },
  methods: {
    loginUser() {
      if (this.username && this.password) {
        console.log("Korisnicki podaci:", this.username, this.password);

        this.username = '';
        this.password = '';

        this.$router.push({ name: 'PopisKnjigaPage.vue' });
      } else {
        alert("Molimo unesite korisničke podatke.");
      }
    }
  }
};
</script>

<style scoped>
.login-container {
  max-width: 400px;
  margin: 0 auto;
  padding: 20px;
}

.text-center {
  text-align: center;
}

.full-width {
  width: 100%;
}
</style>
