<script setup>
import { defineProps } from 'vue'
import { defineEmits } from 'vue'

const props = defineProps({
  testObj: {
    type: Object,
    required: false
  }
})

const emit = defineEmits(['messageSent'])
// sendMessage 사용 시 자식에서 emit으로 요청해서 카드로 추가됨
// const sendMessage = () => {
//   emit('messageSent', props.testObj.id)
//   //props.testObj.id
// }
</script>

<template>
  <div :id="`${testObj.id}`">
    <img :id="`${testObj.id}`" :src="testObj.image" :alt="testObj.name" @click="sendMessage" />
    <h2 :id="`${testObj.id}`">{{ testObj.id }}.{{ testObj.name }}</h2>
  </div>
</template>

<!-- 
<style scoped>
h1 {
  font-weight: 500;
  font-size: 2.6rem;
  position: relative;
  top: -10px;
}

h3 {
  font-size: 1.2rem;
}

.greetings h1,
.greetings h3 {
  text-align: center;
}

@media (min-width: 1024px) {
  .greetings h1,
  .greetings h3 {
    text-align: left;
  }
}
</style> -->
