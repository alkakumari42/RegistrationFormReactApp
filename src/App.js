import { Container, Grid } from "@mui/material";
import { RegistrationForm } from "./components/RegistrationForm";
function App() {
  return (
      <Container component="main" maxWidth="xs">
          <h2>Create User Account</h2>
          <RegistrationForm />
      </Container>
  );
}

export default App;
