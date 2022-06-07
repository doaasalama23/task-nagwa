// import ApexCharts from 'apexcharts'
;(function () {
    // var options = {
    //     chart: {
    //         height: 350,
    //         type: 'radialBar',
    //     },
    //     series: [81],
    //     labels: [''],
    //   }
      
    //   var chart = new ApexCharts(document.querySelector("#chart"), options);
      
    //   chart.render();
    var options = {
        chart: {
          height: 280,
          type: "radialBar"
        },
        
        series: [81],
        
        plotOptions: {
          radialBar: {
            hollow: {
              margin: 15,
              size: "70%"
            },
           
            dataLabels: {
              showOn: "always",
              name: {
                offsetY: -10,
                show: true,
                color: "#4A3274",
                fontSize: "13px"
              },
              value: {
                color: "#4A3274",
                fontSize: "30px",
                show: true
              }
            }
          }
        },
      
        stroke: {
          lineCap: "round",
          stroke:"rgba(0, 155, 251, 0.85)"
        },
        labels: [""]
      };
      
      var chart = new ApexCharts(document.querySelector("#chart"), options);
      
      chart.render();

      var options = {
        chart: {
          height: 280,
          type: "radialBar"
        },
        
        series: [50],
        
        plotOptions: {
          radialBar: {
            hollow: {
              margin: 15,
              size: "70%"
            },
           
            dataLabels: {
              showOn: "always",
              name: {
                offsetY: -10,
                show: true,
                color: "#4A3274",
                fontSize: "13px"
              },
              value: {
                color: "#4A3274",
                fontSize: "30px",
                show: true
              }
            }
          }
        },
      
        stroke: {
          lineCap: "round",
        },
        labels: [""]
      };
      
      var chart = new ApexCharts(document.querySelector("#chart-1"), options);
      
      chart.render();
      var options = {
        chart: {
          height: 280,
          type: "radialBar"
        },
        
        series: [93],
        
        plotOptions: {
          radialBar: {
            hollow: {
              margin: 15,
              size: "70%"
            },
           
            dataLabels: {
              showOn: "always",
              name: {
                offsetY: -10,
                show: true,
                color: "#4A3274",
                fontSize: "13px"
              },
              value: {
                color: "#4A3274",
                fontSize: "30px",
                show: true
              }
            }
          }
        },
      
        stroke: {
          lineCap: "round",
          color: "#4A3274",
        },
        labels: [""]
      };
      
      var chart = new ApexCharts(document.querySelector("#chart-2"), options);
      
      chart.render();
      var options = {
        chart: {
          height: 350,
          type: "line",
          stacked: false
        },
        dataLabels: {
          enabled: false
        },
        colors: ['#99C2A2', '#C5EDAC', '#66C7F4'],
        series: [
          
          {
            name: 'Column A',
            type: 'column',
            data: [21.1, 23, 33.1, 34, 44.1, 44.9, 56.5, 58.5]
          },
          {
            name: "Column B",
            type: 'column',
            data: [10, 19, 27, 26, 34, 35, 40, 38]
          },
          {
            name: "Line C",
            type: 'line',
            data: [1.4, 2, 2.5, 1.5, 2.5, 2.8, 3.8, 4.6]
          },
        ],
        stroke: {
          width: [4, 4, 4]
        },
        plotOptions: {
          bar: {
            columnWidth: "20%"
          }
        },
        xaxis: {
          categories: [2009, 2010, 2011, 2012, 2013, 2014, 2015, 2016]
        },
        yaxis: [
          {
            seriesName: 'Column A',
            axisTicks: {
              show: true
            },
            axisBorder: {
              show: true,
            },
            title: {
              text: "Columns"
            }
          },
          {
            seriesName: 'Column A',
            show: false
          }, {
            opposite: true,
            seriesName: 'Line C',
            axisTicks: {
              show: true
            },
            axisBorder: {
              show: true,
            },
            title: {
              text: "Line"
            }
          }
        ],
        tooltip: {
          shared: false,
          intersect: true,
          x: {
            show: false
          }
        },
        legend: {
          horizontalAlign: "left",
          offsetX: 40
        }
      };
      
      var chart = new ApexCharts(document.querySelector("#chart-3"), options);
      
      chart.render();

      
$('.ab-datepicker input').datepicker({
    inputFormat: 'd/M/y',
    outputFormat: 'dd/MM/y',
    titleFormat: 'EEEE d MMMM y',
    markup: 'bootstrap4',
    theme: 'bootstrap',
}).blur();

$('.datepicker-weekdays th abbr').each((index, el) => {
    $(el).text($(el).attr('title').slice(0, 3));
});


$('.datepicker-month').on('DOMSubtreeModified', function () {
    let el = this;
    let elText = $(el).text();

    if (elText.match('([A-Z])\\w+ ([0-9])+') != null) {
        let canChange = /\d/.test(elText);
        if (canChange) {
            let text = $.trim(elText.replace(/[0-9]/g, ''));
            $(el).text(text);
        }
    } else if (elText.match('([0-9])\\w+\\-+([0-9])+')) {
        $(el).text(elText.replace(/-/g, " - "));
    }
});

let countDownDate = new Date("Jan 30, 2022 15:37:25").getTime();
let x = setInterval(function () {

    // Get today's date and time
    let now = new Date().getTime();

    // Find the distance between now and the count down date
    let distance = countDownDate - now;

    // Time calculations for days, hours, minutes and seconds
    let days = Math.floor(distance / (1000 * 60 * 60 * 24));
    let hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    let minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    let seconds = Math.floor((distance % (1000 * 60)) / 1000);

    $('.event-details-timer .timer .day span:first-child').text(days);
    $('.event-details-timer .timer .hour span:first-child').text(hours);
    $('.event-details-timer .timer .minute span:first-child').text(minutes);
    $('.event-details-timer .timer .second span:first-child').text(seconds);

    // If the count down is finished, write some text
    /*if (distance < 0) {
        clearInterval(x);
        document.getElementById("demo").innerHTML = "EXPIRED";
    }*/
}, 1000);
})();

