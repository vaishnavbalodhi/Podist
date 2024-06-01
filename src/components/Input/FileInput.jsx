import { useState } from "react"

const FileInput = ({ accept, handleFile, id, text }) => {

    const [fileSelected, setFileSelected] = useState("");

    const handleChange = (e) => {
        console.log(e.target.files);
        setFileSelected(e.target.files[0].name);
        handleFile(e.target.files[0]);
    }

    return (
        <div className="w-full flex justify-center items-center">
            <label htmlFor={id} className={`w-2/3 mb-5 max-w-[500px] cursor-pointer bg-transparent border-2 border-dashed border-customColor-puple_grey rounded-lg px-3 py-2 focus:outline-none focus:border-customColor-white text-customColor-puple_grey ${fileSelected && "text-customColor-white border-customColor-white"}`}>
                { fileSelected ? `${text}: ${fileSelected}` : `Import ${text}` }
            </label>
            <input
                type="file"
                accept={accept}
                id={id}
                style={{display: "none"}}
                onChange={handleChange} 
                required={true}
            />
        </div>
    )
}

export default FileInput