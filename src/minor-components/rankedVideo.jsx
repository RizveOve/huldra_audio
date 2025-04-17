import React, { useEffect, useRef, useState } from "react";
import ReactPlayer from "react-player";
import { getAsset } from "../utils/loadAssets";

const RankedVideo = ({ url, width, height, className, label }) => {
  const [videoUrl, setVideoUrl] = useState("");
  const [hasPlayed, setHasPlayed] = useState(false);
  const [controls, setControls] = useState(true);
  const playerRef = useRef(null);

  // Load the video itself from your getAsset function
  useEffect(() => {
    let subscribed = true;
    (async () => {
      const result = await getAsset(url);
      if (subscribed) {
        setVideoUrl(result || "");
      }
    })();
    return () => {
      subscribed = false;
    };
  }, [url]);

  // EVERY render or on mount, we re-check local storage
  // to decide if the video was previously played.
  useEffect(() => {
    const playedVideos = JSON.parse(
      localStorage.getItem("playedVideos") || "[]"
    );
    const alreadyPlayed = playedVideos.includes(url);
    setHasPlayed(alreadyPlayed);
    setControls(!alreadyPlayed);
    // if it was played, controls = false
    // if not played, controls = true
  });

  const handlePlay = () => {
    if (hasPlayed) {
      // They have already played this video: forcibly pause & remove controls
      const internalPlayer = playerRef.current?.getInternalPlayer?.();
      if (internalPlayer && typeof internalPlayer.pause === "function") {
        internalPlayer.pause();
      }
      playerRef.current?.seekTo(0);
      setControls(false);
    } else {
      // Not previously watched, so let them watch. We'll finalize in onEnded.
      setHasPlayed(true);
    }
  };

  const handleEnded = () => {
    // Mark this video as played in local storage
    let playedVideos = JSON.parse(localStorage.getItem("playedVideos") || "[]");
    if (!playedVideos.includes(url)) {
      playedVideos.push(url);
      localStorage.setItem("playedVideos", JSON.stringify(playedVideos));
    }

    // Remove controls to prevent replay
    setControls(false);

    // Pause underlying HTML5 video
    const internalPlayer = playerRef.current?.getInternalPlayer?.();
    if (internalPlayer && typeof internalPlayer.pause === "function") {
      internalPlayer.pause();
    }
  };

  return (
    <div className={className}>
      <span className="video-label">{label}</span>
      <ReactPlayer
        ref={playerRef}
        width={width}
        height={height}
        url={videoUrl}
        controls={controls}
        onPlay={handlePlay}
        onEnded={handleEnded}
      />
    </div>
  );
};

export default RankedVideo;
