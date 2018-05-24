(function(){
	
	var _dom;
	var _name;
	var selectTree = {
	    _setting:{
			view: {
				dblClickExpand: false
			},
			data: {
				simpleData: {
					enable: true
				}
			},
			callback: {
				beforeClick: function (treeId, treeNode) {
					console.log("点击事件");
				 	var num = treeId.split('TreeDemo')[0];
				 	//if("regulatoryUnit" != num){
				 		var check = (treeNode && !treeNode.isParent);
						if (!check) layer.msg("不能选择父级节点，请选择子级节点");
						return check;
				 	//}
				},
				onClick: function(e, treeId, treeNode){
					console.log("onclick点击事件");
					var zTree = $.fn.zTree.getZTreeObj(treeId),
					nodes = zTree.getSelectedNodes(),
					v = "";
					code="";
					nodes.sort(function compare(a,b){return a.id-b.id;});
					for (var i=0, l=nodes.length; i<l; i++) {
						v += nodes[i].name + ",";
						code = nodes[i].id;
					}
					if (v.length > 0 ) v = v.substring(0, v.length-1);
					var num = treeId.split('TreeDemo')[0];
					var cityObj = $("#"+num);
					var addV;
					//if(cityObj.attr("value")){
						//addV = cityObj.attr("value")+','+v;
					//}else{
						addV = v;
					//}
					
					cityObj.attr("value", addV);
					cityObj.attr("data-code", code);
					var hiddenV ;
					//if($("input[name='"+ num + "']").attr("value")){
					//	hiddenV = $("input[name='"+ num + "']").attr("value")+','+code;
					//}else{
						hiddenV = code;
					//}
					$("input[name='"+ num + "']").attr("value",hiddenV);
			     	selectTree.hideMenu(num);
				}
			}
		},
		init:function(dom,code,id,name,text){
			console.log("name:"+name);
			_name = name;
			console.log("_name:"+_name);
/*			selectTree._setting.callback.beforeClick = function(treeId, treeNode){
				console.log("啦啦啦，方法被改变了");
			}*/
			console.log(selectTree._setting.callback.beforeClick);
			//请求数据
			var data =[   
	            {id:1, pId:0, name:"北京"},  
	            {id:2, pId:0, name:"天津"},  
	            {id:3, pId:0, name:"上海"},  
	            {id:6, pId:0, name:"重庆"},  
	            {id:4, pId:0, name:"河北省", open:true},  
	            {id:41, pId:4, name:"石家庄"},    
	            {id:5, pId:0, name:"广东省"},  
	            {id:51, pId:5, name:"广州"},  
	            {id:52, pId:5, name:"深圳"},  
	            {id:53, pId:5, name:"东莞"},  
	            {id:54, pId:5, name:"佛山"},  
	            {id:6, pId:0, name:"福建省"},  
	            {id:61, pId:6, name:"福州"},  
	            {id:62, pId:6, name:"厦门"},  
	            {id:63, pId:6, name:"泉州"},  
	            {id:64, pId:6, name:"三明"},
	            {id:42, pId:4, name:"保定"},  
	            {id:43, pId:4, name:"邯郸"},  
	            {id:44, pId:4, name:"承德"}
         	];
			_dom = $(dom);
			var _html = '<div class="content_wrap">'+
						'<div class="zTreeDemoBackground">'+
                        '<ul class="list">'+
                        '<input placeholder="请选择'+text+'" readonly="readonly" id="'+ name +'" type="input" class="form-control" />'+
      					'<input name="'+ name +'" id="'+ name +'hidden" class="input-hidden" />'+
     					'</ul></div></div>'+
   						'<div id="'+ name +'MenuContent" class="menuContent">'+
    					'<span class="qa-select-input"><input id="'+ name +'AutoMatch" class="form-control" /></span>'+
    					'<span class="qa-select-ul">'+
     					'<ul id="'+ name +'TreeDemo" class="ztree"></ul></span></div>';

  			_dom.append(_html);
  			 $.fn.zTree.init($('#'+ name +'TreeDemo'), selectTree._setting,data);
  			 //console.log('"#'+_name+'"')
  			 _this = this;
  			 console.log("shssssssssssssssssssssssssss")
  			 console.log(this)
  			 //绑定input点击事件
			$('#'+_name).on('click',function(){
				console.log("121321212");
				selectTree.showMenu(this);
			});
			$('#'+_name+'AutoMatch').keyup(function(){
				console.log("onkeyup");
				console.log(name+'TreeDemo');
				//onkeyup="AutoMatch(this,\''+name+'TreeDemo\','+JSON.stringify(data)+')"
				selectTree.AutoMatch(this,name+'TreeDemo',data);
			});
		},
		beforeClick:function (treeId, treeNode) {
			console.log("点击事件");
		 	var num = treeId.split('TreeDemo')[0];
		 	//if("regulatoryUnit" != num){
		 		var check = (treeNode && !treeNode.isParent);
				if (!check) layer.msg("不能选择父级节点，请选择子级节点");
				return check;
		 	//}
		},
		onclick:function(e, treeId, treeNode){
			console.log("onclick点击事件");
			var zTree = $.fn.zTree.getZTreeObj(treeId),
			nodes = zTree.getSelectedNodes(),
			v = "";
			code="";
			nodes.sort(function compare(a,b){return a.id-b.id;});
			for (var i=0, l=nodes.length; i<l; i++) {
				v += nodes[i].name + ",";
				code = nodes[i].id;
			}
			if (v.length > 0 ) v = v.substring(0, v.length-1);
			var num = treeId.split('TreeDemo')[0];
			var cityObj = $("#"+num);
			cityObj.attr("value", v);
			cityObj.attr("data-code", code);
			$("input[name='"+$("#"+num).attr("codename") + "']").attr("value",code);
	     	this.hideMenu(num);
		},
		hideMenu:function(num) {
			if(num == 'menuContent'){
				$(".menuContent").fadeOut("fast");
			}else{
				$("#"+num+"MenuContent").fadeOut("fast");
			}
			$("body").unbind("mousedown", selectTree.onBodyDown);
		},
		showMenu:function(e) {
			console.log(e);
			var cityObj = $(e);
			var cityOffset = $(e).offset();
			var id = $(e).attr("id");
			$("#"+id+"MenuContent").css({left:cityOffset.left + "px", top:cityOffset.top + cityObj.outerHeight() + "px"}).slideDown("fast");

			$("body").bind("mousedown", selectTree.onBodyDown);
		},
		onBodyDown:function(event) {
			
			if (!($(event.target).parents(".menuContent").length>0)) {
				selectTree.hideMenu('menuContent');
			}
		},
		AutoMatch:function(txtObj,idStr,data) {
			console.log("change事件");
	        $.fn.zTree.init($("#"+idStr), selectTree._setting, data)								
	        if (txtObj.value.length > 0) {								
	            var treeObj = $.fn.zTree.getZTreeObj(idStr);								
	            var nodeList = "";
	            var codenum = $(txtObj).parents(".content_wrap_p").find("input.form-control").attr('codenum');
	            $.ajax({
	                url: "https://www.easy-mock.com/mock/5b0635cdd14ea45a9a895562/getCodeNameInfoByName.json/getCodeNameInfoByName.json",
	                data: {
	                    name: txtObj.value,
	                    code: codenum
	                },
	                dataType: "json",
	                success: function (data) {
	                	//nodeList = data.data;
	               	 nodeList = data.data.data;
	                    //将找到的nodelist节点更新至Ztree内								
	                    $.fn.zTree.init($("#"+idStr), selectTree._setting, nodeList);	
	                }
	            })								
	        } else {								
	            $.fn.zTree.init($("#"+idStr), selectTree._setting, data);								
	        }
	    }
	}
	$.fn.selectTree =  selectTree;
	//$.fn.extend(selectTree);
	//window.selectTree = selectTree;
})()