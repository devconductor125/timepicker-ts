interface Props {
    text: string,
    linkText: string,
    linkHref: string,
    className?: string
}

const EmbeddedLink: React.FC<Props> = ({text, linkText, linkHref, className}) => {
    return (
        <div className={`flex flex-row text-sm text-secondary gap-2 mx-auto mb-20 ${className}`}>
            <p>{text}</p>
            <a href={linkHref} className="text-[#0172BE] underline">{linkText}</a>
        </div>
    )
}

export default EmbeddedLink