
import React from 'react';
import { IUser } from '@/types/IUserType';
interface IViewIUserProps {
  username: IUser['username']
  email: IUser['email']
  phoneNumber: IUser['phoneNumber']
}
const ViewIUser: React.FC<IViewIUserProps> = ({
  username,
  email,
  phoneNumber
}) => {
    return (
      <div>
        <h1>View IUser</h1>
        <div>Username: {username}</div>
        <div>Email: {email}</div>
        <div>Phone Number: {phoneNumber}</div>
      </div>
    );
};
export default ViewIUser;