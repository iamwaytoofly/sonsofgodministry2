// Tawk.to integration script
var Tawk_API = Tawk_API || {};
var Tawk_LoadStart = new Date();

(function(){
    var s1 = document.createElement("script");
    var s0 = document.getElementsByTagName("script")[0];
    s1.async = true;
    s1.src = 'https://embed.tawk.to/YOUR_TAWK_TO_PROPERTY_ID/default';
    s1.charset = 'UTF-8';
    s1.setAttribute('crossorigin', '*');
    s0.parentNode.insertBefore(s1, s0);
})();

// Note: Replace 'YOUR_TAWK_TO_PROPERTY_ID' with your actual Tawk.to Property ID
// You'll get this when you sign up at https://www.tawk.to