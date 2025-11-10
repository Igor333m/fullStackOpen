import Part from "./Part"

export default function Content(props) {

  return (
    <>
      <Part part={props.data.part1} exercises={props.data.exercises1}></Part>
      <Part part={props.data.part2} exercises={props.data.exercises2}></Part>
      <Part part={props.data.part3} exercises={props.data.exercises3}></Part>
    </>
  )
}