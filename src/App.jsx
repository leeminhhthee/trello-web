import Button from '@mui/material/Button'
import AccessAlarmIcon from '@mui/icons-material/AccessAlarm'
import ThreeDRotation from '@mui/icons-material/ThreeDRotation'
import Typography from '@mui/material/Typography'

function App() {
  return (
    <>
      <div>leminhthe</div>
      <Typography variant="body2" color="text.secondary">Hello World</Typography>

      <Button variant="text">Click me</Button>
      <Button variant="contained" color="success">
        Contained
      </Button>
      <Button variant="outlined">Outlined</Button>
      <br />
      <AccessAlarmIcon />
      <ThreeDRotation />
    </>
  )
}

export default App
