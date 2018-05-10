

// coefficients for quadratic equations, a1, b1, c1 for trial size 50, and a2, b2, c2 for trial size 20
var a1 = [0.0061762, 0.00618, 0.00606]; // coefficients for predicted value, lower limit and higher limit equations
var b1 = [0.4328013, 0.43256, 0.44476];
var c1 = [2.3449784, 11.02663, -6.4391];
var a2 = [0.0040699, 0.00412, 0.00402];
var b2 = [0.6478610, 0.64151, 0.65422];
var c2 = [-0.6395179, 7.96482, -9.24386];
//var trialSz = Number(document.getElementById("trialSize").value);

function calculate_graph() {
	var trialSz = Number(document.getElementById("trialSize").value);
	var yObs = Number(document.getElementById("yObserved").value);

	document.getElementById("results").innerHTML = calculate_Ypredicted(trialSz, yObs);
	
	updateChart()
}

function calculate_Ypredicted(trialSz, yObs) {
    var yPredicted, yPredLow, yPredHigh;
	
    // If x is Not a Number or less than one or greater than 10
/*     if (isNaN(x) || x < 1 || x > 10) {
        text = "Input not valid";
    } else {
        text = "Input OK";
    } */
	
	if (trialSz === 50) {
		yPredicted = (-b1[0] + Math.sqrt(b1[0] * b1[0] - 4 * a1[0] * (c1[0] - yObs)))/(2 * a1[0]);
		yPredicted = yPredicted.toFixed(1);
		yPredLow = (-b1[1] + Math.sqrt(b1[1] * b1[1] - 4 * a1[1] * (c1[1] - yObs)))/(2 * a1[1]);
		yPredLow = yPredLow.toFixed(1);
		yPredHigh = (-b1[2] + Math.sqrt(b1[2] * b1[2] - 4 * a1[2] * (c1[2] - yObs)))/(2 * a1[2]);
		yPredHigh = yPredHigh.toFixed(1);
	}else if (trialSz === 20) {
		yPredicted = (-b2[0] + Math.sqrt(b2[0] * b2[0] - 4 * a2[0] * (c2[0] - yObs)))/(2 * a2[0]);
		yPredicted = yPredicted.toFixed(1);
		yPredLow = (-b2[1] + Math.sqrt(b2[1] * b2[1] - 4 * a2[1] * (c2[1] - yObs)))/(2 * a2[1]);
		yPredLow = yPredLow.toFixed(1);
		yPredHigh = (-b2[2] + Math.sqrt(b2[2] * b2[2] - 4 * a2[2] * (c2[2] - yObs)))/(2 * a2[2]);
		yPredHigh = yPredHigh.toFixed(1);
	} else {
		alert("Calculation was not possible. The trial size value is not valid.");
		yPredicted = "NA";
		yPredLow = "NA";
		yPredHigh = "NA";
		
	}
    //document.getElementById("results").innerHTML = yPredicted;

	//return yPredicted.toString() + "," + yPredLow.toString() + "," + yPredHigh.toString();
	return yPredicted.toString() + "&nbsp;&nbsp;&nbsp;" + yPredLow.toString() + "&nbsp;&nbsp;&nbsp;" + yPredHigh.toString();
}



//<script src="https://cdnjs.cloudflare.com/ajax/libs/Chart.js/2.7.2/Chart.bundle.js"></script>



//var trialSize = document.getElementById("trialSize").value;
var dataNdx;
function generateChartData(dataNdx) {
	var data = []; 
	var i;

	var trialSz = Number(document.getElementById("trialSize").value);
	if (trialSz === 50) {
		var a = a1, b = b1, c = c1;
	} else if (trialSz === 20) {
		var a = a2, b = b2, c = c2;
	} else {
		var a = 0, b = 1, c = 0;
	}

	for (i = 0; i < 101; i += 2) {
		data.push({
			x: i,
			y: (a[dataNdx] * i * i + b[dataNdx] * i + c[dataNdx]).toFixed(1),
		});
	}

	return data;
}
//var trialSz = Number(document.getElementById("trialSize").value);
function updateChart() {
	/*chart.data.datasets.forEach(function(dataset) {
		dataset.data = generateChartData();
	});*/

	var trialSz = Number(document.getElementById("trialSize").value);
	
	scatterChart.data.datasets[0].data = generateChartData(0);
	scatterChart.data.datasets[0].label = 'Quadratic fit ' + trialSz.toString();
	scatterChart.data.datasets[1].data = generateChartData(1);
	scatterChart.data.datasets[2].data = generateChartData(2);

	scatterChart.update();
}

/*
var data = {
	datasets: [{
		data: generateData()
	}, {
		data: generateData()
	}]
};
*/		
var ctx = document.getElementById("myChart");
var trialSz = Number(document.getElementById("trialSize").value);
var scatterChart = new Chart(ctx, {
    type: 'line', // or 'scatter'
    data: {
		//yLabels: ['-20', '-10', '0', '10', '20', '30', '40', '50', '60', '70', '80', '90', '100', '110'],
        datasets: [{
            label: 'Quadratic fit ' + trialSz.toString(),
			fill: false, 
			data:generateChartData(0),
			borderColor: 'rgba(255,99,132,1)', // pink
			backgroundColor: 'rgba(255,99,132,1)',
			borderWidth: 0.5,
			showLine: true,
			pointRadius: 2.0,
			pointStyle: 'rect'
        },
		{
            label: 'Lower prediction',
			fill: false, 
			data:generateChartData(1),
			borderColor: 'rgba(54,162,235,1)', // blue
			backgroundColor: 'rgba(54,162,235,1)',
			borderWidth: 0.5,
			borderDash: [2, 2],
			pointRadius: 2.0
        },
		{
            label: 'Upper prediction',
			fill: false, 
			data:generateChartData(2),
			borderColor: 'rgba(154,62,135,1)', // purple-magenta
			backgroundColor: 'rgba(154,62,135,1)',
			borderWidth: 0.5,
			pointRadius: 2.0
        }]
    },
    options: {
        layout: {
            padding: {
                left: 10,
                right: 0,
                top: 0,
                bottom: 10
            }
        },	
		legend: {
			labels: {
				usePointStyle: true,
				fontSize: 12
				//boxWidth: 15 // use when usePointStyle: false
			}
		},
		elements: {
            line: {
                tension: 0 // disables Bezier curves, points are connected by straight lines
            }
        },
		animation: {
            duration: 0 // general animation time, 0 disables animation
        },
		tooltips: {
			mode: 'x',
			intersect: false,
			position: 'nearest',
			displayColors: true
		},
		responsive: false,
        scales: {
            xAxes: [{
                type: 'linear',
                position: 'bottom',
				scaleLabel: {
					display:true,
					labelString: 'Predicted  (%)'
				}
			}],
			yAxes: [{
				ticks: {
					suggestedMin: -10,
					suggestedMax: 110,
					stepSize: 10
				},
				scaleLabel: {
					display:true,
					labelString: 'Observed  (%)'
				}				
            }]
        }
    }
});
