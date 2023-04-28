import React ,{useState} from 'react'
import axios from 'axios'
import { ToastContainer, toast } from "react-toastify";


const ImageInvestigation = () => {

  const [fileInputState,setFileInputState] = useState('')
  const [selectedFile,setSelectedFile] = useState('')
  const [selectedFiles,setSelectedFiles] = useState()
  const [previewSource,setPreviewSource] = useState()
  const uid = sessionStorage.getItem("userid");
  
  const handleFileInputChange = (e)=>{
    const file = e.target.files[0];
    const files = e.target.files;
    setFileInputState(fileInputState)
    setSelectedFile(file)
    setSelectedFiles(files)
    previewFile(file);
    console.log(file)
    console.log(files)
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
    console.log(selectedFiles)
    // uploadData(selectedFile,e);
    uploadDatas(selectedFiles,e);

  }

 

  const uploadDatas = async (images,e) =>{
    console.log(images)
    const imageData = new FormData();
    // imageData.append('image', images);
    imageData.append('user',uid);

    const Data=new Object();
    Data.user=uid;
    Data.name="name1"
    Data.district="district1"
    Data.state="State1"

    // const imageData={"image":images,"user":uid}
    // var image1=[]
    // for(var i=0;i<images.length;i++){
    //   image1.push(images[i])
    // }

    // console.log(image1)
    // const imageData= new Object();
    // imageData.image= images
    // imageData.user = uid
    for (let i = 0; i < images.length; i++) {
      imageData.append("image", images[i])
    }
    
    try {
      await axios.post('http://localhost:8000/image/uploadm',imageData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((image)=>{

        console.log(image)
        // formData.append('image',image.data.image);
        // formData.append('imageId',image.data.imageId);
        // Data.image=image.data.image
        // Data.imageId=image.data.imageId
        Data.image=image.data.urls
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

        <input onChange={handleFileInputChange} id="dropzone-file" name='image' type="file" value={fileInputState.name} multiple />
          
      </div> 
      <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Submit</button>
      </form>

      {previewSource && (<img src={previewSource} alt="chosen" className=" h-85 w-85"/>)}

    </div>
  )
}

export default ImageInvestigation
