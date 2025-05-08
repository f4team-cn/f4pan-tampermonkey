import { ref } from 'vue';
import { getTemplateVariable, YunData } from '../utils/getTemplateVariable.ts';

const isReady = ref<boolean>(false);
const credentials = ref<YunData | null>(null);

const init = async () => {
	if (isReady.value) {
		return;
	}
	credentials.value = await getTemplateVariable();
	isReady.value = true;
};

export const useCredentials = () => {
	return {
		isReady,
		init,
		credentials
	};
};
