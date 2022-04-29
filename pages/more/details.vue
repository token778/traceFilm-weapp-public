<template>
	<view v-if="isShow" style="padding-top: 20rpx;">
		<view>
			<h1 style="text-align: center;font-weight: bold;"></h1>
			<uni-card :title="details.title">
				
				<img v-if="details.img_src" :src="details.img_src"></img>
				<span>更新时间：{{details.time}}</span>
				
				<rich-text :nodes="details.info"></rich-text>
			</uni-card>
		</view>

		<view>
			<uni-card v-for="(v,i) in details.data_array" :is-shadow="true" note="true">
				{{v.type}} : {{v.copySrc}}

				<template v-slot:footer>
					<view class="footer-box">
						<view @click="copySrc(`${v.copySrc}`)">复制链接</view>
						<!-- <view @click="markSrc(`${v.copySrc}`)">收藏</view> -->
					</view>
				</template>

			</uni-card>
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
		getMore
	} from '../../api/index.js'

	export default {
		data() {
			return {
				isShow: false,
				movie_list: [],
				details: {}
			}
		},
		onLoad(option) {
			uni.showLoading({
				title: '加载中'
			});
			let data = JSON.parse(decodeURIComponent(option.data) )
			console.log(data)
			this.getDetails(data.src,data.type)
		},
		methods: {
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

			async getDetails(src,type) {
				console.log(src)
				await getMore(src,type)
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
