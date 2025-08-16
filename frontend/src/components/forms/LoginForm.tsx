"use client";

import React, { useState } from "react";
import { Form, Input, Button, Checkbox, message } from "antd";
import {
  UserOutlined,
  LockOutlined,
  EyeInvisibleOutlined,
  EyeTwoTone,
} from "@ant-design/icons";
import { useRouter } from "next/navigation";

interface LoginFormData {
  email: string;
  password: string;
  remember: boolean;
}

const LoginForm: React.FC = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const onFinish = async (values: LoginFormData) => {
    setLoading(true);
    try {
      // TODO: Implement actual login API call
      console.log("Login values:", values);

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      message.success("เข้าสู่ระบบสำเร็จ!");

      // Navigate based on user role (mock logic)
      // You can implement actual role checking here
      router.push("/admin/dashboard");
    } catch {
      message.error("เข้าสู่ระบบไม่สำเร็จ กรุณาลองใหม่อีกครั้ง");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Form
      form={form}
      name="login"
      onFinish={onFinish}
      size="large"
      autoComplete="off"
      className="w-full"
    >
      <Form.Item
        name="email"
        rules={[
          { required: true, message: "กรุณากรอกอีเมล!" },
          { type: "email", message: "รูปแบบอีเมลไม่ถูกต้อง!" },
        ]}
      >
        <Input
          prefix={<UserOutlined className="text-gray-400" />}
          placeholder="อีเมล"
          className="rounded-lg h-12"
        />
      </Form.Item>

      <Form.Item
        name="password"
        rules={[
          { required: true, message: "กรุณากรอกรหัสผ่าน!" },
          { min: 6, message: "รหัสผ่านต้องมีอย่างน้อย 6 ตัวอักษร!" },
        ]}
      >
        <Input.Password
          prefix={<LockOutlined className="text-gray-400" />}
          placeholder="รหัสผ่าน"
          className="rounded-lg h-12"
          iconRender={(visible) =>
            visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
          }
        />
      </Form.Item>

      <Form.Item className="mb-4">
        <div className="flex justify-between items-center">
          <Form.Item name="remember" valuePropName="checked" noStyle>
            <Checkbox className="text-gray-600">จดจำการเข้าสู่ระบบ</Checkbox>
          </Form.Item>
          <Button
            type="link"
            className="text-blue-600 hover:text-blue-800 p-0 h-auto"
            onClick={() => {
              // TODO: Implement forgot password
              message.info("ฟีเจอร์นี้จะเปิดใช้งานเร็วๆ นี้");
            }}
          >
            ลืมรหัสผ่าน?
          </Button>
        </div>
      </Form.Item>

      <Form.Item className="mb-4">
        <Button
          type="primary"
          htmlType="submit"
          loading={loading}
          className="w-full h-12 rounded-lg gradient-btn font-medium text-lg"
        >
          เข้าสู่ระบบ
        </Button>
      </Form.Item>

      <div className="text-center">
        <span className="text-gray-600">ยังไม่มีบัญชี? </span>
        <Button
          type="link"
          className="text-blue-600 hover:text-blue-800 p-0 h-auto font-medium"
          onClick={() => router.push("/register")}
        >
          สมัครสมาชิก
        </Button>
      </div>
    </Form>
  );
};

export default LoginForm;
