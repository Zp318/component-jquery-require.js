define(['jquery','jqueryUI'],function($,$UI) {
	function Component() {
		this.config = {
			width:500,
			height:300,
			content:"请配置提示信息......",
			title:"系统消息",
			hasCloseBtn:true,
			closeCallback:null,
			confirmCallback:null,
			confirmBtnVal:"确定",
			skinClassName:null,
			hasMask:true,
			isDraggable:false,
			draggHandle:null
		}

		this.handlers = {}
	}

	Component.prototype={
		on:function(type,handler) {
			if (typeof this.handlers[type] == "undefined") {
				this.handlers[type] = [];
			}
			this.handlers[type].push(handler);
			return this;
		},

		fire:function(type,data) {
			if (this.handlers[type] instanceof Array) {
				var handlers = this.handlers[type];
				for (var i = 0; i < handlers.length; i++) {
					handlers[i](data);
				}
			}
		},

		alert:function(personalConfig) {
			// 合并个人配置
			var CFG = $.extend(this.config,personalConfig),
				that = this;

			// 添加弹窗
			var popup = $(
				`<div class="popup">
					<div class="popup_header">${CFG.title}</div>
					<div class="popup_body">${CFG.content}</div>
					<div class="popup_footer"><div  class="confirm">${CFG.confirmBtnVal}</div></div>
				</div>`
			);
			popup.appendTo('body');

			popup.css({
				width:CFG.width + 'px',
				height:CFG.height + 'px',
				left:(CFG.x || (window.innerWidth-CFG.width)/2) + 'px',
				top:(CFG.y || (window.innerHeight-CFG.height)/2) + 'px'
			});

			// 添加遮罩层
			var mask = null;
			if(CFG.hasMask){
				mask = $(`<div class="mask"></div>`);
				mask.appendTo('body');
			}

			// 添加关闭按钮
			if (CFG.hasCloseBtn) {
				var closebtn = $(`<div class="close">X</div>`);
				closebtn.appendTo(popup);
				closebtn.on('click',function() {
					// CFG.closeCallback && CFG.closeCallback();
					that.fire('clickClose',"关闭");
					mask && mask.remove();
					popup.remove();
				})
			}

			// 点击确定
			var confirmBtn = popup.find('.confirm');
			confirmBtn.on('click',function() {
				// CFG.confirmCallback && CFG.confirmCallback();
				that.fire('clickConfirm',"确认");
				mask && mask.remove();
				popup.remove();
			})

			// 添加拖动
			if (CFG.isDraggable) {
				if (CFG.draggHandle) {
					popup.draggable({handle:CFG.draggHandle});
				} else {
					popup.draggable({handle:'.popup_header'});
				}
			}

			// 定制皮肤
			if (CFG.skinClassName) {
				popup.addClass(CFG.skinClassName)
			}
		},
		confirm:function() {},
		prompt:function() {}
	}
	return {component:Component}
})