import { useEffect, useRef, useState } from "react";
import { FaPlay, FaPause, FaVolumeUp, FaVolumeMute } from "react-icons/fa";

const AudioPlayer = ({ audioSrc, image }) => {
    const [isPlaying, setIsPlaying] = useState(true);
    const [isMute, setIsMute] = useState(false);
    const [duration, setDuration] = useState(0);
    const [currentTime, setCurrentTime] = useState(0);
    const [volume, setVolume] = useState(1);

    const audioRef = useRef();

    const handleDuration = (e) => {
        setCurrentTime(e.target.value)
        audioRef.current.currentTime = e.target.value;
    };

    const handleVolume = (e) => {
        setVolume(e.target.value);
        audioRef.current.volume = e.target.value;
        setIsMute(e.target.value == 0);
    };
    
    const formatTime = (time) => {
        const minutes = Math.floor(time / 60);
        const seconds = Math.floor(time % 60);
        return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
      };
    
      useEffect(() => {
        const audio = audioRef.current;
        audio.addEventListener("timeupdate", handleTimeUpdate);
        audio.addEventListener("loadedmetadata", handleLoadedMetadata);
        audio.addEventListener("ended", handleEnded);
    
        return () => {
          audio.removeEventListener("timeupdate", handleTimeUpdate);
          audio.removeEventListener("loadedmetadata", handleLoadedMetadata);
          audio.removeEventListener("ended", handleEnded);
        };
      }, []);
    
      const handleTimeUpdate = () => {
        setCurrentTime(audioRef.current.currentTime);
      };
    
      const handleLoadedMetadata = () => {
        setDuration(audioRef.current.duration);
      };
    
      const handleEnded = () => {
        setCurrentTime(0);
        setIsPlaying(false);
      };

    useEffect(() => {
      if(isPlaying){
        audioRef.current.play();
      }
      else{
        audioRef.current.pause();
      }
    }, [isPlaying])

    useEffect(() => {
      if(!isMute){
        audioRef.current.volume = 1;
        setVolume(1);
      }
      else{
        audioRef.current.volume = 0;
        setVolume(0);
      }
    }, [isMute])
    

    return (
        <div className="fixed bottom-0 flex justify-between gap-4 left-1/2 -translate-x-1/2 w-full sm:h-24 h-20 bg-black/20 p-4 overflow-hidden">
            <img className="sm:w-16 sm:h-16 w-12 h-12 object-cover rounded-md" src={image} alt="display" />
            <audio ref={audioRef} src={audioSrc} />
            <div className="flex justify-between items-center gap-2">
                {isPlaying ? (
                    <FaPause onClick={() => setIsPlaying(!isPlaying)} />
                ) : (
                    <FaPlay onClick={() => setIsPlaying(!isPlaying)} />
                )}
                <p className="text-sm">{formatTime(currentTime)}</p>
                <input
                    className="w-12 sm:w-24 md:w-40 lg:w-80 rounded-full hue-rotate-30 cursor-pointer"
                    type="range"
                    max={duration}
                    value={currentTime}
                    step={0.001}
                    onChange={handleDuration}
                />
                <p className="text-sm">{formatTime(duration)}</p>
            </div>
            <div className="flex justify-between items-center gap-2">
                {!isMute ? (
                    <FaVolumeUp size={16} onClick={() => setIsMute(!isMute)} />
                ) : (
                    <FaVolumeMute size={16} onClick={() => setIsMute(!isMute)} />
                )}
                <input
                    className="w-8 sm:12 md:w-16 lg:w-32 rounded-full hue-rotate-30 cursor-pointer"
                    type="range"
                    value={volume}
                    max={1}
                    min={0}
                    step={0.01}
                    onChange={handleVolume}
                />
            </div>
        </div>
    );
};

export default AudioPlayer;
