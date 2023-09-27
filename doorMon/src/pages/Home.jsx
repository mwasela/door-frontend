
import { CheckCard, StatisticCard } from '@ant-design/pro-components'
import { Row, Col } from 'antd'
import { useState } from 'react'
import { useEffect } from 'react'
import axios from 'axios'



const { Statistic } = StatisticCard;

axios.defaults.baseURL = 'http://10.168.3.233:44839/'

export default function Home() {
  const [accessData, setAccessData] = useState([]);
  const [responsive, setResponsive] = useState(false);
  const [length, setLength] = useState(0);
  const [doorData, setdoorData] = useState([]);
 const [status, setStatus] = useState('offline');

  //the use effect here is quite. Helpful.

  useEffect(() => {
    fetchAccesslogs().then((data) => {
      console.log("access data", accessData);
    });
  }, []);

  useEffect(() => {
    fetchDoors().then((data) => {
        console.log("doors data", data);
        setStatus('Online');
     
    });
}, [doorData]);


const _length = doorData.length;
const _open = doorData.filter((door) => door.mgr_doors_state === "1").length;
const _description = 
`
Doors Connected -> ${_length} \n 
Doors Opened ->${_open}  
\n Status: ${status}`;


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

  const pingBackend = async () => {
    try {
      const response = await axios.get('/doors');
      console.log("response", response);
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
            title="Status Summary"
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
                  alt="trend"
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
              description={doorCard.mgr_doors_state ==="1"? "Unlocked" : "Locked"}
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
