<template>
  <q-page padding>
    <h1>Registracija</h1>
    <p>Ispunite polja za registraciju.</p>
    
    <q-input v-model="userData.username" label="Korisničko ime" />
    <q-input v-model="userData.email" label="Email" type="email" />
    <q-input v-model="userData.password" label="Lozinka" type="password" />
    <q-input v-model="userData.confirmPassword" label="Potvrdi lozinku" type="password" />
    
    <q-btn label="Potvrdi" @click="registerUser" color="primary" />
    
    <!-- Prikaz poruke zahvale ako je registracija uspješna -->
    <div v-if="registrationSuccess" class="text-positive text-h6 q-mt-md">
      Registracija uspjesna
    </div>
  </q-page>
</template>

<script>
export default {
  data() {
    return {
      userData: {
        username: '',
        email: '',
        password: '',
        confirmPassword: ''
      },
      registrationSuccess: false 
    };
  },
  methods: {
    registerUser() {
      if (this.userData.username && this.userData.email && this.userData.password && this.userData.password === this.userData.confirmPassword) {
        this.registrationSuccess = true;

        this.userData = {
          username: '',
          email: '',
          password: '',
          confirmPassword: ''
        };
      } else {
        alert("Provjerite unesene podatke.");
      }
    }
  }
};
</script>

