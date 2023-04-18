
import React, { useState } from 'react';
import { IUser } from '@/types/IUserType';
interface IEditIUserProps {
  username: IUser['username']
  email: IUser['email']
  phoneNumber: IUser['phoneNumber']
}

const EditIUser: React.FC<IEditIUserProps> = ({
  username,
  email,
  phoneNumber
}) => {
  const [editedFields, setEditedFields] = useState({
    username: username,
   email: email,
   phoneNumber: phoneNumber
  });

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  const { name, value } = event.target;
  setEditedFields((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
  event.preventDefault();
  // Handle form submission here
  };

  return (
  <div>
    <h1>Edit IUser</h1>
    <form onSubmit={handleSubmit}>
      <div>
        <label>Username:</label>
        <input type="text" name="username" value={editedFields.username} onChange={handleInputChange} />
      </div>
      <div>
        <label>Email:</label>
        <input type="text" name="email" value={editedFields.email} onChange={handleInputChange} />
      </div>
      <div>
        <label>Phone Number:</label>
        <input type="text" name="phoneNumber" value={editedFields.phoneNumber} onChange={handleInputChange} />
      </div>
      <button type="submit">Save</button>
    </form>
  </div>
  );
};
export default EditIUser;