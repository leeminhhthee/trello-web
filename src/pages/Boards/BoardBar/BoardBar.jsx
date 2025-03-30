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
import { capitalizeFirstLetter } from '~/utils/formatters'

const MENU_STYLES = {
  backgroundColor: 'transparent',
  color: 'white',
  border: 'none',
  paddingX: '5px',
  borderRadius: '4px',
  '.MuiSvgIcon-root': { color: 'white' },
  '&:hover': { backgroundColor: 'primary.50' }
}

function BoardBar({ board }) {
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
      bgcolor: (theme) => theme.palette.mode === 'dark' ? '#34495e' : '#1976d2'
    }}>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
        <Tooltip title={board?.description}>
          <Chip
            sx={ MENU_STYLES }
            icon={<DashboardIcon />}
            label={board?.title}
            clickable
          />
        </Tooltip>
        <Chip
          sx={ MENU_STYLES }
          icon={<VpnLockIcon />}
          label={capitalizeFirstLetter(board?.type)}
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
              border: 'none',
              color: 'white',
              cursor: 'pointer',
              '&:first-of-type': { bgcolor: '#a4b0be' }
            }
          }}
        >
          <Tooltip title="leminhthe">
            <Avatar alt="Le Minh The" src="https://avatars.githubusercontent.com/u/111297574?v=4" />
          </Tooltip>
          <Tooltip title="txt">
            <Avatar alt="Tran Xuan Tien" src="https://avatars.githubusercontent.com/u/98033987?v=4" />
          </Tooltip>
          <Tooltip title="lmt">
            <Avatar alt="Minh The" src="https://scontent.fdad3-4.fna.fbcdn.net/v/t39.30808-6/480303196_1733090150888690_993785219121767132_n.jpg?_nc_cat=101&ccb=1-7&_nc_sid=a5f93a&_nc_ohc=hIt_P2j9QmsQ7kNvgHKil7Y&_nc_oc=AdkBH_7HWAt3Pd0wteSlbBtkQr0aP0jqnkVZqIZ1I_OusA5Jzrif2lxFKffwZRSTOYs&_nc_zt=23&_nc_ht=scontent.fdad3-4.fna&_nc_gid=ld-lpRhjEQ2uzPuF-R5GVA&oh=00_AYG1g0Ptr959AKDMTQ4lP7BxWpC3ojxxC9ujS5bVLUdJWA&oe=67EF2EA1" />
          </Tooltip>
          <Tooltip title="qnfc">
            <Avatar alt="Quang Nam FC" src="https://scontent.fdad3-5.fna.fbcdn.net/v/t39.30808-6/482320881_1747454109452294_7354256832278951690_n.jpg?_nc_cat=102&ccb=1-7&_nc_sid=a5f93a&_nc_ohc=prr33Em9AbkQ7kNvgGqUwon&_nc_oc=Admb1mTAltJnm0gLxLGB8NTfkSlc4byW9isW_M7IQSvnAYkqPtdVjfgExo0dEXJHycc&_nc_zt=23&_nc_ht=scontent.fdad3-5.fna&_nc_gid=mgTp0aV8e0WBls_5maSOqw&oh=00_AYG1aKr6BvT0zgycFnvbKSoG507eQtKpk7M_E40Kbzl8Xw&oe=67EF2896" />
          </Tooltip>
          <Tooltip title="dtt">
            <Avatar alt="Tung" src="https://scontent.fdad3-1.fna.fbcdn.net/v/t39.30808-6/477577348_1727780368086335_5163869590974556176_n.jpg?_nc_cat=111&ccb=1-7&_nc_sid=833d8c&_nc_ohc=ssjWuaZh488Q7kNvgEgmjFd&_nc_oc=AdlhOlLCNROxt5hDG03GxJZjkrU5Z5SlGL3Z6L_5-gAkhjG0WsO5kKREidYcyjDmQqY&_nc_zt=23&_nc_ht=scontent.fdad3-1.fna&_nc_gid=XORUxsK5aDytOYejwZRuhQ&oh=00_AYER_0UTlTlbNiy85roJPho8BjnUlZRrW1eQzrwK1JeRfA&oe=67EF07B8" />
          </Tooltip>
          <Tooltip title="leminhthe">
            <Avatar alt="Le Minh The" src="https://scontent.fdad3-5.fna.fbcdn.net/v/t39.30808-6/482320881_1747454109452294_7354256832278951690_n.jpg?_nc_cat=102&ccb=1-7&_nc_sid=a5f93a&_nc_ohc=prr33Em9AbkQ7kNvgGqUwon&_nc_oc=Admb1mTAltJnm0gLxLGB8NTfkSlc4byW9isW_M7IQSvnAYkqPtdVjfgExo0dEXJHycc&_nc_zt=23&_nc_ht=scontent.fdad3-5.fna&_nc_gid=mgTp0aV8e0WBls_5maSOqw&oh=00_AYG1aKr6BvT0zgycFnvbKSoG507eQtKpk7M_E40Kbzl8Xw&oe=67EF2896" />
          </Tooltip>
          <Tooltip title="qnfc">
            <Avatar alt="Quang Nam FC" src="https://scontent.fdad3-1.fna.fbcdn.net/v/t39.30808-6/474654522_1712747542922951_305633497641152833_n.jpg?_nc_cat=108&ccb=1-7&_nc_sid=833d8c&_nc_ohc=zzIWpyk2IhkQ7kNvgFIYTwg&_nc_oc=AdlhES03j9Nn6RTScWA13ZqFZUOrp36tC2NDsk_n_rBctA17pTAHByd1YIdsyMGLERI&_nc_zt=23&_nc_ht=scontent.fdad3-1.fna&_nc_gid=1jW4YBAPJfeUNvByLrOvDw&oh=00_AYGYfzmFC2-Ynx0cNTg2PFgWLXe2Ou-nMzPKEOqCjkORBg&oe=67EF2857" />
          </Tooltip>
        </AvatarGroup>
      </Box>
    </Box>
  )
}

export default BoardBar
