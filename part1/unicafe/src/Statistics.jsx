import styled from 'styled-components'
import StatisticsLine from './StatisticsLine'

const Statistics = (props) => {

  if(props.total === 0) {
    return (
      <p>No feedback Given</p>
    )
  }
  else {
    return (
      <>
        <h2>Statistics</h2>

        <Table>
          <tbody>
            <tr>
              <StatisticsLine text='Good' value={props.good} />
            </tr>
            <tr>
              <StatisticsLine text='Neutral' value={props.neutral} />
            </tr>
            <tr>
              <StatisticsLine text='Bad' value={props.bad} />
            </tr>
            <tr>
              <StatisticsLine text='All' value={props.total} />
            </tr>
            <tr>
              <StatisticsLine text='Average' value={(props.good - props.bad) / props.total} />
            </tr>
            <tr>
              <StatisticsLine text='Positive' value={(props.good / props.total) * 100 +'%'} />
              {/* <td>Positive</td>
              <td>{(props.good / props.total) * 100 }%</td> */}
            </tr>
          </tbody>
        </Table>
      </>
    )
  }
}

const Table = styled.table`
  border-collapse: collapse;
  border: 2px solid rgb(200 200 200);
  letter-spacing: 1px;
  font-size: 0.8rem;
`;



export default Statistics