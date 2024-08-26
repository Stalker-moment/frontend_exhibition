import React, { useState } from "react";
import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
  Dropdown,
  DropdownMenu,
  DropdownItem,
  DropdownTrigger,
} from "@nextui-org/react";
import Cookies from "js-cookie";

export const AddUser = () => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [role, setRole] = useState<"admin" | "user" | "select role">("select role"); // Default role
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = async () => {
    const token = Cookies.get("userAuth");
    if (token) {
      if (password !== confirmPassword) {
        setError("Passwords do not match");
        return;
      }

      if (!["admin", "user"].includes(role)) {
        setError("Invalid role selected");
        return;
      }

      try {
        const response = await fetch(
          "https://machapi.akti.cloud/api/users/register",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: "Bearer " + token,
            },
            body: JSON.stringify({
              email,
              password,
              role,
              firstName,
              lastName,
              phone,
            }),
          }
        );

        // Check if the response is not OK
        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error || `Failed to add user`);
        }

        // Handle success
        setSuccess("User added successfully");
        onOpenChange(); // Close the modal
        // Clear form fields
        setEmail("");
        setFirstName("");
        setLastName("");
        setPhone("");
        setPassword("");
        setConfirmPassword("");
        setRole("user"); // Reset role to default
        setError(""); // Clear error message
      } catch (err) {
        setError((err as Error).message);
      }
    } else {
      setError("Unauthorized");
    }
  };

  return (
    <div>
      <Button onPress={onOpen} color="primary">
        Add User
      </Button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} placement="top-center">
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Add User
              </ModalHeader>
              <ModalBody>
                <Input
                  label="Email"
                  variant="bordered"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <Input
                  label="First Name"
                  variant="bordered"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                />
                <Input
                  label="Last Name"
                  variant="bordered"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                />
                <Input
                  label="Phone Number"
                  variant="bordered"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
                <Input
                  label="Password"
                  type="password"
                  variant="bordered"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <Input
                  label="Confirm Password"
                  type="password"
                  variant="bordered"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
                <Dropdown>
                  <DropdownTrigger>
                    <Button variant="bordered">{role}</Button>
                  </DropdownTrigger>
                  <DropdownMenu aria-label="Role">
                    <DropdownItem key="admin" onClick={() => setRole("admin")}>
                      Admin
                    </DropdownItem>
                    <DropdownItem key="user" onClick={() => setRole("user")}>
                      User
                    </DropdownItem>
                  </DropdownMenu>
                </Dropdown>
                {error && <p className="text-red-500">{error}</p>}
                {success && <p className="text-green-500">{success}</p>}
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="flat" onPress={onClose}>
                  Close
                </Button>
                <Button color="primary" onPress={handleSubmit}>
                  Add User
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
};
