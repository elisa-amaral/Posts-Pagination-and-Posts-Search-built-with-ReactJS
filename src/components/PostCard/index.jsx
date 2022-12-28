import './styles.css'

export const PostCard = ({ id, title, cover, body }) => (
    <div className="post-card">
        <img src={cover} alt={title} />
        <div className="post-card-content">
            <h2>| {id} | {title}</h2>
            <p>{body}</p>
        </div>
    </div>
)