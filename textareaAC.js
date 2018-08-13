function TextareaAC(args){
	var mainArea 	= $('#'+args.mainAreaId);
	var listArea 	= $('#'+args.listAreaId);
	var dataList 	= $('#'+args.dataListId);
	var dataSet 	= args.dataSet;
	var csrfToken	= args.csrfToken;
	var dataSource	= args.dataSource;

	this.run = function(){

		if (dataSet) {
			this.fillData();	
		}else {
			console.log('No Sugestion data is given!')
		}

		if (!mainArea) {
			console.log('Plese give mainArea parameter!')
		}

		if (!listArea) {
			console.log('Plese give listArea parameter!')
		}
		

		var id = mainArea.attr("id");
		var targArea = document.getElementById (id);
		targArea.addEventListener ('keydown',  reportKeyEvent);

		function reportKeyEvent (zEvent) {
		    if (zEvent.ctrlKey  &&  zEvent.which == 32) {
		        listArea.show();
		        listArea.focus();
		    }
		}

		listArea.on('keyup',function(e){
		  if(e.keyCode == 13){
		    var val = listArea.val();
		    insertAt(val);
		    listArea.hide();
		    mainArea.focus();
		  } else if (e.keyCode == 27) {
				listArea.hide();
				mainArea.focus();
		  }
		})

		function insertAt(str){
			var cursorPos = mainArea.prop('selectionStart');
			var v = mainArea.val();
			var textBefore = v.substring(0,  cursorPos );
			var textAfter  = v.substring( cursorPos, v.length );
			mainArea.val( textBefore+ str +textAfter );
		}

		mainArea.on('keyup paste cut mouseup', function () {  
		  // Follow the caret arounbd.
		  listArea.css(
		    mainArea.textareaHelper('caretPos')
		  );
		});
	}

	this.fillData = function(data){

		if (data) {
			dataSet = data;
		}

		if (dataSource == "local") {
			dataList.empty();

			dataSet.forEach( function(e) {
				var html = `<option value="${e}">${e}</option>`
				dataList.append(html);
			});
		}else if (dataSource == "ajax"){
			if (csrfToken) {

			}
		}else {
			console.log('Datasource not recognize!')	
		}
	}

	this.run();
	return this;
}