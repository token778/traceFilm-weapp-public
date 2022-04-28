import Vue from 'vue'
let getDownloadSrc = function(postData) {
	return new Promise((resolve, reject) => {
		wx.cloud.callFunction({
			name: 'getSearch',
			data: {
				postData,
				// nickName: Vue.prototype.nickName,
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


let getMore = function(searchKey) {
	return new Promise((resolve, reject) => {
		wx.cloud.callFunction({
			name: 'getMore',
			data: {
				searchKey,
				nickName: Vue.prototype.nickName,
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



export {
	getDownloadSrc,
	getMore
}
