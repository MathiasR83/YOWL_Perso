document.addEventListener('DOMContentLoaded', () => {
    
    lucide.createIcons();

    // Les j'aime
    const likeButtons = document.querySelectorAll('.btn-like');

    likeButtons.forEach(btn => {
        btn.addEventListener('click', function() {
           
            const isLiked = this.getAttribute('fill') === 'blue';
            
            if (!isLiked) {
                this.setAttribute('fill', 'blue');
                this.style.color = 'yellow';
                // Animation 
                this.style.transform = 'scale(1.2)';
                setTimeout(() => this.style.transform = 'scale(1)', 150);
            } else {
                this.setAttribute('fill', 'none');
                this.style.color = 'black';
            }
        });
    });
    const navItems = document.querySelectorAll('.nav-item');
    navItems.forEach(item => {
        item.addEventListener('click', function() {
            navItems.forEach(i => i.classList.remove('active'));
            this.classList.add('active');
        });
    });
    
});