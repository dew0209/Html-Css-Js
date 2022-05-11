//Ztree
var setting = {
		data: {
			simpleData: {
				enable: true
			},
			//自定义title信息，需要指定title对应数据显示的字段，然后从后台传递相应的字段
			key: {  
	            title: "description"  
	        }
		},
		callback:{
			onClick: zTreeOnClick,
			onDblClick: zTreeOnDblClick
		},
		async: { // 当点击展开树节点时，才去请求后台返回点击节点的子节点数据并加载
	    	dataType:"json",
	    	enable: true,
	    	type:"post",
	    	autoParam:["bm"],
	    	url:"/handle/soHeaderManage/listClassCodeChildrenTree"
	    }
	};
var zNodes ;
$(function() {

	//查询税收分类编码父类ztree
	$.ajax({  
	    async : false,  
	    cache:false,  
	    type: 'POST',  
	    dataType : "json",  
	    url: "http://localhost:8081/invoice_standard"+"/handle/soHeaderManage/listClassCodeZtree",
	    error: function () {
	        alert('请求失败');  
	    },  
	    success:function(data){ //请求成功后处理函数。    
	        zNodes = data;   //把后台封装好的简单Json格式赋给treeNodes  
	    }  
	}); 
	$.fn.zTree.init($("#tree"), setting, zNodes);
});

//树节点双击事件
function zTreeOnDblClick(event, treeId, treeNode) {
	var bm=treeNode.bm;
	refreshIFrame(bm);
};


//树节点单击事件
function zTreeOnClick(event, treeId, treeNode) {
	var bm=treeNode.bm;
	refreshIFrame(bm);
};

//刷新IFRAME子页面
function refreshIFrame(bm) {
	$('#listFrame').contents().find("#bm").val(bm);
	$('#listFrame')[0].contentWindow.refresh();
}
