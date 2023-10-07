interface Props {
    className?: string
}

const Divider: React.FC<Props> = ({className}) => {
    return (
        <div className={`flex flex-row gap-2 ${className}`}>
            <div className="border-b h-0 border-[#2A2A2A] w-full my-auto" />
            <p className="text-secondary">Or</p>
            <div className="border-b h-0 border-[#2A2A2A] w-full my-auto" />
        </div>
    )
}

export default Divider