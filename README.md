# leftTimer
js 倒计时（可自定义样式）

在元素（如span）中输出一个剩余时间秒数（如3600，表示1小时），然后再调用些插件即可

    示例（jquery 选择器）：
	leftTimer.run($('.countdown'));
	leftTimer.run($('.countdown'), 'D天H时M分S秒');
	leftTimer.run($('.countdown'), 'D天H时M分S秒', function(obj){
	  // do some things
	  // obj.html('已结束'); 或 location.reload();
	});
	 *
	示例（原生选择器）：
	leftTimer.run(document.querySelectorAll('.countdown'));
	leftTimer.run(document.querySelectorAll('.countdown'), 'D天H时M分S秒');
	leftTimer.run(document.querySelectorAll('.countdown'), 'D天H时M分S秒', function(obj){
	  // do some things
	  // obj.innerHTML = '已结束'; 或 location.reload();
	});