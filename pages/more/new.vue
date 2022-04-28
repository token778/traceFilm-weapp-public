<template>
	<view v-if="isShow">
		<uni-collapse>
			<uni-collapse-item title="最近更新" open="true" showAnimation="true">
				<view>
					<uni-list>
						<!-- :thumb="v.img_src" -->
						<uni-list-item thumb-size="lg"  v-for="(v,i) in movie_list" :title="v.title"
							:note="v.time" clickable @click="copySrc(v.href)" rightText="点击查看">
						</uni-list-item>
					</uni-list>
				</view>
			</uni-collapse-item>

<!-- 
			<uni-collapse-item title="最近更新" open="true" showAnimation="true">
				<view>
					<uni-list>
						<uni-list-item v-for="(v,i) in movie_list" :title="v.title" :note="v.note" clickable
							@click="copySrc(v.note)" rightText="点击查看">
						</uni-list-item>
					</uni-list>
				</view>
			</uni-collapse-item> -->


		</uni-collapse>

	</view>
</template>

<script>
	import {
		getMore
	} from '../../api/index.js'

	export default {
		data() {
			return {
				isShow:false,
				movie_list: []
			}
		},
		onLoad() {
			uni.showLoading({
				title: '加载中'
			});
			this.getNew()
		},
		methods: {
			async getNew(key) {  
				
			
				
				
				await getMore(key) 
					.then((res) => {
						console.log(res)
						
						
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
						
						uni.hideLoading()
						this.isShow = true
						this.movie_list = res.data.data_array
						
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



			async copySrc(value) {
				uni.navigateTo({
				    url: '/pages/more/details?src='+value
				});
				
				// uni.switchTab({
				//        url: '/pages/index/index'
				// })
				
				
				
				
				
				
				
				// uni.showModal({
				// 	content: value,
				// 	confirmText: '复制内容',
				// 	success: (res) => {
				// 		if (res.confirm) {
				// 			uni.setClipboardData({
				// 				data: value,
				// 				success: () => {
				// 					uni.showToast({
				// 						title: '复制成功'
				// 					})
				// 				}
				// 			});
				// 		} else {
				// 			console.log("取消复制")
				// 		}

				// 	},

				// });
			},
		}
	}
</script>

<style lang="scss">
	.uni-list-item__icon {
		margin-right: 2rpx !important;
	}


	.uni-list--lg {
		height: 130rpx !important;
		width: 115rpx !important;
	}

	.uni-list-item__content-note {
		margin-top: 24rpx !important;
		color: #999;
		font-size: 24rpx;
		overflow: hidden;
	}
</style>
