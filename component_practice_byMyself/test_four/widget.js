define(['jquery'],function($) {
	function Widget() {
		this.popup = null;
		this.handlers = {};
	}

	Widget.prototype = {
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
		renderUI:function() {},
		bindUI:function() {},
		syncUI:function() {},
		render:function(container) {
			this.handlers = {};
			this.renderUI();
			this.bindUI();
			this.syncUI();
			$(container || document.body).append(this.popup);
		},
		destructor:function() {},
		destory:function() {
			this.destructor();
			this.popup.off();
			this.popup.remove();
		}
	}
	return {widget:Widget}
})