import { onMounted, ref } from "vue";

export const useApi = <R>(url: string) => {
  const result = ref<R | null>(null);
  const loading = ref(true);

  onMounted(async () => {
    const response = await fetch(url);
    result.value = await response.json();
    loading.value = false;
  });

  return {
    result,
    loading
  };
};
