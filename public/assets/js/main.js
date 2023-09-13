class CustomScrollbar {
    constructor(selector) {
      this.scrollbar = document.querySelector(selector);
      this.track = this.scrollbar.querySelector('.app__scrollbar__track');
      this.thumb = this.scrollbar.querySelector('.app__scrollbar__thumb');
      this.content = this.scrollbar.querySelector('.app__scrollbar__content');
      this.content.addEventListener('scroll', this.handleScroll.bind(this));
      this.thumb.addEventListener('mousedown', this.handleMouseDown.bind(this));
      this.scrollbar.addEventListener('wheel', this.handleWheel.bind(this));
      window.addEventListener('resize', this.handleResize.bind(this));
      this.setThumbHeight();
    }
  
    handleScroll() {
      const scrollPercentage = (this.content.scrollTop / (this.content.scrollHeight - this.content.clientHeight)) * 100;
      const thumbPosition = scrollPercentage * (this.track.clientHeight - this.thumb.clientHeight) / 100;
      this.thumb.style.top = thumbPosition + 'px';
    }
  
    handleMouseDown(event) {
      event.preventDefault();
      const startY = event.clientY;
      const thumbPosition = this.thumb.offsetTop;
  
      const mouseMoveHandler = function(event) {
        const diff = event.clientY - startY;
        const newThumbPosition = Math.max(0, Math.min(this.track.clientHeight - this.thumb.clientHeight, thumbPosition + diff));
        const newScrollPercentage = newThumbPosition / (this.track.clientHeight - this.thumb.clientHeight) * 100;
        const newScrollTop = newScrollPercentage / 100 * (this.content.scrollHeight - this.content.clientHeight);
        this.content.scrollTop = newScrollTop;
        this.thumb.style.top = newThumbPosition + 'px';
      }.bind(this);
  
      const mouseUpHandler = function() {
        document.removeEventListener('mousemove', mouseMoveHandler);
        document.removeEventListener('mouseup', mouseUpHandler);
      };
  
      document.addEventListener('mousemove', mouseMoveHandler);
      document.addEventListener('mouseup', mouseUpHandler);
    }
  
    handleWheel(event) {
      event.preventDefault();
      const scrollAmount = event.deltaY * 0.2;
      this.content.scrollTop += scrollAmount;
    }
  
    handleResize() {
      this.setThumbHeight();
    }
  
    setThumbHeight() {
      const contentRatio = this.content.clientHeight / this.content.scrollHeight;
      const thumbHeight = this.track.clientHeight * contentRatio;
      this.thumb.style.height = thumbHeight + 'px';
  
      if (this.content.scrollHeight <= this.content.clientHeight) {
        this.track.style.display = 'none';
        this.thumb.style.display = 'none';
      } else {
        this.track.style.display = 'block';
        this.thumb.style.display = 'block';
      }
    }
  }
  
  // Usage
  const customScrollbar = new CustomScrollbar('.app__scrollbar');