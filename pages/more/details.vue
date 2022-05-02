<template>
	<view v-if="isShow" style="padding-top: 20rpx;">
		<view>
			<h1 style="text-align: center;font-weight: bold;"></h1>
			<uni-card :title="details.title">
				<view v-if="details.typeStr == 'btba'">
					<img :src="base64_img"></img>
				</view>
				<view v-else>
					<img v-if="details.img_src" :src="details.img_src"></img>
					<span>更新时间：{{details.time}}</span>
				</view>
				<rich-text :nodes="details.info"></rich-text>
			</uni-card>
		</view>

		<view>
			<uni-card v-for="(v,i) in details.data_array" :is-shadow="true" note="true">

				<view v-if="details.typeStr == 'btba'">
					{{v.copySrc}}
				</view>

				<view v-else>
					{{v.type}} :{{v.copySrc}}
				</view>


				<template v-slot:footer>
					<view class="footer-box">
						<view v-if="details.typeStr == 'btba'" @click="openBtbaDownSrc('btba_src',`${v.href}`)">查看链接
						</view>
						<view v-else @click="copySrc(`${v.copySrc}`)">复制链接</view>
						<!-- <view @click="markSrc(`${v.copySrc}`)">收藏</view> -->
					</view>
				</template>

			</uni-card>

			<uni-popup ref="popup" background-color="#fff">
				<view>
					<button @click="copySrc(btbaDownSrc.magnet)">复制磁力链接</button>
					<button @click="copySrc(btbaDownSrc.xl)">复制迅雷链接</button>
				</view>
			</uni-popup>
		</view>


		<view style="text-align: left;padding: 28rpx;text-indent:2em;color: #ccc;">
			<p>
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
		getMore,
		getImg,
		getBtbaDownSrc
	} from '../../api/index.js'

	export default {
		data() {
			return {
				isShow: false,
				movie_list: [],
				details: {},
				base64_img: '',
				btbaDownSrc: []
			}
		},
		onLoad(option) {
			uni.showLoading({
				title: '加载中'
			});
			let data = JSON.parse(decodeURIComponent(option.data))
			let postData = {
				detailSrc: data.src,
				typeStr: data.type
			}
			this.getDetails(postData)
		},
		methods: {
			async openBtbaDownSrc(typeStr, srcStr) {
				uni.showLoading({
					title: '加载中'
				});
				await this.getDownSrc(typeStr, srcStr)
				this.hideLoading()
				this.$refs.popup.open('top')
				console.log(this.btbaDownSrc)
			},

			async getDownSrc(typeStr, srcStr) {
				let postData = {
					srcStr,
					typeStr
				}

				await getBtbaDownSrc(postData).then((data) => {
					this.btbaDownSrc = data.data
				})


			},


			async getImg(typeStr, srcStr) {
				let postData = {
					srcStr,
					typeStr
				}
				await getImg(postData).then((data) => {
					let buffer = data.data.res.data
					let base64 = wx.arrayBufferToBase64(buffer);
					let base64_url = base64.replace(/[\r\n]/g, "")
					this.base64_img = 'data:image/png;base64,' + base64_url
				})
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

			async getDetails(postData) {
				await getMore(postData)
					.then((res) => {

						if (res.status !== 200) {
							this.hideLoading()
							uni.showToast({
								title: "搜索接口异常！ 请尝试更换搜索引擎！",
								icon: "none",
								position: 'bottom',
								duration: 5000
							})
							return false
						}


						this.details = res.data
						uni.hideLoading()
						this.isShow = true
						this.getImg('btba', this.details.img_src)
						return false


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

			}
		},

	}
</script>

<style lang="scss">
	image {
		width: 640rpx;
		height: 700rpx;
	}

	.uni-card__header-title-text {
		font-weight: bold !important;
		text-align: center !important;
	}

	.footer-box {
		color: #337ab7;
		display: flex;
		flex-direction: row;
		justify-content: space-between;
	}
</style>
