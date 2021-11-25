import { useEffect } from 'react';
import * as am5 from '@amcharts/amcharts5';
import * as am5percent from '@amcharts/amcharts5/percent';
import am5themes_Animated from '@amcharts/amcharts5/themes/Animated';

const PieChart = props => {
    useEffect(() => {
        const root = am5.Root.new("pie-chart");

        root.setThemes([
            am5themes_Animated.new(root)
        ]);

        const chart = root.container.children.push(
            am5percent.PieChart.new(root, {
                layout: root.verticalLayout
            })
        );

        // Define data
        const data = [{
            party: "PNL",
            sales: 100000
        }, {
            party: "PSD",
            sales: 160000
        }, {
            party: "USR",
            sales: 80000
        }, {
            party: "AUR",
            sales: 20000
        }, {
            party: "UDMR",
            sales: 9000
        }];

        // Create series
        const series = chart.series.push(
            am5percent.PieSeries.new(root, {
                name: "Series",
                valueField: "sales",
                categoryField: "party"
            })
        );
        series.data.setAll(data);

        // Add legend
        const legend = chart.children.push(am5.Legend.new(root, {
            centerX: am5.percent(50),
            x: am5.percent(50),
            layout: root.horizontalLayout
        }));

        legend.data.setAll(series.dataItems);

        series.labels.template.setAll({
            text: "{category}",
            textType: "circular",
            inside: true,
            radius: 10,
            fontSize: 12,
        });

        // Configuring slices
        series.slices.template.setAll({
            stroke: am5.color(0xffffff),
            strokeWidth: 1,
        });

        series.get("colors").set("colors", [
            am5.color("#FFD3D1"),
            am5.color("#FFE664"),
            am5.color("#A6D6F5"),
            am5.color("#A6D6F5"),
            am5.color("#A6D6F5"),
        ]);

        // series.slices.template.set("fillGradient", am5.LinearGradient.new(root, {
        //     stops: [{
        //         color: am5.color(0xff0000),
        //     }, {
        //         color: am5.color(0x0099ff),
        //     }, {
        //         color: am5.color(0xffffff),
        //     }, {
        //         color: am5.color(0xffff00),
        //     }, {
        //         color: am5.color(0x33cc33),
        //     }]
        // }));

        chart.appear(2000, 200);
    }, []);
    return (
        <div className="pie-chart" id="pie-chart" style={{ width: "1000px", height: "300px", margin: "20px auto" }}></div>
    )
}

export default PieChart;
