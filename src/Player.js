import AudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';

const Player = ({filepath}) => (
    <AudioPlayer
        src= {filepath}
    />
);

export default Player;