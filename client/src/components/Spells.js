import React from 'react';
import {Card, Icon, Descriptions} from 'antd';

class Spells extends React.Component {
    render() {
        return (
            <div className="profile-page">
                Название
                Уровень
                Время накладывание
                Дистанция
                Компоненты
                Длительнсть
                Классы
                Описание
                <Card size="small" title="Small size card"
                      extra={<a href="#">More</a>}
                      actions={[
                          <Icon type="setting" key="setting" />,
                          <Icon type="edit" key="edit" />,
                          <Icon type="ellipsis" key="ellipsis" />,
                      ]}
                      style={{ width: 300 }}>
                    <p>Card content</p>
                    <p>Card content</p>
                    <p>Card content</p>

                    <Descriptions title="User Info">
                        <Descriptions.Item label="UserName">Zhou Maomao</Descriptions.Item>
                        <Descriptions.Item label="Telephone">1810000000</Descriptions.Item>
                        <Descriptions.Item label="Live">Hangzhou, Zhejiang</Descriptions.Item>
                        <Descriptions.Item label="Remark">empty</Descriptions.Item>
                        <Descriptions.Item label="Address">
                            No. 18, Wantang Road, Xihu District, Hangzhou, Zhejiang, China
                        </Descriptions.Item>
                    </Descriptions>
                </Card>
            </div>
        );
    }
}

export  default Spells;