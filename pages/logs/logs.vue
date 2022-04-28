<template>
	<view>
		<timeline>
			<timelineItem :leftTime='item.time' v-for="item in timelineList">
				<view class="tripItem">
					<view class="title">{{item.title}}</view>
					<pre class="tips">{{item.content}}</pre>
				</view>
			</timelineItem>
		</timeline>
	</view>
</template>

<script>
	import timeline from '../../components/chenbin-timeline/timeLine.vue'
	import timelineItem from '../../components/chenbin-timeline/timelineItem.vue'

	export default {
		data() {
			return {
				avatarUrl: '',
				nickName: '',
				// \n2.添加分享功能
				timelineList: [
					{
						time: '2021-10-1',
						title: '更新',
						content: '1.删除意见反馈功能;\n2.修改若干细节;\n3.国庆节祝福祖国生日快乐~'
					},
					{
						time: '2021-7-23',
						title: '更新',
						content: '1.页面样式优化;\n2.添加分享功能;\n3.添加在线客服功能'
					},
					{
						time: '2021-6-26',
						title: '更新',
						content: '1.添加免责声明;\n2.添加最近更新页面;\n3.添加查看详情功能；\n4.页面样式优化;'
					},
					{
						time: '2021-6-25',
						title: '更新',
						content: '1.修复ftp链接显示异常问题;\n2.搜索引擎改用nodejs爬虫策略;\n3.支持不登录搜索'
					},
					{
						time: '2021-5-16',
						title: '版本发布',
						content: '1.小程序1.0版本上线'
					},
					{
						time: '2021-5-15',
						title: '更新',
						content: '1.优化请求逻辑;\n2.删除跳转登陆页面功能;\n3.增加意见反馈功能'
					}
					, {
						time: '2021-5-13',
						title: '更新',
						content: '1.增加微信授权登陆功能;\n' +
							'2.增加影片搜索功能;\n'
					}


				]

			};
		},
		components: {
			timeline,
			timelineItem
		}
	}
</script>

<style lang="scss">
	.tripItem {
		height: auto;
		padding: 20rpx 30rpx;
		box-sizing: border-box;
		background: rgba(255, 255, 255, 1);
		box-shadow: 0px 0px 20px 0px rgba(0, 0, 0, 0.08);
		border-radius: 10px;
		margin-bottom: 30rpx;

		.title {
			font-size: 30rpx;
			font-weight: 600;
			color: rgba(51, 51, 51, 1);
		}

		.tips {
			white-space: pre-line;
			font-size: 30rpx;
			font-weight: 400;
			color: rgba(153, 153, 153, 1);
			margin-top: 20rpx;

		}
	}
</style>
