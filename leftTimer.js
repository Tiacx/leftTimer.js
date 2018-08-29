/**
 * 倒计时 Create By TuJia @2017.10.17
 * 使用方法：
 * leftTimer.run(container[,theme][,callback]);
 *
 * 支持 jQuery选择器 及 原生选择器（不依赖jQuery）
 * 
 * 示例（jquery 选择器）：
 * leftTimer.run($('.countdown'));
 * leftTimer.run($('.countdown'), 'D天H时M分S秒');
 * leftTimer.run($('.countdown'), 'D天H时M分S秒', function(obj){
 *   // do some things
 *   // obj.html('已结束'); 或 location.reload();
 * });
 *
 * 示例（原生选择器）：
 * leftTimer.run(document.querySelectorAll('.countdown'));
 * leftTimer.run(document.querySelectorAll('.countdown'), 'D天H时M分S秒');
 * leftTimer.run(document.querySelectorAll('.countdown'), 'D天H时M分S秒', function(obj){
 *   // do some things
 *   // obj.innerHTML = '已结束'; 或 location.reload();
 * });
 */

var leftTimer = {
    startTime:0,
    count:0,
    interval:1000,
    oneday:3600 * 24,
    str:'',
    day:0,
    hour:0,
    minute:0,
    second:0,
    show_day:false,
    show_hour:false,
    show_minute:false,
    show_second:false,
    offset:0,
    next_time:0,
    run:function(container, theme, cb){
        var scope       = this;
        
        scope.startTime = new Date().getTime();
        scope.next_time  = scope.interval;
        scope.count     = 0;
        scope.offset    = 0;
        
        theme           = theme || "D天H时M分S秒";
        cb              = cb || function(){ location.reload() };
        
        scope.show_day    = theme.indexOf('D')!=-1;
        scope.show_hour   = theme.indexOf('H')!=-1;
        scope.show_minute = theme.indexOf('M')!=-1;
        scope.show_second = theme.indexOf('S')!=-1;

        for(var i=0,len=container.length; i<len; i++){
        	var _this = container[i];
        	_this.setAttribute('data-lefttime', parseInt(_this.innerHTML));
        	_this.innerHTML = 'loading...';
        }
        scope.countdown(container, theme, cb);
    },
    countdown:function(container, theme, cb){
        var scope = this;

        scope.offset      = new Date().getTime() - (scope.startTime + scope.count * scope.interval);
        scope.next_time   = scope.interval - scope.offset;

        if(scope.countdown_timer) window.clearTimeout(scope.countdown_timer);
        scope.countdown_timer = window.setTimeout(function(){
            for(var i=0,len=container.length; i<len; i++){
	            var obj 	 = container[i];
	            var lefttime = obj.getAttribute('data-lefttime');
	            lefttime--;
	            obj.setAttribute('data-lefttime', lefttime);

	            if(lefttime==0){
	                // 回调
                    if($) obj = $(obj);
	                cb(obj);
	            }else if(lefttime<0){
	            	// code
	            }else{
	            	scope.day    = Math.floor(lefttime / scope.oneday);//还有几天
		            scope.hour   = Math.floor((lefttime - scope.day * scope.oneday) / 3600);//还有几小时
		            scope.minute = Math.floor((lefttime - scope.day * scope.oneday - 3600 * scope.hour) / 60);//还有几小时
		            scope.second = lefttime - scope.day * scope.oneday - 3600 * scope.hour - 60 * scope.minute;//还有几秒

		            if(scope.show_day==false) scope.hour += scope.day*24;
		            if(scope.show_hour==false) scope.minute += scope.hour*60;
		            if(scope.show_minute==false) scope.second += scope.minute*60;

		            scope.str = '';
		            scope.str = theme.replace('D', scope.day);
		            scope.str = scope.str.replace('H', scope.hour);
		            scope.str = scope.str.replace('M', scope.minute);
		            scope.str = scope.str.replace('S', scope.second);
		            obj.innerHTML = scope.str;
	            }
	        }

            scope.count++;

            scope.countdown(container, theme, cb);
        }, scope.next_time);
    }
};
