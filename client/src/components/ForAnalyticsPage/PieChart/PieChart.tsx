import { memo, useMemo } from 'react'
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { useSelector } from 'react-redux';
import { StatisticsStore } from '../../../redux/selectors';
import Spinner from '../../Spinner/Spinner';
import handleDateShowingFromDBS from '../../../utils/handleDateShowingFromDBS';
import handleTimeModeDateRange from '../../../utils/handleTimeModeDateRange';

ChartJS.register(ArcElement, Tooltip, Legend);

function PieChart({ date, timeMode, chosenCustomer, allMode }: { allMode:boolean, chosenCustomer:any, date: any, timeMode:'today' | 'thismonth' | 'thisweek' }) {
  const pieChartData = useSelector(StatisticsStore).piechart
  const pieChartLoading = useSelector(StatisticsStore).piechartLoading
  const data = useMemo(() => {
    if (pieChartData) {
      return ({
        labels: !chosenCustomer?pieChartData.map((item: any, index: number) => `Customer: ${item.user.firstName + ' ' + item.user.lastName},\n Time Parking: ${item.times},\n Total Pay: ${item.totalPay},\n Transactions count: ${item.logsCount}\n`)
        :pieChartData.map((item: any, index: number) => `Model: ${item.vehicle.model} ${item.vehicle.genre} ${item.vehicle.numberPlate}, \n Time Parking: ${item.times},\n Total Pay: ${item.totalPay},\n Transactions count: ${item.logsCount}\n`),
        datasets: [
          {
            label: "Percentage to total money",
            data: pieChartData.map((item: any, index: number) => pieChartData[index].percentage),
            backgroundColor: [
              'rgba(255, 99, 132, 0.2)',
              'rgba(54, 162, 235, 0.2)',
              'rgba(255, 206, 86, 0.2)',
              'rgba(75, 192, 192, 0.2)',
              'rgba(153, 102, 255, 0.2)',
              'rgba(255, 159, 64, 0.2)',
            ].slice(0, pieChartData.length),
            borderColor: [
              'rgba(255, 99, 132, 1)',
              'rgba(54, 162, 235, 1)',
              'rgba(255, 206, 86, 1)',
              'rgba(75, 192, 192, 1)',
              'rgba(153, 102, 255, 1)',
              'rgba(255, 159, 64, 1)',
            ].slice(0, pieChartData.length),
            borderWidth: 1,
          },
        ],
      })
    }
    else
      return null
  }, [pieChartData])

  return (<>
    <div className="w-full h-fit text-sm font-semibold text-center my-4">{allMode?"All of ":""}{!chosenCustomer?"Customers statistics from ":`Customer ${chosenCustomer.firstName+" "+chosenCustomer.lastName} vehicles detail from`}{!allMode?(handleDateShowingFromDBS(date.start)+" to "+handleDateShowingFromDBS(handleTimeModeDateRange(timeMode==="today"?"nextDayDate":timeMode==="thisweek"?"nextWeekDate":"nextMonthDate",date.start))):" all time"}</div>
    <div>
      {
        pieChartData && pieChartData.length > 0 ?
          pieChartLoading ?
            <div className="w-full h-full flex justify-center items-center">
              <Spinner />
            </div>
            :
            <div className="w-full h-fit flex justify-center">
              {
                data &&
                // @ts-ignore
                <Pie data={data} />
              }
            </div>
          :
          <div className="w-full h-full flex justify-center items-center">
            <h1 className="text-2xl text-gray-500">No data to show</h1>
          </div>

      }
    </div>
  </>);
}

export default memo(PieChart);