
import { CheckCard, StatisticCard, ProCard, ProTable } from '@ant-design/pro-components'
import { Row, Col, Tag } from 'antd'
import { useState } from 'react'
import { useEffect } from 'react'
import axios from '../helpers/axios'
import moment from 'moment'


const { Statistic } = StatisticCard;

//axios.defaults.baseURL = 'http://10.168.3.233:3333/'
//axios.defaults.baseURL = 'http://localhost:3333/'

export default function Home() {
  const [accessData, setAccessData] = useState([]);
  const [responsive, setResponsive] = useState(false);
  const [length, setLength] = useState(0);
  const [doorData, setdoorData] = useState([]);
  const [status, setStatus] = useState('Offline');
  const [deviceState, setDeviceState] = useState(0);
  const [accesslogsLength, setAccesslogsLength] = useState(0);

  //the use effect here is quite. Helpful.

  useEffect(() => {
    fetchAccesslogs().then((data) => {
      //console.log("access data", accessData);
    });
  }, [accessData]);

  useEffect(() => {
    fetchDoors().then((data) => {
      //console.log("doors data", data);
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


  // const checkDevice = async () => {
  //   try {
  //     const response = await axios.get('/doors');
  //     //console.log("response", response.data);
  //     setDeviceState(response.data);
  //   } catch (error) {
  //     console(error);
  //   }

  // }


  const fetchDoors = async () => {
    try {
      const response = await axios.get('/doors');
      //console.log("response", response);
      const length = response.data.length;
      setdoorData(response.data);
      setLength(length);
      //console.log("length", length);
      feedAccesslogs(response.data);
      return response.data;
    } catch (error) {
      console.error(error);
    }
  };


  function feedAccesslogs(incomingData) {
    incomingData.map((door) => {
      if (door.mgr_doors_state === "1") {
        //console.log("door open");
        axios.post('/logs', {
          gbh_mgrmdraccesslogs_doors: door.id,
          gbh_mgrmdraccesslogs_locations: door.mgr_doors_location,
          gbh_mgrmdraccesslogs_terminal: door.mgr_doors_terminal,
          mgr_accesslogs_state: door.mgr_doors_state,

        })
      } else {
        return;
      }
    })
  }
  const pingBackend = async () => {
    try {
      const response = await axios.get('/doors');
      //console.log("response", response);
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
      setAccesslogsLength(response.data.meta.total);
      console.log("accesslogsLength", response.data);
      //console.log("accesslogsLength", accesslogsLength);
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
                value: accesslogsLength,
                description: (
                  <Statistic title="Total" value="6.15%" trend="up" />
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
                value: parseInt(12 + accesslogsLength/2),
                description: (
                  <Statistic title="Up" value="3.85%" trend="down" />
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
                value: accesslogsLength - parseInt(12 + accesslogsLength/2),
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
                console.log("doorCard", doorCard)

                return (
                  <CheckCard
                    key={doorCard.id}
                    title={doorCard.mgr_doors_name}
                    description={doorCard.mgr_doors_state === "1" ? "Unlocked" : "Locked"}
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

      <ProTable
        request={async (params = {}) => {
          try {
            const response = await axios.get('/logs', 
            {
              params: params,
            }
            );
            console.log("My Res", response);
            return { data: response.data.data, success: true, total: response.data.meta.total };
          } catch (error) {
            console.error(error);
          }
        }}

        columns={[
          {
            title: 'TimeStamp',
            dataIndex: 'mgr_accesslogs_time',
            key: 'mgr_accesslogs_time',
            valueType: 'dateTime',
            render: (text, record) => {
              const timeDifference = moment(record.mgr_accesslogs_time).fromNow();
              return <span>{timeDifference}</span>;
            },
          },
          // {
          //   title: 'TimeStamp',
          //   dataIndex: 'mgr_accesslogs_time',
          //   key: 'mgr_accesslogs_time',
          //   valueType: 'dateTime',
          //   render: (text, record) => {
          //     const formattedTime = moment(record.mgr_accesslogs_time).format('llll');
          //     return <span>{formattedTime}</span>;
          //   },
          // },             
          {
            title: 'Door',
            dataIndex: ['door', "mgr_doors_name"],
            key: 'gbh_mgrmdraccesslogs_doors',
          },
          {
            title: 'Location',
            dataIndex: ["location", "mgr_location_name"],
            key: 'mgr_doors_location',
          },
          {
            title: 'Terminal',
            dataIndex: ["terminal", "mgr_terminal_name"],
            key: 'mgr_doors_terminal',
          },
          {
            title: 'State',
            dataIndex: 'mgr_accesslogs_state',
            key: 'mgr_accesslogs_state',
            render: (dom, entity) => {
              return dom === "1" ? <Tag color='error'>
                Unlocked
              </Tag> : <Tag color='success'>
                Locked
              </Tag>
            }
          },
        ]}
        // dataSource={accessData}
        rowKey="id"
        search={false}
        options={{
          search: true,
        }}
        pagination={{
          pageSize: 5,
        }}
        dateFormatter="string"
        headerTitle="Door Events list"
      />

    </>
  )
}
