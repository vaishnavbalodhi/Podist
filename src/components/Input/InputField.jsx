const InputField = ({ type, input, setInput, placeholder, required }) => {
  return (
    <input
      type={type}
      value={input}
      placeholder={placeholder}
      onChange={(e) => setInput(e.target.value)}
      required={required}
      className='w-2/3 mb-5 max-w-[500px] bg-transparent text-customColor-white border-2 border-customColor-puple_grey rounded-lg p-2 focus:outline-none focus:border-customColor-white placeholder:text-customColor-puple_grey'
    />
  )
}

export default InputField