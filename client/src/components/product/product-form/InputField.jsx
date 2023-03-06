export default function InputField({ label, name, register, error }) {
  return (
    <>
      <label>{label}</label>
      <input type='text' placeholder={label} {...register(name)} />
      <span className='error'>{error[name]?.message}</span>
    </>
  );
}
