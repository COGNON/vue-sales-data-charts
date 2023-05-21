import { ref } from 'vue';

export const darkMode = ref<boolean>(setDarkMode());

function setDarkMode(): boolean {
  const newVal = window.matchMedia('(prefers-color-scheme: dark)').matches || false;

  if (newVal) {
    document.documentElement.classList.add('dark');
  } else {
    document.documentElement.classList.remove('dark');
  }
  return newVal;
}
