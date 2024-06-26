import "./Footer.css"

function Footer() {

    const currentYear = new Date().getFullYear();

  return (
    <div className="footer">
        <p>Copyright @ {currentYear}, Cryptoplace - All Rights Reserved.</p>
    </div>
  )
}
export default Footer