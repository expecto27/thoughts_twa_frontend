<template>
  <v-app id="app">
    <router-view />
    <Navbar />
  </v-app>
</template>

<script>
import Navbar from './components/Navbar';

export default {
  name: 'App',
  components: {
    Navbar,
  },
};
</script>

<style>
#app {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background-color: #000000;
  font-family: 'Roboto', sans-serif;
}
html, body {
  height: 100%;
  margin: 0;
  padding: 0;
  background-color: #000000;
}
.router-view {
  flex: 1; 
  padding-bottom: 56px;
}

.navbar {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 56px;
  background-color: rgba(0, 0, 0, 0.9); 
  backdrop-filter: blur(10px); 
  border-top: 1px solid rgba(255, 255, 255, 0.1); 
  display: flex;
  justify-content: space-around;
  align-items: center;
  z-index: 1000; 
}
</style>