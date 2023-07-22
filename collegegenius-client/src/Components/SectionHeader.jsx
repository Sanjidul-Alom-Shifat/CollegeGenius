const SectionHeader = ({ header }) => {
    return (
      <div className="px-4 py-2 text-center w-fit mx-auto rounded-lg mb-6 bg-neutral/5">
        <h1 className="gradient-text text-lg font-medium lg:font-semibold">{header}</h1>
      </div>
    );
  };
  
  export default SectionHeader;