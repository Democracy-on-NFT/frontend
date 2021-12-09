import React, { useEffect } from 'react';
import * as am5 from '@amcharts/amcharts5';
import * as am5xy from '@amcharts/amcharts5/xy';
import am5themes_Animated from '@amcharts/amcharts5/themes/Animated';

const MultipleDateAxes = (props) => {

    const { left, right } = props;

    useEffect(() => {
        let data = [];
        let price0 = 100,
            price1 = 100,
            price2 = 100,
            price3 = 100,
            price4 = 100;

        for (let i = 0; i < 12; i++) {
            price0 += Math.round((Math.random() < 0.5 ? 1 : 1) * Math.random() * 10);
            data.push({ date0: new Date(2020, i, 0).getTime(), price0: price0 });
        }

        for (let i = 0; i < 12; i++) {
            price1 += Math.round((Math.random() < 0.5 ? 1 : 1) * Math.random() * 10);
            data.push({ date1: new Date(2020, i, 0).getTime(), price1: price1 });
        }

        for (let i = 0; i < 12; i++) {
            price2 += Math.round((Math.random() < 0.5 ? 1 : 1) * Math.random() * 10);
            data.push({ date2: new Date(2020, i, 0).getTime(), price2: price2 });
        }

        for (let i = 0; i < 12; i++) {
            price3 += Math.round((Math.random() < 0.5 ? 1 : 1) * Math.random() * 10);
            data.push({ date3: new Date(2020, i, 0).getTime(), price3: price3 });
        }

        for (let i = 0; i < 12; i++) {
            price4 += Math.round((Math.random() < 0.5 ? 1 : 1) * Math.random() * 10);
            data.push({ date4: new Date(2020, i, 0).getTime(), price4: price4 });
        }

        for (let i = 0; i < 12; i++) {
            price3 += Math.round((Math.random() < 0.5 ? 1 : 1) * Math.random() * 10);
            data.push({ date3: new Date(2020, i, 0).getTime(), price3: price3 });
        }

        for (let i = 0; i < 12; i++) {
            price4 += Math.round((Math.random() < 0.5 ? 1 : 1) * Math.random() * 10);
            data.push({ date4: new Date(2020, i, 0).getTime(), price4: price4 });
        }

        // Create root element
        // https://www.amcharts.com/docs/v5/getting-started/#Root_element
        const root = am5.Root.new("multiple-date-axes");

        // Set themes
        // https://www.amcharts.com/docs/v5/concepts/themes/
        root.setThemes([
            am5themes_Animated.new(root)
        ]);

        // Create chart
        // https://www.amcharts.com/docs/v5/charts/xy-chart/
        const chart = root.container.children.push(
            am5xy.XYChart.new(root, {
                panX: true,
                panY: true,
                wheelX: "panX",
                wheelY: "zoomX"
            })
        );

        // Add cursor
        // https://www.amcharts.com/docs/v5/charts/xy-chart/cursor/
        const cursor = chart.set("cursor", am5xy.XYCursor.new(root, {
            behavior: "none"
        }));
        cursor.lineY.set("visible", false);

        // Create axes
        // https://www.amcharts.com/docs/v5/charts/xy-chart/axes/
        const xAxis0 = chart.xAxes.push(
            am5xy.DateAxis.new(root, {
                baseInterval: { timeUnit: "month", count: 1 },
                renderer: am5xy.AxisRendererX.new(root, {}),
                tooltip: am5.Tooltip.new(root, {}),
                tooltipDateFormat: "yyyy-MM"
            })
        );

        const xAxis1 = chart.xAxes.push(
            am5xy.DateAxis.new(root, {
                baseInterval: { timeUnit: "month", count: 1 },
                renderer: am5xy.AxisRendererX.new(root, {}),
                tooltip: am5.Tooltip.new(root, {}),
                tooltipDateFormat: "yyyy-MM"
            })
        );

        const xAxis2 = chart.xAxes.push(
            am5xy.DateAxis.new(root, {
                baseInterval: { timeUnit: "month", count: 1 },
                renderer: am5xy.AxisRendererX.new(root, {}),
                tooltip: am5.Tooltip.new(root, {}),
                tooltipDateFormat: "yyyy-MM"
            })
        );
        const xAxis3 = chart.xAxes.push(
            am5xy.DateAxis.new(root, {
                baseInterval: { timeUnit: "month", count: 1 },
                renderer: am5xy.AxisRendererX.new(root, {}),
                tooltip: am5.Tooltip.new(root, {}),
                tooltipDateFormat: "yyyy-MM"
            })
        );
        const xAxis4 = chart.xAxes.push(
            am5xy.DateAxis.new(root, {
                baseInterval: { timeUnit: "month", count: 1 },
                renderer: am5xy.AxisRendererX.new(root, {}),
                tooltip: am5.Tooltip.new(root, {}),
                tooltipDateFormat: "yyyy-MM"
            })
        );

        const yAxis = chart.yAxes.push(
            am5xy.ValueAxis.new(root, {
                maxDeviation: 1,
                renderer: am5xy.AxisRendererY.new(root, { pan: "zoom" })
            })
        );

        // Add series
        // https://www.amcharts.com/docs/v5/charts/xy-chart/series/
        const series0 = chart.series.push(
            am5xy.LineSeries.new(root, {
                name: "Series",
                xAxis: xAxis0,
                yAxis: yAxis,
                valueYField: "price0",
                valueXField: "date0",
                tooltip: am5.Tooltip.new(root, {
                    labelText: "{valueY}"
                })
            })
        );

        const series1 = chart.series.push(
            am5xy.LineSeries.new(root, {
                name: "Series",
                xAxis: xAxis1,
                yAxis: yAxis,
                valueYField: "price1",
                valueXField: "date1",
                tooltip: am5.Tooltip.new(root, {
                    labelText: "{valueY}"
                })
            })
        );
        const series2 = chart.series.push(
            am5xy.LineSeries.new(root, {
                name: "Series",
                xAxis: xAxis2,
                yAxis: yAxis,
                valueYField: "price2",
                valueXField: "date2",
                tooltip: am5.Tooltip.new(root, {
                    labelText: "{valueY}"
                })
            })
        );
        const series3 = chart.series.push(
            am5xy.LineSeries.new(root, {
                name: "Series",
                xAxis: xAxis3,
                yAxis: yAxis,
                valueYField: "price3",
                valueXField: "date3",
                tooltip: am5.Tooltip.new(root, {
                    labelText: "{valueY}"
                })
            })
        );
        const series4 = chart.series.push(
            am5xy.LineSeries.new(root, {
                name: "Series",
                xAxis: xAxis4,
                yAxis: yAxis,
                valueYField: "price4",
                valueXField: "date4",
                tooltip: am5.Tooltip.new(root, {
                    labelText: "{valueY}"
                })
            })
        );

        // Add scrollbar
        // https://www.amcharts.com/docs/v5/charts/xy-chart/scrollbars/
        const scrollbar = chart.set("scrollbarX", am5xy.XYChartScrollbar.new(root, {
            orientation: "horizontal",
            height: 60
        }));

        const sbDateAxis = scrollbar.chart.xAxes.push(
            am5xy.DateAxis.new(root, {
                baseInterval: {
                    timeUnit: "day",
                    count: 1
                },
                renderer: am5xy.AxisRendererX.new(root, {})
            })
        );

        const sbValueAxis = scrollbar.chart.yAxes.push(
            am5xy.ValueAxis.new(root, {
                renderer: am5xy.AxisRendererY.new(root, {})
            })
        );

        const sbSeries = scrollbar.chart.series.push(
            am5xy.LineSeries.new(root, {
                valueYField: "price0",
                valueXField: "date0",
                xAxis: sbDateAxis,
                yAxis: sbValueAxis
            })
        );

        series0.data.setAll(data);
        series1.data.setAll(data);
        series2.data.setAll(data);
        series3.data.setAll(data);
        series4.data.setAll(data);
        sbSeries.data.setAll(data);

        // Make stuff animate on load
        // https://www.amcharts.com/docs/v5/concepts/animations/
        series0.appear(1000);
        series1.appear(1000);
        series2.appear(1000);
        series3.appear(1000);
        series4.appear(1000);
        chart.appear(1000, 100);
    }, []);

    return (
        <div className="multiple-date-axes" id="multiple-date-axes" style={{ height: "500px" }}></div>
    );
}

export default MultipleDateAxes;