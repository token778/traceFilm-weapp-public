<template>
	<view class="banner">

		<view>
			<!-- <uni-notice-bar scrollable="true" speed="10px" text="[单行] 这是 NoticeBar 通告栏，这是 NoticeBar 通告栏，这是 NoticeBar 通告栏"></uni-notice-bar> -->
			<uni-notice-bar showIcon="true" text="让每个人都能享受到电影带来的乐趣!"></uni-notice-bar>
			<uni-notice-bar showIcon="true" text="微信小程序搜索: 痕迹电影"></uni-notice-bar>
		</view>

		<view class="search">
			<uni-easyinput clearable type="text" v-model="searchKey" placeholder="请输入影视关键字来搜索" maxlength=20 clearSize=30
				confirmType="search">
			</uni-easyinput>
			<button @click="getSearch('fpdy')" style="display: flex; justify-content: center;">
				搜索
				<view style="color: #CCCCCC;padding-left: 10rpx;">
					(接口来源:fpdy)
				</view>


			</button>
			<button @click="getSearch('btdx')" style="display: flex; justify-content: center;">
				搜索
				<view style="color: #CCCCCC;padding-left: 10rpx;">
					(接口来源:btdx)
				</view>


			</button>
		</view>
		<view v-if="ishow_use">
			<ul>
				<li v-for="item in use_about" style="margin-top: 10rpx;">
					<br>
					<span class="use_title">{{item}}</span>
				</li>
			</ul>
		</view>


		<view class="srcbox">
			<h1 style="color:red">{{searchTitle}}</h1>
			<view scroll-y="true" v-for="(item,index) in article" style="margin-top: 40rpx;">
				<span class="movie_title">{{index+1}}.{{item.title}}</span>
				<view style="height:40rpx"></view>

				<uni-card v-for="(v,i) in item.data" mode="basic" :is-shadow="false" :isFull="true" note="true"
					style="margin-top: 50rpx;">
					{{v.type}} : {{v.copySrc}}

					<template v-slot:footer>
						<view class="footer-box">
							<view @click="copySrc(`${v.copySrc}`)">复制链接</view>
							<view @click="getDetails(`${item.detail_src}`)">查看详情</view>
						</view>
					</template>

				</uni-card>


				<!-- <text selectable="true"></text> -->
			</view>
		</view>

		<view style="text-align: left;padding: 28rpx;text-indent:2em;color: #ccc;">
			本站所有资源均来自互联网，本站只提供展示，并不提供影片资源存储，本站也不参与录制、上传,仅供网吧及个人用户测试带宽使用，请于下载后24小时内删除，版权归原电影公司所有。
			</p>
			<p>
				若本站收集的内容无意侵犯了贵司版权，请联系我们将在第一时间通过（屏蔽关键词）或（删除）相应资源！
			</p>

		</view>


	</view>


</template>

<script>
	import {
		getDownloadSrc
	} from '../../api/index.js'
	export default {
		data() {
			return {
				title: 'Hello',
				searchKey: '',
				searchTitle: '',
				article: [],
				ishow_use: true,
				ban_KeyList: ["av"],
				// good_KeyList: ["褚明朕", "王鲁", "季永亮", "崔宇烁", "宋元鑫"],
				use_about: [
					"1.磁力链接：使用迅雷等bt工具下载magnet",
					"2.ftp链接：使用迅雷等工具下载ftp",
					"3.电驴ed2k链接：使用迅雷、百度网盘离线下载ed2k",
					"4.迅雷云盘、阿里云盘、百度网盘等直接观看",
				],

			}
		},
		onLoad() {

		},
		methods: {

			getDetails(value) {
				uni.navigateTo({
					url: '/pages/more/details?src=' + value
				});
			},
			copySrc(value) {
				uni.showModal({
					content: value,
					confirmText: '复制内容',
					success: (res) => {
						if (res.confirm) {
							uni.setClipboardData({
								data: value,
								success: () => {
									uni.showToast({
										title: '复制成功'
									})
								}
							});
						} else {
							console.log("取消复制")
						}

					},

				});
			},

			async getSearch(typeStr) {

				// if (!this.checkLogin()) {
				// 	uni.showToast({
				// 		title: "该功能登陆后使用~",
				// 		icon: "none",
				// 		position: 'bottom',
				// 		duration: 3000
				// 	})
				// 	return false
				// }


				let searchKey = this.searchKey
				this.article.length = 0
				if (!searchKey) {
					this.ishow_use = false
					this.searchTitle = "搜索的关键词无效！请重新输入!"
					return false
				}


				if (this.ban_KeyList.indexOf(searchKey) > -1) {
					this.ishow_use = false
					this.searchTitle = "请不要搜索相关资源！"
					return false
				}

				if (searchKey == "王孟英") {
					this.ishow_use = false
					this.searchTitle = "是那个男人！"
					return false
				}



				let postData = {
						searchKey,
						typeStr
				}
				this.showLoading("搜索中")
				await getDownloadSrc(postData 
					)
					.then((res) => {
						console.log(res)
						if (res.status !== 200) {
							this.hideLoading()
							uni.showToast({
								title: "搜索接口异常！ 请联系客服或者稍后再试！",
								icon: "none",
								position: 'bottom',
								duration: 5000
							})

							this.ishow_use = false
							this.searchTitle = "搜索接口异常！ 请联系客服或者稍后再试！"
							return false
						}
						this.ishow_use = false
						this.searchTitle = res.data.title
						this.article = res.data.data_array
						this.hideLoading()

					})
					.catch((err) => {
						console.log(err)
						uni.showToast({
							title: "请求失败！请联系管理员！",
							icon: "none",
							position: 'bottom',
							duration: 3000
						})
					})


			},

			// markSrc(value) {

				// uni.showToast({
				// 	title: "该功能陆续开发中~",
				// 	icon: "none",
				// 	position: 'bottom',
				// 	duration: 3000
				// })
				// return false


				// uni.showModal({
				// 	content: value,
				// 	confirmText: '收藏内容',
				// 	success: (res) => {
				// 		if (res.confirm) {
				// 			uni.showToast({
				// 				title: '收藏成功'
				// 			})
				// 		} else {
				// 			console.log("取消复制")
				// 		}

				// 	},

				// });
			// }

		}
	}
</script>

<style lang="scss">
	.banner {
		padding: 40rpx;

		.use_title {
			padding-left: 10rpx;
			color: #757373;
			font-weight: 600;
		}

		.search {
			margin-top: 50rpx;
			font-size: 20rpx;


			input {
				height: 80rpx;
			}

			button {
				margin-top: 20rpx;
			}



		}

		.srcbox {
			margin-top: 40rpx;
			// word-break: break-all;
			padding-top: 20rpx;

			h1 {
				font-weight: 600;
				font-size: 40rpx;
			}

			.footer-box {
				color: #337ab7;
				display: flex;
				flex-direction: row;
				justify-content: space-between;
			}

			.movie_title {
				padding-left: 15rpx;
				// color: #00b3ee;
				color: #337ab7;
				font-weight: 600;
				border-left: 8px solid #337ab7;
			}

			.uni-card {
				margin-top: 30rpx;
			}
		}

	}
</style>
