
import { CheckCard, StatisticCard } from '@ant-design/pro-components'
import { Row, Col } from 'antd'
import { useState } from 'react'
import RcResizeObserver from 'rc-resize-observer'

const _description = "Current Door: C45 PortSide \n Status: Locked \n Last Access: 2021-10-01 12:00:00"

const { Statistic} = StatisticCard;

export default function Home() {

  const [responsive, setResponsive] = useState(false);

  return (
    <>
    <RcResizeObserver
      key="resize-observer"
      onResize={(offset) => {
        setResponsive(offset.width < 596);
      }}
    ></RcResizeObserver>
      <Row span={10}>
        <Col>

          <CheckCard
            title="Current Door"
            description={_description}
            style={{ width: 200, height: 180 }}
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
              title: 'Monthly Access Data',
              value: 601987768,
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
              title: 'Normal Access',
              value: 6,
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
              title: 'Abnormal Access',
              value: 2,
              description: (
                <Statistic title="DownTrend" value="6.47%" trend="up" />
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
       <CheckCard
  title="Door A"
  description="Status: Locked"
  value="A"
  style={{
    backgroundColor: 'green',
    color: 'white',          // Set font color to white
    fontSize: '16px',        // Increase font size by 3 pixels
  }}
/>

<CheckCard
  title="Door B"
  description="Status: Locked"
  value="B"
  style={{
    backgroundColor: '#c94b47',
    color: 'white',
    fontSize: '16px',
  }}
/>

<CheckCard
  title="Door C"
  description="Status: Locked"
  value="C"
  style={{
    backgroundColor: 'green',
    color: 'white',
    fontSize: '16px',
  }}
/>

<CheckCard
  title="Door D"
  description="Status: Locked"
  value="D"
  style={{
    backgroundColor: 'green',
    color: 'white',
    fontSize: '16px',
  }}
/>

<CheckCard
  title="Door E"
  description="Status: Locked"
  value="E"
  style={{
    backgroundColor: 'green',
    color: 'green',
    fontSize: '16px',
  }}
/>

<CheckCard
  title="Door F"
  description="Status: Locked"
  value="F"
  style={{
    backgroundColor: 'green',
    color: 'white',
    fontSize: '16px',
  }}
/>

<CheckCard
  title="Door G"
  description="Status: Open"
  value="G"
  style={{
    backgroundColor: '#c94b47',
    color: 'white',
    fontSize: '16px',
  }}
/>

<CheckCard
  title="Door H"
  description="Status: Locked"
  value="H"
  
  style={{
    backgroundColor: 'green',
    color: 'white',
    fontSize: '16px',
  }}
/>


     
      </CheckCard.Group>
      </Col>
      </Row>

    </>
  )
}
