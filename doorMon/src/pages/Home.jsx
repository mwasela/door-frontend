
import { CheckCard, StatisticCard } from '@ant-design/pro-components'
import { Row, Col } from 'antd'
import { useState } from 'react'
import { useEffect } from 'react'
import axios from 'axios'

const _description = "Current Door: C45 PortSide \n Status: Locked \n Last Access: 2021-10-01 12:00:00"

const { Statistic } = StatisticCard;

axios.defaults.baseURL = 'http://10.168.3.233:3333/'

export default function Home() {
  const [accessData, setAccessData] = useState([]);
  const [responsive, setResponsive] = useState(false);
  const [length, setLength] = useState(0);
  const [doorData, setdoorData] = useState([]);

  useEffect(() => {
    fetchAccesslogs().then((data) => {
      console.log("access data", accessData);
    });
  }, []);

  useEffect(() => {
    fetchDoors().then((data) => {
        console.log("doors data", data);
     
    });
}, [doorData]);



  const fetchDoors = async () => {
    try {
        const response = await axios.get('/doors');
        console.log("response", response);
        const length = response.data.length;
        setdoorData(response.data);
        setLength(length);
        console.log("length", length);
        return response.data;
    } catch (error) {
        console.error(error);
    }

  };


  const fetchAccesslogs = async () => {
    try {
      const response = await axios.get('/logs');
      setAccessData(response.data);
      //check length of array in response.dat
  
      return response.data;
    } catch (error) {
      console.error(error);
    }
  };





  return (
    <>

      <Row span={10}>
        <Col>

          <CheckCard
            title="Current Door"
            description={_description}
            style={{ width: 175, height: 160, flex: 1 }}
          />

          <div style={{
            height: 8,


          }} />

        </Col>
        <Col span={12}>

          <StatisticCard.Group
            colSpan={responsive ? 24 : 18}
            direction={responsive ? 'column' : undefined}
          >
            <StatisticCard
              statistic={{
                title: 'Monthly Access',
                value: 601,
                description: (
                  <Statistic title="Erends" value="6.15%" trend="up" />
                ),
              }}
              chart={
                <img
                  src="https://gw.alipayobjects.com/zos/alicdn/zevpN7Nv_/xiaozhexiantu.svg"
                  alt="Heard"
                  width="100%"
                />
              }
            >

            </StatisticCard>
            <StatisticCard
              statistic={{
                title: 'Normal',
                value: 438,
                description: (
                  <Statistic title="UpT rend" value="3.85%" trend="down" />
                ),
              }}
              chart={
                <img
                  src="https://gw.alipayobjects.com/zos/alicdn/zevpN7Nv_/xiaozhexiantu.svg"
                  alt="折线图"
                  width="100%"
                />
              }
            >

            </StatisticCard>
            <StatisticCard
              statistic={{
                title: 'Abnormal',
                value: 163,
                description: (
                  <Statistic title="Down" value="6.47%" trend="up" />
                ),
              }}
              chart={
                <img
                  src="https://gw.alipayobjects.com/zos/alicdn/zevpN7Nv_/xiaozhexiantu.svg"
                  alt="折线图"
                  width="100%"
                />
              }
            >

            </StatisticCard>
          </StatisticCard.Group>

        </Col>
      </Row>
      < Row span={20}>
        <Col>
          <CheckCard.Group
            onChange={(value) => {
              console.log('value', value);
            }}
            defaultValue="A"
          >

{
  doorData.map((doorCard) => {
    console.log("doorCard", doorCard )

    return (
      <CheckCard
      key={doorCard.id}
              title={doorCard.mgr_doors_name}
              description={doorCard.mgr_doors_state}
              value="A"
              style={{
                backgroundColor: doorCard.mgr_doors_state === "1" ? 'red' : 'green',
                color: 'white',          // Set font color to white
                fontSize: '16px',        // Increase font size by 3 pixels
              }}
            />
  )
  }
  )
}

            

            



          </CheckCard.Group>
        </Col>
      </Row>

    </>
  )
}
