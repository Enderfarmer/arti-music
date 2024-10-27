"use client";
import { MusicTrack } from "@/types";
import { extname } from "path";
import { useRef, useEffect, useState, useMemo } from "react";
import Image from "next/image";

const audio_formats = [
    // Audioformate
    "aac",
    "ac3",
    "aif",
    "aifc",
    "aiff",
    "amr",
    "au",
    "caf",
    "flac",
    "m4a",
    "m4b",
    "mp3",
    "oga",
    "voc",
    "wav",
    "weba",
    "wma",
];
const video_formats = [
    // Videoformate
    "3g2",
    "3gp",
    "3gpp",
    "avi",
    "cavs",
    "dv",
    "dvr",
    "flv",
    "m2ts",
    "m4v",
    "mkv",
    "mod",
    "mov",
    "mp4",
    "mpeg",
    "mpg",
    "mts",
    "mxf",
    "ogg",
    "rm",
    "rmvb",
    "swf",
    "vob",
    "webm",
    "wmv",
    "wtv",
];

const MediaElement = ({ track }: { track: MusicTrack }) => {
    const audioRef = useRef<HTMLAudioElement | null>(null);
    const videoRef = useRef<HTMLVideoElement | null>(null);
    const timeControlRef = useRef<HTMLInputElement | null>(null);
    const [operation, setOperation] = useState<null | Function>(null);
    const [mediaElement, setMediaElement] = useState<
        HTMLAudioElement | HTMLVideoElement | null
    >(null);
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        // Set the correct media element after the component mounts
        if (audioRef.current) {
            setMediaElement(audioRef.current);
        } else if (videoRef.current) {
            setMediaElement(videoRef.current);
        }
    }, []); // The effect runs once after the initial render

    useEffect(() => {
        if (mediaElement) {
            if (mediaElement.readyState >= 1) {
                setIsLoaded(true);
            }
        }
    }, [mediaElement]);

    // Handle the loaded metadata to set the media element as ready
    const handleLoadedMetadata = () => {
        setIsLoaded(true);
    };

    // Handle the plus button click to move the currentTime forward
    const handlePlusButtonClick = (e: React.MouseEvent) => {
        console.log(isLoaded);
        if (mediaElement && isLoaded) {
            setOperation(function () {
                mediaElement.currentTime += 10;
            });
        }
    };
    const handlePlayButtonClick = (e: React.MouseEvent) => {
        if (mediaElement) {
            if (mediaElement.paused) {
                mediaElement.play();
                e.currentTarget.setAttribute("src", "/pause.svg");
                e.currentTarget.setAttribute("alt", "Pause");
            } else {
                e.currentTarget.setAttribute("src", "/play.svg");
                e.currentTarget.setAttribute("alt", "play");
                mediaElement.pause();
            }
        }
    };
    const handleMinusButtonClick = (e: React.MouseEvent) => {
        if (mediaElement) {
            setOperation(function () {
                mediaElement.currentTime -= 10;
            });
        }
    };
    const element = audio_formats.includes(
        extname(track.music_file).slice(1)
    ) ? (
        <>
            <audio
                src={track.music_file}
                controls
                hidden
                ref={audioRef}
                onLoadedMetadata={handleLoadedMetadata}
            ></audio>
            <img src={track.image} alt="Track image" height={200} />
        </>
    ) : video_formats.includes(extname(track.music_file).slice(1)) ? (
        <video
            src={track.music_file}
            poster={track.image}
            ref={videoRef}
            onLoadedMetadata={handleLoadedMetadata}
        ></video>
    ) : (
        "Unknown media format"
    );
    if (mediaElement) {
        mediaElement.onended = function () {
            document
                .getElementById("playMedia")
                ?.setAttribute("src", "/play.svg");
        };
        mediaElement.oncanplay = () => {
            if (typeof operation == "function") operation();
            setOperation(null);
        };
    }
    return (
        <div>
            {useMemo(() => {
                return element;
            }, [])}
            <div id="playBar">
                {mediaElement ? (
                    <input
                        type="range"
                        id="video-control"
                        max={mediaElement.duration / 2}
                        style={{ width: "90%" }}
                        onChange={function (e) {
                            setOperation(function () {
                                if (timeControlRef.current) {
                                    if (mediaElement)
                                        mediaElement.currentTime =
                                            parseInt(
                                                timeControlRef.current.value
                                            ) * 2;
                                }
                            });
                        }}
                        ref={timeControlRef}
                    />
                ) : (
                    <input type="range" disabled />
                )}
                <div className="flex justify-center">
                    <Image
                        src={"/-10_seconds.svg"}
                        alt="Ten seconds back"
                        width={30}
                        height={30}
                        className="inline"
                        onClick={handleMinusButtonClick}
                        title="Ten seconds back"
                    />
                    <Image
                        src="/play.svg"
                        alt="Play media"
                        onClick={handlePlayButtonClick}
                        id="playMedia"
                        width={30}
                        height={30}
                        className="inline"
                    />
                    <Image
                        src={"/+10_seconds.svg"}
                        alt="Skip ten seconds"
                        width={30}
                        height={30}
                        className="inline"
                        onClick={handlePlusButtonClick}
                    />
                </div>
            </div>
        </div>
    );
};

export default MediaElement;
