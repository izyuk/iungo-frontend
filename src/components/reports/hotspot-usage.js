import React, {Component} from 'react';
import {getSummaryAnalytics, getDailyVisitsAnalytics, getNewVisitsAnalytics, getPopularHoursAnalytics} from "../../api/API";
import {withRouter} from "react-router-dom";
import moment from 'moment';
import {Line, Bar, Chart} from 'react-chartjs-2';

const dateFormat = 'YYYY-MM-DD';

class HotspotUsage extends Component {
    state = {
        summaryInfo: null,
        dailyVisitsData: this.getVisitsChartData([]),
        newVisitsData: this.getVisitsChartData([]),
        popularHoursData: this.getHoursChartData([]),
        startDate: this.props.startDate ? moment(this.props.startDate).format(dateFormat) : moment().startOf('month').format(dateFormat),
        endDate: this.props.endDate ? moment(this.props.endDate).format(dateFormat) : moment().endOf('month').format(dateFormat),
    };
    token = localStorage.getItem('token');

    componentDidMount(){
        if (this.props.match.params.uuid) {
            this.getHitspotUsageData(this.props.match.params.uuid);
        }
    }
    componentWillReceiveProps(nextProps) {
        if (nextProps.match.params.uuid !== this.props.match.params.uuid) {
            this.getHitspotUsageData(nextProps.match.params.uuid);
        } else if (nextProps.startDate !== this.props.startDate || nextProps.startDate !== this.props.endDate) {
            this.setState({ 
                startDate: moment(nextProps.startDate).format(dateFormat),
                endDate: moment(nextProps.endDate).format(dateFormat),
            }, () => {
                this.getHitspotUsageData(nextProps.match.params.uuid);
            });
        }
    }

    formatSessionDuration(s = 0) {
        const h = (s-(s%=3600))/3600;
        const m = (s-(s%=60))/60;
        return <span className={'count'}>
            {h>0 ? h : ''}{h>0 && <span className={'count-sm'}> h</span>} {m}<span className={'count-sm'}> min</span>
        </span>;
    }

    getHitspotUsageData(uuid) {
        if (!uuid) { return }
        this.getSummaryInfo(uuid);
        this.getDailyVisits(uuid);
        this.getNewVisits(uuid);
        this.getPopularHours(uuid);
    }

    getSummaryInfo = async (uuid) => {
        const { startDate, endDate } = this.state;
        const query = getSummaryAnalytics(this.token, { uuid, startDate, endDate });
        await query.then(res => {
            this.setState({ summaryInfo: res.data })
        });
    }

    getDailyVisits = async (uuid) => {
        const { startDate, endDate } = this.state;
        const query = getDailyVisitsAnalytics(this.token, { uuid, startDate, endDate });
        await query.then(res => {
            this.setState({ dailyVisitsData: this.getVisitsChartData(res.data, 'Visits') })
        }).catch(e => {
            this.setState({ dailyVisitsData: this.getVisitsChartData([]) })
        });
    }

    getNewVisits = async (uuid) => {
        const { startDate, endDate } = this.state;
        const query = getNewVisitsAnalytics(this.token, { uuid, startDate, endDate });
        await query.then(res => {
            this.setState({ newVisitsData: this.getVisitsChartData(res.data, 'Users') })
        }).catch(e => {
            this.setState({ newVisitsData: this.getVisitsChartData([]) })
        });
    }

    getPopularHours = async (uuid) => {
        const { startDate, endDate } = this.state;
        const query = getPopularHoursAnalytics(this.token, { uuid, startDate, endDate });
        await query.then(res => {
            this.setState({ popularHoursData: this.getHoursChartData(res.data) })
        }).catch(e => {
            this.setState({ popularHoursData: this.getHoursChartData([]) })
        });
    }

    getVisitsChartData(pureData, label){
        const data = [], labels = [];
        pureData.map(item => {
            labels.push( moment(item.dateTime).format('MMM D') );
            data.push( item.value );
        });
        return {
            chartType: 'line',
            dataset: [{ label: label || '', data, fill: 'start', lineTension: 0, }],
            labels,
            options: {
                spanGaps: false,
                legend: { display: false },
                maintainAspectRatio: false,
                tooltips: { position: 'nearest', mode: 'index', intersect: false },
                layout: { padding: { left: 25, right: 50, top: 10, bottom: 10 } },
                elements: { point: { radius: 4, borderWidth: 2, hoverRadius: 4, hoverBorderWidth: 2 } },
                scales: {
                    xAxes: [{ gridLines: { display: false, drawBorder: false }, ticks: { padding: 10 } }],
                    yAxes: [{
                        gridLines: { tickMarkLength: 16, drawBorder: false },
                        ticks: { padding: 16, precision: 0, suggestedMin: 0, suggestedMax: 5, }
                    }]
                },
                plugins: { filler: { propagate: false } }
            }
        };
    }

    getHoursChartData(pureData){
        const data = [], labels = [];
        for (let h = 0; h < 24; h+=2) {
            labels.push(`${h<10 ? ('0'+h) : h}:00`);
            data.push(0);
        }
        pureData.map(item => {
            const i = Math.floor(item.argument/2);
            data[i] += item.value;
        });
        const maxValue = Math.max(...data);
        return {
            chartType: 'bar',
            dataset: [{ label: 'Visits', data, fill: 'start', lineTension: 0, }],
            labels,
            options: {
                spanGaps: false,
                legend: { display: false },
                maintainAspectRatio: false,
                tooltips: { position: 'nearest', mode: 'index', intersect: false },
                layout: { padding: { left: 25, right: 50, top: 10, bottom: 10 } },
                elements: { point: { radius: 4, borderWidth: 2, hoverRadius: 4, hoverBorderWidth: 2 } },
                scales: {
                    xAxes: [{ barThickness: 10, gridLines: { display: false, drawBorder: false }, ticks: { padding: 10, suggestedMax: 12 } }],
                    yAxes: [{
                        gridLines: { drawBorder: false },
                        ticks: { display: false, precision: 0, min: 0, max: Math.max(maxValue+(maxValue/5), 5), beginAtZero: true  }
                    }]
                },
                plugins: { filler: { propagate: false } },
                cornerRadius: 5,
                showDatapoints: {
                    fontColor: '#5585ed'
                },
            }
        };
    }

    makeChartStyle(obj, isBarChart) {
        let lineChartBackground = 'rgba(85,133,237,0.1)';
        const canvas = document.getElementById('dailyVisitsChart');
        if (!isBarChart && canvas) {
            const ctx = canvas.getContext('2d');
            const gradient = ctx.createLinearGradient(0, 0, 0, 230)
            gradient.addColorStop(0, 'rgba(85,133,237,0.4)')
            gradient.addColorStop(1, 'rgba(85,133,237,0.02)');
            lineChartBackground = gradient;
        }
        return {
            ...obj, borderColor: '#5585ed', backgroundColor: isBarChart ? '#5585ed' : lineChartBackground,
            pointBackgroundColor: '#fff', pointHoverBackgroundColor: '#fff',
            pointBorderColor: '#5585ed', pointHoverBorderColor: '#5585ed'
        }
    }

    render() {
        const {summaryInfo, dailyVisitsData, popularHoursData, newVisitsData} = this.state;
        const {renderChart} = this.props;

        return (
            <div>
                <div className={'mainGraph'}>
                    <div className="numericRow">
                        <div className="infoCell">
                            <span className={'name'}>New Devices</span>
                            <p className="info">
                                <span
                                    className={'count'}>
                                    {(summaryInfo && summaryInfo.newDevices !== null) ? summaryInfo.newDevices : '0'}
                                </span>
                            </p>
                        </div>
                        <div className="infoCell">
                            <span className={'name'}>Unique Devices</span>
                            <p className="info">
                                <span
                                    className={'count'}>
                                    {(summaryInfo && summaryInfo.uniqueDevices !== null) ? summaryInfo.uniqueDevices : '0'}
                                </span>
                            </p>
                        </div>
                        <div className="infoCell">
                            <span className={'name'}>Average Visits</span>
                            <p className="info">
                                {this.formatSessionDuration((summaryInfo && summaryInfo.averageSessionDuration) || 0)}
                            </p>
                        </div>
                        <div className="infoCell">
                            <span className={'name'}>Total Sessions</span>
                            <p className="info">
                                <span
                                    className={'count'}>
                                    {(summaryInfo && summaryInfo.totalSessions !== null) ? summaryInfo.totalSessions : '0'}
                                </span>
                            </p>
                        </div>
                    </div>

                    <div className="reportChartWrap daily">
                        <p className="reportChartTitle">Daily Visits</p>
                        <div className="reportChart">
                            {renderChart && <Line id='dailyVisitsChart' height={280}
                                data={{ labels: dailyVisitsData.labels, datasets: dailyVisitsData.dataset.map(obj => this.makeChartStyle(obj)) }}
                                options={dailyVisitsData.options}
                            />}
                        </div>
                    </div>
                </div>

                <div className="reportChartsRow">
                    <div className="mainGraph">
                        <div className="reportChartWrap">
                            <p className="reportChartTitle">Popular Hours</p>
                            <div className="reportChart">
                                {renderChart && <Bar height={280}
                                    data={{ labels: popularHoursData.labels, datasets: popularHoursData.dataset.map(obj => this.makeChartStyle(obj, true)) }}
                                    options={popularHoursData.options}
                                />}
                            </div>
                        </div>
                    </div>
                    <div className="mainGraph">
                        <div className="reportChartWrap">
                            <p className="reportChartTitle">New Users</p>
                            <div className="reportChart">
                                {renderChart && <Line height={280}
                                    data={{ labels: newVisitsData.labels, datasets: newVisitsData.dataset.map(obj => this.makeChartStyle(obj)) }}
                                    options={newVisitsData.options}
                                />}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default withRouter(HotspotUsage);


// Extend Chart to show values on top
Chart.pluginService.register({
    afterDraw: function (chartInstance, easing) {
        if (chartInstance.config.options.showDatapoints) {
        var helpers = Chart.helpers;
        var ctx = chartInstance.chart.ctx;
        var fontColor = helpers.getValueOrDefault(chartInstance.config.options.showDatapoints.fontColor, chartInstance.config.options.defaultFontColor);
  
        // render the value of the chart above the bar
        ctx.font = Chart.helpers.fontString(Chart.defaults.global.defaultFontSize, 'normal', Chart.defaults.global.defaultFontFamily);
        ctx.textAlign = 'center';
        ctx.textBaseline = 'bottom';
        ctx.fillStyle = fontColor;
  
        chartInstance.data.datasets.forEach(function (dataset) {
          for (var i = 0; i < dataset.data.length; i++) {
            var model = dataset._meta[Object.keys(dataset._meta)[0]].data[i]._model;
            var scaleMax = dataset._meta[Object.keys(dataset._meta)[0]].data[i]._yScale.maxHeight;
            var yPos = (scaleMax - model.y) / scaleMax >= 0.93 ? model.y + 20 : model.y - 5;
            if (dataset.data[i]) { ctx.fillText(dataset.data[i], model.x, yPos); }
          }
        });
      }
    }
  });
// make chart bar rounded
Chart.helpers.extend(Chart.elements.Rectangle.prototype, {
    draw() {
        const { ctx } = this._chart;
        const vm = this._view;
        let { borderWidth } = vm;

        let left; let right; let top; let bottom; let signX; let signY; let borderSkipped; let
            radius;

        // If radius is less than 0 or is large enough to cause drawing errors a max
        //      radius is imposed. If cornerRadius is not defined set it to 0.
        let { cornerRadius } = this._chart.config.options;
        if (cornerRadius < 0) { cornerRadius = 0; }

        if (typeof cornerRadius === 'undefined') { cornerRadius = 0; }

        if (!vm.horizontal) {
            // bar
            left = vm.x - vm.width / 2;
            right = vm.x + vm.width / 2;
            top = vm.y;
            bottom = vm.base;
            signX = 1;
            signY = bottom > top ? 1 : -1;
            borderSkipped = vm.borderSkipped || 'bottom';
        } else {
            // horizontal bar
            left = vm.base;
            right = vm.x;
            top = vm.y - vm.height / 2;
            bottom = vm.y + vm.height / 2;
            signX = right > left ? 1 : -1;
            signY = 1;
            borderSkipped = vm.borderSkipped || 'left';
        }

        // Canvas doesn't allow us to stroke inside the width so we can
        // adjust the sizes to fit if we're setting a stroke on the line
        if (borderWidth) {
            // borderWidth shold be less than bar width and bar height.
            const barSize = Math.min(Math.abs(left - right), Math.abs(top - bottom));
            borderWidth = borderWidth > barSize ? barSize : borderWidth;
            const halfStroke = borderWidth / 2;
            // Adjust borderWidth when bar top position is near vm.base(zero).
            const borderLeft = left + (borderSkipped !== 'left' ? halfStroke * signX : 0);
            const borderRight = right + (borderSkipped !== 'right' ? -halfStroke * signX : 0);
            const borderTop = top + (borderSkipped !== 'top' ? halfStroke * signY : 0);
            const borderBottom = bottom + (borderSkipped !== 'bottom' ? -halfStroke * signY : 0);
            // not become a vertical line?
            if (borderLeft !== borderRight) {
                top = borderTop;
                bottom = borderBottom;
            }
            // not become a horizontal line?
            if (borderTop !== borderBottom) {
                left = borderLeft;
                right = borderRight;
            }
        }

        ctx.beginPath();
        ctx.fillStyle = vm.backgroundColor;
        ctx.strokeStyle = vm.borderColor;
        ctx.lineWidth = borderWidth;

        // Corner points, from bottom-left to bottom-right clockwise
        // | 1 2 |
        // | 0 3 |
        const corners = [
            [left, bottom],
            [left, top],
            [right, top],
            [right, bottom],
        ];

        // Find first (starting) corner with fallback to 'bottom'
        const borders = ['bottom', 'left', 'top', 'right'];
        let startCorner = borders.indexOf(borderSkipped, 0);
        if (startCorner === -1) {
            startCorner = 0;
        }

        function cornerAt(index) {
            return corners[(startCorner + index) % 4];
        }

        // Draw rectangle from 'startCorner'
        let corner = cornerAt(0);
        ctx.moveTo(corner[0], corner[1]);

        for (let i = 1; i < 4; i += 1) {
            corner = cornerAt(i);
            let nextCornerId = i + 1;
            if (nextCornerId === 4) {
                nextCornerId = 0;
            }

            const width = corners[2][0] - corners[1][0];
            const height = corners[0][1] - corners[1][1];
            const x = corners[1][0];
            const y = corners[1][1];

            radius = cornerRadius;
            // Fix radius being too large
            if (radius > Math.abs(height) / 2) {
                radius = Math.floor(Math.abs(height) / 2);
            }
            if (radius > Math.abs(width) / 2) {
                radius = Math.floor(Math.abs(width) / 2);
            }

            if (height < 0) {
                // Negative values in a standard bar chart
                const xTl = x; const xTr = x + width;
                const yTl = y + height; const yTr = y + height;

                const xBl = x; const xBr = x + width;
                const yBl = y; const yBr = y;

                // Draw
                ctx.moveTo(xBl + radius, yBl);
                ctx.lineTo(xBr - radius, yBr);
                ctx.quadraticCurveTo(xBr, yBr, xBr, yBr - radius);
                ctx.lineTo(xTr, yTr + radius);
                ctx.quadraticCurveTo(xTr, yTr, xTr - radius, yTr);
                ctx.lineTo(xTl + radius, yTl);
                ctx.quadraticCurveTo(xTl, yTl, xTl, yTl + radius);
                ctx.lineTo(xBl, yBl - radius);
                ctx.quadraticCurveTo(xBl, yBl, xBl + radius, yBl);
            } else if (width < 0) {
                // Negative values in a horizontal bar chart
                const xTl = x + width; const xTr = x;
                const yTl = y; const yTr = y;

                const xBl = x + width; const xBr = x;
                const yBl = y + height; const yBr = y + height;

                // Draw
                ctx.moveTo(xBl + radius, yBl);
                ctx.lineTo(xBr - radius, yBr);
                ctx.quadraticCurveTo(xBr, yBr, xBr, yBr - radius);
                ctx.lineTo(xTr, yTr + radius);
                ctx.quadraticCurveTo(xTr, yTr, xTr - radius, yTr);
                ctx.lineTo(xTl + radius, yTl);
                ctx.quadraticCurveTo(xTl, yTl, xTl, yTl + radius);
                ctx.lineTo(xBl, yBl - radius);
                ctx.quadraticCurveTo(xBl, yBl, xBl + radius, yBl);
            } else {
                // Positive Value
                ctx.moveTo(x + radius, y);
                ctx.lineTo(x + width - radius, y);
                ctx.quadraticCurveTo(x + width, y, x + width, y + radius);
                ctx.lineTo(x + width, y + height);
                //   ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
                ctx.lineTo(x, y + height);
                //   ctx.quadraticCurveTo(x, y + height, x, y + height - radius);
                ctx.lineTo(x, y + radius);
                ctx.quadraticCurveTo(x, y, x + radius, y);
            }
        }

        ctx.fill();
        if (borderWidth) {
            ctx.stroke();
        }
    },
});