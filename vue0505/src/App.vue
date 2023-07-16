<script setup lang="ts">
import HelloWorld from './components/HelloWorld.vue'

const downloadLog = (url: string) => {
  const link = document.createElement('a')
  link.href = url
  link.download = url.split('/').pop() || ''
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
}

const disableButtonForDuration = (buttonElement: HTMLButtonElement, durationInMs: number) => {
  buttonElement.disabled = true
  setTimeout(() => {
    buttonElement.disabled = false
  }, durationInMs)
}

const handleThisBtnClick = (event: MouseEvent) => {
  // Replace the URL with the actual URL to this day log file
  const url = 'http://192.168.181.132:10000/test_log/this.log'

  downloadLog(url)
  disableButtonForDuration(event.target as HTMLButtonElement, 1000) // Disable button for 1 second
}

const handleAllBtnClick = (event: MouseEvent) => {
  // Replace the URL with the actual URL to the all log file
  const url = 'http://192.168.181.132:10000/test_log/all.log'

  downloadLog(url)
  disableButtonForDuration(event.target as HTMLButtonElement, 1000) // Disable button for 1 second
}

const updateStatusData = () => {
  // Replace the URL with the actual URL to the status data endpoint
  const url = 'http://192.168.181.132:10000/realtime'

  fetch(url)
    .then(response => response.text())
    .then(data => {
      const textarea = document.querySelector('.textarea') as HTMLTextAreaElement
      const lines = textarea.value.split('\n')
      lines.push(data)
      lines.splice(0, lines.length - 30)
      textarea.value = lines.join('\n')
      textarea.scrollTop = textarea.scrollHeight;
    })
}

// Call updateStatusData every second
setInterval(updateStatusData, 1000)
</script>

<template>
  <header>
    <img alt="Vue logo" class="logo" src="./assets/repair-shop-svgrepo-com.svg" width="125" height="125" />

    <div class="wrapper">
      <HelloWorld msg="远程系统监测" />
    </div>

  </header>

  <main>
    <div class="textContainer">
      <textarea class="textarea"></textarea>		
      <div class="btnContainer">
        <button class="ocrBtn" @click="handleThisBtnClick">拉取当天日志</button>
        <button class="dailyBtn" @click="handleAllBtnClick">拉取所有日志</button>
      </div>
  </div>
  </main>
</template>

<style scoped>
@import './assets/monitor.css';

header {
  line-height: 1.5;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }


  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }
}
</style>
