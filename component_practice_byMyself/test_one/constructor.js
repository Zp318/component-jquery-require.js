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
	}

	Component.prototype={
		alert:function(personalConfig) {
			// 合并个人配置
			var CFG = $.extend(this.config,personalConfig);

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
				top:(CFG.x || (window.innerHeight-CFG.height)/2) + 'px'
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
					CFG.closeCallback && CFG.closeCallback();
					mask && mask.remove();
					popup.remove();
				})
			}

			// 点击确定
			var confirmBtn = popup.find('.confirm');
			confirmBtn.on('click',function() {
				CFG.confirmCallback && CFG.confirmCallback();
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