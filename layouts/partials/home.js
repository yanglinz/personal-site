export function initBackgroundImage() {
  const imageEl = document.getElementById("intro-image");
  if (imageEl) {
    const imageUrl =
      "https://images.unsplash.com/photo-1496942299866-9e7ab403e614?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=a588b0dadbc83bda2b049b901a5148d2&auto=format&fit=crop&w=2850&q=80";
    imageEl.style.background = `url(${imageUrl})`;
    imageEl.style.backgroundSize = "cover";
  }
}
