import React, { useState, type Dispatch, type SetStateAction } from "react";

const SearchPackage = ({
  packages,
  selectedOptions,
  setSelectedOptions,
}: {
  packages: string[];
  selectedOptions: string[];
  setSelectedOptions: Dispatch<SetStateAction<string[]>>;
}): JSX.Element => {
  const [suggestions, setSuggestions] = useState<boolean>(false);

  //   const [selectedOptions, setSelectedOptions] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState("");

  const handleOptionClick = (option: string): void => {
    if (!selectedOptions.includes(option)) {
      setSelectedOptions([...selectedOptions, option]);
    }
  };

  const filteredOptions = packages.filter((option) =>
    option.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const removePackage = (option: string): void => {
    setSelectedOptions(selectedOptions.filter((item) => item !== option));
  };

  return (
    <>
      <div>
        <div className="group mb-2 flex flex-wrap gap-2">
          {selectedOptions.map((option) => (
            <div
              key={option}
              className={` rounded bg-gray-100 px-2 py-1`}
              onClick={() => {
                handleOptionClick(option);
              }}
            >
              {option}

              <span
                onClick={() => {
                  removePackage(option);
                }}
                className="ml-2 cursor-pointer"
              >
                X
              </span>
            </div>
          ))}
        </div>
        <input
          type="text"
          className="inp peer w-full"
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
          }}
          onFocus={() => {
            setSuggestions(true);
          }}
          onBlur={() => {
            setSuggestions(false);
          }}
        />

        {suggestions && (
          <div
            onClick={() => {
              setSuggestions(true);
            }}
            className="flex  max-h-60 flex-col gap-1 overflow-scroll pt-2"
          >
            {filteredOptions.map((option) => (
              <div
                key={option}
                className={`cursor-pointer rounded px-2 py-1`}
                onMouseDown={() => {
                  handleOptionClick(option);
                  setSuggestions(true);
                }}
              >
                {option}
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default SearchPackage;
