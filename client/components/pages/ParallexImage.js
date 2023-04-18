const ParallexImage = ({
    url = '/images/cms.jpg',
    children,
    paddingTop = 100,
    paddingBottom = 100 }) => {
    return (
        <div style={{
            backgroundImage: `url(${url})`,
            backgroundPosition: "center",
            backgroundAttachment: "fixed",
            paddingTop: paddingTop,
            paddingBottom: paddingBottom,
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
            display: "block"
        }}>
            {children}
        </div>
    )
}

export default ParallexImage;