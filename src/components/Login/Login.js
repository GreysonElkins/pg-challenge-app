import { Formik, Form, Field } from 'formik'
import * as Yup from 'yup'
import { useUser } from '../../context'

import './login.scss'

const Login = () => {
  const { login } = useUser()

  const signInValidation = Yup.object().shape({
    email: Yup.string().required('Required')
    .matches(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/, 
    'Please enter a valid email address'
    ),
  })

  return (
    <div className="Login">
      <Formik
        onSubmit={(values, { setErrors }) => {
          login(values).then((response) => {
          setErrors({ email: response })
            // this shouldn't run if the user is successfully set, context triggers a redirect
          })
        }}
        initialValues={{ email: '' }}
        validationSchema={signInValidation}
      >
        {({ errors, touched }) => {
          return (
          <Form>
            <Field name="email" type="text" placeholder={'e-mail address'} />
            <div className="form-error">{errors.email && touched.email && errors.email}</div>
            <button type="submit" name="login">Log In</button>
          </Form>
        )}}
      </Formik>
    </div>
  )
}

export default Login