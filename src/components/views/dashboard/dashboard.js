import React from 'react';
import { useState, useEffect } from 'react';
import { Grid, Menu, Select } from 'semantic-ui-react';
import { useHistory } from 'react-router-dom';

import MapChart from '../../common/mapChart/mapChart';
import * as service from '../../../api/service.api';

import worldMap from '../../../assets/world-map.jpg';

const Dashboard = props => {
  const [total, setTotal] = useState();
  const [countiesData, setCountiesData] = useState([{}]);
  const history = useHistory();
  const data = [{
    id: 2,
    text: '2020 - 2024',
    value: 2
  }];

  const handleImageOver = (e) => {
    document.getElementById('world-map-text').style.display = 'block';
  }

  const handleImageLeave = () => {
    document.getElementById('world-map-text').style.display = 'none';
  }

  const handleImageClick = () => {
    history.push(`/judet/43`);
  }

  const loadData = async () => {
    const result = await service.getDeputiesByCommunity(9);
    const counties = await service.getDeputiesByCounty(9);

    setTotal(result);

    setCountiesData(counties);
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <>
      <div className="dashboard-container">
        <Grid columns='equal'>
          <Grid.Row columns={3}>
            <Grid.Column>
              <Menu fluid vertical>
                <Menu.Item className='header'>Listă parlamentari</Menu.Item>
              </Menu>
              <img src={worldMap}
                onMouseOver={handleImageOver}
                onMouseLeave={handleImageLeave}
                onClick={handleImageClick} />
              <div id="world-map-text">
                <p>Deputați: {total ? total.diaspora.deputati : 0}</p>
                <p>Senatori: {total ? total.diaspora.senatori : 0}</p>
              </div>
            </Grid.Column>
            <Grid.Column textAlign='center'>
              <Menu fluid vertical>
                <Menu.Item className='header'>Total: {total ? total.diaspora.deputati
                  + total.diaspora.senatori
                  + total.romania.deputati
                  + total.romania.senatori : 0}</Menu.Item>
                <Menu.Item>
                  <span>România: {total ? total.romania.deputati + total.romania.senatori : 0}</span>
                  | <span>Diaspora: {total ? total.diaspora.deputati + total.diaspora.senatori : 0}</span>
                </Menu.Item>
                <Menu.Item>Deputați: {total ? total.romania.deputati + total.diaspora.deputati : 0}</Menu.Item>
                <Menu.Item>Senatori: {total ? total.romania.senatori + total.diaspora.senatori : 0}</Menu.Item>

              </Menu>
            </Grid.Column>
            <Grid.Column textAlign='right' className="aligned">
              <Menu fluid vertical>
                <Menu.Item className='header'>
                  Mandate <Select options={data} defaultValue={data[data.length - 1].value} />
                </Menu.Item>
              </Menu>
            </Grid.Column>
          </Grid.Row>
        </Grid>

        <MapChart countiesData={countiesData} />
      </div>
    </>
  );
};

export default Dashboard;
