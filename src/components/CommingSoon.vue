<template>
    <div id="app">
      <div class="coming-soon">
        <img src="@/assets/cicada.svg" alt="Coming Soon" class="coming-soon-image" />
        <div class="content">
          <h1>привет, друг!</h1>
          <p>скоро здесь что-то появится</p>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: "ComingSoon",
  };
  </script>
  
  <style scoped>
  .coming-soon {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100vh;
    width: 100%;
    overflow: hidden;
    background-color: #121212;
  }
  
  .coming-soon-image {
    position: absolute;
    top: 0;
    left: 50%;
    transform: translateX(-50%);
    height: 100vh;
    width: auto;
    max-width: 100%;
    object-fit: cover;
    z-index: 0;
  }
  
  .content {
    position: relative;
    z-index: 1;
    text-align: center;
    color: white;
    font-family: "Roboto", sans-serif;
    padding: 20px;
    opacity: 0.9;
    background: rgba(0, 0, 0, 0.6);
    border-radius: 12px;
  }
  
  h1 {
    font-size: 32px;
    font-weight: bold;
    margin-bottom: 16px;
    animation: fadeIn 1.5s ease-in-out;
  }
  
  p {
    font-size: 18px;
    animation: fadeIn 2s ease-in-out;
  }
  
  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateY(-10px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
  </style>
  