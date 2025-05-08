import { useCredentials } from '../hooks/useCredentials.ts';
import { GM_xmlhttpRequest, unsafeWindow } from '$';

export type ShareLink = {
	link: string;
	pwd: string;
};

type Resp = {
	errno: number;
	link: string;
	shorturl: string;
};

export const createShareLink = (ids: any[]) => new Promise<ShareLink | null>(resolve => {
	const credentials = useCredentials();
	const pwd = Math.random().toString(16).substring(2, 6);
	GM_xmlhttpRequest({
		method: 'POST',
		url: `https://pan.baidu.com/share/pset?channel=chunlei&bdstoken=${credentials.credentials.value?.bdstoken}&clienttype=0&app_id=250528&web=1&dp-logid=39497900193308220093`,
		cookie: unsafeWindow.document.cookie,
		data: new URLSearchParams({
			is_knowledge: '0',
			public: '0',
			period: '1',
			eflag_disableL: 'true',
			linkOrQrcode: 'link',
			channel_list: '[]',
			schannel: '4',
			fid_list: JSON.stringify(ids),
			pwd
		}),
		onload: (event) => {
			if (event.status === 200) {
				const response: Resp = JSON.parse(event.responseText);
				if (response.errno === 0) {
					resolve({
						pwd,
						link: response.link
					});
					return;
				}
			}
			resolve(null);
		},
		onerror: () => {
			resolve(null);
		}
	});
});
