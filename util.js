import Vue from 'vue'

// 检查登录 未登录跳转
Vue.prototype.checkLogin = function(backpage, backtype) {
	var avatarUrl = uni.getStorageSync('avatarUrl');
	var nickName = uni.getStorageSync('nickName');
	if (avatarUrl == '' || nickName == '') {
		// uni.showToast({
		// 	title: "请先登陆",
		// 	icon: "fail",
		// 	position: 'bottom'
		// })
		
		// uni.redirectTo({
		// 	url: '/pages/login/login?backpage=' + backpage + '&backtype=' + backtype,
		// 	fail: function(res) {
		// 		console.log(res)
		// 	}
		// });
		return false;
	}
	Vue.prototype.nickName = nickName
	return [avatarUrl, nickName];
}

// 消息提示加载弹框

Vue.prototype.showLoading = function(title) {
	uni.showLoading({
		title
	});

	// uni.showToast({
	// 	title: "获取成功",
	// 	icon: "loading",
	// 	position: 'bottom'
	// })
}

Vue.prototype.hideLoading = function() {
	uni.hideLoading();
}

Vue.prototype.hideLoading = function() {
	uni.hideLoading();
}
Vue.prototype.getTime = function() {
	let time = new Date();
	let yy = time.getFullYear();
	let mm = time.getMonth() + 1;
	let dd = time.getDate();
	let hh = time.getHours();
	let mf = time.getMinutes() < 10 ? '0' + time.getMinutes() : time.getMinutes();
	let ss = time.getSeconds() < 10 ? '0' + time.getSeconds() : time.getSeconds();
	return yy + '-' + mm + '-' + dd + ' ' + hh + ':' + mf + ':' + ss;
}


Vue.prototype.getUserProfile = function() {
	uni.getUserProfile({
		lang: 'zh_CN',
		desc: '登录',
		success: (res) => {
			
			// cloudID: 
			// encryptedData
			// errMsg: 
			// iv: 
			// rawData
			// signature
			uni.setStorageSync('avatarUrl', res.userInfo.avatarUrl);
			uni.setStorageSync('nickName', res.userInfo.nickName);
			Vue.prototype.nickName = res.userInfo.nickName
			
			uni.reLaunch({
			    url: '/pages/home/home'
			});
			
			uni.showToast({
				title: "登录成功"
			});
		},
		fail: (res) => {
			console.log(res)
		}
	});
}
