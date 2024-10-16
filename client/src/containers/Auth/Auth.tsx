import { Register } from "@/components/Register";
import { SignIn } from "@/components/SignIn";
import { IUserError } from "@/features/usersSlice";
import { useAppSelector } from "@/store/hook";
import { notification, Row, Tabs, TabsProps } from "antd";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const items: TabsProps['items'] = [
  {
    key: '1',
    label: <span style={{ color: 'green', fontWeight: "450" }}>Sign In</span>,
    children: <SignIn />,
  },
  {
    key: '2',
    label: <span style={{ color: 'green', fontWeight: "450" }}>Registration</span>,
    children: <Register />,
  },
];
  
  export const Auth = () => {
    const navigate = useNavigate()
    const { user, error } = useAppSelector(state => state.users);
    const [activeKey, setActiveKey] = useState('1');
  
    useEffect(() => {
      if (user && activeKey == "2") {
        setActiveKey('1');
      } else if (user && activeKey == "1"){
        navigate('/');
      }
    }, [navigate, user]);
  
    useEffect(() => {
      if (error) {
        (error as IUserError[]).map(item => (
          notification.error({
            message: item.type,
            description: item.messages[0],
            duration: 2
          })
        ));
      }
    }, [error]);
  
    return (
      <Row 
        align={'middle'}
        justify={'center'}
        style={{ height: '90vh' }}
      >
        <Tabs
          activeKey={activeKey}
          onChange={setActiveKey}
          defaultActiveKey="2"
          items={items}
        />
      </Row>
    );
  };