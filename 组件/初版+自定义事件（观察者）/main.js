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
			title:'提示信息',
			width:300,
			height:150,
			y:100,
			content:'welcome to my component!',
			hasCloseBtn:true,
			skinClassName:'',
			confirmBtnVal:'YES',
			dragHandle:'.boundingBox_header'
		});
	});
	win.on('clickConfirm',function(a) {
		console.log("you do one thing: " + a +" thingone");
	}).on('clickConfirm',function(a) {
		console.log("you do one thing: " + a +" thingtwo");
	}).on('clickClose',function(a) {
		console.log("you do one thing: " + a +" thingone");
	});
});

