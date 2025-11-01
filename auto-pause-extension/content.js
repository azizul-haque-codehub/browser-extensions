function findVideos() {
  const videos = document.querySelectorAll('video');
  if (videos.length > 0) {
    console.log(`[AutoBreak] Found ${videos.length} video(s)`);
    videos.forEach(setupVideo);
  } else {
    console.log("[AutoBreak] No video found yet");
  }
}

function setupVideo(video) {
  if (video.dataset.autoBreakAttached) return;
  video.dataset.autoBreakAttached = "true";

  console.log("[AutoBreak] Setup started on video:", video);

  let playingTime = 5 * 60 * 1000; // 5 minutes
  let breakTime = 3 * 60 * 1000;   // 3 minutes

  setInterval(() => {
    if (!video.paused) {
      video.pause();
      console.log("[AutoBreak] Break started");
      const overlay = createOverlay(video, breakTime);
      document.body.appendChild(overlay);
      setTimeout(() => {
        video.play().catch(() => {});
        overlay.remove();
        console.log("[AutoBreak] Break ended");
      }, breakTime);
    }
  }, playingTime);
}

function createOverlay(video, breakTime) {
  const overlay = document.createElement('div');
  overlay.setAttribute("id","overlay")
  overlay.style.position = 'fixed';
  overlay.style.top = '10px';
  overlay.style.right = '10px';
  overlay.style.background = 'rgba(0,0,0,0.7)';
  overlay.style.color = '#fff';
  overlay.style.padding = '10px 20px';
  overlay.style.borderRadius = '10px';
  overlay.style.zIndex = '999999';
  overlay.textContent = `Break: ${Math.floor(breakTime / 1000)}s remaining`;

  const skip = document.createElement('button');
  skip.textContent = 'Skip Break';
  skip.style.marginLeft = '10px';
  skip.onclick = () => {
    document.querySelector("#overlay").remove()
    video.play().catch(()=>{});
  };
  overlay.appendChild(skip);
  return overlay;
}

findVideos();

// keep watching for dynamically added videos
const observer = new MutationObserver(findVideos);
observer.observe(document.body, { childList: true, subtree: true });

console.log("Hello from auto-pause-play extension!");
