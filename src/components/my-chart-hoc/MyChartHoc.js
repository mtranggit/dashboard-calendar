import React from 'react'

export function MyChartHoc(D3Render) {
  return class MyChart extends React.Component {
    myRef = React.createRef()
    componentDidMount() {
      D3Render.call(this)
    }
    componentDidUpdate() {
      D3Render.call(this)
    }
    render() {
      const {x, y} = this.props
      return (
        <svg width="400" height="400" id="svg">
          <g transform={`translate(${x}, ${y})`} ref={this.myRef} />
        </svg>
      )
    }
  }
}
