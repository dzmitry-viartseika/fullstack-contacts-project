<template>
  <div id="app">
    <div id="nav">
      <router-link to="/about">About</router-link>
      <Home :contacts="contacts"
            :isLoader="isLoader"
      />
    </div>
    <router-view/>
  </div>
</template>

<script>
import Home from './views/Home.vue';
import contactApi from './api/contactApi';

export default {
  name: 'App',
  components: {
    Home,
  },
  data() {
    return {
      contacts: [],
      isLoader: false,
    };
  },
  beforeMount() {
    console.log('test', this.test);
    this.isLoader = true;
    contactApi.getAllContacts()
      .then((response) => {
        console.log('response', response.data);
        this.contacts = response.data;
        this.isLoader = false;
      })
      .catch((err) => {
        console.error(err);
      });
  },
};
</script>

<style lang="scss">
  @import "https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css";
  @import "src/assets/scss/core";

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
