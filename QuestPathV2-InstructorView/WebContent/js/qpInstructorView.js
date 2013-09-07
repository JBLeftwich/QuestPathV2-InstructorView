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
    });
    
};