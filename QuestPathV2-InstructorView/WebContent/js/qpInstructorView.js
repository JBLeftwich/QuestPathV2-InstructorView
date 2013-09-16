var jQueryreporting;

var reportingFunction = function (dataSeries) {
	console.log("what was sent " + dataSeries);
	jQueryReporting = jQuery('#reporting'); 
	jQueryReporting.hide(); 
	chart = new Highcharts.Chart({
		chart: {
			renderTo: 'container',
			plotBackgroundColor: 'white',
			plotBorderWidth: null,
			plotShadow: true,
			backgroundColor: '#FFFFCC'
		},
		title: {text: 'Current Progress'},
		tooltip: {animation: false,enabled: false},
		exporting: {enabled : false},
		plotOptions: {
			pie: {
				allowPointSelect: true,
				cursor: 'pointer',
				dataLabels: {
					enabled: true
					,color: '#000000'
					,connectorColor: '#000000'
					,formatter: function() {
                    return '<b>'+ this.point.name +'</b>: '+ this.percentage.toFixed(2) +' %';
					}
				}	
			}
		},
		series: [{
			type: 'pie',
			data: [{
				name: 'Attempted',
				y: dataSeries.attemptedCount,
				list: dataSeries.attemptedStudents,
				color: '#FFFF00'
			}, {
				name: 'Passed',
				y: dataSeries.passedCount,
				list: dataSeries.passedStudents,
				color: '#00FF00'
			}, {
				name: 'Locked',
				y: dataSeries.lockedCount,
				list: dataSeries.lockedStudents,
				color: '#FF0000'
			}],
			point: {
				events: {
					click: function() {
						jQueryReporting.hide();
						_line = '<ul>'; 
						_names = "";
						jQuery(this.list).each(
								function() {
									_line += '<li>' + this + '</li>';
								}
						);
						_line += '</ul>';
						jQueryReporting.html(_line);
						jQueryReporting.show();
					}
				}
			}
		}]
});

};