import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  TableFooter,
} from "@mui/material";
import { createUser, getUsers, updateUser } from "../../utils/api.functions";
import AddDialog from "../dialog";

const UserTable = () => {
  const [page, setPage] = useState(0);
  const [limit, setLimit] = useState(10);
  const [data, setData] = useState({});
  const [addedData, setAddedData] = useState({});
  const [addedDataError, setAddedDataError] = useState({});

  const fetchData = () => {
    getUsers(page, limit).then((data) => {
      setData(data);
    });
  };
  useEffect(() => {
    fetchData();
  }, [page]);
  const [open, setOpen] = useState(false);
  const [editingUser, setEditingUser] = useState(null);

  const handleOpen = (user) => {
    if (user) {
      setEditingUser(user);
    } else {
      setEditingUser(null);
    }
    setOpen(true);
  };

  const handleClose = () => {
    setAddedData({});
    setAddedDataError({});
    setOpen(false);
  };

  const handleSave = () => {
    if (editingUser) {
      updateUser(editingUser.id, addedData)
        .then((res) => {
          setData((prev) => ({
            ...prev,
            rows: prev.rows.map((row) => {
              if (row.id === editingUser.id) return { ...row, ...addedData };
              return row;
            }),
          }));
          setAddedDataError({});
          handleClose();
        })
        .catch((error) => {
          setAddedDataError({ ...error.response.data.errors });
        });
    } else {
      createUser(addedData)
        .then((res) => {
          fetchData();
          setAddedDataError({});
          handleClose();
        })
        .catch((error) => {
          setAddedDataError({ ...error.response.data.errors });
        });
    }
  };

  return (
    <>
      <Button variant="contained" color="primary" onClick={() => handleOpen()}>
        Add User
      </Button>
      <TableContainer component={Paper} sx={{ mt: 2 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Group</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data?.rows?.map((user) => (
              <TableRow key={user.id}>
                <TableCell>{user.name}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.group}</TableCell>
                <TableCell>
                  <Button
                    variant="outlined"
                    color="primary"
                    onClick={() => handleOpen(user)}
                    sx={{ mr: 1 }}
                  >
                    Edit
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TableCell colSpan={4}>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-evenly",
                    alignItems: "center",
                  }}
                >
                  <Button
                    onClick={() => setPage(page - 1)}
                    disabled={page === 0}
                    variant="contained"
                    color="secondary"
                  >
                    Prev
                  </Button>
                  <span>
                    Page {page + 1} of {Math.ceil(data.count / limit)}
                  </span>
                  <Button
                    onClick={() => setPage(page + 1)}
                    disabled={page + 1 === Math.ceil(data.count / limit)}
                    variant="contained"
                    color="secondary"
                  >
                    Next
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          </TableFooter>
        </Table>
      </TableContainer>

      <AddDialog
        open={open}
        setOpen={setOpen}
        editingUser={editingUser}
        handleSave={handleSave}
        handleClose={handleClose}
        addedData={addedData}
        setAddedData={setAddedData}
        addedDataError={addedDataError}
      />
    </>
  );
};

export default UserTable;
