export default function FieldNamesFilterBarContainer({ fieldnames } : { fieldnames : string[]}) {
    console.log(fieldnames);
    return (
        <div className="flex flex-col absolute top-[30px] bg-white opacity-100 shadow-lg text-[13px]">
            <input placeholder="Find a field">
            </input>
            {fieldnames.map((fieldname) => (
                <button key={fieldname}> { fieldname } </button>
            ))}
        </div>
    )
}