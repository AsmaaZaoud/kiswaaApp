import React from 'react';
import { StyleSheet, Text, View, SafeAreaView, Button, TextInput} from 'react-native';
import { Formik, Form, Field } from 'formik';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
export default function App() {
  function validateEmail(value) {
    let error;
    if (!value) {
      error = 'Required';
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)) {
      error = 'Invalid email address';
    }
    return error;
  }
  
  function validateUsername(value) {
    let error;
    if (!value) {
      error = 'Required';
    }
    return error;
  }
  function validatePassword(value) {
    let error;
    if (!value) {
      error = 'Required';
    }
    return error;
  }
  return (
    <div class="container mt-5 mb-5">
      <div class="row d-flex align-items-center justify-content-center">
        <div class="col-md-6">
            <div class="card px-5 py-5"> <span class="circle"><i class="fa fa-check"></i></span>
    <SafeAreaView>
    <h5 class="mt-3">React Native <br /> User Registration Form</h5> <small class="mt-2 mb-2 text-muted">Jassa Therichpost.com</small>
     <Formik
       initialValues={{
         username: '',
         email: '',
         password: '',
       }}
       onSubmit={values => {
         // same shape as initial values
         console.log(values);
       }}
     >
       {({ errors, touched, validateField, validateForm }) => (
         <Form>
           <div class="form-input"> <i class="fa fa-envelope"></i>
           <Field placeholder="Email address" className="form-control" type="email" name="email" validate={validateEmail} />
           {errors.email && touched.email && <div className="text-danger">{errors.email}</div>}
           </div>
           <div class="form-input"> <i class="fa fa-user"></i>
           <Field placeholder="Username" className="form-control" name="username" validate={validateUsername}/>
           {errors.username && touched.username && <div className="text-danger">{errors.username}</div>}
          </div>
          <div class="form-input"> <i class="fa fa-lock"></i>
           <Field placeholder="Password" className="form-control" name="password" type="password" validate={validatePassword}/>
           {errors.password && touched.password && <div className="text-danger">{errors.password}</div>}
           </div>
           <div class="d-grid gap-2">
         
           <button className="btn btn-primary mt-4 signup" type="submit">Register</button>
           </div>
         </Form>
       )}
     </Formik>
   </SafeAreaView>
      
      </div>
     </div>
    </div>
   </div>
  );
}