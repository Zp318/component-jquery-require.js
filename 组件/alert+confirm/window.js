define(['widget','jquery','jqueryUI'],function(widget,$,$UI) {
	function Window() {
		// 弹框默认配置
		this.config = {
			width:500,
			height:300,
			content:"",
			title:"系统消息",
			hasCloseBtn:false,
			skinClassName:null,
			textAlert:"确定",
			hasMask:true,
			isDraggable:true,
			dragHandle:null,
			alertHandler:null,
			closeHandler:null,
			textConfirm:'确定',
			textCancle:'取消',
			confirmHandler:null,
			cancleHandler:null
		}
	};

	Window.prototype = $.extend({},new widget.Widget(),{
		renderUI:function() {
			var footerContent = '';
			switch(this.config.winType){
				case 'alert':
				footerContent = `<input class="alertBtn" type="button" value=${this.config.textAlert} />`;
				break;

				case 'confirm':
				footerContent = `<input class="confirmBtn" type="button" value=${this.config.textConfirm} /><input class="cancleBtn" type="button" value=${this.config.textCancle} />`;
				break;
			}
			this.boundingBox = $(
				`<div class="boundingBox">
					<div class="boundingBox_header">${this.config.title}</div>
					<div class="boundingBox_body">${this.config.content}</div>
					<div class="boundingBox_footer">${footerContent}</div>
				</div>`
			);
			if (this.config.hasMask) {
				this.mask = $('<div class="mask"></div>');
				this.mask.appendTo('body');
			};
			if (this.config.hasCloseBtn) {
				this.boundingBox.append('<span class="closeBtn">X</span>');
			};
			this.boundingBox.appendTo(document.body);
		},
		bindUI:function() {
			console.log("________",this.handlers)
			var that = this;
			this.boundingBox.delegate('.alertBtn', 'click', function() {
				that.fire('clickAlert','alert');
				that.destory();
			}).delegate('.closeBtn', 'click', function() {
				that.fire('clickClose','close');
				that.destory();
			}).delegate('.confirmBtn', 'click', function() {
				console.log("++++++++",that.handlers)
				that.fire('clickConfirm','confirm');
				that.destory();
			}).delegate('.cancleBtn', 'click', function() {
				that.fire('clickCancle','cancle');
				that.destory();
			});
			if(this.config.alertHandler){
				this.on('clickAlert',this.config.alertHandler);
			};
			if(this.config.closeHandler){
				this.on('clickClose',this.config.closeHandler);
			};
			if(this.config.confirmHandler){
				this.on('clickConfirm',this.config.confirmHandler);
			};
			if(this.config.cancleHandler){
				this.on('clickCancle',this.config.cancleHandler);
			};
		},
		syncUI:function() {
			this.boundingBox.css({
				width:this.config.width + 'px',
				height:this.config.height + 'px',
				left:(this.config.x || (window.innerWidth-this.config.width)/2) + 'px',
				top:(this.config.y || (window.innerHeight-this.config.height)/2) + 'px'
			});
			if(this.config.skinClassName){
				this.boundingBox.addClass(this.config.skinClassName);
			};
			if(this.config.isDraggable){
				if (this.config.dragHandle) {
					this.boundingBox.draggable({handle:this.config.dragHandle});
				} else {
					this.boundingBox.draggable();
				}
			};
		},
		destructor:function() {
			this.mask && this.mask.remove();
		},
		alert:function(cfg) {
			$.extend(this.config,cfg,{winType:'alert'});
			this.render();
			return this;
		},
		confirm:function(cfg) {
			$.extend(this.config,cfg,{winType:'confirm'});
			this.render();
			return this;
		},
		prompt:function() {}
	})

	return {Window:Window}
})