import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
  Tooltip,
  Button,
  Modal,
  Input,
} from "@nextui-org/react";
import { DeleteIcon } from "../icons/table/delete-icon";
import { EditIcon } from "../icons/table/edit-icon";
import { EyeIcon } from "../icons/table/eye-icon";
import {
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
} from "@nextui-org/react";
import Cookies from "js-cookie";

type User = {
  id: string;
  email: string;
  role: string;
  contact: {
    firstName: string;
    lastName: string;
    phone: string;
    noReg: string;
  };
};

export const TableWrapper = ({ users }: { users: User[] }) => {
  // Modal state
  const [isOpen, setIsOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  // State untuk field form
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [noreg, setNoreg] = useState("");
  const [error, setError] = useState("");
  const [confirmationInput, setConfirmationInput] = useState("");

  // Handle actions
  const handleView = (user: User) => {
    setSelectedUser(user);
    setIsOpen(true);
  };

  const handleClose = () => {
    setIsOpen(false);
    setSelectedUser(null);
  };

  const handleEdit = (user: User) => {
    setSelectedUser(user);
    setFirstName(user.contact.firstName);
    setLastName(user.contact.lastName);
    setPhone(user.contact.phone);
    setNoreg(user.contact.noReg);
    setIsEditOpen(true);
  };

  const handleEditSubmit = async () => {
    const token = Cookies.get("userAuth");

    if (token && selectedUser) {
      try {
        const response = await fetch(
          "https://machapi.akti.cloud/api/users/edit/others",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: "Bearer " + token,
            },
            body: JSON.stringify({
              email: selectedUser.email,
              firstName,
              lastName,
              phone,
              noreg,
            }),
          }
        );

        if (!response.ok) {
          const result = await response.json();
          setError(result.error || `Failed to edit user: ${response.statusText}`);
          return;
        }

        setError("");
        setIsEditOpen(false);
        setSelectedUser(null);
      } catch (err) {
        setError((err as Error).message);
      }
    } else {
      setError("Unauthorized");
    }
  };

  const handleDelete = (user: User) => {
    setSelectedUser(user);
    setIsDeleteOpen(true);
    setConfirmationInput("");
  };

  const handleConfirmDelete = async () => {
    const token = Cookies.get("userAuth");

    if (token && selectedUser) {
      if (confirmationInput !== selectedUser.email) {
        setError("Email confirmation does not match.");
        return;
      }

      try {
        const response = await fetch(
          "https://machapi.akti.cloud/api/users/edit/delete",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: "Bearer " + token,
            },
            body: JSON.stringify({
              email: selectedUser.email,
            }),
          }
        );

        if (!response.ok) {
          const result = await response.json();
          setError(result.error || `Failed to delete user: ${response.statusText}`);
          return;
        }

        setError("");
        setIsDeleteOpen(false);
        setSelectedUser(null);
      } catch (err) {
        setError((err as Error).message);
      }
    } else {
      setError("Unauthorized");
    }
  };

  return (
    <div className="w-full flex flex-col gap-4">
      {users.length === 0 ? (
        <div className="text-center text-gray-600">No users found</div>
      ) : (
        <Table aria-label="User table with actions">
          <TableHeader columns={[
            { uid: "name", name: "Name" },
            { uid: "role", name: "Role" },
            { uid: "email", name: "Email" },
            { uid: "actions", name: "Actions" }
          ]}>
            {(column) => (
              <TableColumn
                key={column.uid}
                hideHeader={column.uid === "actions"}
                align={column.uid === "actions" ? "center" : "start"}
              >
                {column.name}
              </TableColumn>
            )}
          </TableHeader>
          <TableBody items={users}>
            {(item) => (
              <TableRow key={item.id}>
                {(columnKey) => (
                  <TableCell>
                    {columnKey === "name"
                      ? `${item.contact.firstName} ${item.contact.lastName}`
                      : columnKey === "role"
                      ? item.role
                      : columnKey === "email"
                      ? item.email
                      : columnKey === "actions"
                      ? (
                        <div className="flex items-center gap-4">
                          <Tooltip content="Details">
                            <Button onPress={() => handleView(item)} color="primary">
                              <EyeIcon size={20} fill="#979797" />
                            </Button>
                          </Tooltip>
                          <Tooltip content="Edit user" color="secondary">
                            <Button onPress={() => handleEdit(item)}>
                              <EditIcon size={20} fill="#979797" />
                            </Button>
                          </Tooltip>
                          <Tooltip content="Delete user" color="danger">
                            <Button onPress={() => handleDelete(item)}>
                              <DeleteIcon size={20} fill="#FF0080" />
                            </Button>
                          </Tooltip>
                        </div>
                      )
                      : null}
                  </TableCell>
                )}
              </TableRow>
            )}
          </TableBody>
        </Table>
      )}

      {/* Modal untuk melihat detail user */}
      <Modal
        isOpen={isOpen}
        onOpenChange={setIsOpen}
        placement="top-center"
      >
        <ModalContent>
          <ModalHeader>User Details</ModalHeader>
          <ModalBody>
            {selectedUser && (
              <div className="flex flex-col gap-4">
                <Input label="First Name" value={selectedUser.contact.firstName} isDisabled />
                <Input label="Last Name" value={selectedUser.contact.lastName} isDisabled />
                <Input label="Role" value={selectedUser.role} isDisabled />
                <Input label="Email" value={selectedUser.email} isDisabled />
                <Input label="Phone" value={selectedUser.contact.phone} isDisabled />
                <Input label="Registration Number" value={selectedUser.contact.noReg} isDisabled />
              </div>
            )}
          </ModalBody>
          <ModalFooter>
            <Button color="danger" variant="flat" onPress={handleClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      {/* Modal untuk edit user */}
      <Modal
        isOpen={isEditOpen}
        onOpenChange={setIsEditOpen}
        placement="top-center"
      >
        <ModalContent>
          <ModalHeader>Edit User</ModalHeader>
          <ModalBody>
            <div className="flex flex-col gap-4">
              <Input
                label="First Name"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
              <Input
                label="Last Name"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
              <Input
                label="Phone"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
              <Input
                label="Registration Number"
                value={noreg}
                onChange={(e) => setNoreg(e.target.value)}
              />
              {error && <p className="text-red-500">{error}</p>}
            </div>
          </ModalBody>
          <ModalFooter>
            <Button color="danger" variant="flat" onPress={() => setIsEditOpen(false)}>
              Cancel
            </Button>
            <Button color="success" onPress={handleEditSubmit}>
              Save Changes
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      {/* Modal untuk konfirmasi delete */}
      <Modal
        isOpen={isDeleteOpen}
        onOpenChange={setIsDeleteOpen}
        placement="top-center"
      >
        <ModalContent>
          <ModalHeader>Delete User</ModalHeader>
          <ModalBody>
            {selectedUser && (
              <div className="flex flex-col gap-4">
                <p>To confirm deletion, please type the email of the user: <strong>{selectedUser.email}</strong>.</p>
                <Input
                  label="Confirmation"
                  placeholder="Type email to confirm"
                  value={confirmationInput}
                  onChange={(e) => setConfirmationInput(e.target.value)}
                />
                {error && <p className="text-red-500">{error}</p>}
              </div>
            )}
          </ModalBody>
          <ModalFooter>
            <Button color="danger" variant="flat" onPress={() => setIsDeleteOpen(false)}>
              Cancel
            </Button>
            <Button
              color="danger"
              onPress={handleConfirmDelete}
              isDisabled={confirmationInput !== selectedUser?.email}
            >
              Confirm Delete
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
};