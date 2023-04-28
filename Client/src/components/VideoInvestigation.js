import React ,{useState} from 'react'
import axios from 'axios'
import { ToastContainer, toast } from "react-toastify";

const VideoInvestigation = () => {

  const [fileInputState,setFileInputState] = useState('')
  const [selectedFile,setSelectedFile] = useState('')
  const [previewSource,setPreviewSource] = useState()
  const uid = sessionStorage.getItem("userid");
  const [severity,setSeverity] = useState()
  
  const handleFileInputChange = (e)=>{
    const file = e.target.files[0];
    setSelectedFile(file)
    previewFile(file);
  }

  const previewFile = (file) =>{
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend= ()=>{
      setPreviewSource(reader.result)
    }
  }

  const handleSubmitFile = (e) =>{
    e.preventDefault();

    if(!previewSource) return;

    // const reader = new FileReader();
    // reader.readAsDataURL()

    uploadImage(selectedFile);
  }

  const uploadImage = async (video) =>{
    const formData = new FormData();
    formData.append('video', video);
    formData.append('user',uid);
    
    try {
      const video = await axios.post('http://localhost:8000/video/upload',formData);
      console.log(video)
    } catch (err) {
      console.error(err);
    }

    const Data = new Object();
    Data.user = uid;
    Data.name = "name1";
    Data.district = "district1";
    Data.state = "State1";

    try {
      toast.info("Running Model!", {
        position: toast.POSITION.BOTTOM_CENTER,
      });

      await axios
        .post("http://localhost:8080/video/", formData)
        .then((result) => {
          console.log(result);
          const obj = JSON.parse(result.data);
          // formData.append('distress',obj);
          Data.distress=obj.distress
          Data.severity=obj.severity
          setSeverity(obj.severity)
          console.log(obj);
          toast.success("Model Performed!", {
            position: toast.POSITION.BOTTOM_CENTER,
          });
        })
        .catch((err) => {
          console.log(err);
        });

      console.log(Data);
      await axios.post("http://localhost:8000/road/store", Data).then((res) => {
        console.log(res);
      });
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <div>
      <ToastContainer/>
      {/* <h1>Upload Image</h1> */}
      <h3 className="font-semibold text-lg text-gray-700 capitalize font-poppins tracking-wide p-4">Upload Video:</h3>
      <form onSubmit={handleSubmitFile}>
      <div className="flex items-center justify-center w-full">
          
          <label for="dropzone-file" className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-white dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
              <div className="flex flex-col items-center justify-center pt-5 pb-6">
                  <svg aria-hidden="true" className="w-10 h-10 mb-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path></svg>
                  <p className="mb-2 text-sm text-gray-500 dark:text-gray-400"><span className="font-semibold">Click to upload</span> </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">MP4 (MAX. 100 MB)</p>
              </div>
              <input onChange={handleFileInputChange} id="dropzone-file" name='video' type="file" value={fileInputState} className="hidden" />
          </label>
          
      </div> 
      <button type="submit" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Submit</button>
      </form>

      <br/>
      {severity && (<h1>Road Severity is {severity}</h1>)}
      <br/>

      {previewSource && (
      // <img src={previewSource} alt="chosen" class=" h-80 w-80"/>
        <video width="500" height="500" controls>
    <source src={previewSource} type="video/mp4" />
    <source src={previewSource} type="video/ogg" />
      </video>
      )}

    </div>
  )
}

export default VideoInvestigation
