/* eslint-disable no-loop-func */
import React,{useEffect, useState} from 'react'
import ReactApexChart from 'react-apexcharts';

function CustomChart({days,data}) {
  const initOptions = {
    chart: {
            height: 350,
            type: 'bar',
          },
          plotOptions: {
            bar: {
              borderRadius: 10,
              columnWidth: '50%',
            }
          },
          dataLabels: {
            enabled: false
          },
          stroke: {
            width: 2
          },
          
          grid: {
            row: {
              colors: ['#fff', '#f2f2f2']
            }
          },
          xaxis: {
            labels: {
              rotate: -45
            },
            categories: days,
            tickPlacement: 'on'
          },
          yaxis: {
            title: {
              text: 'Servings',
            },
          },
          fill: {
            type: 'gradient',
            gradient: {
              shade: 'light',
              type: "horizontal",
              shadeIntensity: 0.25,
              gradientToColors: undefined,
              inverseColors: true,
              opacityFrom: 0.85,
              opacityTo: 0.85,
              stops: [50, 0, 100]
            },
          }
            
    }
  console.log(data)
  const [options, setOpions] = useState(initOptions)
  const [series, setSeries] = useState([])
  
  useEffect(() => {
    countLoop(data, days)
  },[data])
    
    const countLoop =  (data, days) => {
      const count = []
      let arrCount = {}
      let arrData = []
      for (var i = 0; i < days.length; i++) {
        const total = data?.reduce((total, current) => {
          if(current?.days?.includes(days[i])) {
            return total += 1
          }else {
            return total
          }
        },0)
        count.push(total)
      }
      arrCount.name = "Biểu đồ"
      arrCount.data = count
      arrData.push(arrCount)
      setSeries(arrData)
    }
    console.log(series) 
  return (
    <div>
      <ReactApexChart options={options} series={series} type="bar" height={350} />
    </div>
  )
}

export default CustomChart