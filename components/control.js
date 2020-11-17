import { Box } from "rebass"
import { GoUnmute,GoMute } from 'react-icons/go';
import InputSlider from "react-input-slider";

export const Control = ({setVol, setMute, mute, mobile, vol}) => {
    return <div style={{
        position: 'absolute',
        top: 0, 
        left: 0,
        margin: 20
    }}>
        <Box sx={{
            alignItems: 'center',
            display: 'flex',
            flexDirection: 'space-around',
            cursor: 'pointer'
        }}>
    {mute ? <GoMute onClick={()=> setMute(!mute)} /> : <GoUnmute onClick={()=> setMute(!mute)}  />} {!mobile && <div style={{
            marginLeft: 10
        }}> <InputSlider
        styles={{
            track: {
              background: 'black'
            },
            active: {
            background: 'linear-gradient(120deg,#ff90f9,#5da9ff)',
              opacity: 1
            },
            thumb: {
              width: 20,
              height: 20,
              boxShadow: 'none'
            },
            disabled: {
              opacity: 0.5
            }
          }}
        axis="x"
        x={vol}
        onChange={({ x }) => setVol(x)}
      /></div>}
        </Box>
        <Box>
           
        </Box>
    </div>
}