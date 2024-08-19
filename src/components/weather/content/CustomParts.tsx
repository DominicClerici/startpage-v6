import { ClockSVG } from "./Icons"

export const CustomLabel = ({ viewBox }) => {
  const { x, y } = viewBox
  return (
    <g transform={`translate(${x},${y})`}>
      <foreignObject x="-12" y="0" width="24" height="24">
        <ClockSVG />
      </foreignObject>
    </g>
  )
}

export const CustomTick = ({ x, y, payload }) => {
  const timeParts = payload.value.split(" ")
  const time = timeParts[0]
  const amPm = timeParts[1]

  if (x < 30) {
    x = 30
  }
  if (x > 370) {
    x = 370
  }

  return (
    <g transform={`translate(${x},${y})`}>
      <text x={0} y={0} dy={16} textAnchor="middle" className="font-medium" fill="#666">
        {time}
        <tspan className="font-light" fontSize="11">{` ${amPm}`}</tspan>
      </text>
    </g>
  )
}

export const CustomTooltip = () => null
