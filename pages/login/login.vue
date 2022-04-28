<template>
	<view>

		<view v-if="isCanUse" style="display: flex;justify-content: center;">
			<view>
				<view class='header'>
					<image src='../../static/logo/weixin.png'></image>
				</view>
				<view class='content'>
					<view>申请获取以下权限</view>
					<text>获得你的公开信息(昵称，头像、地区等)</text>
				</view>

				<button class='bottom' type='primary' lang="zh_CN" @click="wxGetUserInfo">
					授权登录
				</button>
			</view>
		</view>


	</view>
</template>

<script>
	export default {
		data() {
			return {
				backpage: '',
				backtype: '',
				isCanUse: uni.getStorageSync('isCanUse') || true //默认为true
			};
		},
		onLoad(options) { //默认加载
			this.backpage = options.backpage
			this.backtype = options.backtype
		},
		methods: {

			wxGetUserInfo() {
				uni.getUserProfile({
					lang: 'zh_CN',
					desc: '登录',
					success: (res) => {
						uni.showToast({
							title: "登录成功"
						});

						console.log(res)
						uni.setStorageSync('avatarUrl', res.userInfo.avatarUrl);
						uni.setStorageSync('nickName', res.userInfo.nickName);
						this.$nickName = res.userInfo.nickName
						// 跳转
						if (this.backtype == 1) {
							uni.redirectTo({
								url: this.backpage
							});
						} else {
							uni.switchTab({
								url: this.backpage
							});
						}

					},
					fail: (res) => {
						console.log(res)
					}
				});
			},
			login() {
				// let _this = this;
				// uni.showLoading({
				// 	title: '登录中...'
				// });



			}
		}
	}
</script>

<style>
	.header {
		margin: 90rpx 0 90rpx 50rpx;
		border-bottom: 1px solid #ccc;
		text-align: center;
		width: 650rpx;
		height: 300rpx;
		line-height: 450rpx;
	}

	.header image {
		width: 200rpx;
		height: 200rpx;
	}

	.content {
		margin-left: 50rpx;
		margin-bottom: 90rpx;
	}

	.content text {
		display: block;
		color: #9d9d9d;
		margin-top: 40rpx;
	}

	.bottom {
		border-radius: 80rpx;
		margin: 70rpx 50rpx;
		font-size: 35rpx;
	}
</style>
