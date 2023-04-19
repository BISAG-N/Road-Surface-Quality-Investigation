import React ,{useState} from 'react'
import axios from 'axios'
import { ToastContainer, toast } from "react-toastify";


const ImageInvestigation = () => {

  const [fileInputState,setFileInputState] = useState('')
  const [selectedFile,setSelectedFile] = useState('')
  const [previewSource,setPreviewSource] = useState()
  const uid = sessionStorage.getItem("userid");
  
  const handleFileInputChange = (e)=>{
    const file = e.target.files[0];
    setFileInputState(fileInputState)
    setSelectedFile(file)
    previewFile(file);
    console.log(file)
  }
  // const obj = JSON.parse("{\"khami\": [\"D44\", \"D44\"], \"value\": [0.13713069260120392, 0.12918542325496674]}")
  // console.log(obj.khami)
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

    uploadData(selectedFile,e);
  }

  const uploadData = async (image,e) =>{
    const imageData = new FormData();
    imageData.append('image', image);
    imageData.append('user',uid);

    // const formData= new FormData();
    // const name="name"
    // const district="district"
    // const state="state"
    // formData.append('user',uid);
    // formData.append('name',name);
    // formData.append('district',district);
    // formData.append('state',state);
    // formData.append('user',uid);
    // formData.append('user',uid);
    const Data=new Object();
    Data.user=uid;
    Data.name="name"
    Data.district="district"
    Data.state="State"
    
    
    try {
      await axios.post('http://localhost:8000/image/upload',imageData).then((image)=>{

        console.log(image)
        // formData.append('image',image.data.image);
        // formData.append('imageId',image.data.imageId);
        Data.image=image.data.image
        Data.imageId=image.data.imageId
        toast.success('Image Uploaded!', {
          position: toast.POSITION.BOTTOM_CENTER
      });
      })
      .catch((err)=>{
        console.log(err)
      })
      
      toast.info('Running Model!', {
        position: toast.POSITION.BOTTOM_CENTER
    });

      await axios.post('http://localhost:8080/',imageData).then((result)=>{
        console.log(result)
        const obj=JSON.parse(result.data)
        // formData.append('distress',obj);
        Data.distress=obj
        
        console.log(obj);
        toast.success('Model Performed!', {
          position: toast.POSITION.BOTTOM_CENTER
      });
      })
      .catch((err)=>{
        console.log(err);
      })

      console.log(Data)
      await axios.post('http://localhost:8000/road/store',Data)
                  .then((res)=>{
                    console.log(res)
                  })

    } catch (err) {
      console.error(err);
    }
  }

  return (
    <div>
      <ToastContainer />
      {/* <h1>Upload Image</h1> */}
      {/* <h3 className="font-semibold text-lg text-gray-700 capitalize font-poppins tracking-wide p-4">Upload Image:</h3> */}
      <form onSubmit={handleSubmitFile}>
      <div className="flex items-center justify-center w-full">
        
          {/* <label for="dropzone-file" className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-white dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
              <div className="flex flex-col items-center justify-center pt-5 pb-6">
                  <svg aria-hidden="true" className="w-10 h-10 mb-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path></svg>
                  <p className="mb-2 text-sm text-gray-500 dark:text-gray-400"><span className="font-semibold">Click to upload</span> </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">PNG, JPG (MAX. 600x600px)</p>
              </div>
          </label>  */}
              
              <input onChange={handleFileInputChange} id="dropzone-file" name='image' type="file" value={fileInputState.name}  />
          
      </div> 
      <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Submit</button>
      </form>

      {previewSource && (<img src={previewSource} alt="chosen" class=" h-85 w-85"/>)}

    </div>
  )
}

export default ImageInvestigation

{ /*
Drag and Drop
<div className="max-w-xl">
    <label
        className="flex justify-center w-full h-32 px-4 transition bg-white border-2 border-gray-300 border-dashed rounded-md appearance-none cursor-pointer hover:border-gray-400 focus:outline-none">
        <span className="flex items-center space-x-2">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-gray-600" fill="none" viewBox="0 0 24 24"
                stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round"
                    d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
            </svg>
            <span className="font-medium text-gray-600">
                Drop files to Attach, or
                <span className="text-blue-600 underline">browse</span>
            </span>
        </span>
        <input type="file" name="file_upload" className="hidden"/>
    </label>
</div>
*/ }

{/*

  <div className="flex w-full h-screen items-center justify-center bg-grey-lighter">
    <label className="w-64 flex flex-col items-center px-4 py-6 bg-white text-blue rounded-lg shadow-lg tracking-wide uppercase border border-blue cursor-pointer hover:bg-blue hover:text-white">
        <svg className="w-8 h-8" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
            <path d="M16.88 9.1A4 4 0 0 1 16 17H5a5 5 0 0 1-1-9.9V7a3 3 0 0 1 4.52-2.59A4.98 4.98 0 0 1 17 8c0 .38-.04.74-.12 1.1zM11 11h3l-4-4-4 4h3v3h2v-3z" />
        </svg>
        <span className="mt-2 text-base leading-normal">Select a file</span>
        <input type='file' className="hidden" name="image" />
        
    </label>
    <button className='' type="button">Submit</button>
    </div>

*/}

{/*

<div className="flex justify-center w-full mx-auto sm:max-w-lg">

        <div className="flex flex-col items-center justify-center w-full h-auto my-20 bg-white sm:w-3/4 sm:rounded-lg sm:shadow-xl">
            <div className="mt-10 mb-10 text-center">
                <h2 className="text-2xl font-semibold mb-2">Upload your Images</h2>
                <p className="text-xs text-gray-500">Image should be of format .jpg, .png</p>
            </div>
            <form action="#" className="relative w-4/5 h-32 max-w-xs mb-10 bg-white bg-gray-100 rounded-lg shadow-inner">
                <input type="file" id="file-upload" name="image" className="hidden"/>
                <label for="file-upload" className="z-20 flex flex-col-reverse items-center justify-center w-full h-full cursor-pointer">
                    <p className="z-10 text-xs font-light text-center text-gray-500">Drag & Drop your files here</p>
                    <svg className="z-10 w-8 h-8 text-indigo-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                        <path d="M2 6a2 2 0 012-2h5l2 2h5a2 2 0 012 2v6a2 2 0 01-2 2H4a2 2 0 01-2-2V6z"></path>
                    </svg>
                </label>
            </form>
        </div>
    </div>
*/}