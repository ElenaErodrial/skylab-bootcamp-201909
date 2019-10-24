function Detail({result, onBack, error}) {
    const {title, imageUrl, description, link, price}= result
    return <section className="view detail">
    <h2 className="detail__title">{title}</h2>
    <img className="detail__image" src={imageUrl}/>
    <p className="detail__description">{description}</p>
    <a className="detail__store" href={link}>Go to store</a>
    <span className="detail__price">{price}</span>
    <a className="detail__back" href="#" onClick = {event => {
        event.preventDefault()
        onBack()

    }}>Go back</a>

    {error && <Feedback message= {error}/>}
    </section>
}
