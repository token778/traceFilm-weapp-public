import Vue from 'vue'
let getDownloadSrc = function(postData) {
	return new Promise((resolve, reject) => {
		wx.cloud.callFunction({
			name: 'getSearch',
			data: {
				postData,
				time: Vue.prototype.getTime()
			},
			success: res => {
				// console.info('success', res);
				resolve(res.result)
			},
			fail: res => {
				console.info('fail', res);
				reject(err)
			}
		});

	})
}


let getMore = function(postData) {
	return new Promise((resolve, reject) => {
		wx.cloud.callFunction({
			name: 'getMore',
			data: {
				postData,
				time: Vue.prototype.getTime()
			},
			success: res => {
				resolve(res.result)
			},
			fail: res => {
				console.info('fail', res);
				reject(err)
			}
		});

	})
}

let getImg = function(postData) {
	return new Promise((resolve, reject) => {
		wx.cloud.callFunction({
			name: 'index',
			responseType: 'blob',
			data: {
				postData,
				time: Vue.prototype.getTime()
			},
			success: res => {
				resolve(res.result)
			},
			fail: res => {
				console.info('fail', res);
				reject(err)
			}
		});

	})
}


let getBtbaDownSrc = function(postData) {
	return new Promise((resolve, reject) => {
		wx.cloud.callFunction({
			name: 'index',
			data: {
				postData,
				time: Vue.prototype.getTime()
			},
			success: res => {
				resolve(res.result)
			},
			fail: res => {
				console.info('fail', res);
				reject(err)
			}
		});

	})
}


export {
	getDownloadSrc,
	getMore,
	getImg,
	getBtbaDownSrc
}
