// export const EditableCell = ({
//     value: initialValue,
//     rowIndex,
//     columnId,
//     updateData,
//     searchTerm, 
//   }: {
//     value: string;
//     rowIndex: number;
//     columnId: string;
//     updateData: (rowIndex: number, columnId: string, value: string) => void;
//     searchTerm: string;
//   }) => {
//     const [value, setValue] = useState(initialValue);
  
//     const onBlur = () => {
//       updateData(rowIndex, columnId, value);  
//     };
  
//     const isHighlighted = searchTerm !== "" && 
//       value !== "" && 
//       value.toLowerCase().includes(searchTerm.toLowerCase());
  
//     return (
//       <input
//         value={value}
//         onChange={(e) => setValue(e.target.value)}
//         onBlur={onBlur}
//         className={`w-full h-full outline-none ${isHighlighted ? "bg-[rgb(255,243,211)]" : ""}`}
//       />
//     );
// };