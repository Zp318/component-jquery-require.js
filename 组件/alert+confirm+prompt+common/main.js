require.config({
	paths:{
		jquery:'../jquery-3.2.1.min',
		jqueryUI:'../jquery-ui'
	}
})

require(['jquery','window'],function($,w) {
	var win = new w.Window();
	$("#a").on('click',function() {
		win.alert({
			title:'Alert提示框',
			width:300,
			height:150,
			y:100,
			content:'welcome to my component!',
			hasCloseBtn:true,
			skinClassName:'',
			textAlert:'YES',
			dragHandle:'.boundingBox_header',
			alertHandler:function(a) {
				console.log("you do one thing: " + a +" thingone");
			},
			closeHandler:function(a) {
				console.log("you do one thing: " + a +" thingone");
			}
		});
	});

	$("#b").on('click',function() {
		win.confirm({
			width:400,
			height:250,
			content:"Do you confirm?",
			title:"Confirm提示框",
			hasCloseBtn:true,
			skinClassName:null,
			isDraggable:true,
			dragHandle:'.boundingBox_header',
			textConfirm:'YES',
			textCancle:'NO'
		}).on('clickConfirm',function(a) {
			console.log("you do one thing: " + a +" thingone");
		}).on('clickCancle',function(a) {
			console.log("you do one thing: " + a +" thingone");
		}).on('clickClose',function(a) {
			console.log("you do one thing: " + a +" thingone");
		});
	});

	$("#c").on('click',function() {
		win.prompt({
			width:450,
			height:200,
			content:"我们将会为您保密您输入的信息！",
			title:"Prompt提示框",
			hasCloseBtn:true,
			isDraggable:true,
			dragHandle:'.boundingBox_header',
			textConfirmPrompt:'YES',
			textCanclePrompt:'NO',
			defaultPromptInputValue:'real marid',
			isPromptInputPassword:true,
			promptHandler:function(inputValue) {
				console.log("you input value: " + inputValue);
			},
			cancleHandler:function(a) {
				console.log("you do one thing: " + a +" thingone");
			},
			closeHandler:function(a) {
				console.log("you do one thing: " + a +" thingone");
			}
		});
	});

	$("#d").on('click',function() {
		win.common({
			width:400,
			height:200,
			content:"我是一个通用弹框",
			hasCloseBtn:true
		});
	});
});

