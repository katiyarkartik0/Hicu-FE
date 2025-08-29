function Navbar() {
  return (
    <div className="w-full h-[65px] flex justify-center items-center before:content-[''] before:absolute before:left-0 before:top-[64px] 
                  before:h-[1px] before:w-full before:bg-grey-ef before:[box-shadow:0_2px_3px_rgba(0,0,0,0.1)]">
      <div className="w-[95%] h-full flex justify-between items-center">
        <h1 className="font-bold text-lg text-grey-18">HiCu</h1>
        <div className="flex w-auto justify-between items-center text-grey2c">
          <p className="mx-2 text-grey-2c hover:text-grey-18 hover:underline decoration-2 underline-offset-4 
           transition-colors duration-300 cursor-pointer text-[12px] font-extrabold">Features</p>
          <p className="mx-2 text-grey-2c hover:text-grey-18 hover:underline decoration-2 underline-offset-4 
           transition-colors duration-300 cursor-pointer text-[12px] font-extrabold">Testimonials</p>
          <p className="mx-2 text-grey-2c hover:text-grey-18 hover:underline decoration-2 underline-offset-4 
           transition-colors duration-300 cursor-pointer text-[12px] font-extrabold">Contact</p>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
