<script setup lang="ts">

import { useLocalState } from '../../hooks/useLocalState.ts';

const {server} = useLocalState();
</script>

<template>
	<v-list lines="two">
		<v-list-subheader>服务器配置</v-list-subheader>
		<v-dialog persistent max-width="350px">
			<template v-slot:activator="{ props: activatorProps }">
				<v-list-item :subtitle="server" title="上级服务器" link
				             v-bind="activatorProps"></v-list-item>
			</template>
			<template v-slot:default="{ isActive }">
				<v-card title="修改服务器地址">
					<v-card-text>
						<v-form>
							<v-text-field v-model="server" label="服务器地址"></v-text-field>
						</v-form>
					</v-card-text>
					<v-divider></v-divider>
					<v-card-actions>
						<v-spacer></v-spacer>
						<v-btn
							size="large"
							text="确定"
							@click="isActive.value = false"
						></v-btn>
					</v-card-actions>
				</v-card>
			</template>
		</v-dialog>
	</v-list>
</template>

<style scoped lang="scss">

</style>
