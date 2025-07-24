function Navbar() {
  return (
    <div className="w-full h-[7%] border border-1 flex justify-center items-center">
      <div className="w-[95%] h-full flex justify-between items-center">
        <h1 className="font-bold text-lg">HiCu</h1>
        <div className="flex w-1/6 justify-between items-center">
          <p>Features</p>
          <p>Testimonials</p>
          <p>Contact</p>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
