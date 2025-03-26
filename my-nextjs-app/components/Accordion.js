import { useState } from "react";
import parse from "html-react-parser"; // Import html parser

const Accordion = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border rounded-md shadow-md my-2">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full text-left px-4 py-3 bg-gray-100 hover:bg-gray-200 flex justify-between items-center"
      >
        <span className="font-medium">{question}</span>
        <span>{isOpen ? "▲" : "▼"}</span>
      </button>
      {isOpen && (
        <div className="px-4 py-3 bg-white border-t">
          {answer} {/* This will properly display bold text, etc. */}
        </div>
      )}
    </div>
  );
};

export default Accordion;
