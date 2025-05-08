import { GM_xmlhttpRequest, unsafeWindow } from '$';

export type YunData = {
	bdstoken: string;
	token: string;
	uk: number;
};

type BdResponse = {
	errno: number;
	result: {
		bdstoken: string;
		token: string;
		uk: number;
		isdocuser: number;
		servertime: number;
	};
	request_id: number;
};

export const getTemplateVariable = () => new Promise<YunData>((resolve, reject) => {
	GM_xmlhttpRequest<'text'>({
		method: 'GET',
		url: 'https://pan.baidu.com/api/gettemplatevariable?clienttype=0&app_id=250528&web=1&dp-logid=62026100401820040007&fields=[%22bdstoken%22,%22token%22,%22uk%22,%22isdocuser%22,%22servertime%22]',
		cookie: unsafeWindow.document.cookie,
		onload: (event) => {
			if (event.status === 200) {
				const response = event.responseText.trim();
				const yunData: BdResponse = JSON.parse(response);
				if (yunData.errno === 0) {
					resolve({
						bdstoken: yunData.result.bdstoken,
						token: yunData.result.token,
						uk: yunData.result.uk
					});
					return;
				}
			}
			reject();
		},
		onerror: reject
	});
});
