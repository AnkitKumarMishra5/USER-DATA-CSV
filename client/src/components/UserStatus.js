import {Table} from 'react-bootstrap';

const UserStatus = ({users}) => {
  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>No.</th>
          <th>Name</th>
          <th>Email</th>
          <th>Mobile</th>
        </tr>
      </thead>
      <tbody>
          { users.length>0 ? users.map((user, index) => {
              return(
                <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{user.Name}</td>
                    <td>{user.Email}</td>
                    <td>{user.Mobile}</td>
                </tr>
              )}) : <tr></tr> }
      </tbody>
    </Table>
  );
};

export default UserStatus;
