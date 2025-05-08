<script setup lang="ts">
import Main from './views/Main/Main.vue';
import { onMounted, useTemplateRef } from 'vue';
import { useCredentials } from './hooks/useCredentials.ts';
import { useLocalState } from './hooks/useLocalState.ts';

const btn = useTemplateRef<HTMLButtonElement>('btn');
const {loading} = useLocalState();

const credentials = useCredentials();
btn.value?.addEventListener('click', () => {
	setTimeout(() => {
		btn.value?.blur();
	}, 800);
});

onMounted(() => {
	credentials.init();
});
</script>

<template>
	<v-app>
		<v-main>
			<v-dialog max-width="50%">
				<template v-slot:activator="{ props: activatorProps }">
					<div class="f4pan-action-popup" v-if="credentials.isReady">
						<button v-bind="activatorProps" ref="btn">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								viewBox="0 0 24 24"
							>
								<g fill="none">
									<path
										d="M13.057 7.43a2.5 2.5 0 1 1 3.536 3.536a2.5 2.5 0 0 1-3.536-3.535zm2.475 1.061a1 1 0 1 0-1.414 1.415a1 1 0 0 0 1.414-1.415zm5.977-4.169a2.75 2.75 0 0 0-1.811-1.81l-.663-.206a6.75 6.75 0 0 0-6.773 1.674l-.996.996a3.498 3.498 0 0 0-4.57.327L5.455 6.545a.75.75 0 0 0 0 1.06l1.591 1.592l-.18.18a1.75 1.75 0 0 0 0 2.474l.496.496l-1.396.796a.75.75 0 0 0-.158 1.181l3.889 3.89a.75.75 0 0 0 1.181-.158l.798-1.395l.497.497a1.75 1.75 0 0 0 2.475 0l.177-.177l1.59 1.59a.75.75 0 0 0 1.06 0l1.242-1.243a3.497 3.497 0 0 0 .328-4.567l.998-.998a6.75 6.75 0 0 0 1.673-6.777l-.206-.664zm-2.256-.378c.393.122.701.43.823.823l.207.665a5.25 5.25 0 0 1-1.302 5.27l-5.395 5.395a.25.25 0 0 1-.353 0l-5.307-5.306a.25.25 0 0 1 0-.354l5.396-5.396a5.25 5.25 0 0 1 5.269-1.302l.662.205zm-1.289 9.897c.453.766.35 1.769-.308 2.427l-.712.712l-1.06-1.06l2.08-2.08zM7.758 6.363a1.998 1.998 0 0 1 2.428-.307l-2.08 2.08l-1.06-1.06l.712-.713zm2.818 9.198l-.514.898l-2.5-2.5l.898-.513l2.116 2.116zM6.69 18.395a.75.75 0 0 0-1.06-1.06l-2.476 2.474a.75.75 0 0 0 1.061 1.061l2.475-2.475zM4.745 15.39a.75.75 0 0 1 0 1.06l-1.06 1.061a.75.75 0 0 1-1.061-1.06l1.06-1.061a.75.75 0 0 1 1.061 0zm3.887 4.952a.75.75 0 1 0-1.06-1.06l-1.059 1.058a.75.75 0 0 0 1.06 1.06l1.06-1.058z"
										fill="currentColor"
									></path>
								</g>
							</svg>
						</button>
					</div>
				</template>
				<template v-slot:default="{ isActive }">
					<v-card title="F4Pan">
						<v-card-text>
							<Main></Main>
						</v-card-text>
						<v-divider></v-divider>
						<v-card-actions v-if="loading === false">
							<v-spacer></v-spacer>
							<v-btn
								size="large"
								text="关闭"
								@click="isActive.value = false"
							></v-btn>
						</v-card-actions>
					</v-card>
				</template>
			</v-dialog>
		</v-main>
	</v-app>
</template>

<style lang="scss" scoped>
.f4pan-action-popup {
	position: fixed;
	right: 20px;
	bottom: 20px;
	z-index: 999;
	filter: drop-shadow(0 2px 5px rgba(0, 0, 0, 0.2));

	button {
		width: 56px;
		height: 56px;
		border-radius: 50%;
		background: linear-gradient(145deg, #554fe9, #3a35b3);
		color: white;
		border: none;
		cursor: pointer;
		transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
		display: flex;
		align-items: center;
		justify-content: center;
		padding: 0;
		animation: rotation 3s linear infinite;
		outline: none;

		@keyframes rotation {
			0% {
				transform: rotate(0deg);
			}
			100% {
				transform: rotate(360deg);
			}
		}

		&:hover {
			background: linear-gradient(145deg, #4540d1, #625dee);
			transform: scale(1.1);
			filter: drop-shadow(0 4px 8px rgba(0, 0, 0, 0.3));
			animation-play-state: paused;
		}

		&:active {
			transform: scale(0.95);
			background: linear-gradient(145deg, #332fa5, #4a45cc);
		}

		svg {
			width: 60%;
			height: 60%;
			fill: white;
		}
	}
}
</style>
