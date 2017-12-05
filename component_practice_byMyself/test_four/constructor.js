define(['widget','jquery','jqueryUI'],function(w,$,$UI) {
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
			draggHandle:null,

			Aval:"",
			Bval:"",
			Acallback:null,
			Bcallback:null
		}
	}

	Component.prototype=$.extend({},new w.widget(),{
		renderUI:function() {
			var footerContent = "";
			switch(this.config.winType){
				case 'alert':
				footerContent = `<div class="confirm">${this.config.confirmBtnVal}</div>`;
				break;

				case 'confirm':
				footerContent = `<div class="A">${this.config.Aval}</div><div  class="B">${this.config.Bval}</div>`;
				break;
			}
			// 添加弹窗
			this.popup = $(
				`<div class="popup">
					<div class="popup_header">${this.config.title}</div>
					<div class="popup_body">${this.config.content}</div>
					<div class="popup_footer">${footerContent}</div>
				</div>`
			);
			this.popup.appendTo('body');

			// 添加遮罩层
			if(this.config.hasMask){
				this.mask = $(`<div class="mask"></div>`);
				this.mask.appendTo('body');
			}

			// 添加关闭按钮
			if (this.config.hasCloseBtn) {
				this.closebtn = $(`<div class="close">X</div>`);
				this.closebtn.appendTo(this.popup);
			}
		},

		bindUI:function() {
			var that = this;
			this.popup.delegate('.confirm', 'click', function() {
				that.fire('clickConfirm','confirm');
				that.destory();
			}).delegate('.close', 'click', function() {
				that.fire('clickClose','close');
				that.destory();
			}).delegate('.A', 'click', function() {
				that.fire('clickA','A');
				that.destory();
			}).delegate('.B', 'click', function() {
				that.fire('clickB','B');
				that.destory();
			});
			if(this.config.confirmCallback){
				this.on('clickConfirm',this.config.confirmCallback);
			};
			if(this.config.closeCallback){
				this.on('clickClose',this.config.closeCallback);
			}
			if(this.config.Acallback){
				this.on('clickA',this.config.Acallback);
			}
			if(this.config.Bcallback){
				this.on('clickB',this.config.Bcallback);
			}
		},

		syncUI:function() {
			this.popup.css({
				width:this.config.width + 'px',
				height:this.config.height + 'px',
				left:(this.config.x || (window.innerWidth-this.config.width)/2) + 'px',
				top:(this.config.y || (window.innerHeight-this.config.height)/2) + 'px'
			});

			if (this.config.skinClassName) {
				this.popup.addClass(this.config.skinClassName)
			};

			if (this.config.isDraggable) {
				if (this.config.draggHandle) {
					this.popup.draggable({handle:this.config.draggHandle});
				} else {
					this.popup.draggable({handle:'.popup_header'});
				}
			}
		},

		destructor:function() {
			this.mask && this.mask.remove();
		},

		alert:function(personalConfig) {
			// 合并配置对象
			$.extend(this.config,personalConfig,{winType:"alert"});
			this.render();
			return this;
		},

		confirm:function(personalConfig) {
			$.extend(this.config,personalConfig,{winType:"confirm"});
			this.render();
			return this;
		},

		prompt:function() {}
	})
	return {component:Component}
})