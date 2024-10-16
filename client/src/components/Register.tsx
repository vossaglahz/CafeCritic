import { registerUser } from '@/features/usersSlice';
import { useAppDispatch } from '@/store/hook';
import { Button, Form, FormProps, Input} from 'antd';
import { ChangeEvent, useState } from 'react';
import { FileInput } from '../components/UI/Form/FileInput';

export type FieldTypeRegister = {
    username: string;
    displayName: string;
    password: string;
    image: File | null;
    email: string;
};

export const Register = () => {
    const dispatch = useAppDispatch();
    const [form] = Form.useForm();
    const [image, setImage] = useState<File | null>(null);

    const onFinish: FormProps<FieldTypeRegister>['onFinish'] = (values) => {
        const formData = new FormData();
        formData.append('username', values.username);
        formData.append('displayName', values.displayName);
        formData.append('password', values.password);
        formData.append('email', values.email);
        if (image) {
            formData.append('image', image);
        }

        dispatch(registerUser(formData));
    };

    const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
        if (event.target.files) {
            setImage(event.target.files[0]);
        }
    };

    return (
        <Form
            form={form}
            name="basic"
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 16 }}
            style={{ maxWidth: 600 }}
            initialValues={{ remember: true }}
            onFinish={onFinish}
            autoComplete="off"
        >
            <Form.Item<FieldTypeRegister>
                label="Username"
                name="username"
                rules={[{ required: true, message: 'Please input your username!' }]}
            >
                <Input />
            </Form.Item>
        
            <Form.Item<FieldTypeRegister>
                label="Nickname"
                name="displayName"
            >
                <Input />
            </Form.Item>

            <Form.Item<FieldTypeRegister>
                label="Password"
                name="password"
                rules={[{ required: true, message: 'Please input your password!' }]}
            >
                <Input.Password />
            </Form.Item>

            <Form.Item<FieldTypeRegister>
                label="Email"
                name="email"
                rules={[{ required: true, message: 'Please input your email!' }]}
            >
                <Input />
            </Form.Item>

            <Form.Item label="Image">
                <FileInput name="image" label="Upload Image" onChange={handleFileChange} />
            </Form.Item>

            <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                <Button style={{ backgroundColor: "green" }} type="primary" htmlType="submit">
                    Submit
                </Button>
            </Form.Item>
        </Form>
    );
};
