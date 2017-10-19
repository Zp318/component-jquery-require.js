define(['jquery','jqueryUI'],function($,$UI) {
	function Window() {
		// 弹框默认配置
		this.config = {
			width:500,
			height:300,
			content:"",
			title:"系统消息",
			hasCloseBtn:false,
			skinClassName:null,
			confirmBtnVal:"确定",
			hasMask:true,
			isDraggable:true,
			dragHandle:null
		},
		this.handlers = {}
	};

	Window.prototype = {
		// 实质就是观察者模式  on注册对应事件的回调函数 fire触发对应事件的所有注册函数
		on:function(type,handler) {
			if (typeof this.handlers[type] == 'undefined') {
				this.handlers[type] = [];
			}
			this.handlers[type].push(handler);
			return this;
		},
		fire:function(type,data) {
			if (this.handlers[type] instanceof Array) {
				var handlers = this.handlers[type];
				for (var i=0,len=handlers.length; i < len; i++) {
					handlers[i](data);
				}
			}
		},
		alert:function(cfg) {
			// 合并配置对象
			var CFG = $.extend(this.config,cfg);

			// 添加弹窗
			var boundingBox = $(
				`<div class="boundingBox">
					<div class="boundingBox_header">${CFG.title}</div>
					<div class="boundingBox_body">${CFG.content}</div>
					<div class="boundingBox_footer"><input class="confirmBtn" type="button" value=${CFG.confirmBtnVal} /></div>
				</div>`
			);
			boundingBox.appendTo('body');

			// 遮罩层
			var mask = null,
				that = this;
			if (CFG.hasMask) {
				mask = $('<div class="mask"></div>');
				mask.appendTo('body');
			}

			// 添加弹窗关闭
			var confirmBtn = boundingBox.find('.confirmBtn');
			confirmBtn.on("click",function() {
				// CFG.confirmHandler && CFG.confirmHandler();
				boundingBox.remove();
				mask && mask.remove();
				that.fire('clickConfirm',"点击确定");
			});

			// 定制弹框宽高和位置
			boundingBox.css({
				width:CFG.width + 'px',
				height:CFG.height + 'px',
				left:(CFG.x || (window.innerWidth-CFG.width)/2) + 'px',
				top:(CFG.y || (window.innerHeight-CFG.height)/2) + 'px'
			});

			// 定制关闭按钮
			if (CFG.hasCloseBtn) {
				var closeBtn = $('<span class="closeBtn">X</span>');
				closeBtn.appendTo(boundingBox);
				closeBtn.on("click",function(){
					// CFG.closeHandler && CFG.closeHandler();
					boundingBox.remove();
					mask && mask.remove();
					that.fire('clickClose',"点击关闭");
				});
			};

			// 定制皮肤
			if (CFG.skinClassName) {
				boundingBox.addClass(CFG.skinClassName);
			};

			// 是否可拖动及设置拖动把手
			if (CFG.isDraggable) {
				if (CFG.dragHandle) {
					boundingBox.draggable({handle:CFG.dragHandle});
				} else {
					boundingBox.draggable();
				}
			};

			return this;
		},
		confirm:function() {},
		prompt:function() {}
	}

	return {Window:Window}
})