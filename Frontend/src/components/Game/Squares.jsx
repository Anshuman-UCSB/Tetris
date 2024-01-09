export function Square({ color_ind }){
  let colors = {
    "bg":"#404E4D",
    "I":"#5BC0EB",
    "O":"#FDE74C",
    "T":"#9BC53D",
    "J":"#C3423F",
    "L":"#91818A",
    "S":"#CA895F",
    "Z":"#CA3CFF",
    "g": "#a2a6a6"
  };
  return (
    <div style={{backgroundColor: colors[color_ind]}} className='grow pt-[10%] w-full '/>
  )
}
export function EmptySquare({ color_ind }){
  return (
    <div className='empty-square'/>
  )
}