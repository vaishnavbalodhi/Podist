const Button = ({text, onClick, disabled, width}) => {
  return (
    <button 
    className={`${!width && 'w-2/3'} max-w-[500px] border-2 border-x-customColor-white rounded-lg p-2 hover:bg-customColor-white hover:text-customColor-theme hover:transition-all hover:duration-300`}
    style={{width: width}}
    disabled={disabled}
    onClick={onClick}>
      {text}
    </button>
  )
}

export default Button