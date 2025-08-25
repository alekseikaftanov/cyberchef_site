'use client';

import React, { useRef, useEffect, useState } from 'react';

export const VideoTest = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [videoInfo, setVideoInfo] = useState({
    duration: 0,
    currentTime: 0,
    paused: true,
    ended: false,
    readyState: 0,
    networkState: 0,
    buffered: 0
  });

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const updateInfo = () => {
      setVideoInfo({
        duration: video.duration || 0,
        currentTime: video.currentTime || 0,
        paused: video.paused,
        ended: video.ended,
        readyState: video.readyState,
        networkState: video.networkState,
        buffered: video.buffered.length > 0 ? video.buffered.end(video.buffered.length - 1) : 0
      });
    };

    const handleLoadedMetadata = () => {
      console.log('🎬 Тест: Метаданные загружены');
      updateInfo();
    };

    const handleCanPlay = () => {
      console.log('🎬 Тест: Видео готово к воспроизведению');
      updateInfo();
    };

    const handlePlay = () => {
      console.log('🎬 Тест: Воспроизведение началось');
      updateInfo();
    };

    const handleTimeUpdate = () => {
      updateInfo();
    };

    const handleEnded = () => {
      console.log('🎬 Тест: Видео закончилось');
      updateInfo();
    };

    video.addEventListener('loadedmetadata', handleLoadedMetadata);
    video.addEventListener('canplay', handleCanPlay);
    video.addEventListener('play', handlePlay);
    video.addEventListener('timeupdate', handleTimeUpdate);
    video.addEventListener('ended', handleEnded);

    // Обновляем информацию каждые 500ms
    const interval = setInterval(updateInfo, 500);

    return () => {
      clearInterval(interval);
      video.removeEventListener('loadedmetadata', handleLoadedMetadata);
      video.removeEventListener('canplay', handleCanPlay);
      video.removeEventListener('play', handlePlay);
      video.removeEventListener('timeupdate', handleTimeUpdate);
      video.removeEventListener('ended', handleEnded);
    };
  }, []);

  const handlePlay = () => {
    videoRef.current?.play();
  };

  const handlePause = () => {
    videoRef.current?.pause();
  };

  const handleRestart = () => {
    if (videoRef.current) {
      videoRef.current.currentTime = 0;
      videoRef.current.play();
    }
  };

  return (
    <div className="fixed top-4 right-4 bg-black/80 text-white p-4 rounded-lg z-50 max-w-sm">
      <h3 className="text-lg font-bold mb-3">🎬 Тест видео</h3>
      
      <video
        ref={videoRef}
        src="/videos/heroblock_video.mp4"
        controls
        className="w-full mb-3 rounded"
        style={{ maxHeight: '200px' }}
      />
      
      <div className="space-y-2 text-sm">
        <div>⏱️ Длительность: {videoInfo.duration.toFixed(2)}s</div>
        <div>⏰ Текущее время: {videoInfo.currentTime.toFixed(2)}s</div>
        <div>📊 Загружено: {videoInfo.buffered.toFixed(2)}s</div>
        <div>▶️ Статус: {videoInfo.paused ? 'Пауза' : 'Играет'}</div>
        <div>🔴 Готовность: {videoInfo.readyState}</div>
        <div>🌐 Сеть: {videoInfo.networkState}</div>
      </div>
      
      <div className="flex gap-2 mt-3">
        <button 
          onClick={handlePlay}
          className="bg-green-600 px-3 py-1 rounded text-sm"
        >
          ▶️ Играть
        </button>
        <button 
          onClick={handlePause}
          className="bg-yellow-600 px-3 py-1 rounded text-sm"
        >
          ⏸️ Пауза
        </button>
        <button 
          onClick={handleRestart}
          className="bg-blue-600 px-3 py-1 rounded text-sm"
        >
          🔄 Заново
        </button>
      </div>
    </div>
  );
};
