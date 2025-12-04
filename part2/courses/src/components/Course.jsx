import Part from './Part'

const Course = ({ course }) => {

  const initialValue = 0
  const totalExercies = course.parts.reduce((accumulator, currentValue) => accumulator + currentValue.exercises, initialValue)

  return (
    <div>
      <h1>{course.name}</h1>
      <section>
        { course.parts.map((part) => <Part part={part} key={part.id}/>) }
        <p>Total of {totalExercies} exercises</p>
      </section>
    </div>
  )
}

export default Course