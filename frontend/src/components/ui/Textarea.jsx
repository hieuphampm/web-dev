const Textarea = ({ value, onChange, placeholder }) => {
    return (
      <textarea
        className="w-full p-2 border rounded-md"
        value={value}
        onChange={onChange}
        placeholder={placeholder}
      />
    );
  };
  
  export default Textarea;
  