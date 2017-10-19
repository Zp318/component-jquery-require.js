define(['jquery','jqueryUI'],function($,$UI) {
	function Window() {
		// 弹框默认配置
		this.config = {
			width:500,
			height:300,
			content:"",
			title:"系统消息",
			confirmHandler:null,
			hasCloseBtn:false,
			closeHandler:null,
			skinClassName:null,
			confirmBtnVal:"确定",
			hasMask:true,
			isDraggable:true,
			dragHandle:null
		}
	};

	Window.prototype = {
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
			var mask = null;
			if (CFG.hasMask) {
				mask = $('<div class="mask"></div>');
				mask.appendTo('body');
			}

			// 添加弹窗关闭
			var confirmBtn = boundingBox.find('.confirmBtn');
			confirmBtn.on("click",function() {
				CFG.confirmHandler && CFG.confirmHandler();
				boundingBox.remove();
				mask && mask.remove();
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
					CFG.closeHandler && CFG.closeHandler();
					boundingBox.remove();
					mask && mask.remove();
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
			}
		},
		confirm:function() {},
		prompt:function() {}
	}

	return {Window:Window}
})