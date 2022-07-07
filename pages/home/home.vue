<template>
	<view>

		<view class="header">
			<view v-if="isLogin" class="header">
				<image class="avatar" :src="avatarUrl"></image>

				<!-- <open-data type="userAvatarUrl"></open-data> -->

				<text>{{nickName}}</text>

				<span @click="logout" class="logout" plain="true">
					<image class="outIcon" src="/static/logo/out.png"><text>退出</text>
				</span>
			</view>
			<view v-else>
				<button @click="this.getUserProfile()"
					style="margin-top: 150rpx;width: 350rpx;height: 90rpx;border-radius: 100rpx;">
					<span style="font-weight: 500;">登 录</span>
				</button>
			</view>


		</view>
		<view>
			<uni-card isShadow="true" style="border-radius: 20rpx;">
				<uni-list>
					<uni-list-item link to="/pages/about/map">
						<template slot="header">
							<image class="mini-img" src="/static/images/地图导航.png"></image>
							<span style="line-height: 10rpx;">
								电影导航
							</span>
						</template>
					</uni-list-item>
					
					<uni-list-item showArrow>
						<view slot="header" class="slot-box">
							<image class="mini-img" src="/static/images/wechat.png"></image>
						</view>

						<template slot="body">
							<button style="width: 100%;height: 100%;position: absolute;top: 0;left: 0;opacity: 0;"
								open-type='contact'>客服留言</button>
							<span style="line-height: 60rpx;">
								客服留言
							</span>
						</template>


					</uni-list-item>

					<!-- 			<uni-list-item clickable @click="feedback" showArrow>
						<template slot="header">
							<image class="mini-img" src="/static/images/feiji.png"></image>
							<span>
								意见反馈
							</span>

						</template>
					</uni-list-item> -->



				<!-- 	<uni-list-item link to="/pages/logs/logs">
						<template slot="header">
							<image class="mini-img" src="/static/images/fankui.png"></image>
							<span>
								更新日志
							</span>

						</template>


					</uni-list-item> -->
					<uni-list-item link to="/pages/about/about">
						<template slot="header">
							<image class="mini-img" src="/static/images/about.png"></image>
							<span style="line-height: 10rpx;">
								关于痕迹电影
							</span>

						</template>
					</uni-list-item>



					<uni-list-item showArrow>

						<view slot="header" class="slot-box">
							<image class="mini-img" src="/static/images/share.png"></image>
						</view>

						<template slot="body">
							<button style="width: 100%;height: 100%;position: absolute;top: 0;left: 0;opacity: 0;"
								open-type='share'>分享痕迹电影</button>
							<span style="line-height: 60rpx;">
								分享痕迹电影
							</span>
						</template>


					</uni-list-item>

				</uni-list>
			</uni-card>


			<uni-popup ref="popup" type="dialog">
				<uni-popup-dialog mode="input" title="意见反馈" :duration="2000" :before-close="true" @close="close"
					@confirm="confirm(value)">

					<template>
						<view>
							<textarea v-model="feedbackContent" placeholder=" 在此处请输入意见" auto-height maxlength="200"
								focus="true" />
						</view>
					</template>

				</uni-popup-dialog>
			</uni-popup>


		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				isLogin: false,
				avatarUrl: '',
				nickName: '',
				feedbackContent: ''
			};
		},
		onShareAppMessage(res) {
			return {
				// 让每个人都能享受到电影带来的乐趣！
				title: '让每个人都能享受到电影带来的乐趣！',
				path: '/pages/index/index',
				imageUrl: '/static/images/aosika.jpg'
			}
		},


		onLoad: function() {


			const loginRes = this.checkLogin()
			if (!loginRes) {
				this.isLogin = false
				return false
			}
			this.isLogin = true
			this.avatarUrl = loginRes[0]
			this.nickName = loginRes[1]
		},


		methods: {
			// checkLogin() {
			// 	var avatarUrl = uni.getStorageSync('avatarUrl');
			// 	var nickName = uni.getStorageSync('nickName');

			// 	if (avatarUrl == '' || nickName == '') {
			// 		this.avatarUrl = ""
			// 		this.nickName = ""
			// 		// uni.redirectTo({
			// 		// 	url: '/pages/login/login?backpage=' + backpage + '&backtype=' + backtype,
			// 		// 	fail: function(res) {
			// 		// 		console.log(res)
			// 		// 	}
			// 		// });
			// 		return false;
			// 	}
			// 	return [avatarUrl, nickName];
			// },


			close() {
				// TODO 做一些其他的事情，before-close 为true的情况下，手动执行 close 才会关闭对话框
				// ...
				// this.$refs.popup.close()
			},
			confirm() {
				// this.$refs.popup.close()
				// wx.cloud.callFunction({
				// 	name: 'addFeedback',
				// 	data: {
				// 		content: this.feedbackContent,
				// 		nickName: this.nickName,
				// 		time: this.getTime()
				// 	},
				// 	// 		complete: res => {
				// 	// 			console.info('complete', res);

				// 	// 		},
				// 	success: res => {
				// 		console.info('success', res);
				// 		uni.showToast({
				// 			title: res.result.msg,
				// 			icon: res.result.icon,
				// 			position: 'bottom',
				// 			duration: 2000
				// 		})

				// 	},
				// 	fail: res => {
				// 		console.info('fail', res);
				// 		uni.showToast({
				// 			title: "反馈提交失败~",
				// 			icon: "fail",
				// 			position: 'bottom',
				// 			duration: 2000
				// 		})

				// 	}
				// });








			},

			feedback() {
				// if (!this.checkLogin()) {
				// 	uni.showToast({
				// 		title: "该功能登陆后使用~",
				// 		icon: "none",
				// 		position: 'bottom',
				// 		duration: 3000
				// 	})
				// 	return false
				// }

				// this.$refs.popup.open()

			},
			logout() {
				var avatarUrl = uni.getStorageSync('avatarUrl');
				uni.clearStorageSync()
				uni.reLaunch({
					url: "/pages/home/home"
				});
			}
		}
	}
</script>

<style lang="scss">
	.uni-card.uni-border .uni-card__content {
		padding: 0;
	}

	.mini-img {
		height: 60rpx;
		width: 60rpx;
		margin-right: 20rpx;
		vertical-align: middle;
	}

	.uni-card.uni-border.uni-card--shadow {
		border-radius: 40rpx;
	}

	.uni-list--border-top,
	.uni-list--border-bottom {
		display: none;
	}

	.header {
		width: 100%;
		background-color: #41be57;
		display: flex;
		flex-direction: column;
		align-items: center;
		height: 400rpx;

		.avatar {
			margin-top: 50rpx;
			width: 160rpx;
			height: 160rpx;
			border-radius: 50%;
			border: 4rpx white solid;
		}

		text {
			margin-top: 30rpx;
			color: white;
			font-weight: 600;
			font-size: 16px;
		}

		.logout {

			margin-top: 20rpx;
			margin-right: 20rpx;
			margin-left: auto;
			color: white;
			border: 1px solid white;
			width: 130rpx;
			height: 50rpx;
			border-radius: 15rpx;
			text-align: center;

			text {
				font-size: 30rpx;
				vertical-align: super;
			}

			.outIcon {
				width: 50rpx;
				height: 50rpx;
			}
		}

	}
</style>
