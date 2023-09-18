import { PageContainer } from '@ant-design/pro-layout';
import ProTable from '@ant-design/pro-table';
import { Button, Badge } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { ModalForm, ProFormText, ProFormSelect, ProForm } from '@ant-design/pro-form';
import { message } from 'antd';
import axios from 'axios';
import { useEffect, useState } from 'react';






export default function Doors() {
    axios.defaults.baseURL = 'http://10.168.3.233:3333/'

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
                            <Button type="primary">
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
                                request={async () => [
                                    {
                                        value: 'chapter',
                                        label: '盖章后生效',
                                    },
                                ]}
                                width="xs"
                                name="Terminal"
                                label="Terminal"
                            />
                            <ProFormSelect
                                width="xs"
                                options={[
                                    {
                                        value: 'time',
                                        label: '履行完终止',
                                    },
                                ]}
                                name="Location"
                                label="Location"
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


