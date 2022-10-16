import React from 'react';
import Chart from 'react-apexcharts'

function Graph(props) {
    const data = {
        series: [{
            data: props.values
            }],
        options: {
        chart: {
          type: 'bar',
          width: 500, 
          animations: {
            enabled: false 
          }
        },
        plotOptions: {
          bar: {
            borderRadius: 4,
            horizontal: true,
            barHeight: '20%', 
          }
        },
        dataLabels: {
          enabled: false
        },
        xaxis: {
          categories: props.labels,
        }, 
      },
    }

  return (
        <div style={{borderRadius: '5px 5px 5px 5px'}}>
            <Chart options={data["options"]} series={data["series"]} type="bar" height={350} width={700} />
        </div>
  );
}

export default Graph;