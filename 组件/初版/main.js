require.config({
	paths:{
		jquery:'../jquery-3.2.1.min',
		jqueryUI:'http://code.jquery.com/ui/1.12.0/jquery-ui.min'
	}
})

require(['jquery','window'],function($,w) {
	$("#a").on('click',function() {
		new w.Window().alert({
			title:'提示信息',
			width:300,
			height:150,
			y:100,
			content:'welcome to my component!',
			confirmHandler:function(){
				console.log('you click the "confirm"');
			},
			hasCloseBtn:true,
			closeHandler:function(){
				console.log('you click the "close"');
			},
			skinClassName:'',
			confirmBtnVal:'YES',
			dragHandle:'.boundingBox_header'
		});
	});
})