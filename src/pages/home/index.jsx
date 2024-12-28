import { useContext } from "react";
import UserTable from "../../components/users";
import { Button, Container } from "@mui/material";
import { logout } from "../../utils/api.functions";
import { UserContext } from "../../utils/userContext";

export default function HomePage() {
  const { setUser } = useContext(UserContext);
  return (
    <Container style={{ padding: "20px" }}>
      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
        }}
      >
        <Button
          variant="contained"
          color="secondary"
          onClick={() => {
            setUser(null);
            logout();
          }}
        >
          Logout
        </Button>
      </div>
      <UserTable />
    </Container>
  );
}
