import "bootstrap/dist/css/bootstrap.min.css";
import UserForm from "./components/UserForm";
import UserStatus from "./components/UserStatus";
import { useEffect, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import axios from "axios";

function App() {
  const [validUsers, setValidUsers] = useState([]);
  const [inValidUsers, setInValidUsers] = useState([]);

  useEffect(()=>{
    console.log(inValidUsers)
    axios.get("https://user-data-csv.herokuapp.com/api/users").then((res) => {
      setValidUsers([...res.data]);
    });
    console.log(validUsers);
  }, []);

  const setUsers = (userDataInString) => {
    console.log(userDataInString);
    var userDataInJSON = [];

    // Coverting String to Array of JSON Objects
    var rows = userDataInString.split("\n");
    rows[0]=rows[0].slice(0,-1);
    var fields = rows[0].split(",");

    for (var i = 1; i < rows.length-1; i++) {
      // To check null fields
      var flag=false;
      
      // Creating individual JSON objects from string
      var singleUserObject = {};

      // To handle the extra space in the end
      rows[i]=rows[i].slice(0,-1);

      // Extracting the data for the objects
      var singleRow = rows[i].split(",");

      for (var j = 0; j < fields.length; j++) {
        if(singleRow[j] === ''){
          flag = true;
        }

        // Email Check
        if(j === 1 && !(/^[a-zA-Z0-9]+@(?:[a-zA-Z0-9]+\.)+[A-Za-z]+$/.test(singleRow[j]))){
          flag = true;
        }

        // Mobile Check
        if(j === 2 && !(/^(\+91[\-\s]?)?[0]?(91)?[789]\d{9}$/.test(singleRow[j]))){
          flag = true;
        }

        // Key-Value Pairs
        singleUserObject[fields[j]] = singleRow[j];
      }

      console.log(singleUserObject)
      console.log(flag)

      if(flag){
        // To be added to Invalid Users
        setInValidUsers((inValidUsers)=>{
          return [...inValidUsers, singleUserObject]
        })
      }else{
        // To be sent to backend
        userDataInJSON.push(singleUserObject);
      }
    }

    console.log(userDataInJSON);

    axios.post("https://user-data-csv.herokuapp.com/api/users", userDataInJSON)
        .then((res) => {
          console.log("Success");
          console.log(res.data);
          const AuthenticUsers = res.data;
          setValidUsers([...AuthenticUsers])
          var duplicateUsers = userDataInJSON.filter(function(obj) {
            return !AuthenticUsers.some(function(obj2) {
                return obj.Mobile == obj2.Mobile;
            });
          });
          console.log(duplicateUsers)
          setInValidUsers((inValidUsers)=>{
            return [...inValidUsers, ...duplicateUsers]
          })
        })
        .catch((err) => {
          console.log("Failure");
          console.log(err);
        });
  };

  return (
    <Container>
      <Row className="justify-content-center">
        <Col md={6} sm={12} className="justify-content-center">
          <UserForm setUserData={setUsers} />
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md={6} sm={12}>
          <h3>Valid Users</h3>
          <UserStatus users={validUsers}/>
        </Col>
        <Col md={6} sm={12}>
          <h3>Invalid Users</h3>
          <UserStatus users={inValidUsers}/>
        </Col>
      </Row>
    </Container>
  );
}

export default App;
