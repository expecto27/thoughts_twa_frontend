<template>
  <div class="add-thought-container">
    <p class="page-title animated-text">мысль в {{ currentTime }}</p>
    <div class="input-wrapper">
      <textarea
        v-model="thought"
        class="thought-input"
        placeholder="Напишите свою мысль..."
        rows="3"
      ></textarea>
      <button class="send-button" @click="submitThought" :disabled="isSending">
        <span class="button-text" :class="{ 'button-text-hidden': isSending }">Отправить</span>
        <v-icon class="button-icon" :class="{ 'button-icon-sending': isSending }">mdi-send</v-icon>
      </button>
    </div>

    <v-dialog v-model="dialog" max-width="400" persistent>
      <v-card class="dark-dialog animated-dialog">
        <v-card-title class="dialog-title">Спасибо!</v-card-title>
        <v-card-text class="dialog-text">
          благодарим тебя за твою мысль, она будет рассмотрена в ближайшее время
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="#ff416c" text @click="dialog = false">хорошо</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-dialog v-model="error" max-width="400" persistent>
      <v-card class="dark-dialog animated-dialog">
        <v-card-title class="dialog-title">ой</v-card-title>
        <v-card-text class="dialog-text">
          предлагай мысли, а не воздух
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="#ff416c" text @click="error = false">ладно</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-dialog v-model="limitError" max-width="400" persistent>
      <v-card class="dark-dialog animated-dialog">
        <v-card-title class="dialog-title">ой</v-card-title>
        <v-card-text class="dialog-text">
          ты превысил лимит мыслей за сегодня
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="#ff416c" text @click="limitError = false">ладно</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

  </div>
</template>

<script>
import http from "../http.common.js";
export default {
  name: 'AddThought',
  data() {
    return {
      thought: '',
      currentTime: this.getFormattedTime(),
      dialog: false,
      error: false,
      isSending: false, 
      limitError: false,
    };
  },
  methods: {
    submitThought() {
      if (this.thought) {
        this.isSending = true; 
        var data = {
          thought: this.thought,
          telegramId: "expeoo"
        }
        http.post('/addrequest', data)
            .then((response) => {if(response) this.dialog = true;})
            .catch((error) => {
              if(error.response && error.response.status == 400){
                this.limitError = true;
              }
            });
        setTimeout(() => {
          this.isSending = false;
          
          this.thought = '';
        }, 1000); 
      } else {
        this.error = true;
      }
    },
    getFormattedTime() {
      const now = new Date();
      const hours = now.getHours().toString().padStart(2, '0');
      const minutes = now.getMinutes().toString().padStart(2, '0');
      return `${hours}:${minutes}`;
    },
    updateTime() {
      this.currentTime = this.getFormattedTime();
    },
  },
  mounted() {
    this.timer = setInterval(this.updateTime, 1000);
  },
  beforeUnmount() {
    clearInterval(this.timer);
  },
};
</script>

<style scoped>
.add-thought-container {
  padding: 16px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: calc(100vh - 64px);
  background-color: #000000;
}

.page-title {
  font-family: 'Roboto', sans-serif;
  font-size: 24px;
  font-weight: 500;
  color: rgba(255, 255, 255, 0.9);
  margin-bottom: 24px;
  text-align: center;
}

.animated-text {
  animation: fadeIn 2s ease-in-out;
}

.input-wrapper {
  width: 100%;
  max-width: 400px;
}

.thought-input {
  width: 100%;
  background: transparent;
  border: none;
  border-bottom: 2px solid rgba(255, 255, 255, 0.2);
  color: #ffffff;
  font-size: 16px;
  resize: none;
  outline: none;
  padding: 12px 0;
  margin-bottom: 24px;
  transition: border-color 0.3s ease;
  font-family: 'Roboto', sans-serif;
}

.thought-input:focus {
  border-bottom-color: #ff416c;
}

.thought-input::placeholder {
  color: rgba(255, 255, 255, 0.5);
  font-family: 'Roboto', sans-serif;
}

.send-button {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  background: transparent;
  border: 2px solid rgba(255, 255, 255, 0.2);
  border-radius: 12px;
  padding: 12px 20px;
  color: #ffffff;
  font-size: 16px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
  font-family: 'Roboto', sans-serif;
  position: relative;
  overflow: hidden;
}

.send-button:disabled {
  cursor: not-allowed;
  opacity: 0.7;
}

.button-text {
  transition: opacity 0.3s ease, transform 0.3s ease;
}

.button-text-hidden {
  opacity: 0;
  transform: translateX(-20px);
}

.button-icon {
  margin-left: 8px;
  font-size: 20px;
  transition: transform 0.3s ease, opacity 0.3s ease;
}

.button-icon-sending {
  transform: translateX(100px);
  opacity: 0;
}

/* Стили для тёмного диалогового окна */
.dark-dialog {
  background-color: #121212;
  color: #ffffff;
}

.dialog-title {
  font-family: 'Roboto', sans-serif;
  font-size: 20px;
  font-weight: 500;
  color: #ffffff;
  text-align: center;
  padding: 16px;
}

.dialog-text {
  font-family: 'Roboto', sans-serif;
  font-size: 16px;
  color: rgba(255, 255, 255, 0.8);
  text-align: center;
  padding: 0 16px 16px;
}

/* Анимации */
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

.animated-dialog {
  animation: slideIn 0.5s ease-in-out;
}

@keyframes slideIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Адаптация для мобильных устройств */
@media (max-width: 480px) {
  .add-thought-container {
    padding: 12px;
  }

  .page-title {
    font-size: 20px;
  }

  .thought-input {
    font-size: 14px;
  }

  .send-button {
    padding: 10px 16px;
    font-size: 14px;
  }
}
</style>