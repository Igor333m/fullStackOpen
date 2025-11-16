import styled from 'styled-components'

const StatisticsLine = ({text, value}) => {

  return (
    <>
      <Td>{text}</Td>
      <Td>{value}</Td>
    </>
  )
}

const Td = styled.td`
  border: 1px solid rgb(190 190 190);
  padding: 10px 20px;
`

export default StatisticsLine