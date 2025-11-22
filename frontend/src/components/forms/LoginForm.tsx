"use client";

import React from "react";
import { Form, Input, Button, Checkbox, message } from "antd";
import {
  UserOutlined,
  LockOutlined,
  EyeInvisibleOutlined,
  EyeTwoTone,
} from "@ant-design/icons";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/stores/useAuthStore";
import { showSuccess, showError, handleError } from "@/lib/errorHandler";

interface LoginFormData {
  email: string;
  password: string;
  remember: boolean;
}

const LoginForm: React.FC = () => {
  const [form] = Form.useForm();
  const router = useRouter();
  const { login, isLoading, user } = useAuthStore();

  const onFinish = async (values: LoginFormData) => {
    try {
      console.log('Attempting login with:', values.email);

      // Call login from auth store
      await login({
        email: values.email,
        password: values.password,
      });

      console.log('Login successful, checking user...');

      // Navigate based on user role
      const currentUser = useAuthStore.getState().user;
      console.log('Current user after login:', currentUser);

      if (currentUser) {
        showSuccess("เข้าสู่ระบบสำเร็จ!");

        let redirectPath = "/";
        switch (currentUser.role) {
          case "ADMIN":
            redirectPath = "/admin/dashboard";
            break;
          case "TEACHER":
            redirectPath = "/teacher/dashboard";
            break;
          case "STUDENT":
            redirectPath = "/student/dashboard";
            break;
        }

        console.log('Redirecting to:', redirectPath);
        router.push(redirectPath);
      } else {
        console.error('User is null after login!');
        message.error("ไม่สามารถดึงข้อมูลผู้ใช้ได้");
      }
    } catch (error) {
      console.error('Login error:', error);
      handleError(error, "เข้าสู่ระบบไม่สำเร็จ กรุณาตรวจสอบอีเมลและรหัสผ่าน");
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
          loading={isLoading}
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
