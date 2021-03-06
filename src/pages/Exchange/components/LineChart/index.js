/* eslint react/forbid-prop-types: off */
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Highcharts from 'highcharts'
import cuid from 'cuid'
import {
  HighchartsChart, Chart, withHighcharts, XAxis, YAxis, LineSeries, Tooltip, Legend,
} from 'react-jsx-highcharts'
import './styles.scss'

class LineChart extends Component {
  state = {}

  shouldComponentUpdate(nextProps) {
    return nextProps.data !== this.props.data
  }

  render() {
    const {
      legend, title, xLabel, yLabel, data, rendertitle,
    } = this.props
    return (
      <div className="chart-card-container">
        <span className="chart-title">{title}</span>
        {rendertitle()}
        <div className="chart-container">
          <HighchartsChart className="inner-chart-container">
            <Chart />
            {
              legend ? (
                <Legend layout="horizontal" align="center" verticalAlign="top" />
              ) : null
            }
            <Tooltip valueSuffix=" k" />
            <XAxis categories={['05/02', '06/02', '07/02', '08/02', '09/02', '10/02', '11/02', '12/02']}>
              {
                xLabel ? (
                  <XAxis.Title>
                    {xLabel}
                  </XAxis.Title>
                ) : null
              }
            </XAxis>

            <YAxis>
              <YAxis.Title>
                {yLabel}
              </YAxis.Title>
              {
                data && data.length
                  ? data.map((item, index) => (
                    <LineSeries
                      name={yLabel[index]}
                      data={item}
                      key={cuid()}
                    />
                  ))
                  : null
              }
            </YAxis>
          </HighchartsChart>
        </div>
      </div>
    )
  }
}

export default withHighcharts(LineChart, Highcharts)

LineChart.propTypes = {
  legend: PropTypes.bool,
  title: PropTypes.string,
  xLabel: PropTypes.string,
  yLabel: PropTypes.any,
  data: PropTypes.array,
  rendertitle: PropTypes.func,
}

LineChart.defaultProps = {
  legend: false,
  title: '',
  xLabel: '',
  yLabel: '',
  data: [],
  rendertitle: () => {},
}
