document.addEventListener('DOMContentLoaded', () => {
    // 1. Create Floating Petals Background
    const animationContainer = document.querySelector('.background-animation');
    const colors = ['#ffffff', '#ffd6e0', '#ffb3c6', '#ff8fab'];

    function createPetal() {
        const petal = document.createElement('div');
        petal.classList.add('petal');

        // Randomize properties
        const size = Math.random() * 15 + 10; // 10px to 25px
        const left = Math.random() * 100; // 0% to 100%vw
        const animationDuration = Math.random() * 5 + 6; // 6s to 11s
        const color = colors[Math.floor(Math.random() * colors.length)];

        petal.style.width = `${size}px`;
        petal.style.height = `${size}px`;
        petal.style.left = `${left}vw`;
        petal.style.animationDuration = `${animationDuration}s`;
        petal.style.background = color;

        // Add a bit of blur to some petals
        petal.style.filter = `blur(${Math.random() * 2}px)`;

        animationContainer.appendChild(petal);

        // Remove after animation completes to avoid memory leak
        setTimeout(() => {
            petal.remove();
        }, animationDuration * 1000);
    }

    // Create a new petal every 400ms
    setInterval(createPetal, 400);

    // Initial batch of petals
    for (let i = 0; i < 15; i++) {
        setTimeout(createPetal, Math.random() * 3000);
    }


    // 2. Audio Player Logic
    const audio = document.getElementById('audio-source');
    const playPauseBtn = document.getElementById('play-pause-btn');
    const progressBar = document.getElementById('progress-bar');
    const currentTimeEl = document.getElementById('current-time');
    const durationEl = document.getElementById('duration');
    const record = document.getElementById('record');
    const downloadBtn = document.getElementById('download-btn');

    // Play/Pause icon element
    const icon = playPauseBtn.querySelector('i');

    const recordWrapper = document.querySelector('.record-wrapper');

    let isPlaying = false;

    // We can use a free sample audio URL for demonstration if a real file isn't available.
    // This provides a lovely piano loop suitable for a gift.
    const audioUrl = "music/audio.mp3";
    audio.src = audioUrl;
    downloadBtn.href = audioUrl;

    // Toggle Play/Pause
    function togglePlay() {
        if (isPlaying) {
            audio.pause();
            icon.classList.remove('fa-pause');
            icon.classList.add('fa-play');
            record.classList.remove('playing');
            recordWrapper.classList.remove('playing');
        } else {
            audio.play().catch(e => {
                console.log("Audio play failed:", e);
                alert("Cannot play audio automatically, please interact with the page first.");
            });
            icon.classList.remove('fa-play');
            icon.classList.add('fa-pause');
            record.classList.add('playing');
            recordWrapper.classList.add('playing');
        }
        isPlaying = !isPlaying;
    }

    playPauseBtn.addEventListener('click', togglePlay);

    // Update Progress Bar
    audio.addEventListener('timeupdate', () => {
        if (audio.duration) {
            progressBar.value = audio.currentTime;
            currentTimeEl.textContent = formatTime(audio.currentTime);
        }
    });

    // Set duration when metadata is loaded
    audio.addEventListener('loadedmetadata', () => {
        progressBar.max = audio.duration;
        durationEl.textContent = formatTime(audio.duration);
    });

    // Click/Drag on progress bar
    progressBar.addEventListener('input', () => {
        audio.currentTime = progressBar.value;
    });

    // Audio ends
    audio.addEventListener('ended', () => {
        isPlaying = false;
        icon.classList.remove('fa-pause');
        icon.classList.add('fa-play');
        record.classList.remove('playing');
        recordWrapper.classList.remove('playing');
        progressBar.value = 0;
        audio.currentTime = 0;
    });

    // Format time helper (MM:SS)
    function formatTime(seconds) {
        if (isNaN(seconds)) return "0:00";
        const min = Math.floor(seconds / 60);
        const sec = Math.floor(seconds % 60);
        return `${min}:${sec < 10 ? '0' : ''}${sec}`;
    }

    // 3. Heart Click Effect
    document.addEventListener('click', function (e) {
        const heart = document.createElement('i');
        heart.classList.add('fas', 'fa-heart', 'click-heart');

        // Position heart at cursor
        heart.style.left = `${e.pageX}px`;
        heart.style.top = `${e.pageY}px`;

        document.body.appendChild(heart);

        // Remove the element after animation ends (1000ms)
        setTimeout(() => {
            heart.remove();
        }, 1000);
    });
});
