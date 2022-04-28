<template>
	<view>
		<uni-collapse>
			<uni-collapse-item title="影视搜索" open="true" showAnimation="true">
				<view>
					<uni-list>
						<uni-list-item  v-for="(v,i) in movie_list" :title="v.title" :note="v.note" clickable @click="copySrc(v.note)" rightText="点击复制">
						</uni-list-item>
					</uni-list>
				</view>
			</uni-collapse-item>
			
			
			<uni-collapse-item title="电子书" open="true" showAnimation="true">
				<view>
					<uni-list>
						<uni-list-item  v-for="(v,i) in movie_list" :title="v.title" :note="v.note" clickable @click="copySrc(v.note)" rightText="点击复制">
						</uni-list-item>
					</uni-list>
				</view>
			</uni-collapse-item>
			
			
		</uni-collapse>
		
		


	</view>
</template>

<script>
	export default {
		data() {
			return {
				movie_list: [{
					note: 'www.baidu.com',
					title: "百度网站"
				},
				
				{
					note: 'www.baidu.com',
					title: "百度网站"
				},
				{
					note: 'www.baidu.com',
					title: "百度网站"
				}
				]
			}
		},
		methods:{
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
		}
	}
</script>

<style>
</style>
