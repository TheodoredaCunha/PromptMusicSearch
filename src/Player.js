import AudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';

const Player = ({filepath}) => (
    <AudioPlayer
        src= {process.env.PUBLIC_URL + filepath}
    />
);

export default Player;