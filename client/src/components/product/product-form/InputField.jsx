export default function InputField({
  type = 'text',
  label,
  name,
  register,
  error,
}) {
  return (
    <>
      <label>{label}</label>
      <input type={type} placeholder={label} {...register(name)} />
      <span className='error'>{error[name]?.message}</span>
    </>
  );
}
