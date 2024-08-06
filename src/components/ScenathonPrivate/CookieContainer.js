import '../../css/index.css'
/*const cookieContainer = document.querySelector(".cookie-container");
const cookieButton = document.querySelector(".cookie-btn");

cookieButton.addEventListener("click", () => {
  cookieContainer.classList.remove("active");
  localStorage.setItem("cookieBannerDisplayed", "true");
});

setTimeout(() => {
  if (!localStorage.getItem("cookieBannerDisplayed")) {
    cookieContainer.classList.add("active");
  }
}, 2000);*/

const AcceptCookies = () =>{
  localStorage.setItem("Cookies", "true");
  
}
const CookieContainer = () => {
    return(

<div className="layout-disclaimer">
    <div className="cookie-container">
        <p className="text-disclaimer">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed eiusmod tempor incidunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquid ex ea commodi consequat. Quis aute iure reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint obcaecat cupiditat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
        </p>
        <button className="cookie-btn1">More Information</button>
        <button onClick={AcceptCookies()} className="cookie-btn2">Yes, I Accept</button>
    </div>
</div>
)
};

export default CookieContainer;