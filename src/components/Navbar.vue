<template>
    <div class="navbar">
      <router-link
        to="/listThoughts"
        class="navbar-item"
        :class="{ active: activeTab === 'thoughts' }"
      >
        <v-icon class="navbar-icon">mdi-lightbulb-on-outline</v-icon>
        <span class="navbar-text">мои мысли</span>
      </router-link>
      <router-link
        to="/addThoughts"
        class="navbar-item"
        :class="{ active: activeTab === 'add' }"
      >
        <v-icon class="navbar-icon">mdi-message-text-outline</v-icon>
        <span class="navbar-text">предложка</span>
      </router-link>
      <router-link
        to="/soon"
        class="navbar-item"
        :class="{ active: activeTab === 'soon' }"
      >
        <v-icon class="navbar-icon">mdi-clock-outline</v-icon>
        <span class="navbar-text">скоро</span>
      </router-link>
    </div>
  </template>
  
  <script>
  export default {
    name: 'NavBar',
    data() {
      return {
        activeTab: this.$route.name,
      };
    },
    watch: {
      $route(to) {
        this.activeTab = to.name;
      },
    },
  };
  </script>
  
  <style scoped>
  .navbar {
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 64px;
    background: rgba(0, 0, 0, 0.9);
    backdrop-filter: blur(10px);
    border-top: 1px solid rgba(255, 255, 255, 0.1);
    display: flex;
    justify-content: space-around;
    align-items: center;
    z-index: 1000;
  }
  
  .navbar-item {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    color: rgba(255, 255, 255, 0.6);
    cursor: pointer;
    transition: color 0.3s ease, transform 0.3s ease;
    padding: 8px 12px;
    border-radius: 8px;
    text-decoration: none;
  }
  
  .navbar-item.active {
    color: #ff416c;
    transform: scale(1.1);
  }
  
  .navbar-item:hover {
    color: #ff416c;
  }
  
  .navbar-icon {
    font-size: 24px;
    margin-bottom: 4px;
  }
  
  .navbar-text {
    font-size: 12px;
    font-weight: 500;
  }
  
  @media (max-width: 480px) {
    .navbar {
      height: 56px;
    }
  
    .navbar-icon {
      font-size: 20px;
    }
  
    .navbar-text {
      font-size: 10px;
    }
  }
  </style>