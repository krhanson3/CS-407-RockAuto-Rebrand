import "../styles/footer.css";
import FacebookLogo from "../images/facebook-logo.png";

export default function Footer() {
  return (
    <footer className="homeFooter">
      <div className="footerCol">
        <h3 className="footerTitle">RockAuto.com</h3>
        <p className="footerText">The Best Car Parts Site in the Nation</p>
        <div className="footerSocials">
            <a
                href="https://www.facebook.com/RockAutoCom/"
                target="_blank"
                rel="noopener noreferrer"
                className="socialIcon"
            >
                <img src={FacebookLogo} alt="Facebook Logo" className="socialImg" />
            </a>
        </div>

      </div>

      <div className="footerCol">
        <h3 className="footerTitle">Features</h3>
        <p className="footerText">Core features</p>
        <p className="footerText">Pro experience</p>
        <p className="footerText">Integrations</p>
      </div>

      <div className="footerCol">
        <h3 className="footerTitle">Learn more</h3>
        <p className="footerText">Blog</p>
        <p className="footerText">Customer stories</p>
        <p className="footerText">Best practices</p>
      </div>

      <div className="footerCol">
        <h3 className="footerTitle">Support</h3>
        <p className="footerText">Contact</p>
        <p className="footerText">Support</p>
        <p className="footerText">Legal</p>
      </div>
    </footer>
  );
}
