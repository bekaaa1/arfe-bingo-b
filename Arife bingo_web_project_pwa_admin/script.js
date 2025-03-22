if (window.innerWidth < 768 || /Mobi|Android|iPhone/i.test(navigator.userAgent)) {
    alert("This application is only available on desktop.");
    window.location.href = "https://your-redirect-url.com"; // Optional: Redirect mobile users
}
