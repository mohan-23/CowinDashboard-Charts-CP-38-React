import {PieChart, Pie, Legend, Cell} from 'recharts'

import './index.css'

const VaccinationByAge = props => {
  const {vaccinationByAge} = props

  return (
    <div className="by-age-cart">
      <h1 className="by-age-heading">Vaccination by Age</h1>
      <PieChart width={1000} height={300}>
        <Pie
          cx="70%"
          cy="40%"
          data={vaccinationByAge}
          startAngle={0}
          endAngle={360}
          innerRadius="0%"
          outerRadius="70%"
          dataKey="count"
        >
          <Cell name="18-14" fill="#2d87bb" />
          <Cell name="45-60" fill="#a3df9f" />
          <Cell name="Above 60" fill="#64c2a6" />
        </Pie>
        <Legend
          iconType="circle"
          layout="horizontal"
          verticalAlign="bottom"
          align="center"
        />
      </PieChart>
    </div>
  )
}

export default VaccinationByAge
