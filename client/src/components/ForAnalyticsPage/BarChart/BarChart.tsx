import { memo, useMemo } from 'react'
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { useSelector } from 'react-redux';
import { StatisticsStore } from '../../../redux/selectors';
import Spinner from '../../Spinner/Spinner';
import handleDateShowingFromDBS from '../../../utils/handleDateShowingFromDBS';
import handleTimeModeDateRange from '../../../utils/handleTimeModeDateRange';
ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

function BarChart({timeMode, date}:{timeMode:'today' | 'thismonth' | 'thisweek', date:any}) {
    const logsStatistics = useSelector(StatisticsStore).logs
    const logsLoading = useSelector(StatisticsStore).logsLoading
    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top' as const,
            },
            title: {
                display: true,
                text: (timeMode==="today"
                ?'Count Per Hour In Day'
                :timeMode==="thisweek"?'Count Per Day In Week'
                :'Count Per Week In Month')+" from "+handleDateShowingFromDBS(date.start)+" to "+handleDateShowingFromDBS(handleTimeModeDateRange(
                    timeMode==="today"?"nextDayDate":timeMode==="thisweek"?"nextWeekDate":"nextMonthDate",date.start)),

            },
        },
    };
    const data = useMemo(() => {
        if (logsStatistics) {
            const labels = (() => {
                // generate
                const labels = [];
                if(timeMode==="today")
                for (let i = 1; i <= 24; i++) {
                    labels.push(`${i}`);
                }
                else if(timeMode==="thisweek")
                for (let i = 1; i <= 7; i++) {
                    labels.push(`${i}`);
                }
                else if(timeMode==="thismonth")
                for (let i = 1; i <= 4; i++) {
                    labels.push(`${i}`);
                }
                return labels;
            })()
            return ({
                labels: labels,
                datasets: [
                    {
                        label: 'Logs count',
                        data: labels.map((label: any, index: number) => {
                            return logsStatistics[index].totalRecords
                        }),
                        backgroundColor: '#007aff',
                    },
                ]
            })
        }
        else {
            return null
        }
    }, [logsStatistics])
    return (<>
        {
            logsStatistics &&
                !logsLoading?
                <div className="w-full h-fit">
                    {/* @ts-ignore */}
                    <Bar options={options} data={data} />
                </div>
                :
                <div className="w-full h-full flex justify-center items-center">
                    <Spinner />
                </div>
        }
    </>);
}

export default memo(BarChart);