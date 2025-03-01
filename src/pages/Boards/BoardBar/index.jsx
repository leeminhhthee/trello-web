import Box from '@mui/material/Box'
import Chip from '@mui/material/Chip'
import DashboardIcon from '@mui/icons-material/Dashboard'
import VpnLockIcon from '@mui/icons-material/VpnLock'
import AddToDriveIcon from '@mui/icons-material/AddToDrive'
import BoltIcon from '@mui/icons-material/Bolt'
import FilterListIcon from '@mui/icons-material/FilterList'
import AvatarGroup from '@mui/material/AvatarGroup'
import Avatar from '@mui/material/Avatar'
import { Tooltip } from '@mui/material'
import Button from '@mui/material/Button'
import PersonAddIcon from '@mui/icons-material/PersonAdd'

const MENU_STYLES = {
  backgroundColor: 'transparent',
  color: 'white',
  border: 'none',
  paddingX: '5px',
  borderRadius: '4px',
  '.MuiSvgIcon-root': { color: 'white' },
  '&:hover': { backgroundColor: 'primary.50' }
}

function BoardBar() {
  return (
    <Box sx={{
      width: '100%',
      height: (theme) => theme.trello.boardBarHeight,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      gap: 2,
      paddingX: 2,
      overflowX: 'auto',
      bgcolor: (theme) => theme.palette.mode === 'dark' ? '#34495e' : '#1976d2',
      borderBottom: '1px solid white'
    }}>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
        <Chip
          sx={ MENU_STYLES }
          icon={<DashboardIcon />}
          label="Trello MERN Stack"
          clickable
        />
        <Chip
          sx={ MENU_STYLES }
          icon={<VpnLockIcon />}
          label="Public/Private Workspace"
          clickable
        />
        <Chip
          sx={ MENU_STYLES }
          icon={<AddToDriveIcon />}
          label="Add To Google Drive"
          clickable
        />
        <Chip
          sx={ MENU_STYLES }
          icon={<BoltIcon />}
          label="Automation"
          clickable
        />
        <Chip
          sx={ MENU_STYLES }
          icon={<FilterListIcon />}
          label="Filters"
          clickable
        />
      </Box>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
        <Button
          variant="outlined"
          startIcon={<PersonAddIcon />}
          sx={{
            color: 'white',
            borderColor: 'white',
            '&:hover': {
              borderColor: 'white'
            }
          }}
        >
          Invite
        </Button>
        <AvatarGroup
          max={6}
          sx={{
            gap: '4px',
            '& .MuiAvatar-root': {
              width: 34,
              height: 34,
              fontSize: '16px',
              border: 'none'
            }
          }}
        >
          <Tooltip title="leminhthe">
            <Avatar alt="Le Minh The" src="https://avatars.githubusercontent.com/u/111297574?v=4" />
          </Tooltip>
          <Tooltip title="txt">
            <Avatar alt="Tran Xuan Tien" src="https://avatars.githubusercontent.com/u/98033987?v=4" />
          </Tooltip>
          <Tooltip title="ntmt">
            <Avatar alt="Minh Thu" src="https://scontent-hkg4-1.xx.fbcdn.net/v/t39.30808-6/476119143_1673230810296453_6422427790844212838_n.jpg?_nc_cat=108&ccb=1-7&_nc_sid=a5f93a&_nc_eui2=AeH-m83D9mjIm62VUO2F6KbLmFYN5CBME9aYVg3kIEwT1hjlWv3PRRHw_ftDvoRQIQhqQr0WlX-sPXdaJvK2OM-n&_nc_ohc=xh8znbJNbTwQ7kNvgHTSOl9&_nc_oc=AdghVjW0tSLb_DRD3COLGMCw3JUJ7fc1vaH6spwOir7qJ5RB4clwzEvXR0_7wiF_GuFOnncoKXfKPJPqhPNszlgP&_nc_zt=23&_nc_ht=scontent-hkg4-1.xx&_nc_gid=AJ8b8J5jhUFYjn7Q4dNJe2M&oh=00_AYDRdlMZLNPy1cUgaEQOdUDEIZs8YoXkuEZTcU4xtZe-Zg&oe=67C7AC39" />
          </Tooltip>
          <Tooltip title="qnfc">
            <Avatar alt="Quang Nam FC" src="https://scontent-hkg1-1.xx.fbcdn.net/v/t39.30808-6/361403895_240006098844867_6077373301381397827_n.jpg?_nc_cat=105&ccb=1-7&_nc_sid=6ee11a&_nc_eui2=AeFOQ99SFg_WtSHP26-IgZhO9onKefG8C7D2icp58bwLsEXnhBQrxNBotvuaAYEdno55bLdhE7FPbTtEmxtEc63F&_nc_ohc=U3T1aQI-I2oQ7kNvgH5H1qf&_nc_oc=Adgw6Y0oVA1SE6bPg4777qv7k1rRb86SJnepB013ZIDGy0WGndgKi88tv0NmggwM1FEwTA72UKS_iYFE7IN3Hydp&_nc_zt=23&_nc_ht=scontent-hkg1-1.xx&_nc_gid=A1rwMgF5hqRKd4WUyqB1bNl&oh=00_AYDb_WLkKRv9iw-WETCo5NXJTg4ljE3WXufI4VsxZix22Q&oe=67C79F28" />
          </Tooltip>
          <Tooltip title="dtt">
            <Avatar alt="Tung" src="https://scontent-hkg4-1.xx.fbcdn.net/v/t39.30808-6/440410264_1861041117670031_3732518686035863516_n.jpg?_nc_cat=110&ccb=1-7&_nc_sid=6ee11a&_nc_eui2=AeHMfhih7dYBKuEEi0Kj2wUuy-T3S7dV7PbL5PdLt1Xs9rbauBydTRrefEimSWlEVQHxyUsxE5OBBro6yXsZPo1s&_nc_ohc=1sbSX66J9j0Q7kNvgGlF_6R&_nc_oc=AdiwzQe5OQ6gxjgHf4g-OvGQK7wyG-K03S5Q_ZgNmsIBT7jAtBjWRb0Z05zUaI1NH08Kwe7-LDrZwixWgMC83BHm&_nc_zt=23&_nc_ht=scontent-hkg4-1.xx&_nc_gid=AKbU5pi2WYOvxA14h0GPalT&oh=00_AYBRbIewdfTSf4QFYomU5TFkGKDZbnPNizAX5ueZTWkpiw&oe=67C7BAAC" />
          </Tooltip>
          <Tooltip title="leminhthe">
            <Avatar alt="Le Minh The" src="https://scontent-hkg4-1.xx.fbcdn.net/v/t39.30808-6/440410264_1861041117670031_3732518686035863516_n.jpg?_nc_cat=110&ccb=1-7&_nc_sid=6ee11a&_nc_eui2=AeHMfhih7dYBKuEEi0Kj2wUuy-T3S7dV7PbL5PdLt1Xs9rbauBydTRrefEimSWlEVQHxyUsxE5OBBro6yXsZPo1s&_nc_ohc=1sbSX66J9j0Q7kNvgGlF_6R&_nc_oc=AdiwzQe5OQ6gxjgHf4g-OvGQK7wyG-K03S5Q_ZgNmsIBT7jAtBjWRb0Z05zUaI1NH08Kwe7-LDrZwixWgMC83BHm&_nc_zt=23&_nc_ht=scontent-hkg4-1.xx&_nc_gid=AKbU5pi2WYOvxA14h0GPalT&oh=00_AYBRbIewdfTSf4QFYomU5TFkGKDZbnPNizAX5ueZTWkpiw&oe=67C7BAAC" />
          </Tooltip>
          <Tooltip title="qnfc">
            <Avatar alt="Quang Nam FC" src="https://scontent-hkg1-1.xx.fbcdn.net/v/t39.30808-6/361403895_240006098844867_6077373301381397827_n.jpg?_nc_cat=105&ccb=1-7&_nc_sid=6ee11a&_nc_eui2=AeFOQ99SFg_WtSHP26-IgZhO9onKefG8C7D2icp58bwLsEXnhBQrxNBotvuaAYEdno55bLdhE7FPbTtEmxtEc63F&_nc_ohc=U3T1aQI-I2oQ7kNvgH5H1qf&_nc_oc=Adgw6Y0oVA1SE6bPg4777qv7k1rRb86SJnepB013ZIDGy0WGndgKi88tv0NmggwM1FEwTA72UKS_iYFE7IN3Hydp&_nc_zt=23&_nc_ht=scontent-hkg1-1.xx&_nc_gid=A1rwMgF5hqRKd4WUyqB1bNl&oh=00_AYDb_WLkKRv9iw-WETCo5NXJTg4ljE3WXufI4VsxZix22Q&oe=67C79F28" />
          </Tooltip>
        </AvatarGroup>
      </Box>
    </Box>
  )
}

export default BoardBar
