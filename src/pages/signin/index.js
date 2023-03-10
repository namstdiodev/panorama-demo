import React from "react";
import { Formik, Form, Field } from "formik";
import "./styled.css";
import { useNavigate } from "react-router-dom";

const SignIn = () => {
  const navigate = useNavigate();
  console.log('abc')
  const onSubmit = (values) => {
    console.log(values)
    localStorage.setItem("ID", values.id);
    navigate("/dashboard");
  };
  return (
    <div className="signin-container">
      <Formik onSubmit={onSubmit} initialValues={{ id: "", password: "" }}>
        {({ values }) => (
          <Form>
            <div className="wrapper fadeInDown">
              <div id="formContent">
                <h2 className="active"> Sign In </h2>
                <Field
                  type="text"
                  id="login"
                  className="fadeIn second"
                  name="id"
                  placeholder="ID"
                />
                <Field
                  type="text"
                  id="password"
                  className="fadeIn third"
                  name="password"
                  placeholder="password"
                />
                <Field type="submit" className="fadeIn fourth" value="Log In" />
              </div>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default SignIn;
