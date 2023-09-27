import { PageContainer } from '@ant-design/pro-layout';
import ProTable from '@ant-design/pro-table';
import { Button, Badge } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { ModalForm, ProFormText, ProFormSelect, ProForm } from '@ant-design/pro-form';
import { message } from 'antd';
import axios from 'axios';
import { useEffect, useState } from 'react';






export default function Doors() {
    axios.defaults.baseURL = 'http://10.168.3.233:44839/'

    const [doorData, setdoorData] = useState([]);

    useEffect(() => {
        fetchDoors().then((data) => {
            console.log("doors data", data);
            setdoorData(data);
        });
    }, []);


    const fetchDoors = async () => {
        try {
            const response = await axios.get('/doors');
            console.log("response", response);
            return response.data;
        } catch (error) {
            console.error(error);
        }

    };


    const waitTime = (time = 100) => {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve(true);
            }, time);
        });
    };


    const approvals = []

    const columns = [
        {
            title: "ID",
            dataIndex: "id",
            hideInTable: true,
            search: false,
        },
        {
            title: "Door Name",
            dataIndex: "mgr_doors_name",
            key: "doorName",
            search: true,

        },
        {
            title: "Location",
            dataIndex: "mgr_doors_location",
            type: "textarea",
            key: "location",

        },
        {
            title: "Terminal",
            dataIndex: "mgr_doors_terminal",
            key: "terminal",

        },
        {
            title: "IP Address",
            dataIndex: "mgr_doors_ip",
            key: "ipAddress",
        },


    ];


    return (
        <>
            <PageContainer>
                <ModalForm
                    title="Add New Door"
                    trigger={
                        <Button 
                        type="primary"
                        style={{ marginBottom: 20 }}>
                            <PlusOutlined />
                            Add Door
                        </Button>
                    }
                    autoFocusFirstInput
                    modalProps={{
                        destroyOnClose: true,
                        onCancel: () => console.log('run'),
                    }}
                    submitTimeout={2000}
                    onFinish={async (values) => {
                        await waitTime(2000);
                        console.log(values.name);
                        const req = axios.post('/doors', {
                            mgr_doors_name: values.name,
                            mgr_doors_location: values.Location,
                            mgr_doors_terminal: values.Terminal,
                            mgr_doors_ip: values.ipAddress,
                            mgr_doors_state: 0,
                        }).then((response) => {
                            console.log("response", response);

                        }).catch((error) => {
                            console.log("error", error);
                        });
                        console.log("req", req);
                        message.success('Door Added Successfully');
                        return true;
                    }}
                >
                    <ProForm.Group>
                        <ProFormText
                            width="md"
                            name="name"
                            label="Door Name"
                            tooltip="Enter Door Name"
                            placeholder="Door Name"
                        />
                    </ProForm.Group>
                    <ProForm.Group>
                        <ProFormSelect
                            width="xs"
                            label="Terminal"
                            name="Terminal"
                            request={async () => {
                                const data = await axios.get('/terminals');
                                // const pips = fetchUsers();
                                //console.log("Pips:",pips);
                                // console.log("teams:",data);

                                console.log("dataa", data);
                                return data.data.map((option) => ({
                                    label:
                                        option.mgr_terminal_name,

                                    value: option.id,
                                }));
                            }}
                            placeholder="Select Terminal"
                            rules={[{ required: true, message: 'Select a Terminal!' }]}
                            showSearch={true}
                            onChange={(value, option) => {
                                //console.log(value, option)
                                //setSelectedShiftType(option.label)           

                            }
                            }
                        />
                        <ProFormSelect
                            width="md"
                            label="Location"
                            name="Location"
                            request={async () => {
                                const data = await axios.get('/locations');
                                // const pips = fetchUsers();
                                //console.log("Pips:",pips);
                                // console.log("teams:",data);

                                console.log("loc dataa", data);
                                return data.data.map((option) => ({
                                    label:
                                        option.mgr_location_name,

                                    value: option.id,
                                }));
                            }}
                            placeholder="Select Location"
                            rules={[{ required: true, message: 'Select a Location!' }]}
                            showSearch={true}
                            onChange={(value, option) => {
                                //console.log(value, option)
                                //setSelectedShiftType(option.label)           
                            }
                            }
                        />
                    </ProForm.Group>

                    <ProFormText
                        name="ipAddress"
                        label="IP Address"
                        initialValue="0.0.0.0"
                    />
                </ModalForm>
                <ProTable
                    columns={columns}
                    dataSource={doorData}

                    pagination={{
                        pageSize: 10,
                        total: 10,
                    }}
                    options={{
                        density: false,
                        reload: false,
                    }}
                />
            </PageContainer>
        </>

    )
}


