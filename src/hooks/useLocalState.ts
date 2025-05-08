import { ref, watch } from 'vue';
import { GM_getValue, GM_setValue } from '$';

const loading = ref(false);
const server = ref(GM_getValue('server', 'http://pan.f4team.cn'));

watch(server, value => {
	GM_setValue('server', value);
});

export const useLocalState = () => {
	return { loading, server };
};
