/**
 * Main Script for Quest Path Building Block
 * Author: Jonathan Leftwich  Graduate Student at Jacksonville State University
 */
/*
 * Initial function to draw connectors after quest items have been put in place
 */
(function() {
	window.jsPlumbDemo = {
			init : function() {			
				var color = "black";
				jsPlumb.importDefaults({
					Connector : [ "Bezier", { curviness:40 } ],
					DragOptions : { cursor: "pointer", zIndex:2000 },
					PaintStyle : { strokeStyle:color, lineWidth:3 },
					EndpointStyle : { radius:3, fillStyle:color },
					HoverPaintStyle : {strokeStyle:"black" },
					EndpointHoverStyle : {fillStyle:"#ec9f2e" },			
					Anchors :  [ "AutoDefault", "AutoDefault" ]
				});
				var arrowCommon = { foldback:1.0, fillStyle:color, width:14 };
				overlays = [[ "Arrow", { location:0.5 }, arrowCommon ]];
				var procQuests = new Array();
				for (var i = 0; i < quests.length; i++) {
					for (var j = 0; j < quests[i].questPathItems.length; j++) {
						if (jQueryAlias.inArray(quests[i].questPathItems[j].extContentId, procQuests) < 0) {
							for (var k = 0; k < quests[i].questPathItems[j].childContent.length; k++) {
								jsPlumb.connect({source:quests[i].questPathItems[j].extContentId,  
									target:quests[i].questPathItems[j].childContent[k], overlays:overlays});
							}
						}
						procQuests.push(quests[i].questPathItems[j].extContentId);
					}
				}
				
				if (questDraggable) {
					jsPlumb.draggable(jsPlumb.getSelector(".questItem"),{containment:"parent"});
				}
			}
	};

})();

/*
 * Move quest items based on saved layout
 */
function moveItems() {
	if (questLayout != null) {
		var initWidth = questLayout.width;
		var currentWidth = document.getElementById('questpathBlockContainer').offsetWidth;
		var widthRatio = currentWidth/initWidth;
		try {
			for (var i = 0; i < questLayout.qItemLayout.length; i++) {
				var x = document.getElementById(questLayout.qItemLayout[i].extContentId);
				x.style.top = (parseInt(questLayout.qItemLayout[i].top) * 1) + "px";
				x.style.left = (parseInt(questLayout.qItemLayout[i].left) * widthRatio) + "px";
			}
		} catch(exception) {initLayout();}//default to init layout if unable to build layout
	} else {
		initLayout();
	}
};

/*
 * Pause for other script files to be loaded
 */
function waitForDependencies() {
	//if (typeof jQueryLoaded === 'undefined' || typeof questsLoaded === 'undefined' || typeof jsPlumbLoaded === 'undefined'
	//	|| typeof uiMinLoaded === 'undefined' || typeof uiTouchLoaded === 'undefined') {        
	//	setTimeout(waitForDependencies, 0200);}    
	//else {
		jsPlumb.bind("ready", function() {
			initLayout(); 
			moveItems(); 
			positionNonQuestItems();
			setTimeout(jsPlumbDemo.init, 0200); 
			jQuery(function() {
		  	    jQuery( "#chartDiv" ).dialog({
		  	      autoOpen: false, modal: true, height:650, width:650,
		  	      buttons: {Ok: function() {jQuery( this ).dialog( "close" );}}
		   		 });
		    });
			jQuery(function() {
			 jQuery( "#questpathBlockContainer").tooltip();
			});
			if(instructorView) {
				setInstructorCSSClass(questStats);
				jQuery('.questItem').click(
		    		function() {
						for (var i = 0; i < questStats.length; i++) {
							if (questStats[i].externalContentId === this.id) {
								//console.log(questStats);
								reportingFunction(questStats[i]);
								jQuery('#chartDiv').dialog("open");
							}
						}
		    		});
			}
			//if(instructorView) {reportingFunction('Hello');}
		});
		//jQuery(function() {jQuery( ".nonQuestItem" ).draggable();});
	//}
}

function openAssignment(link) {
	urlLoc = window.location;
	if (urlLoc.toString().indexOf('detach_module') !== -1) {
		window.location.href = '../../../blackboard/' + link;	
	}
	else {window.location.href = '../../' + link;}

}

/*
 * Set initial location, this is used by config page
 */
function setLocation() {
	var qLayout = new Object();
	qLayout.height = document.getElementById('questpathBlockContainer').offsetHeight;
	qLayout.width = document.getElementById('questpathBlockContainer').offsetWidth;
	qLayout.qItemLayout = new Array();
	var k = 0;
	for (var i = 0; i < quests.length; i++) {
		for (var j = 0; j < quests[i].questPathItems.length; j++) {
			var qItem = new Object();
			qItem.extContentId = quests[i].questPathItems[j].extContentId;
			qItem.top = document.getElementById(quests[i].questPathItems[j].extContentId).style.top;
			qItem.left = document.getElementById(quests[i].questPathItems[j].extContentId).style.left;
			qLayout.qItemLayout[k] = qItem;
			k++;
		}
	} 
	document.getElementById("questLayout").value = JSON.stringify(qLayout);
}

/*
 * Redraw as page is resized
 */
window.onresize=function(){moveItems(); jsPlumbDemo.init(); positionNonQuestItems();};

/*
 * Build initial layout graph
 */
function initLayout() {
	init_height = document.getElementById('questpathBlockContainer').offsetHeight;
	init_width = document.getElementById('questpathBlockContainer').offsetWidth;
	pathWidth = init_width/questTier.length;
	for (var i = 0; i < questTier.length; i++) {
		for (var j = 0; j < questTier[i].length; j++) {
			tierWidth = (pathWidth/questTier[i][j].tier.length);
			tierWidthCenter = tierWidth/2;
			for (var k = 0; k < questTier[i][j].tier.length; k++) {
				var x = document.getElementById(questTier[i][j].tier[k]);
				x.style.left = pathWidth * i  + (tierWidth * (k +1)) - tierWidthCenter  - (init_width/20) + "px";
				x.style.top =  init_height/questTier[i].length * j + "px";
			}
		}
	}
}

totalStudents = 0;

function setInstructorCSSClass(questStats) {
	for (var i = 0; i < questStats.length; i++) {
		var hybridPassed = questStats[i].passedCount;
		totalStudents = questStats[i].passedCount + questStats[i].attemptedCount + questStats[i].lockedCount;
		var percentPassed = Math.round(hybridPassed/totalStudents / .1) * 10;
		jQuery('#' + questStats[i].externalContentId).addClass('p' + percentPassed);
	}
}

function buildDialog() {
	jQuery( "#ruleDialog" ).dialog({
	      autoOpen: false,
	      height: 300,
	      width: 500,
	      modal: true, 
	      buttons: {
	    	  Ok: function() {
	    		  var errorFree = true;
	    		  var fromId = jQuery('#fromItem').val();
	    		  var toId = jQuery('#toItem').val();
	    		  var typeRule = jQuery( "input:radio[name=ruleRadio]:checked" ).val();
	    		  var minValue = jQuery('#minValue').val();
	    		  if (fromId.length === 0) {
	    			  alert("From Quest Item Required");
	    			  errorFree = false;
	    		  }
	    		  if (toId.length === 0) {
	    			  alert("To Quest Item Required");
	    			  errorFree = false;
	    		  }
	    		  if (toId === fromId) {
	    			  alert("From and To Must Be Different Items");
	    			  errorFree = false;
	    		  }
	    		  if (typeRule.length == 0) {
	    			  alert("Adaptive Release Type Rule");
	    			  errorFree = false;
	    		  }
	    		  if (isNaN(minValue) || minValue.length === 0 || minValue === 0) {
	    			  alert("Minimum Score Must Be Numeric and Greater Than 0");
	    			  errorFree = false;
	    		  }
	    		  //console.log(fromId + " - " + jQuery("#" + fromId).parent().attr('id'));
	    		  //console.log(toId + " - " + jQuery("#" + toId).parent().attr('id'));
	    		  if (errorFree) {
	    			  buildNewConnection(fromId, toId);
	    			  jQuery( this ).dialog( "close" );
	    		  };
	           }
	      }
	});
	jQuery('#ruleButton').on('click', function() {jQuery('#ruleDialog').dialog("open");});
}

function buildNewConnection(fromId, toId) {
	jQuery('#' + fromId).addClass("questItem").removeClass("nonQuestItem");
	jQuery('#' + toId).addClass("questItem").removeClass("nonQuestItem");
	var color = "black";
	jsPlumb.importDefaults({
		Connector : [ "Bezier", { curviness:40 } ],
		DragOptions : { cursor: "pointer", zIndex:2000 },
		PaintStyle : { strokeStyle:color, lineWidth:3 },
		EndpointStyle : { radius:3, fillStyle:color },
		HoverPaintStyle : {strokeStyle:"black" },
		EndpointHoverStyle : {fillStyle:"#ec9f2e" },			
		Anchors :  [ "AutoDefault", "AutoDefault" ]
	});
	var arrowCommon = { foldback:1.0, fillStyle:color, width:14 };
	var overlays = [[ "Arrow", { location:0.5 }, arrowCommon ]];
	jsPlumb.connect({source:fromId, target:toId, overlays:overlays});
	if (questDraggable) {
		jsPlumb.draggable(jsPlumb.getSelector(".questItem"),{containment:"parent"});
	}
}

function positionNonQuestItems() {
	nonQuestList = jQuery('.nonQuestItem');
	//console.log(nonQuestList.length);
	init_height = document.getElementById('questpathBlockContainer').offsetHeight;
	init_width = document.getElementById('questpathBlockContainer').offsetWidth;
	//console.log(init_height + ":" + init_width);
	var newTop = init_height - init_height/15;
	var newLeft = 0;
	var count = 0;
	nonQuestList.each(function() {
		document.getElementById(jQuery( this ).attr('id')).style.top = newTop + "px";
		document.getElementById(jQuery( this ).attr('id')).style.left = newLeft + "px";
		count++;
		newLeft += init_width/10;
		if (count === 9) {
			newLeft = 0;
			newTop = newTop - init_height/15;
			count = 0;
		}
	});
}