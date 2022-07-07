<template>
	<view class="banner">

		<!-- 公告栏 -->
		<view>
			<uni-notice-bar class='bar' showIcon="true" :text='notice_text'>
			</uni-notice-bar>
		</view>
		<!-- 搜索框 -->
		<view class="search">
			<uni-easyinput clearable type="text" v-model="searchKey" placeholder="请输入影视关键字来搜索"
				placeholder-class="center" maxlength=20 clearSize=30 confirmType="search">
			</uni-easyinput>
			<!-- 搜索按钮 -->
			<view v-for="site in searchSite">
				<button plain   @click="getSearch(site)" style="display: flex; justify-content: center;">
					搜索
					<view style="color: #CCCCCC;padding-left: 10rpx;">
						(来源:{{site}})
					</view>
				</button>
			</view>
		</view>

		<!-- 使用帮助 -->
		<view v-if="ishow_use">
			<ul>
				<li v-for="item in use_about" style="margin-top: 10rpx;">
					<br>
					<span class="use_title">{{item}}</span>
				</li>
			</ul>
		</view>

		<!-- 搜索结果展示 -->
		<view class="srcbox">
			<view style="color:#4d4442">{{searchTitle}}</view>
			<view v-if=" typeStr =='fpdy'">
				<view scroll-y="true" v-for="(item,index) in article" style="margin-top: 40rpx;">
					<span class="movie_title">{{index+1}}.{{item.title}}</span>
					<view style="height:40rpx"></view>
					<uni-card v-for="(v,i) in item.data" mode="basic" :is-shadow="false" :isFull="true" note="true"
						style="margin-top: 50rpx;">
						{{v.type}} : {{v.copySrc}}

						<template v-slot:footer>
							<view class="footer-box">
								<view @click="copySrc(`${v.copySrc}`)">复制链接</view>
								<view @click="getDetails(`${item.detail_src}`,'fpdy')">查看详情</view>
							</view>
						</template>

					</uni-card>
				</view>
			</view>

			<view v-if=" typeStr =='btdx' ">
				<view scroll-y="true" style="margin-top: 40rpx;">
					<uni-list v-for="(item,index) in article" :border="false">
						<uni-list-item :title="`{{index+1}}.{{item.title}}`" :note='`{{item.date}}`' :key='index'
							:thumb="item.imgSrc" rightText="点击查看" :clickable='true'
							@click="getDetails(`${item.blankSrc}`,'btdx')">
						</uni-list-item>
					</uni-list>
				</view>
			</view>


			<view v-if="typeStr == 'btba'">
				<view scroll-y="true" style="margin-top: 40rpx;">
					<uni-list v-for="(item,index) in article" :border="false">
						<uni-list-item :title="`{{item.title}}`" :note='`{{item.date}}`' :key='index' thumbSize='lg'
							:thumb="base64_img" rightText="点击查看" :clickable='true'
							@click="getDetails(`${item.blankSrc}`,'btba')">
						</uni-list-item>
					</uni-list>
				</view>
			</view>




		</view>

		<!-- 免责声明 -->
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
		getDownloadSrc,
		getImg
	} from '../../api/index.js'
	export default {
		data() {
			return {
				searchSite: ['fpdy', 'btba',  'btdx'],
				notice_text: '让每个人都能享受到电影带来的乐趣！\n 微信小程序搜索：痕迹电影',
				searchKey: '',
				searchTitle: '',
				article: [],
				ishow_use: true,
				ban_KeyList: ["av", 'AV'],
				typeStr: 'fpdy',
				use_about: [
					// "1.磁力链接：使用迅雷等bt工具下载magnet",
					// "2.ftp链接：使用迅雷等工具下载ftp",
					// "3.电驴ed2k链接：使用迅雷、百度网盘离线下载ed2k",
					// "4.迅雷云盘、阿里云盘、百度网盘等直接观看",
				],
				base64_img: '',
			}
		},
		onLoad() {},
		methods: {
			// async getImg(typeStr, imgSrc) {
			// 	let postData = {
			// 		srcStr,
			// 		typeStr
			// 	}
			// 	await getImg(postData).then((data) => {
			// 		let buffer = data.data.res.data
			// 		let base64 = wx.arrayBufferToBase64(buffer);
			// 		let base64_url = base64.replace(/[\r\n]/g, "")
			// 		this.base64_img = 'data:image/png;base64,' + base64_url
			// 	})
			// },
			getDetails(value, type) {
				let data = JSON.stringify({
					src: value,
					type: type
				})

				uni.navigateTo({
					url: '/pages/more/details?data=' + encodeURIComponent(data)
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


				let postData = {
					searchKey,
					typeStr
				}
				this.showLoading("搜索中")

				await getDownloadSrc(postData)
					.then((res) => {
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
						this.typeStr = res.data.typeStr
						this.hideLoading()

					})
					.catch((err) => {
						console.log(err)
						uni.showToast({
							title: "请求失败！请联系客服！",
							icon: "none",
							position: 'bottom',
							duration: 3000
						})
					})


			},

		}
	}
</script>

<style lang="scss">
	button::after {
		border: none;
	}

	.center {
		text-align: center;
	}

	.banner {
		padding: 40rpx;

		.uni-list-item {
			border-top: 2rpx solid #ccc;
		}

		.uni-list-item__container {
			.uni-list--base {
				height: 191rpx;
				width: 142rpx;
			}
		}

		.use_title {
			padding-left: 10rpx;
			color: #757373;
			font-weight: 600;
		}

		.bar>view {
			border-radius: 30rpx;
		}

		.search {
			margin-top: 30rpx;
			font-size: 20rpx;

			.uni-easyinput__content {
				border-radius: 30rpx;
			}

			input {
				font-size: 35rpx;
				height: 100rpx;
				border-radius: 30rpx;

			}

			button {
				color: #4d4442;
				height: 100rpx;
				border-radius: 30rpx;
				margin-top: 20rpx;
				border: 1px solid #e5e5e5;
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
