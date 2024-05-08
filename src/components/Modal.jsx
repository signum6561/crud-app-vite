// eslint-disable-next-line react/prop-types
const Modal = ({ open, children }) => {
  return (
    <>
      {open && (
        <div className='absolute w-full h-full top-0 left-0 bg-[rgba(0,0,0,0.34)] flex justify-center items-center'>
          {children}
        </div>
      )}
    </>
  );
};

export default Modal;
