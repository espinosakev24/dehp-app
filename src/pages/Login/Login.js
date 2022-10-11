import React, { useState } from 'react';
import { Button, Text, Flex, Heading } from '@chakra-ui/react';
import { TextField } from 'components';
import { useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import { useAuthContext } from 'context';
import * as Yup from 'yup';

const loginSchema = Yup.object().shape({
  email: Yup.string().required(),
  password: Yup.string().required(),
});

export const Login = () => {
  const [serverError, setServerError] = useState(false);
  const { login } = useAuthContext();
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: loginSchema,
    onSubmit: ({ email, password }) => {
      login(email, password)
        .then(() => navigate('/palabras'))
        .catch(error => {
          error.status === 401 && setServerError('Invalid credentials');
        });
    },
  });

  return (
    <Flex height="100vh" alignItems="center" justifyContent="center">
      <Flex
        direction="column"
        bg="gray.100"
        borderRadius="12px"
        p="70px"
        boxShadow="2xl"
        width="400px"
      >
        <Heading mb={6}>Log in</Heading>
        <form onSubmit={formik.handleSubmit}>
          <Flex direction="column" gap="12px">
            <TextField
              id="Email"
              label="Email"
              name="email"
              placeholder="Enter your email"
              value={formik.values.email}
              onChange={formik.handleChange}
              errorText={formik.errors.email}
              touched={formik.touched.email}
            />
            <TextField
              id="Password"
              label="Password"
              name="password"
              type="password"
              placeholder="Enter your password"
              value={formik.values.password}
              onChange={formik.handleChange}
              errorText={formik.errors.password}
              touched={formik.touched.password}
            />
            <Button type="submit" width="full" mt="20px" colorScheme="blue">
              Login
            </Button>

            {serverError && <Text color="status-critical">{serverError}</Text>}
          </Flex>
        </form>
      </Flex>
    </Flex>
  );
};
