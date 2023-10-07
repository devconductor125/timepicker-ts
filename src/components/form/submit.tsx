interface Props {
    text: string,
    onClick: () => void,
    className?: string
}

const Submit: React.FC<Props> = ({text, onClick, className}) => {
    return (
        <button onClick={onClick} className={`text-black bg-white rounded-full mx-10 py-3 font-bold ${className}`}>
          {text}
        </button>
    )
}

export default Submit