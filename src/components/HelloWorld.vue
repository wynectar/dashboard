<script setup>
import { ref, reactive, computed, onMounted } from "vue";
const title = ref("智慧数据可视化平台");
const currentTime = ref("00:00:00");
const currentDate = ref("2021年1月1日");
// 更新时间显示
function updateTime() {
  const now = new Date();
  const timeString = now.toLocaleTimeString("zh-CN");
  const dateString = now.toLocaleDateString("zh-CN", {
    year: "numeric",
    month: "long",
    day: "numeric",
    weekday: "long"
  });

  currentTime.value = timeString;
  currentDate.value = dateString;
}

const conActive = ref("frame-style");
const controls = reactive([
  { name: "全部风格", icon: "fa-layer-group", id: "frame-style" },
  { name: "科技蓝光", icon: "fa-lightbulb", id: "frame-style-1" },
  { name: "霓虹紫光", icon: "fa-star", id: "frame-style-2" },
  { name: "数据流", icon: "fa-wave-square", id: "frame-style-3" },
  { name: "全息投影", icon: "fa-hologram", id: "frame-style-4" },
  { name: "简约现代", icon: "fa-minus", id: "frame-style-5" }
]);

const frameList = reactive([
  {
    id: "frame-style-1",
    name: "科技蓝光边框",
    title: "系统运行状态",
    value: "98.7%",
    unit: "正常运行时间"
  },
  {
    id: "frame-style-2",
    name: "霓虹紫光边框",
    title: "今日活跃用户",
    value: "12,458",
    unit: "同比增长 15.3%",
    extra: "corner"
  },
  {
    id: "frame-style-3",
    name: "数据流边框",
    title: "数据处理量",
    value: "3.2TB",
    unit: "今日累计",
    extra: "flow"
  },
  {
    id: "frame-style-4",
    name: "全息投影边框",
    title: "响应时间",
    value: "128ms",
    unit: "平均延迟"
  },
  {
    id: "frame-style-5",
    name: "简约现代边框",
    title: "任务完成率",
    value: "87.5%",
    unit: "本月目标 90%",
    extra: "accent"
  }
]);
const frames = computed(() => {
  const list = frameList.filter(v => v.id === conActive.value);
  return list?.length ? list : frameList;
});

const refCss = ref(null)
onMounted(() => {
  updateTime();
  setInterval(updateTime, 1000);
});
</script>

<template>
  <div class="screen-dashboard" ref="refCss">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" />
    <!-- 标题栏 -->
    <header>
      <section class="title-section">
        <h1 class="main-title">{{ title }}</h1>
      </section>
      <section class="time-section">
        <div class="current-time">{{ currentTime }}</div>
        <div class="current-date">{{ currentDate }}</div>
      </section>
    </header>
    <!-- 内容区域 -->
    <main>
      <div class="controls">
        <button :class="{ 'style-btn': true, active: con.id === conActive }" v-for="con in controls" :key="con.id"
          @click="conActive = con.id">
          <i :class="`fas ${con.icon}`"></i>
          {{ con.name }}
        </button>
      </div>
      <div class="frames-container">
        <div class="frame-wrapper" v-for="f in frames" :key="f.id">
          <div class="frame-title">{{ name }}</div>
          <div :class="`decorative-frame ${f.id}`">
            <template v-if="f.extra === 'corner'">
              <div class="corner corner-tl"></div>
              <div class="corner corner-tr"></div>
              <div class="corner corner-bl"></div>
              <div class="corner corner-br"></div>
            </template>
            <template v-else-if="f.extra === 'flow'">
              <div class="data-flow">
                <div class="flow-line"></div>
                <div class="flow-line"></div>
                <div class="flow-line"></div>
              </div>
            </template>
            <template v-else-if="f.extra === 'accent'">
              <div class="accent-bar"></div>
              <div class="accent-dot"></div>
            </template>
            <div class="frame-content">
              <div class="content-title">{{ f.title }}</div>
              <div class="content-value">{{ f.value }}</div>
              <div class="content-unit">{{ f.unit }}</div>
            </div>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<style scoped>
.screen-dashboard {
  background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%);
  color: #e2e8f0;
  min-height: 100vh;
  overflow: hidden;
  width: --vw(1920);
  height: --vh(1080);
}

/* 标题栏样式 */
header {
  position: relative;
  height: --vh(80);
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 --vw(30);
  border-radius: --vw(12);
  background: rgba(15, 23, 42, 0.8);
  box-shadow: 0 --vw(5) --vw(15) rgba(0, 0, 0, 0.3);
  overflow: hidden;
  z-index: 10;
}

header::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(90deg,
      transparent 0%,
      rgba(56, 189, 248, 0.1) 50%,
      transparent 100%),
    repeating-linear-gradient(45deg,
      transparent,
      transparent 10px,
      rgba(56, 189, 248, 0.05) 10px,
      rgba(56, 189, 248, 0.05) 20px);
  z-index: -1;
}

header::after {
  content: "";
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg,
      transparent,
      rgba(56, 189, 248, 0.2),
      transparent);
  animation: headerShine 8s infinite;
  z-index: -1;
}

.title-section {
  display: flex;
  align-items: center;
  gap: --vw(15);
}

.main-title {
  font-size: --size(28);
  font-weight: 700;
  background: linear-gradient(90deg, #38bdf8, #818cf8, #c084fc);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  text-shadow: 0 0 --size(20) rgba(56, 189, 248, 0.3);
}

.time-section {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
}

.current-time {
  font-size: --size(24);
  font-weight: 600;
  color: #38bdf8;
}

.current-date {
  font-size: --size(14);
  color: #94a3b8;
}

/* 控制按钮 */
.controls {
  display: flex;
  justify-content: center;
  gap: --vw(15);
  margin: --vh(30) 0;
  flex-wrap: wrap;
  font-size: --size(14);
}

.style-btn {
  background: rgba(30, 41, 59, 0.7);
  border: --size(1) solid #334155;
  color: #cbd5e1;
  padding: --size(10) --size(20);
  border-radius: --size(8);
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: --vw(8);
}

.style-btn:hover {
  background: rgba(56, 189, 248, 0.2);
  border-color: #38bdf8;
  color: #38bdf8;
}

.style-btn.active {
  background: rgba(56, 189, 248, 0.3);
  border-color: #38bdf8;
  color: #38bdf8;
  box-shadow: 0 0 --vw(15) rgba(56, 189, 248, 0.3);
}

.frames-container {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(--vw(350), 1fr));
  gap: --vw(30);
  margin-top: --vh(100);
}

.frame-wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.frame-title {
  margin-bottom: --vw(15);
  font-size: --size(20);
  color: #94a3b8;
}

/* 基础装饰框样式 */
.decorative-frame {
  position: relative;
  padding: --vw(25);
  border-radius: --vw(12);
  background: rgba(15, 23, 42, 0.7);
  box-shadow: 0 --vw(10) --vw(25) rgba(0, 0, 0, 0.3);
  overflow: hidden;
  min-height: --vh(250);
  display: flex;
  flex-direction: column;
  transition: all 0.3s ease;
}

.frame-content {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: --vw(20);
  text-align: center;
  z-index: 2;
}

.content-title {
  font-size: --size(24);
  margin-bottom: --vh(15);
  color: #e2e8f0;
}

.content-value {
  font-size: --size(40);
  font-weight: bold;
  margin: --vh(10) 0;
  color: #38bdf8;
}

.content-unit {
  font-size: --size(16);
  color: #94a3b8;
}

/* 风格1：科技蓝光边框 */
.frame-style-1 {
  border: 1px solid rgba(56, 189, 248, 0.3);
  box-shadow: 0 0 20px rgba(56, 189, 248, 0.2),
    inset 0 0 20px rgba(56, 189, 248, 0.1);
}

.frame-style-1::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: --vh(3);
  background: linear-gradient(90deg, transparent, #38bdf8, transparent);
  animation: scanline 3s linear infinite;
}

.frame-style-1::after {
  content: "";
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: --vh(3);
  background: linear-gradient(90deg, transparent, #38bdf8, transparent);
  animation: scanline 3s linear infinite reverse;
}

/* 风格2：霓虹紫光边框 */
.frame-style-2 {
  border: --size(1) solid rgba(192, 132, 252, 0.3);
  box-shadow: 0 0 --size(25) rgba(192, 132, 252, 0.3),
    inset 0 0 --size(25) rgba(192, 132, 252, 0.1);
}

.frame-style-2 .corner {
  position: absolute;
  width: --vw(20);
  height: --vw(20);
}

.frame-style-2 .corner-tl {
  top: 0;
  left: 0;
  border-top: 2px solid #c084fc;
  border-left: 2px solid #c084fc;
  border-top-left-radius: 12px;
}

.frame-style-2 .corner-tr {
  top: 0;
  right: 0;
  border-top: 2px solid #c084fc;
  border-right: 2px solid #c084fc;
  border-top-right-radius: 12px;
}

.frame-style-2 .corner-bl {
  bottom: 0;
  left: 0;
  border-bottom: 2px solid #c084fc;
  border-left: 2px solid #c084fc;
  border-bottom-left-radius: 12px;
}

.frame-style-2 .corner-br {
  bottom: 0;
  right: 0;
  border-bottom: 2px solid #c084fc;
  border-right: 2px solid #c084fc;
  border-bottom-right-radius: 12px;
}

/* 风格3：数据流边框 */
.frame-style-3 {
  border: 1px solid rgba(74, 222, 128, 0.3);
  box-shadow: 0 0 20px rgba(74, 222, 128, 0.2),
    inset 0 0 20px rgba(74, 222, 128, 0.1);
}

.frame-style-3 .data-flow {
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  pointer-events: none;
}

.frame-style-3 .flow-line {
  position: absolute;
  background: rgba(74, 222, 128, 0.7);
  box-shadow: 0 0 10px rgba(74, 222, 128, 0.7);
  animation: flow 8s linear infinite;
}

.frame-style-3 .flow-line:nth-child(1) {
  top: 10%;
  height: 2px;
  width: 30%;
  animation-delay: 0s;
}

.frame-style-3 .flow-line:nth-child(2) {
  top: 40%;
  height: 2px;
  width: 50%;
  animation-delay: 2s;
}

.frame-style-3 .flow-line:nth-child(3) {
  top: 70%;
  height: 2px;
  width: 40%;
  animation-delay: 4s;
}

/* 风格4：全息投影边框 */
.frame-style-4 {
  background: rgba(15, 23, 42, 0.5);
  border: 1px solid transparent;
  box-shadow: 0 0 30px rgba(139, 92, 246, 0.4),
    inset 0 0 30px rgba(139, 92, 246, 0.2);
  position: relative;
}

.frame-style-4::before {
  content: "";
  position: absolute;
  top: -2px;
  left: -2px;
  right: -2px;
  bottom: -2px;
  background: linear-gradient(45deg, #38bdf8, #c084fc, #38bdf8, #c084fc);
  border-radius: 14px;
  /* z-index: -1; */
  animation: borderRotate 4s linear infinite;
}

.frame-style-4::after {
  content: "";
  position: absolute;
  top: -2px;
  left: -2px;
  right: -2px;
  bottom: -2px;
  background: linear-gradient(45deg, #38bdf8, #c084fc, #38bdf8, #c084fc);
  border-radius: 14px;
  /* z-index: -1; */
  filter: blur(20px);
  opacity: 0.7;
  animation: borderRotate 4s linear infinite reverse;
}

/* 风格5：简约现代边框 */
.frame-style-5 {
  border: none;
  background: rgba(30, 41, 59, 0.8);
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.4);
  position: relative;
}

.frame-style-5 .accent-bar {
  position: absolute;
  top: 0;
  left: 0;
  width: 6px;
  height: 100%;
  background: linear-gradient(to bottom, #38bdf8, #c084fc);
  border-top-left-radius: 12px;
  border-bottom-left-radius: 12px;
}

.frame-style-5 .accent-dot {
  position: absolute;
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background: #38bdf8;
  top: 20px;
  right: 20px;
  box-shadow: 0 0 10px #38bdf8;
}

/* 动画定义 */
@keyframes headerShine {
  0% {
    left: -100%;
  }

  50% {
    left: 100%;
  }

  100% {
    left: 100%;
  }
}

@keyframes scanline {
  0% {
    transform: translateX(-100%);
  }

  100% {
    transform: translateX(100%);
  }
}

@keyframes flow {
  0% {
    transform: translateX(-100%);
    opacity: 0;
  }

  10% {
    opacity: 1;
  }

  90% {
    opacity: 1;
  }

  100% {
    transform: translateX(400%);
    opacity: 0;
  }
}

@keyframes borderRotate {
  0% {
    transform: rotate(0deg);
  }

  100% {
    transform: rotate(360deg);
  }
}
</style>
