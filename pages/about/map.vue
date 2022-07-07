<template>
	<view style="padding-bottom:40px;">

		<uni-collapse>
			<uni-collapse-item title="磁力资源" :open="true">
				<uni-list v-for="(item,index) in magentMoviesList">
					<uni-list-item :title="item.title" :note="item.note" rightText="点击复制" :clickable='true'
						@click="copySrc(`${item.note}`)"></uni-list-item>
				</uni-list>
			</uni-collapse-item>
			<uni-collapse-item title="在线影视" :open="true">
				<uni-list v-for="(item,index) in onlineMoviesList">
					<uni-list-item :title="item.title" :note="item.note" rightText="点击复制" :clickable='true'
						@click="copySrc(`${item.note}`)"></uni-list-item>
				</uni-list>
			</uni-collapse-item>

		</uni-collapse>


	</view>
</template>


<script>
	export default {
		data() {
			return {
				magentMoviesList: [
					{
						title: '分派电影',
						note: 'https://www.ifenpaidy.com/'
					},
					{
						title: '比特大雄',
						note: 'https://www.btdx8.com/'
					},
					{
						title: '电影天堂',
						note: 'https://www.dy2018.com/'
					},
					
					{
						title: '电影FM',
						note: 'https://dianying.fm/'
					},

					{
						title: 'NEW字幕组',
						note: 'https://newzmz.com/'
					},
					{
						title: '高清电影天堂',
						note: 'https://www.bddytt.com/'
					},
					{
						title: '电影先生',
						note: 'https://dyxs20.com/'
					},
					{
						title: '深影译站',
						note: 'https://sub.shinybbs.vip/'
					},
					{
						title: '霸王龙压制组',
						note: 'https://t-rex.tzfile.com/'
					},

				],
				onlineMoviesList: [
					{
						title: '奈菲影视',
						note: 'https://www.nfyingshi.com/'
					},
					{
						title: 'NO视频',
						note: 'https://www.novipnoad.com/'
					},
					{
						title: '1号影院',
						note: 'https://www.1hmv.com/'
					},
					{
						title: '雪人影院',
						note: 'https://www.xuerenyy.top/'
					},

				]
			}

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

		},
	}
</script>

<style>
</style>
