<script>
	export default {
		onLaunch: function() {
			console.log('开发者：wangtaishuai')
			if (!wx.cloud) {
				console.error('请使用 2.2.3 或以上的基础库以使用云能力')
			} else {
				wx.cloud.init({
					env: 'demo-2gzc3stf8b5009a7',
					traceUser: true,
				})
			}

		},
		onShow: function() {

		},

		onHide: function() {},
	}
</script>

<style>
	/*每个页面公共css */
</style>
