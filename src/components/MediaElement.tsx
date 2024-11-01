"use client";
import { MusicTrack } from "@/types";
import { extname } from "path";
import { useRef, useEffect, useState } from "react";
import Image from "next/image";

const audio_formats = ["aac", "mp3", "wav", "m4a"]; // Beispiel-Audioformate
const video_formats = ["mp4", "avi", "mov", "webm"]; // Beispiel-Videoformate

const MediaElement = ({ track }: { track: MusicTrack }) => {
    const audioRef = useRef<HTMLAudioElement | null>(null);
    const videoRef = useRef<HTMLVideoElement | null>(null);
    const [mediaElement, setMediaElement] = useState<
        HTMLAudioElement | HTMLVideoElement | null
    >(null);
    const [currentTime, setCurrentTime] = useState(0);
    const [isLoaded, setIsLoaded] = useState(false);
    const [isPlaying, setIsPlaying] = useState(false);

    useEffect(() => {
        if (audioRef.current) {
            setMediaElement(audioRef.current);
        } else if (videoRef.current) {
            setMediaElement(videoRef.current);
        }
    }, []);

    useEffect(() => {
        if (mediaElement) {
            mediaElement.ontimeupdate = () =>
                setCurrentTime(mediaElement.currentTime);
            mediaElement.onloadedmetadata = () => setIsLoaded(true);
            mediaElement.onplay = () => setIsPlaying(true);
            mediaElement.onpause = () => setIsPlaying(false);
        }
    }, [mediaElement]);

    const handlePlayButtonClick = () => {
        if (mediaElement) {
            if (isPlaying) {
                mediaElement.pause();
            } else {
                mediaElement.play();
            }
        }
    };

    const handlePlusButtonClick = () => {
        if (mediaElement) {
            mediaElement.currentTime += 10;
        }
    };

    const handleMinusButtonClick = () => {
        if (mediaElement) {
            mediaElement.currentTime -= 10;
        }
    };

    const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newTime = parseFloat(e.target.value);
        if (mediaElement) {
            mediaElement.currentTime = newTime;
            setCurrentTime(newTime);
        }
    };

    const element = audio_formats.includes(
        extname(track.music_file).slice(1)
    ) ? (
        <>
            <audio src={track.music_file} ref={audioRef}></audio>
            <img src={track.image} alt="Track image" height={200} />
        </>
    ) : video_formats.includes(extname(track.music_file).slice(1)) ? (
        <video
            src={track.music_file}
            poster={track.image}
            ref={videoRef}
        ></video>
    ) : (
        "Unknown media format"
    );

    return (
        <div>
            {element}
            <div className="font-bold text-xl m-1 text-center">
                {track.name}{" "}
                <span className="font-medium text-xs">by {track.channel}</span>
            </div>

            <div id="playBar" className="min-w-60">
                {mediaElement && isLoaded ? (
                    <div>
                        <input
                            type="range"
                            min="0"
                            max={mediaElement.duration}
                            step="0.1"
                            value={currentTime}
                            onChange={handleSliderChange}
                            style={{ width: "90%" }}
                        />
                        <br />
                        <span>
                            {(mediaElement.currentTime -
                                (mediaElement.currentTime % 60)) /
                                60}
                            :
                            {Math.round(mediaElement.currentTime % 60) < 10
                                ? "0" +
                                  Math.round(mediaElement.currentTime % 60)
                                : Math.round(mediaElement.currentTime % 60)}
                            /
                            {(mediaElement.duration -
                                (mediaElement.duration % 60)) /
                                60}
                            :
                            {Math.round(mediaElement.duration % 60) < 10
                                ? "0" + Math.round(mediaElement.duration % 60)
                                : Math.round(mediaElement.duration % 60)}
                        </span>
                    </div>
                ) : (
                    <input type="range" disabled />
                )}
                <div className="flex justify-center">
                    <Image
                        src={"/-10_seconds.svg"}
                        alt="Ten seconds back"
                        width={30}
                        height={30}
                        onClick={handleMinusButtonClick}
                        title="Ten seconds back"
                    />
                    <Image
                        src={isPlaying ? "/pause.svg" : "/play.svg"}
                        alt="Play media"
                        onClick={handlePlayButtonClick}
                        width={30}
                        height={30}
                    />
                    <Image
                        src={"/+10_seconds.svg"}
                        alt="Skip ten seconds"
                        width={30}
                        height={30}
                        // className="inline"
                        onClick={handlePlusButtonClick}
                    />
                </div>
            </div>
        </div>
    );
};

export default MediaElement;
