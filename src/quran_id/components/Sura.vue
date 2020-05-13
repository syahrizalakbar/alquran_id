<template>
  <div>
    <h1>Sura</h1>
    <div v-show="loading">
      Loading...
    </div>
    <div v-if="errored">
      <p>{{ errored }}</p>
    </div>
    <div v-else>
      <div class="sura" v-for="s in sura.data">
        <h2>{{ s.asma }}</h2>
        <span>{{ s.sura }}</span>
        <span>{{ s.total_aya }}</span>
        <div class="tarjim">
          <div v-for="t in s.tarjim">
            <span>{{ t.name }}</span>
            <span>{{ t.tarjim }}</span>
          </div>
        </div>
        <router-link to="/sura/2">Read</router-link>
      </div>
    </div>
  </div>
</template>

 <script>
  import axios from 'axios'

  export default {
    data() {
      return {
        sura: null,
        errored: null,
        loading: true,
        endpoint: "http://localhost/quran_api/public/sura?lang=id"
      }
    },
    methods: {
      getAllSura() {
        axios.get(this.endpoint)
          .then(response => (this.sura = response.data))
          .catch(error => {
            console.log(error);
            this.errored = error;
          })
          .finally(() => this.loading = false)
      }
    },
    created() {
      this.getAllSura();
    }
  }
 </script>
