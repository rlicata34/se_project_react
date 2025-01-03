
import "../blocks/Footer.css";

function Footer() {

    const year = new Date().getFullYear();

    return ( 
        <footer className="footer">
            <p className="footer__copyright">Developed by Ryan Licata</p>
            <p className="footer__year">{year}</p>
        </footer>
     );
}

export default Footer;