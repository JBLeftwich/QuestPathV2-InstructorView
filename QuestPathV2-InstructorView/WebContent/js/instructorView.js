var data = [{"attemptedCount":1,"passedStudents":["Leftwich, Stephanie","Leftwich - Student, Jonathan"],"passedCount":2,"lockedStudents":[],"lockedCount":0,"attemptedStudents":["Student, JBL"],"externalContentId":"_20_1"},{"attemptedCount":0,"passedStudents":["Leftwich, Stephanie","Leftwich - Student, Jonathan"],"passedCount":2,"lockedStudents":["Student, JBL"],"lockedCount":1,"attemptedStudents":[],"externalContentId":"_21_1"},{"attemptedCount":2,"passedStudents":[],"passedCount":0,"lockedStudents":["Student, JBL"],"lockedCount":1,"attemptedStudents":["Leftwich, Stephanie","Leftwich - Student, Jonathan"],"externalContentId":"_50_1"},{"attemptedCount":0,"passedStudents":[],"passedCount":0,"lockedStudents":["Leftwich, Stephanie","Leftwich - Student, Jonathan","Student, JBL"],"lockedCount":3,"attemptedStudents":[],"externalContentId":"_24_1"},{"attemptedCount":0,"passedStudents":[],"passedCount":0,"lockedStudents":["Leftwich, Stephanie","Leftwich - Student, Jonathan","Student, JBL"],"lockedCount":3,"attemptedStudents":[],"externalContentId":"_104_1"},{"attemptedCount":0,"passedStudents":[],"passedCount":0,"lockedStudents":["Leftwich, Stephanie","Leftwich - Student, Jonathan","Student, JBL"],"lockedCount":3,"attemptedStudents":[],"externalContentId":"_105_1"},{"attemptedCount":2,"passedStudents":["Leftwich - Student, Jonathan"],"passedCount":1,"lockedStudents":[],"lockedCount":0,"attemptedStudents":["Leftwich, Stephanie","Student, JBL"],"externalContentId":"_46_1"},{"attemptedCount":1,"passedStudents":[],"passedCount":0,"lockedStudents":["Leftwich, Stephanie","Student, JBL"],"lockedCount":2,"attemptedStudents":["Leftwich - Student, Jonathan"],"externalContentId":"_47_1"},{"attemptedCount":0,"passedStudents":[],"passedCount":0,"lockedStudents":["Leftwich, Stephanie","Leftwich - Student, Jonathan","Student, JBL"],"lockedCount":3,"attemptedStudents":[],"externalContentId":"_49_1"}];
var jQueryreporting;

var reportingFunction = function (string) {
    jQuery(document).ready(function() {
    	  jQuery('#chartDiv').mouseleave(function() {jQuery('#reporting').hide();});
    	  jQuery(function() {
    		    jQuery( "#chartDiv" ).dialog({
    		      autoOpen: false,
    		      modal: true,
    		      height:600,
    		      width:650,
    		      buttons: {
    		        Ok: function() {
    		          jQuery( this ).dialog( "close" );
    		        }
    		      }
    		    });
    		    jQuery('.questItem').click(
    	    			  function() {
    	    				  jQuery('#chartDiv').dialog("open");
    	    			  }
    	    	);
    		  }
    	  	);
    		//jQuery('.questItem').draggable();
//    		jQueryreporting = jQuery('#reporting'); 
//    		jQueryreporting.hide(); 
//    		jQuery('#1235').click(
//    				function() {
//    					jQuery('#chartDiv').dialog("open");
//    					jQuery.each(data, function(key, value) {
//    				        if (value.name === 'Passed') {
//    							//key
//    				        }
//    				    });
//    				});
//
//        chart = new Highcharts.Chart({
//            chart: {
//                renderTo: 'container',
//                plotBackgroundColor: 'white',
//                plotBorderWidth: null,
//                plotShadow: true,
//                backgroundColor: '#FFFFCC'
//            },
//            title: {
//                text: 'Current Progress for Assignment: CP1'
//            },
//            tooltip: {
//            	animation: false
//            	,enabled: false
//        	    //pointFormat: '{series.name}: <b>{point.percentage}%</b>',
//            	//percentageDecimals: 1
//            },
//            exporting: {
//            	enabled : false
//            },
//            plotOptions: {
//                pie: {
//                    allowPointSelect: true,
//                    cursor: 'pointer',
//                    dataLabels: {
//                        enabled: true
//                        ,color: '#000000'
//                        ,connectorColor: '#000000'
//                        ,formatter: function() {
//                            return '<b>'+ this.point.name +'</b>: '+ this.percentage.toFixed(2) +' %';
//                        }
//                    }
//                }
//            },
//            series: [{
//                type: 'pie',
//                data: data,
//                point: {
//    				events: {
//    					click: function() {
//    						jQueryreporting.hide();
//    						_line = '<ul>'; 
//    						_names = "";
//    						jQuery(this.list).each(
//    								//restructure this to be a function
//        						function() {
//        							_line += '<li>' + this + '</li>';
//        						}
//    						);
//    						_line += '</ul>';
//    						jQueryreporting.html(_line);
//    						jQueryreporting.show();
//        				}
//    				}
//    			}
//            }]
//        });
    });
    
};

jQuery(document).ready(function() {moveItems(); jsPlumbDemo.init(); reportingFunction("Hello World");});
var testLoop = function() {
	for (var i = 0; i < data.length; i++) {
		if (data[i].externalContentId === '_49_1') {
			//might have to move to a new object that has a y key value
	//		alert(data[i].passedCount);
	//		alert(data[i].lockedCount);
	//		alert(data[i].attemptedCount);
		}
	}
};
testLoop();