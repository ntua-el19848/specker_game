/* This component is for uploading a CSV file. It supports both browse in files or drag & drop functionality.
   FileUpload component is binded with a toast pop up bar that checks:
    1) if a CSV File is uploaded,
    2) one choice from DropDown Menu bar is selected
    */
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import config from '../config.json';

// Import React FilePond
import { FilePond, registerPlugin } from "react-filepond";

// Import FilePond styles
import "filepond/dist/filepond.min.css";
import FilePondPluginImageExifOrientation from "filepond-plugin-image-exif-orientation";
import FilePondPluginImagePreview from "filepond-plugin-image-preview";
import "filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css";

// Import Toastify
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Register the plugins
registerPlugin(FilePondPluginImageExifOrientation, FilePondPluginImagePreview);

//Component code
const FileUploadComponent = () => {
  const navigate = useNavigate();
  const [uploadedFile, setUploadedFile] = useState(null);
  const [selectedOption, setSelectedOption] = useState("");

  //get the uploaded file
  const handleFileUpload = (fileItems) => {
    const file = fileItems && fileItems[0];
    setUploadedFile(file);
  };

  //set the selected chart type based on selection
  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };

  //handle the form submit
  const handleFormSubmit = async (event) => {
    event.preventDefault();

    //toast popup options
    const error_toast_options = {
      position: "bottom-right",
      autoClose: 5000,
      limit: 1,
      hideProgressBar: false,
      newestOnTop: false,
      closeOnClick: true,
      rtl: false,
      pauseOnFocusLoss: true,
      pauseOnHover: true,
      theme: "dark",
    }

    //ERROR HANDLING FROM USER INPUT`
    if (!uploadedFile) {    //check if a file is upload
      toast.error("No file uploaded", error_toast_options);
      return;
    }
    else if (!selectedOption) {//check if a chart type is selected
      toast.error("No option selected", error_toast_options);
      return;
    }
    else if (uploadedFile.fileExtension !== "csv") { //check if the file is a csv
      toast.error("File is not a CSV", error_toast_options);
      return;
    }

    //make the file into form-data format to port to backend
    const formData = new FormData();
    formData.append('file', uploadedFile.file);

    //call the orchestrator to generate the chart
    axios.post('http://'+config.orchestrator+':4000/generateChart/' + selectedOption, formData)
      .then(response => {
        navigate("/successfulCreate", { state: { responseData: response.data, ChartType: selectedOption } })
      })
      .catch(error => {
        //check return from orchestrator
        if (!error.response) {
          sessionStorage.setItem("errorMessage", "Backend seems down, please try again later or contact the system administrators!");
          navigate("/errorCreate");
        }
        else if (error.response.status === 500) { //server error
          sessionStorage.setItem("errorMessage", "Could not generate chart!\nPlease try again by downloading the template for the type of chart you want to create and make sure that the correct type is selected from the drop-down menu.");
          navigate("/errorCreate");
        }
        else if (error.response.status === 503) { //microservices down
          sessionStorage.setItem("errorMessage", "That some critical components are down!");
          navigate("/errorCreate");
        }
        else { //unknown http code
          sessionStorage.setItem("error", "An unknown error occurred!");
          navigate("/errorCreate");
        }

      }
      );
  };

  //return the component : Dropdown list, FilePond and Toast pop up
  return (
    <>
      <div>
        <div className="select-dropdown">
          <select value={selectedOption} onChange={handleOptionChange}>
            <option value="">Select a type of chart</option>
            <option value="basicLine">Basic line</option>
            <option value="annotationsLine">Line with annotations</option>
            <option value="dependency">Dependency wheel</option>
            <option value="basicColumn">Basic column</option>
            <option value="network">Network graph</option>
            <option value="polar">Polar chart</option>
          </select>
        </div>
        <br></br>
        <br></br>
        <div>
          <form>
            <FilePond
              allowMultiple={false}
              acceptedFileTypes={['image/*']}
              onupdatefiles={handleFileUpload}
            />
            <button className="centered-button" onClick={handleFormSubmit}>
              Upload
            </button>
          </form>
        </div>
      </div>
      <ToastContainer />
    </>
  );
};

export default FileUploadComponent;