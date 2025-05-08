<script setup lang="ts">
import { ref } from 'vue';
import Config from './Config.vue';
import SelectedFile from './SelectedFile.vue';

type TabList = 'filelist' | 'config';
const tab = ref<TabList>('config');

</script>

<template>
	<v-tabs v-model="tab" bg-color="transparent" color="basil" grow>
		<v-tab text="文件列表" value="filelist"></v-tab>
		<v-tab text="插件配置" value="config"></v-tab>
	</v-tabs>
	<v-tabs-window v-model="tab">
		<v-tabs-window-item value="filelist">
			<SelectedFile></SelectedFile>
		</v-tabs-window-item>
		<v-tabs-window-item value="config">
			<Config></Config>
		</v-tabs-window-item>
	</v-tabs-window>
</template>

<style scoped lang="scss">

</style>
