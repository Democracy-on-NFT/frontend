import * as am5 from '@amcharts/amcharts5';
import * as am5xy from '@amcharts/amcharts5/xy';
import am5themes_Animated from '@amcharts/amcharts5/themes/Animated';

const StackedChart = (props) => {
  const { left, right, root } = props;

  root.setThemes([
    am5themes_Animated.new(root)
  ]);

  let chart = root.container.children.push(
    am5xy.XYChart.new(root, {})
  );

  chart.getNumberFormatter().set('numberFormat', '#s');

  const data = [
    {
      id: 0,
      title: 'Proiecte de hotărâri'
    },

    {
      id: 1,
      title: 'Inițiative legislative'
    },
    {
      id: 2,
      title: 'Întrebări'
    },
    {
      id: 3,
      title: 'Moțiuni semnate'
    },
    {
      id: 4,
      title: 'Discursuri'
    }
  ];

  data.map((data, id) => {
    data.left = -Math.abs(left[id]) || 0;
    data.right = right[id] || 0;
  });

  const yAxis = chart.yAxes.push(
    am5xy.CategoryAxis.new(root, {
      categoryField: 'title',
      renderer: am5xy.AxisRendererY.new(root, {
        inversed: true,
        cellStartLocation: 0.1,
        cellEndLocation: 0.9,

      })
    })
  );

  yAxis.data.setAll(data);

  const xAxis = chart.xAxes.push(
    am5xy.ValueAxis.new(root, {
      renderer: am5xy.AxisRendererX.new(root, {})
    })
  );

  function createSeries(field, labelCenterX) {
    const series = chart.series.push(
      am5xy.ColumnSeries.new(root, {
        xAxis: xAxis,
        yAxis: yAxis,
        valueXField: field,
        categoryYField: 'title',
        sequencedInterpolation: true,
        clustered: false,
      })
    );

    series.bullets.push(function () {
      return am5.Bullet.new(root, {
        locationX: 1,
        locationY: 0.5,
        sprite: am5.Label.new(root, {
          centerY: am5.p50,
          text: '{valueX}',
          populateText: true,
          centerX: labelCenterX
        })
      });
    });

    series.data.setAll(data);
    series.appear();

    series.columns.template.events.on('click', function (ev) {
      console.log('Clicked on a column', ev.target);
    });

    return series;
  }

  createSeries('left', am5.p100);
  createSeries('right', 0);

  chart.appear(2000, 200);
}

export default StackedChart;