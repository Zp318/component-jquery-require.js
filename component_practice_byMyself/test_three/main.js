require.config({
	paths:{
		'jquery':'../jquery-3.2.1.min',
		'jqueryUI':'../jquery-ui'
	}
});

require(['jquery','constructor'],function($,c) {
	var oC = new c.component();
	$("#alert").on('click',function() {
		oC.alert({
			width:450,
			height:300,
			content:"This is an awesome alert which indicates that everything is ok ",
			title:"Way to go",
			confirmCallback:function() {
				console.log("click confirm");
			},
			closeCallback:function() {
				console.log("click close");
			},
			skinClassName:"skin_a",
			confirmBtnVal:"OK",
			isDraggable:true
		});
	});
});