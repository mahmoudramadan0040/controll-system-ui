import 'tabulator-tables/dist/css/tabulator.min.css'; // Import Tabulator styles
function GradeTableFilter() {
    return ( 
    
    <div className="flex justify-center gap-4 mt-3">
        <div className=' w-11/12   p-1 m-1 bg-gray-100 rounded-sm shadow-md'>
            <select id="filter-field" className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring focus:ring-blue-300">
                <option value="name">Name</option>
                <option value="progress">Progress</option>
                <option value="gender">Gender</option>
                <option value="rating">Rating</option>
                <option value="col">Favourite Colour</option>
                <option value="dob">Date Of Birth</option>
                <option value="car">Drives</option>
                <option value="function">" Drives & Rating</option>
            </select>

            <select id="filter-type" className="border border-gray-300 rounded-md p-2 m-1 focus:outline-none focus:ring focus:ring-blue-300">
                <option value="="> = </option>
                <option value="<"> &lt; </option>
                <option value="<="> &le;</option>
                <option value=">"> &gt;</option>
                <option value=">="> &ge;</option>
                <option value="!="> &ne;</option>
                <option value="like">like</option>
            </select>

            <input id="filter-value" type="text" placeholder="value to filter" className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring focus:ring-blue-300"/>

            <button id="filter-clear" className="bg-red-500 text-white rounded-md p-2 m-1 ml-12 hover:bg-red-600 transition duration-300">Clear Filter</button>
        </div>
    </div> 
    
    );
}

export default GradeTableFilter;