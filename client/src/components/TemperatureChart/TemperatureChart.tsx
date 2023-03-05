import { memo, useEffect, useState } from 'react'
// @ts-ignoreimport Highcharts from 'highcharts';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import moment from 'moment';
import 'highcharts/css/highcharts.css';

function TemperatureChart() {
    const [temperatureData, setTemperatureData] = useState([
        {
            time: '2022-02-27T00:00:00Z',
            temperature: 18.5
        },
        {
            time: '2022-02-27T00:01:00Z',
            temperature: 18.6
        },
        {
            time: '2022-02-27T00:02:00Z',
            temperature: 18.7
        },
        // Add more temperature data points here
    ]);
    const options = {
        chart: {
            type: 'spline',
            height: 300
        },
        title: {
            text: 'Temperature over Time'
        },
        xAxis: {
            type: 'datetime',
            labels: {
                // @ts-ignore
                formatter: function () {
                    // @ts-ignore
                    return moment(this.value).format('MMM D, h:mm A');
                }
            }
        },
        yAxis: {
            title: {
                text: 'Temperature (°C)'
            }
        },
        series: [{
            name: 'Temperature',
            data: temperatureData.map(({ time, temperature }) => [Date.parse(time), temperature]),
            color: '#ff8c00'
        }]
    };

    return (<>
        {
            temperatureData.length === 0 && <div>Loading...</div>
        }
        {
            temperatureData.length > 0 &&
            <HighchartsReact highcharts={Highcharts} options={options} />
        }
    </>);
}

export default memo(TemperatureChart);