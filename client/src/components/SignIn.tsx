import { signInUser } from '@/features/usersSlice';
import { useAppDispatch } from '@/store/hook';
import { Button, Form, FormProps, Input } from 'antd';

export type FieldTypeSignIn = {
    username: string;
    password: string;
}

export const SignIn = () => {
    const dispatch = useAppDispatch();
    
    const onFinish: FormProps<FieldTypeSignIn>['onFinish'] = (values) => {
        dispatch(signInUser(values));
    }

    const onFinishFailed: FormProps<FieldTypeSignIn>['onFinishFailed'] = (values) => {
        dispatch(signInUser(values.values));
    }
    
    return (
        <Form
            name="basic"
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 16 }}
            style={{ maxWidth: 600 }}
            initialValues={{ remember: true }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
        >
            <Form.Item<FieldTypeSignIn>
                label="Username"
                name="username"
                rules={[{ required: true, message: 'Please input your username!' }]}
                style={{backgroundColor: "green", borderRadius: "5px"}}
            >
                <Input/>
            </Form.Item>

            <Form.Item<FieldTypeSignIn>
                label="Password"
                name="password"
                rules={[{ required: true, message: 'Please input your password!' }]}
                style={{backgroundColor: "green", borderRadius: "5px"}}
            >
                <Input.Password />
            </Form.Item>
        
            <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                <Button style={{ backgroundColor: "green" }} type="primary" htmlType="submit">
                    Submit
                </Button>
            </Form.Item>
        </Form>
    )
}
