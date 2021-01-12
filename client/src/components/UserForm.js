import ReactFileReader from 'react-file-reader';

const UserForm = (props) => {
    const handleFiles = (files) =>{
        // Converting to String
        var reader = new FileReader();
        reader.readAsText(files[0]);
        reader.onload = function(e) {
            const userDataInString = reader.result;
            props.setUserData(userDataInString);
        }
    }
  return (
    <ReactFileReader handleFiles={handleFiles} fileTypes={".csv"}>
      <button className="btn">Upload</button>
    </ReactFileReader>
  );
};

export default UserForm;
