// Animation de scroll pour les reels
document.addEventListener('DOMContentLoaded', function() {
    const mainPart = document.querySelector('.main-part');
    const reels = document.querySelectorAll('.reel');
    const videos = document.querySelectorAll('.video');
    
    let currentIndex = 0;
    let isScrolling = false;
    
    // Configuration du scroll snap
    function setupScrollSnap() {
        mainPart.style.scrollSnapType = 'y mandatory';
        reels.forEach(reel => {
            reel.style.scrollSnapAlign = 'start';
            reel.style.scrollSnapStop = 'always';
        });
    }
    
    // Gestion de la lecture/pause des vidéos
    function handleVideoPlayback(index) {
        videos.forEach((video, i) => {
            if (i === index) {
                video.play().catch(err => console.log('Lecture automatique bloquée:', err));
            } else {
                video.pause();
            }
        });
    }
    
    // Détection du reel visible
    function detectVisibleReel() {
        const scrollTop = mainPart.scrollTop;
        const viewportHeight = mainPart.clientHeight;
        
        reels.forEach((reel, index) => {
            const reelTop = reel.offsetTop - mainPart.offsetTop;
            const reelBottom = reelTop + reel.offsetHeight;
            
            // Vérifie si le reel est au centre de la vue
            if (scrollTop >= reelTop - viewportHeight / 4 && 
                scrollTop < reelBottom - viewportHeight / 4) {
                if (currentIndex !== index) {
                    currentIndex = index;
                    handleVideoPlayback(index);
                }
            }
        });
    }
    
    // Gestion du scroll avec debounce
    let scrollTimeout;
    mainPart.addEventListener('scroll', function() {
        clearTimeout(scrollTimeout);
        scrollTimeout = setTimeout(() => {
            detectVisibleReel();
        }, 100);
    });
    
    // Navigation au clavier (optionnel)
    document.addEventListener('keydown', function(e) {
        if (e.key === 'ArrowDown' && currentIndex < reels.length - 1) {
            scrollToReel(currentIndex + 1);
        } else if (e.key === 'ArrowUp' && currentIndex > 0) {
            scrollToReel(currentIndex - 1);
        }
    });
    
    // Fonction pour scroller vers un reel spécifique
    function scrollToReel(index) {
        if (index >= 0 && index < reels.length) {
            reels[index].scrollIntoView({ 
                behavior: 'smooth', 
                block: 'start' 
            });
        }
    }
    
    // Gestion du swipe tactile (mobile)
    let touchStartY = 0;
    let touchEndY = 0;
    
    mainPart.addEventListener('touchstart', function(e) {
        touchStartY = e.changedTouches[0].screenY;
    }, { passive: true });
    
    mainPart.addEventListener('touchend', function(e) {
        touchEndY = e.changedTouches[0].screenY;
        handleSwipe();
    }, { passive: true });
    
    function handleSwipe() {
        const swipeDistance = touchStartY - touchEndY;
        const minSwipeDistance = 50;
        
        if (Math.abs(swipeDistance) > minSwipeDistance) {
            if (swipeDistance > 0 && currentIndex < reels.length - 1) {
                // Swipe up - prochain reel
                scrollToReel(currentIndex + 1);
            } else if (swipeDistance < 0 && currentIndex > 0) {
                // Swipe down - reel précédent
                scrollToReel(currentIndex - 1);
            }
        }
    }
    
    // Pause vidéo quand on clique sur les contrôles
    videos.forEach(video => {
        video.addEventListener('click', function(e) {
            if (this.paused) {
                this.play();
            } else {
                this.pause();
            }
        });
    });
    
    // Initialisation
    setupScrollSnap();
    handleVideoPlayback(0); // Lance la première vidéo
    
    // Observer pour détecter les changements de visibilité
    const observerOptions = {
        root: mainPart,
        threshold: 0.6 // 60% de visibilité
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const index = Array.from(reels).indexOf(entry.target);
                if (currentIndex !== index) {
                    currentIndex = index;
                    handleVideoPlayback(index);
                }
            }
        });
    }, observerOptions);
    
    reels.forEach(reel => observer.observe(reel));
});