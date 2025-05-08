<script setup lang="ts">
import { File, getCurrentSelectedFiles } from '../../utils/get-current-selected-files.ts';
import { computed, onMounted, ref, watch } from 'vue';
import { createShareLink } from '../../utils/create-share-link.ts';
import { useLocalState } from '../../hooks/useLocalState.ts';
import { parseBaiduShareUrl } from '../../utils/parse-baidu-share-url.ts';
import { GM_xmlhttpRequest } from '$';

interface ShareData {
	surl?: string;
	pwd?: string;
}

interface ApiResponse {
	code: number;
	data: string;
	message?: string;
}

const { loading, server } = useLocalState();
const state = ref({
	showParseKeyDialog: false,
	showSnackbar: false,
	isSuccessful: false,
	parseKey: '',
	selectedFiles: [] as File[],
	shareData: {} as ShareData,
	jumpUri: ''
});

const fileGroups = computed(() => ({
	folders: state.value.selectedFiles.filter(f => f.isDirectory),
	files: state.value.selectedFiles.filter(f => !f.isDirectory)
}));

const handleApiError = (message = '操作异常！') => {
	state.value.showSnackbar = true;
	loading.value = false;
	console.error(message);
};

const createLink = async () => {
	try {
		loading.value = true;
		const ids = state.value.selectedFiles.map(f => f.id);
		const shareLink = await createShareLink(ids);

		if (!shareLink) {
			throw new Error('创建分享链接失败');
		}

		const { link, pwd } = shareLink;
		const { surl } = parseBaiduShareUrl(link);

		state.value.shareData = { pwd, surl };
		state.value.showParseKeyDialog = true;
	} catch (e: any) {
		handleApiError(e.message);
	}
};

const handleParseKeySubmit = () => {
	if (state.value.parseKey.length !== 6) {
		loading.value = false;
		return;
	}

	const { surl, pwd } = state.value.shareData;
	if (!surl || !pwd) {
		handleApiError('缺少必要的分享数据');
		return;
	}

	GM_xmlhttpRequest({
		method: 'GET',
		url: `${server.value}/api/public/use_parse_key?surl=${surl}&pwd=${pwd}&parse_key=${state.value.parseKey}`,
		timeout: 10000,
		onload: (event) => {
			try {
				const response: ApiResponse = JSON.parse(event.responseText);

				if (event.status === 200 && response.code === 200) {
					state.value.isSuccessful = true;
					loading.value = false;
					state.value.jumpUri = `${server.value}/#/parsed/${response.data}/${surl}/${pwd}`;
					window.open(state.value.jumpUri, '_blank');
				} else {
					handleApiError(response.message || '解析失败');
				}
			} catch (e) {
				console.error(e);
				handleApiError('响应解析失败');
			}
		},
		onerror: () => handleApiError('网络请求失败'),
		ontimeout: () => handleApiError('请求超时')
	});
};

onMounted(() => {
	state.value.selectedFiles = getCurrentSelectedFiles();
});

watch(() => state.value.parseKey, (newVal) => {
	if (newVal.length === 6) {
		state.value.showParseKeyDialog = false;
		handleParseKeySubmit();
	}
});

watch(() => state.value.showParseKeyDialog, (newVal) => {
	if (newVal) {
		state.value.parseKey = '';
	}
});
</script>

<template>
	<v-snackbar v-model="state.showSnackbar">
		操作异常！
		<template v-slot:actions>
			<v-btn color="pink" variant="text" @click="state.showSnackbar = false">关闭</v-btn>
		</template>
	</v-snackbar>

	<v-alert
		v-if="state.isSuccessful"
		class="mt-3"
		variant="tonal"
		border="start"
		title="操作成功"
		type="success"
	>
		请在弹出的窗口中进行下一步操作，如果没有弹出，请手动复制链接到新窗口打开，
		<a :href="state.jumpUri" target="_blank" class="text-break">{{ state.jumpUri }}</a>。
	</v-alert>

	<v-dialog v-model="state.showParseKeyDialog" max-width="350px" persistent>
		<v-card title="输入解析码">
			<v-card-text>
				<v-form @submit.prevent>
					<v-otp-input
						v-model="state.parseKey"
						type="password"
						length="6"
						autofocus
					></v-otp-input>
				</v-form>
			</v-card-text>
		</v-card>
	</v-dialog>

	<template v-if="state.selectedFiles.length === 0">
		<v-empty-state
			title="没有找到文件"
			text="请关闭此对话框后在列表中选择文件。"
		></v-empty-state>
	</template>

	<template v-else>
		<v-btn
			class="my-3 mx-2"
			@click="createLink"
			:loading="loading"
			color="primary"
			v-show="!state.isSuccessful"
		>
			开始解析
		</v-btn>

		<v-divider></v-divider>

		<v-list lines="two" density="comfortable">
			<template v-if="fileGroups.folders.length > 0">
				<v-list-subheader inset>
					文件夹 ({{ fileGroups.folders.length }})
				</v-list-subheader>
				<v-list-item
					v-for="folder in fileGroups.folders"
					:key="folder.id"
					:title="folder.filename"
				>
					<template v-slot:prepend>
						<v-avatar size="40">
							<v-img :src="folder.icon" :alt="`${folder.filename}图标`"></v-img>
						</v-avatar>
					</template>
				</v-list-item>
			</template>

			<template v-if="fileGroups.files.length > 0">
				<v-list-subheader inset>
					文件 ({{ fileGroups.files.length }})
				</v-list-subheader>
				<v-list-item
					v-for="file in fileGroups.files"
					:key="file.id"
					:title="file.filename"
				>
					<template v-slot:prepend>
						<v-avatar size="40">
							<v-img :src="file.icon" :alt="`${file.filename}图标`"></v-img>
						</v-avatar>
					</template>
				</v-list-item>
			</template>
		</v-list>
	</template>
</template>

<style scoped lang="scss">
.text-break {
	word-break: break-all;
}

.v-list-item {
	& + & {
		border-top: 1px solid rgba(0, 0, 0, 0.12);
	}
}
</style>
