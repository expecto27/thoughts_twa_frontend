<template>
    <div class="list-thoughts-container">
      <div class="thoughts-list">
        <div v-for="(thought, index) in thoughts" :key="index" class="thought-card">
          <p class="thought-text">{{ thought.text }}</p>
          <div class="thought-footer">
            <span class="status-badge" :class="statusClass(thought.status)">
              {{ statusText(thought.status) }}
            </span>
            <p class="thought-time">{{ thought.time }}</p>
          </div>
        </div>
      </div>
      <p v-if="!thoughts.length" class="empty-text">пока нет мыслей...</p>
    </div>
  </template>
  
  <script>
  import http from "../http.common.js";
  
  export default {
    name: "ListThoughts",
    data() {
      return {
        thoughts: [],
      };
    },
    methods: {
      fetchThoughts() {
        http.get("/myrequests/" + "expeoo")
          .then(response => {
            console.log(response);
            this.thoughts = response.data.map(thought => ({
              text: thought.message,
              time: new Date(thought.createdAt).toLocaleString([], {
                year: 'numeric',
                month: '2-digit',
                day: '2-digit',
                hour: '2-digit',
                minute: '2-digit',
              }),
              status: thought.status,
            }));
          })
          .catch(error => {
            console.error("Ошибка загрузки мыслей:", error);
          });
      },
      statusText(status) {
        switch (status) {
          case "review":
            return "на проверке";
          case "approve":
            return "одобрено";
          case "deny":
            return "отклонено";
          default:
            return "неизвестно";
        }
      },
      statusClass(status) {
        return {
          review: "status-review",
          approve: "status-approve",
          deny: "status-deny",
        }[status] || "status-unknown";
      },
    },
    mounted() {
      this.fetchThoughts();
    },
  };
  </script>
  
  <style scoped>
/* Основной контейнер */
.list-thoughts-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100vh;
  background-color: #000000; /* Черный фон */
  padding: 16px;
  overflow: hidden;
}

/* Заголовок */
.page-title {
  font-size: 24px;
  font-weight: bold;
  color: white;
  margin-bottom: 16px;
  text-align: center;
  font-family: "Roboto", sans-serif;
}

/* Контейнер для списка с учетом AppBar (56px) */
.thoughts-list {
  width: 100%;
  max-width: 600px;
  flex: 1;
  overflow-y: auto;
  padding-right: 8px;
  padding-bottom: 56px;
  display: flex;
  flex-direction: column;
  scrollbar-width: thin;
  scrollbar-color: rgba(255, 255, 255, 0.2) transparent;
  animation: fadeIn 1.5s ease-in-out;
}

/* Анимация появления */
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Скроллбар */
.thoughts-list::-webkit-scrollbar {
  width: 6px;
}

.thoughts-list::-webkit-scrollbar-thumb {
  background: rgba(255, 255, 255, 0.3);
  border-radius: 3px;
  transition: background 0.3s ease-in-out;
}

.thoughts-list::-webkit-scrollbar-thumb:hover {
  background: rgba(255, 255, 255, 0.6);
}

/* Карточка мысли */
.thought-card {
  background: #1a1a1a;
  padding: 16px;
  border-radius: 12px;
  color: white;
  font-family: "Roboto", sans-serif;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
  margin-bottom: 16px;
  transition: transform 0.2s ease-in-out, box-shadow 0.3s ease-in-out;
  display: flex;
  flex-direction: column;
  word-wrap: break-word;
  overflow-wrap: break-word;
  min-height: auto;
  border: none;
  opacity: 0;
  transform: translateY(10px);
  animation: fadeInUp 0.6s ease-in-out forwards;
}

/* Плавное появление карточек при скроллинге */
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Эффект при наведении */
.thought-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 4px 12px rgba(255, 255, 255, 0.1);
}

/* Текст мысли */
.thought-text {
  font-size: 18px;
  line-height: 1.6;
  margin-bottom: 12px;
  word-break: break-word;
  white-space: pre-wrap;
}

/* Контейнер для даты и статуса */
.thought-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 14px;
  color: rgba(255, 255, 255, 0.6);
}

/* Метки статуса */
.status-badge {
  padding: 4px 8px;
  border-radius: 8px;
  font-size: 12px;
  font-weight: bold;
}

/* Цвета статусов */
.status-review {
  background-color: rgba(255, 193, 7, 0.2);
  color: #ffc107;
}

.status-approve {
  background-color: rgba(76, 175, 80, 0.2);
  color: #4caf50;
}

.status-deny {
  background-color: rgba(244, 67, 54, 0.2);
  color: #f44336;
}

.empty-text {
  font-size: 16px;
  color: rgba(255, 255, 255, 0.5);
  text-align: center;
  font-family: "Roboto", sans-serif;
  margin-top: auto; /* Автоматический отступ сверху */
  margin-bottom: auto; /* Автоматический отступ снизу */
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
}
</style>
