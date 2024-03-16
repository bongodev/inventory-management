import React from 'react';
import { Box, Button, InputBase, Stack } from '../ui';
import { AuthServices } from '../services';

export const LoginPage = () => {
  const [credential, setCredential] = React.useState({
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    setCredential({
      ...credential,
      [e.target.name]: e.target.value,
    });
  };

  const handleLogin = (e) => {
    e.preventDefault();
    AuthServices.login(credential)
      .then(() => window.history.back())
      .catch((err) => {
        console.error(err);
        alert(err.message || 'Invalid credential');
      });
  };

  return (
    <form onSubmit={handleLogin}>
      <Box justifyContent="center" alignItems="center" marginY={10}>
        <Stack spacing={2} width={500} marginTop={20}>
          <InputBase
            required
            name="email"
            placeholder="email"
            value={credential.email}
            onChange={handleChange}
          />
          <InputBase
            required
            name="password"
            type="password"
            placeholder="password"
            value={credential.password}
            onChange={handleChange}
          />
          <Button variant="contained" type="submit">
            Login
          </Button>
        </Stack>
      </Box>
    </form>
  );
};
