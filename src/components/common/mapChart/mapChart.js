import * as am5 from "@amcharts/amcharts5";
import * as am5map from "@amcharts/amcharts5/map";
import RomaniaSVG from "../../../assets/svg/romaniaHigh.svg";


const MapChart = () => {
    // var root = am5.Root.new("root");
    // var chart = root.container.children.push(
    //     am5map.MapChart.new(root, {
    //         projection: am5map.geoMercator()
    //     })
    // );
    // // root.geodataSource.url = './../../../public/romaniaHigh.svg'
    // // var polygonSeries = chart.series.push(
    // //     am5map.MapPolygonSeries.new(root, {
    // //       geoJSON: am5geodata_worldLow
    // //     })
    // //   );

    // am5.net.load('../../../../public/romaniaHigh.svg').then(function (result) {
    //     // This gets executed when data finishes loading
    //     // ... do something
    //     console.log(result.response);
    // }).catch(function (result) {
    //     // This gets executed if there was an error loading URL
    //     // ... handle error
    //     console.log("Error loading " + result.xhr.responseURL);
    // });

    return (
        <>
            <div>
                <img src={RomaniaSVG} />
            </div>
        </>
    )
}

export default MapChart;
