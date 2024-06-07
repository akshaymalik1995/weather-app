import { CiSearch } from "react-icons/ci";

export default function SuggestionsList(props: { suggestions: string[] , onSuggestionSelection : (value : string) => void}) {
  const cities = props.suggestions;
  return (
    <div className="shadow bg-white flex rounded flex-col w-full absolute top-full">
      {cities.length > 0 &&
        cities.map((city) => (
          <div onClick={() => props.onSuggestionSelection(city)} className="px-2 py-2 hover:bg-gray-100  cursor-pointer  flex items-center gap-2">
            <div className="text-lg text-gray-500  ">
              <CiSearch />
            </div>
            <div className="text-gray-700" >{city}</div>
          </div>
        ))}
    </div>
  );
}
