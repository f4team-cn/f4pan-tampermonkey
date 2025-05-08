export type File = {
	filename: string;
	isDirectory: boolean;
	id: string;
	icon?: string;
	element: HTMLElement
};

export const getCurrentSelectedFiles = (): File[] => {
	const list = document.querySelectorAll('body > div.nd-main-layout.aichat-width.show-out-sug > div.nd-main-layout__container > div.nd-main-layout__wrapper > div.nd-main-layout__body > div.nd-new-main-list > div.wp-s-core-pan > div > div.wp-s-core-pan__body.is-show-header > div.wp-s-core-pan__body-contain.is-show-detail.is-has-detail > div.wp-s-core-pan__body-contain--list.is-show-nav > div > div > div > div.wp-s-pan-table__body.mouse-choose-list > table > tbody > tr.wp-s-table-skin-hoc__tr.wp-s-pan-table__body-row.mouse-choose-item.selected');
	debugger;
	const files: Partial<File>[] = [];
	list.forEach(item => {
		const filename = item.querySelector('.wp-s-pan-list__file-name-title-text')?.textContent?.trim();
		const isDir = item.querySelector('section')?.textContent?.trim() === '文件夹';
		const iconElement = item.querySelector<HTMLImageElement>('img')
		const fileid = (item as HTMLElement).dataset.id;
		files.push({
			filename,
			isDirectory: isDir,
			id: fileid,
			element: item as HTMLElement,
			icon: iconElement?.src
		});
	});
	return files.filter(f => f.element && f.id && f.filename && f.isDirectory !== undefined) as File[];
}
