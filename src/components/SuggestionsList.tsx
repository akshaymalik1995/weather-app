import { CiSearch } from "react-icons/ci";

export default function SuggestionsList(props: {
  suggestions: Object[];
  onSuggestionSelection: (lat: number, lon : number) => void;
  isOpen: Boolean;
}) {


  return (
    <div
      className={`shadow ${
        props.isOpen ? "" : "hidden"
      } bg-white z-10 flex rounded flex-col w-full absolute top-full`}
    >
      {props.suggestions.length > 0 &&
        props.suggestions.map((city) => (
          <div
            key={city.code}
            onClick={() => props.onSuggestionSelection(parseFloat(city.latitude), parseFloat(city.longitude))}
            className="px-2 py-2 hover:bg-gray-100  cursor-pointer  flex items-center gap-2"
          >
            <div className="text-lg text-gray-500  ">
              <CiSearch />
            </div>
            <div className="text-gray-700">
              {city.name}, {city.country.name}
            </div>
          </div>
        ))}
    </div>
  );
}
