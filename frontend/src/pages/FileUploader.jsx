import React, { useCallback, useEffect, useState } from "react"
import { useDropzone } from "react-dropzone";
import { toast } from "react-toastify";
import { RiDeleteBin2Line } from "react-icons/ri"
import { Loader, UploadBtn } from "../components"
import blinkitLogo from '../assets/blink-it.svg'
import { useNavigate } from 'react-router-dom'

function FileUploader() {
  useEffect(() => {
    const verifyUser = async() => {
      try {
        const response = await fetch(`${import.meta.env.VITE_BASE_URL}/auth/checkLoginStatus`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: 'include'
        })

        const result = await response.json()

        if(!result.success) {
          toast.error(result.message)
          navigate('/login')
          return
        }
      } catch (error) {
        toast.error(error.message)
      }
    }

    verifyUser()
  }, [])
  
  const navigate = useNavigate()
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [loading, setLoading] = useState(false);

  const onDrop = useCallback((acceptedFiles) => {
    // useCallback is used to optimize re-rendering of the function onDrop as on every re-render of component the functions also re-renders but using useCallback prevents that and uses the same instance of the function
    setSelectedFiles((prevFiles) => [
      ...prevFiles,
      ...acceptedFiles.map((file) => ({
        file,
        preview: URL.createObjectURL(file),
      })),
    ]);
    console.log({acceptedFiles}); // handy for viewing file properties
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "image/*": [".png", ".gif", ".jpeg", ".jpg"],
    }
  }); // onDrop is a callback function

  const removeFiles = (name) => {
    setSelectedFiles((prevFiles) =>
      prevFiles.filter((image) => image.file.path !== name)
    );
  };

  const handleSingleUpload = async () => {
    const formData = new FormData();
    formData.append("image", selectedFiles[0].file);
    console.log("file => ", formData);

    try {
      setLoading(true);
      const response = await fetch("http://localhost:5000/file/uploadSingle", {
        method: "POST",
        body: formData,
      });

      const result = await response.json();

      if (result.success) {
        toast.success("Image uploaded successfully");
      } else {
        toast.error(result.message);
      }

      setSelectedFiles([]);
    } catch (err) {
      console.log({err})
      toast.error("Internal server error");
    } finally {
      setLoading(false);
    }
  };

  const handleMultipleUpload = async () => {
    const formData = new FormData();

    for (let i = 0; i < selectedFiles.length; i++) {
      formData.append("images", selectedFiles[i].file);
    }

    try {
      setLoading(true);
      const response = await fetch("http://localhost:5000/file/uploadMultiple", {
        method: "POST",
        body: formData,
      });

      const result = await response.json();
      if (result.success) {
        toast.success("Images uploaded successfully");
      } else {
        toast.error(result.message);
      }

      setSelectedFiles([]);
    } catch (err) {
      console.error({err});
      toast.error("internal server error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-7 md:py-10 max-w-7xl min-h-screen mx-auto font-montserrat flex flex-col items-center">
      {loading && <Loader title='uploading' />}
      <div
        {...getRootProps({
          className:
            "w-full h-[250px] text-white cursor-pointer rounded-xl outline-dashed outline-3 outline-gray-700/70 hover:outline-green-600 transition-all duration-200 ease-in-out flex flex-col gap-4 justify-center items-center",
        })}
      >
        <input {...getInputProps({})} />
        {isDragActive ? (
          <p className="text-sm tracking-wide">Drop the files here ...</p>
        ) : (
          <div className="text-center text-sm tracking-wide">
            <img className="w-32 mx-auto mb-2 filter grayscale animate-pulse" src={blinkitLogo} alt="blink it logo" />
            <p>Drag 'n' drop your image files here, or click to select image files</p>
            <p>( Max file upload size limit is 10MB )</p>
          </div>
        )}
      </div>

      <UploadBtn handleUpload={selectedFiles.length > 1 ? handleMultipleUpload : handleSingleUpload} disableState={selectedFiles.length == 0} />

      <h3 className="mt-7 w-full relative text-xl py-1 text-left rounded-bl-md border-b-[5px] border-b-blue-500">
        <span className="text-white bg-blue-500 bg- rounded-t-md rounded-bl-[4px] px-3 py-[10px] font-bold">Preview</span>
        <span className="absolute bottom-[3px] px-2 text-sm text-gray-100 font-semibold">Files you upload will appear below</span>
      </h3>

      <ul className="w-full text-white m-7 grid grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 mt-7 gap-5">
        {selectedFiles.map((asset, index) => (
          <li
            key={index}
            className="relative group bg-gray-800 rounded-lg flex flex-col overflow-hidden"
          >
            <div className="h-72 border-b-[3px] border-blue-300 border-dashed">
              <img
                src={`${asset.preview}`}
                className="w-full h-full object-cover"
              ></img>
            </div>
            {/* <iframe src={asset.preview}></iframe> */}
            <h2 className="m-2">
              {asset.file.path.length > 20
                ? `${asset.file.path.slice(0, 15)}...`
                : asset.file.path}
            </h2>

            <button className="p-[14px] w-16 h-16 flex gap-3 rounded-full absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-[80%] opacity-0 group-hover:opacity-100 group-hover:bg-gray-800/80 transition-opacity ease-in-out duration-300">
              <RiDeleteBin2Line
                className="w-full h-full hover:text-red-400"
                onClick={() => removeFiles(asset.file.path)}
              />
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default FileUploader;